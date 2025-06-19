import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Common App Essay Prompts for 2024-2025
  const commonAppPrompts = [
    {
      title: 'Common App Essay 1',
      prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
      wordLimit: 650,
      required: true,
      category: 'Common App',
      tips: JSON.stringify([
        'Focus on a specific aspect of your background or identity',
        'Show how it has shaped your perspective or goals',
        'Use specific examples and anecdotes',
        'Reflect on what you learned from your experience'
      ]),
      year: '2024-2025'
    },
    {
      title: 'Common App Essay 2',
      prompt: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
      wordLimit: 650,
      required: true,
      category: 'Common App',
      tips: JSON.stringify([
        'Choose a meaningful challenge or setback',
        'Show your growth and resilience',
        'Explain what you learned',
        'Demonstrate how you applied these lessons'
      ]),
      year: '2024-2025'
    },
    {
      title: 'Common App Essay 3',
      prompt: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
      wordLimit: 650,
      required: true,
      category: 'Common App',
      tips: JSON.stringify([
        'Choose a belief or idea that matters to you',
        'Explain your thought process',
        'Describe how you challenged it',
        'Reflect on the impact and outcome'
      ]),
      year: '2024-2025'
    },
    {
      title: 'Common App Essay 4',
      prompt: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?',
      wordLimit: 650,
      required: true,
      category: 'Common App',
      tips: JSON.stringify([
        'Focus on a specific moment or action',
        'Explain why it was surprising',
        'Show how it impacted you',
        'Describe how it changed your perspective'
      ]),
      year: '2024-2025'
    },
    {
      title: 'Common App Essay 5',
      prompt: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.',
      wordLimit: 650,
      required: true,
      category: 'Common App',
      tips: JSON.stringify([
        'Choose a significant moment',
        'Show your growth process',
        'Explain your new understanding',
        'Demonstrate how it changed you'
      ]),
      year: '2024-2025'
    },
    {
      title: 'Common App Essay 6',
      prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
      wordLimit: 650,
      required: true,
      category: 'Common App',
      tips: JSON.stringify([
        'Choose something you're genuinely passionate about',
        'Show your intellectual curiosity',
        'Describe how you pursue this interest',
        'Explain why it matters to you'
      ]),
      year: '2024-2025'
    },
    {
      title: 'Common App Essay 7',
      prompt: 'Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.',
      wordLimit: 650,
      required: true,
      category: 'Common App',
      tips: JSON.stringify([
        'Choose a topic that reveals something important about you',
        'Make sure it adds value to your application',
        'Stay focused and coherent',
        'Show your authentic voice'
      ]),
      year: '2024-2025'
    }
  ];

  // Create Common App Essay Prompts
  for (const prompt of commonAppPrompts) {
    await prisma.essayPrompt.create({
      data: prompt
    });
  }

  console.log('Database seeded with Common App essay prompts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });