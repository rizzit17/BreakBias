function json(res, status, data) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
}

function sanitize(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function fallbackScenario(userContext, stageIndex = 0) {
  const role = sanitize(userContext?.role, 'Professional');
  const industry = sanitize(userContext?.industry, 'workplace');
  const company = sanitize(userContext?.company, 'your company');
  const experience = sanitize(userContext?.experience, 'Mid-Level');
  const stages = ['meeting', 'email', 'chat'];
  const type = stages[stageIndex % stages.length];

  return {
    id: `personal_ai_${Date.now()}`,
    type,
    title: `${industry} ${type === 'meeting' ? 'Decision Review' : type === 'email' ? 'Escalation Thread' : 'Team Channel Debate'}`,
    time: ['9:30 AM', '1:10 PM', '4:05 PM'][stageIndex % 3],
    description: `You are a ${experience} ${role} at ${company}. This situation is tailored to your context.`,
    personalPrompt:
      type === 'meeting'
        ? 'What do you say to protect ownership of your contribution while staying collaborative?'
        : type === 'email'
          ? 'Draft a short reply that sets boundaries and requests fair attribution.'
          : 'Type your exact message to keep the discussion fair and clear.',
    biasMechanism: 'Attribution Drift',
    biasTypes: ['Interruption', 'Credit Theft'],
    outcomes: {
      'personal-user': {
        content: 'Your response was logged and assessed against fairness pressure in this scenario.',
        biasLevel: 45
      }
    }
  };
}

function fallbackEvaluation(responseText) {
  const lengthScore = Math.min(35, Math.floor((responseText?.length || 0) / 4));
  const boundaryScore = /credit|owner|ownership|attribution|scope|responsible|decision/i.test(responseText) ? 20 : 8;
  const assertiveScore = /i recommend|i propose|i need|i suggest|let us|we should/i.test(responseText) ? 20 : 10;
  const clarityScore = /because|therefore|so that|next step|action/i.test(responseText) ? 15 : 8;
  const total = Math.max(5, Math.min(95, lengthScore + boundaryScore + assertiveScore + clarityScore));

  return {
    judgement: {
      communication: total,
      assertiveness: Math.min(100, assertiveScore * 4),
      boundarySetting: Math.min(100, boundaryScore * 4),
      clarity: Math.min(100, clarityScore * 5),
      biasExposureRisk: 100 - total
    },
    biasLevel: Math.min(95, Math.max(10, 100 - total)),
    biasType: total > 65 ? null : 'interruption',
    biasLabel: total > 65 ? 'Strong Strategic Response' : 'Response Needs Clearer Protection',
    outcomeText:
      total > 65
        ? 'Your response increased clarity and reduced the chance of credit loss in this moment.'
        : 'Your response had good intent, but left room for others to redirect or appropriate ownership.',
    suggestions: [
      'Name your contribution explicitly.',
      'Ask for decision-owner clarity.',
      'Close with a concrete next step and timeline.'
    ]
  };
}

function extractJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function callGemini(systemPrompt, userPrompt, schemaHint) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  if (!apiKey) return null;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${systemPrompt}\n\n${schemaHint}\n\n${userPrompt}`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
      responseMimeType: 'application/json'
    }
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  let res;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;
  const parsed = extractJson(text);
  return parsed;
}

async function handleGenerate(req, res, payload) {
  const userContext = payload?.userContext || {};
  const history = Array.isArray(payload?.history) ? payload.history : [];
  const stageIndex = Number.isFinite(payload?.stageIndex) ? payload.stageIndex : 0;
  const fallback = fallbackScenario(userContext, stageIndex);

  const systemPrompt = 'You generate realistic workplace scenarios about fairness and bias. Keep it respectful and practical.';
  const schemaHint = `Return strict JSON with keys: id,type,title,time,description,personalPrompt,biasMechanism,biasTypes,outcomes where outcomes has key "personal-user" with content,biasLevel.`;
  const userPrompt = `Profile:
name=${sanitize(userContext.name, 'User')}
gender=${sanitize(userContext.gender, 'Not specified')}
role=${sanitize(userContext.role, 'Professional')}
industry=${sanitize(userContext.industry, 'General')}
company=${sanitize(userContext.company, 'Company')}
experience=${sanitize(userContext.experience, 'Mid-Level')}
stageIndex=${stageIndex}
recentHistory=${JSON.stringify(history.slice(-3))}
Create one scenario only. Type must be one of meeting,email,chat.`;

  const ai = await callGemini(systemPrompt, userPrompt, schemaHint);
  if (!ai || !ai.type || !ai.title) {
    return json(res, 200, { ok: true, source: 'fallback', scenario: fallback });
  }

  const scenario = {
    ...fallback,
    ...ai,
    id: sanitize(ai.id, fallback.id),
    type: ['meeting', 'email', 'chat'].includes(ai.type) ? ai.type : fallback.type,
    title: sanitize(ai.title, fallback.title),
    description: sanitize(ai.description, fallback.description),
    personalPrompt: sanitize(ai.personalPrompt, fallback.personalPrompt),
    biasMechanism: sanitize(ai.biasMechanism, fallback.biasMechanism),
    biasTypes: Array.isArray(ai.biasTypes) && ai.biasTypes.length ? ai.biasTypes.slice(0, 3) : fallback.biasTypes,
    outcomes: {
      'personal-user': {
        content: sanitize(ai?.outcomes?.['personal-user']?.content, fallback.outcomes['personal-user'].content),
        biasLevel: Number.isFinite(ai?.outcomes?.['personal-user']?.biasLevel)
          ? Math.max(0, Math.min(100, ai.outcomes['personal-user'].biasLevel))
          : fallback.outcomes['personal-user'].biasLevel
      }
    }
  };

  return json(res, 200, { ok: true, source: 'ai', scenario });
}

async function handleEvaluate(req, res, payload) {
  const userContext = payload?.userContext || {};
  const scenario = payload?.scenario || {};
  const history = Array.isArray(payload?.history) ? payload.history : [];
  const responseText = sanitize(payload?.responseText, '');
  if (!responseText) return json(res, 400, { ok: false, error: 'responseText is required' });

  const fallback = fallbackEvaluation(responseText);
  const systemPrompt = 'You evaluate workplace communication quality under bias pressure and return a practical rubric.';
  const schemaHint = `Return strict JSON with keys: judgement{communication,assertiveness,boundarySetting,clarity,biasExposureRisk},biasLevel,biasType,biasLabel,outcomeText,suggestions(array up to 3).`;
  const userPrompt = `Profile:
name=${sanitize(userContext.name, 'User')}
gender=${sanitize(userContext.gender, 'Not specified')}
role=${sanitize(userContext.role, 'Professional')}
company=${sanitize(userContext.company, 'Company')}
experience=${sanitize(userContext.experience, 'Mid-Level')}
Scenario=${JSON.stringify({ title: scenario.title, type: scenario.type, description: scenario.description, prompt: scenario.personalPrompt })}
User response="${responseText}"
Recent history=${JSON.stringify(history.slice(-3))}
Score fairly and explain likely social outcome at work.`;

  const ai = await callGemini(systemPrompt, userPrompt, schemaHint);
  if (!ai || !ai.judgement) {
    return json(res, 200, { ok: true, source: 'fallback', evaluation: fallback });
  }

  const evaluation = {
    judgement: {
      communication: Math.max(0, Math.min(100, Number(ai?.judgement?.communication) || fallback.judgement.communication)),
      assertiveness: Math.max(0, Math.min(100, Number(ai?.judgement?.assertiveness) || fallback.judgement.assertiveness)),
      boundarySetting: Math.max(0, Math.min(100, Number(ai?.judgement?.boundarySetting) || fallback.judgement.boundarySetting)),
      clarity: Math.max(0, Math.min(100, Number(ai?.judgement?.clarity) || fallback.judgement.clarity)),
      biasExposureRisk: Math.max(0, Math.min(100, Number(ai?.judgement?.biasExposureRisk) || fallback.judgement.biasExposureRisk))
    },
    biasLevel: Math.max(0, Math.min(100, Number(ai?.biasLevel) || fallback.biasLevel)),
    biasType: ai?.biasType ?? fallback.biasType,
    biasLabel: sanitize(ai?.biasLabel, fallback.biasLabel),
    outcomeText: sanitize(ai?.outcomeText, fallback.outcomeText),
    suggestions: Array.isArray(ai?.suggestions) && ai.suggestions.length ? ai.suggestions.slice(0, 3) : fallback.suggestions
  };

  return json(res, 200, { ok: true, source: 'ai', evaluation });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Method not allowed' });
  let payload = {};
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch {
    return json(res, 400, { ok: false, error: 'Invalid JSON body' });
  }
  const task = payload?.task;
  if (task === 'generate') return handleGenerate(req, res, payload);
  if (task === 'evaluate') return handleEvaluate(req, res, payload);
  return json(res, 400, { ok: false, error: 'Invalid task. Use generate or evaluate.' });
}
