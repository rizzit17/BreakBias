function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateUserScenario(userContext) {
  const {
    role = 'Employee',
    industry = 'Corporate',
    experience = 'Junior',
    company = 'your company',
    gender = 'person',
    name = 'Player'
  } = userContext;

  const meetingContexts = [
    'quarterly planning review',
    'cross-functional roadmap sync',
    'stakeholder escalation room',
    'product launch readiness review',
    'budget alignment meeting',
    'performance calibration circle'
  ];

  const emailContexts = [
    'ownership reassignment thread',
    'promotion feedback follow-up',
    'client update escalation',
    'performance narrative summary',
    'decision log recap',
    'priority change announcement'
  ];

  const chatContexts = [
    'incident-response channel debate',
    'launch-room real-time thread',
    'team delivery planning chat',
    'cross-team dependency thread',
    'project-risk discussion channel',
    'deadline negotiation chat'
  ];

  const biasMechanisms = [
    'Interruption & Credit Erosion',
    'Opportunity Deflection',
    'Visibility Suppression',
    'Role Stereotyping',
    'Authority Doubt',
    'Attribution Drift'
  ];

  const suggestions = [
    'ask for explicit owner assignment',
    'document the decision and timeline',
    'summarize your contribution in writing',
    'name the tradeoff and recommendation clearly',
    'request alignment in front of decision-makers'
  ];

  const makeScenario = (type, i) => {
    const contextText =
      type === 'meeting'
        ? pick(meetingContexts)
        : type === 'email'
          ? pick(emailContexts)
          : pick(chatContexts);

    const promptAction = pick(suggestions);
    const mechanism = pick(biasMechanisms);
    const titlePrefix = type === 'meeting' ? 'Live Room' : type === 'email' ? 'Mail Trail' : 'Team Thread';

    return {
      id: `personal_${type}_${Date.now()}_${i}_${Math.floor(Math.random() * 10000)}`,
      title: `${titlePrefix}: ${industry} ${contextText}`,
      time: pick(['9:00 AM', '10:45 AM', '1:15 PM', '3:20 PM', '4:40 PM']),
      type,
      description: `At ${company}, you are a ${experience} ${role} (${gender}) navigating a ${contextText}. Respond in your own voice as ${name}.`,
      personalPrompt:
        type === 'meeting'
          ? `What do you say in the meeting to protect ownership and momentum? Try to ${promptAction}.`
          : type === 'email'
            ? `Write a concise email response. Focus on fairness and next steps, and ${promptAction}.`
            : `Type your exact chat message for the team channel. Keep it clear, practical, and ${promptAction}.`,
      biasMechanism: mechanism,
      biasTypes: ['Interruption', 'Credit Theft', 'Invisibility'],
      outcomes: {
        'personal-user': {
          content: 'Your response is evaluated in the context of workplace dynamics and decision power.',
          biasLevel: pick([28, 35, 42, 50, 58])
        }
      }
    };
  };

  const orderedTypes = ['meeting', 'email', 'chat', 'meeting', 'chat', 'email'];
  return orderedTypes.map((type, i) => makeScenario(type, i));
}
