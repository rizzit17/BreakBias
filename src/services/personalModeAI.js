import { generateUserScenario } from '../data/userScenarios';
const API_URL = '/api/personal-ai';

async function callPersonalAI(payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `AI request failed with ${res.status}`);
  }

  return res.json();
}

export async function generatePersonalScenario({ userContext, history, stageIndex }) {
  try {
    return await callPersonalAI({
      task: 'generate',
      userContext,
      history,
      stageIndex
    });
  } catch {
    const fallback = generateUserScenario(userContext);
    return { ok: true, source: 'local-fallback', scenario: fallback[stageIndex % fallback.length] };
  }
}

export async function evaluatePersonalResponse({ userContext, scenario, responseText, history }) {
  try {
    return await callPersonalAI({
      task: 'evaluate',
      userContext,
      scenario,
      responseText,
      history
    });
  } catch {
    const communication = Math.max(20, Math.min(90, Math.floor(responseText.length / 3)));
    const evaluation = {
      judgement: {
        communication,
        assertiveness: /i recommend|i propose|i need|i suggest|we should/i.test(responseText) ? 74 : 48,
        boundarySetting: /ownership|credit|scope|decision owner|responsible/i.test(responseText) ? 78 : 42,
        clarity: /because|next step|timeline|action/i.test(responseText) ? 70 : 45,
        biasExposureRisk: Math.max(10, 100 - communication)
      },
      biasLevel: Math.max(10, 100 - communication),
      biasType: communication > 70 ? null : 'interruption',
      biasLabel: communication > 70 ? 'Strong Strategic Response' : 'Needs Sharper Framing',
      outcomeText:
        communication > 70
          ? 'Your response was clear and assertive, reducing the chance of credit loss.'
          : 'Your response can be strengthened by naming ownership and next actions explicitly.',
      suggestions: [
        'State ownership in one sentence.',
        'Ask for explicit decision alignment.',
        'Close with a concrete next step and owner.'
      ]
    };
    return { ok: true, source: 'local-fallback', evaluation };
  }
}
