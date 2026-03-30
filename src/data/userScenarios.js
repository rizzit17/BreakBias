export function generateUserScenario(userContext) {
  // A template factory for dynamic scenarios based on User's background
  const {
    role = 'Employee',
    industry = 'Corporate',
    experience = 'Junior',
    name = 'Player'
  } = userContext;

  return [
    {
      id: "personal_meeting_01",
      title: `${industry} Strategy Sync`,
      time: "9:00 AM",
      type: "meeting",
      description: `You are presenting a new strategy for your team. You have been a ${experience} ${role} here for a while. Enter what you would actually say in this moment.`,
      personalPrompt: `What would you say in the meeting to protect your idea and make your contribution visible, ${name}?`,
      biasMechanism: "Interruption & Credit Erosion",
      biasTypes: ["Interruption", "Idea Appropriation"],
      outcomes: {
        "personal-user": {
          content: `You present your strategy and advocate for ownership of your ideas in front of the team.`,
          biasLevel: 35,
          emotionModifier: -5
        }
      }
    },
    {
      id: "personal_email_02",
      title: `${role} Client Feedback`,
      time: "1:30 PM",
      type: "email",
      description: `Following up on the morning sync over email regarding the shift in ${industry} deliverables. Write the response you would send.`,
      personalPrompt: `Draft your email response. How do you set boundaries and ask for fair ownership of work?`,
      biasMechanism: "Opportunity Denial",
      biasTypes: ["Gatekeeping", "Micro-Aggression"],
      outcomes: {
        "personal-user": {
          content: `You receive a follow-up that may shift ownership away from you and must respond strategically.`,
          biasLevel: 40,
          emotionModifier: -8
        }
      }
    },
    {
      id: "personal_chat_03",
      title: `${industry} Team Thread`,
      time: "4:15 PM",
      type: "chat",
      description: `A fast moving team chat is deciding scope and ownership. Respond in your own words.`,
      personalPrompt: `Type the message you would post to keep decisions transparent and reduce credit theft.`,
      biasMechanism: "Visibility Loss in Fast Channels",
      biasTypes: ["Invisibility", "Credit Theft"],
      outcomes: {
        "personal-user": {
          content: `You enter the thread with a documented action plan and request explicit owner attribution.`,
          biasLevel: 30,
          emotionModifier: 5
        }
      }
    }
  ];
}
