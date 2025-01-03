// Define the response type for scripture guidance
export interface ScriptureResponse {
  verse: string
  text: string
  context: string
  application: string
}

// Fallback response for error cases
export const FALLBACK_RESPONSE: ScriptureResponse = {
  verse: "Matthew 7:7-8",
  text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened.",
  context: "Jesus teaches about the importance of seeking divine guidance through persistent prayer and faith.",
  application: "When facing challenges or decisions, maintain persistent faith and prayer, trusting that God will provide guidance and answers in His time."
};

// Mock scriptures for different prayer types
const MOCK_SCRIPTURES: Record<string, ScriptureResponse[]> = {
  praise: [
    {
      verse: "Psalm 150:6",
      text: "Let everything that has breath praise the Lord! Praise the Lord!",
      context: "A powerful reminder that praise is the natural response of all creation to God's glory.",
      application: "Express your joy and gratitude to God through worship and praise."
    }
  ],
  gratitude: [
    {
      verse: "1 Thessalonians 5:18",
      text: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
      context: "Reminds us to maintain gratitude even in difficult situations, trusting God's plan.",
      application: "Practice gratitude daily, acknowledging God's blessings in all circumstances."
    }
  ],
  support: [
    {
      verse: "Philippians 4:6-7",
      text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
      context: "Encourages us to bring all our concerns to God through prayer.",
      application: "Turn your worries into prayers, trusting God's peace and provision."
    }
  ],
  testimony: [
    {
      verse: "Psalm 66:16",
      text: "Come and hear, all you who fear God, and I will tell what he has done for my soul.",
      context: "Encourages sharing personal experiences of God's work in our lives.",
      application: "Share your experiences of God's faithfulness to encourage others."
    }
  ],
  encouragement: [
    {
      verse: "Joshua 1:9",
      text: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
      context: "A reminder of God's constant presence and support in our journey.",
      application: "Face challenges with confidence, knowing God is always with you."
    }
  ],
  general: [
    {
      verse: "Jeremiah 29:11",
      text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
      context: "Assures us of God's good plans for our lives.",
      application: "Trust in God's good plans for your life, even in uncertain times."
    }
  ]
};

// Legacy function for prayer form compatibility
export async function generateScripture(prayerContent: string, prayerType: string): Promise<ScriptureResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get scriptures for the prayer type, fallback to general if type not found
  const scriptures = MOCK_SCRIPTURES[prayerType] || MOCK_SCRIPTURES.general;
  
  // Randomly select one of the scriptures for that type
  const randomIndex = Math.floor(Math.random() * scriptures.length);
  return scriptures[randomIndex];
} 