// Comprehensive Essay Prompts Database
// This file contains essay prompts for major US colleges

export interface EssayPrompt {
  id: string;
  title: string;
  prompt: string;
  wordLimit?: number;
  required: boolean;
  category: 'Common App' | 'Supplemental' | 'Why This School' | 'Major Specific' | 'Other';
  tips?: string[];
  year: string;
}

// 2024-2025 Essay Prompts Database
export const ESSAY_PROMPTS_2024: Record<string, EssayPrompt[]> = {
  'Harvard University': [
    { id: 'harvard-2024-1', title: 'Intellectual Experience', prompt: 'Briefly describe an intellectual experience that was important to you.', wordLimit: 200, required: true, category: 'Supplemental', tips: ['Be specific about the experience', 'Show intellectual curiosity', 'Connect to your academic interests'], year: '2024-2025' },
    { id: 'harvard-2024-2', title: 'Personal Growth', prompt: 'How have you grown over the past four years?', wordLimit: 200, required: true, category: 'Supplemental', tips: ['Show growth', 'Be honest', 'Reflect on challenges'], year: '2024-2025' }
  ],
  'Stanford University': [
    { id: 'stanford-2024-1', title: 'What matters to you, and why?', prompt: 'What matters to you, and why?', wordLimit: 250, required: true, category: 'Supplemental', tips: ['Be authentic', 'Show your values', 'Connect to your experiences'], year: '2024-2025' },
    { id: 'stanford-2024-2', title: 'Extracurricular Activity', prompt: 'Briefly describe one of your extracurricular activities or work experiences.', wordLimit: 150, required: true, category: 'Supplemental', tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'], year: '2024-2025' }
  ],
  'Yale University': [
    { id: 'yale-2024-1', title: 'Why Yale?', prompt: 'What is it about Yale that has led you to apply?', wordLimit: 125, required: true, category: 'Why This School', tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'], year: '2024-2025' }
  ],
  'Princeton University': [
    { id: 'princeton-2024-1', title: 'Extracurricular Activity', prompt: 'Briefly describe an extracurricular activity or work experience.', wordLimit: 150, required: true, category: 'Supplemental', tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'], year: '2024-2025' }
  ],
  'Columbia University': [
    {
      id: 'columbia-2024-1',
      title: 'Why Columbia?',
      prompt: 'Why are you interested in attending Columbia University?',
      wordLimit: 200,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'columbia-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'University of Pennsylvania': [
    {
      id: 'upenn-2024-1',
      title: 'Why Penn?',
      prompt: 'How will you explore your intellectual and academic interests at the University of Pennsylvania?',
      wordLimit: 300,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'upenn-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'Brown University': [
    {
      id: 'brown-2024-1',
      title: 'Why Brown?',
      prompt: 'Why are you drawn to the area(s) of study you indicated earlier in this application?',
      wordLimit: 250,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'brown-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'Dartmouth College': [
    {
      id: 'dartmouth-2024-1',
      title: 'Why Dartmouth?',
      prompt: 'Why Dartmouth?',
      wordLimit: 100,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'dartmouth-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'Cornell University': [
    {
      id: 'cornell-2024-1',
      title: 'Why Cornell?',
      prompt: 'Why are you drawn to studying the major you have selected?',
      wordLimit: 650,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'cornell-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'Massachusetts Institute of Technology': [
    {
      id: 'mit-2024-1',
      title: 'Why MIT?',
      prompt: 'Why are you interested in attending MIT?',
      wordLimit: 250,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'mit-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'University of California, Berkeley': [
    {
      id: 'ucb-2024-1',
      title: 'Personal Insight Questions',
      prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes, or contributed to group efforts over time.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role'],
      year: '2024-2025'
    },
    {
      id: 'ucb-2024-2',
      title: 'Personal Insight Questions',
      prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show creativity', 'Be specific', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'ucb-2024-3',
      title: 'Personal Insight Questions',
      prompt: 'What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show growth and development', 'Be specific about your talent', 'Demonstrate persistence'],
      year: '2024-2025'
    },
    {
      id: 'ucb-2024-4',
      title: 'Personal Insight Questions',
      prompt: 'Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show initiative', 'Demonstrate resilience', 'Focus on educational context'],
      year: '2024-2025'
    }
  ],
  'University of California, Los Angeles': [
    {
      id: 'ucla-2024-1',
      title: 'Personal Insight Questions',
      prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes, or contributed to group efforts over time.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role'],
      year: '2024-2025'
    },
    {
      id: 'ucla-2024-2',
      title: 'Personal Insight Questions',
      prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show creativity', 'Be specific', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'ucla-2024-3',
      title: 'Personal Insight Questions',
      prompt: 'What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show growth and development', 'Be specific about your talent', 'Demonstrate persistence'],
      year: '2024-2025'
    },
    {
      id: 'ucla-2024-4',
      title: 'Personal Insight Questions',
      prompt: 'Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show initiative', 'Demonstrate resilience', 'Focus on educational context'],
      year: '2024-2025'
    }
  ],
  'University of Michigan': [
    {
      id: 'umich-2024-1',
      title: 'Why Michigan?',
      prompt: 'Describe the unique qualities that attract you to the specific undergraduate College or School (including preferred admission and dual degree programs) to which you are applying at the University of Michigan. How would that curriculum support your interests?',
      wordLimit: 550,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests'],
      year: '2024-2025'
    },
    {
      id: 'umich-2024-2',
      title: 'Community Essay',
      prompt: 'Everyone belongs to many different communities and/or groups defined by (among other things) shared geography, religion, ethnicity, income, cuisine, interest, race, ideology, or intellectual heritage. Choose one of the communities to which you belong, and describe that community and your place within it.',
      wordLimit: 300,
      required: true,
      category: 'Supplemental',
      tips: ['Be specific about your community', 'Show your role and impact', 'Demonstrate belonging'],
      year: '2024-2025'
    }
  ],
  'University of Virginia': [
    {
      id: 'uva-2024-1',
      title: 'Why UVA?',
      prompt: 'What about your individual background, perspective, or experience will serve as a source of strength for you or those around you at UVA?',
      wordLimit: 250,
      required: true,
      category: 'Why This School',
      tips: ['Show your unique perspective', 'Connect to UVA community', 'Demonstrate self-awareness'],
      year: '2024-2025'
    },
    {
      id: 'uva-2024-2',
      title: 'Brief Personal Essay',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'University of North Carolina at Chapel Hill': [
    {
      id: 'unc-2024-1',
      title: 'Why UNC?',
      prompt: 'What do you hope will change about the place where you live?',
      wordLimit: 250,
      required: true,
      category: 'Supplemental',
      tips: ['Show civic engagement', 'Demonstrate problem-solving', 'Connect to your community'],
      year: '2024-2025'
    },
    {
      id: 'unc-2024-2',
      title: 'Brief Personal Essay',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ],
  'University of Texas at Austin': [
    {
      id: 'utexas-2024-1',
      title: 'Why UT Austin?',
      prompt: 'Why are you interested in the major you indicated as your first-choice major?',
      wordLimit: 500,
      required: true,
      category: 'Why This School',
      tips: ['Research the specific major', 'Show genuine interest', 'Connect to your background'],
      year: '2024-2025'
    },
    {
      id: 'utexas-2024-2',
      title: 'Brief Personal Essay',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role'],
      year: '2024-2025'
    }
  ]
};

// Common App Essay Prompts (2024-2025)
export const COMMON_APP_PROMPTS_2024: EssayPrompt[] = [
  {
    id: 'common-2024-1',
    title: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
    prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Be authentic', 'Show growth and reflection', 'Connect to your future goals'],
    year: '2024-2025'
  },
  {
    id: 'common-2024-2',
    title: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
    prompt: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show resilience', 'Focus on learning and growth', 'Be honest about challenges'],
    year: '2024-2025'
  },
  {
    id: 'common-2024-3',
    title: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
    prompt: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show critical thinking', 'Be respectful', 'Focus on the process, not just the outcome'],
    year: '2024-2025'
  },
  {
    id: 'common-2024-4',
    title: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?',
    prompt: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show gratitude', 'Focus on impact', 'Connect to your character'],
    year: '2024-2025'
  },
  {
    id: 'common-2024-5',
    title: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.',
    prompt: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show personal growth', 'Be specific about the event', 'Reflect on the impact'],
    year: '2024-2025'
  },
  {
    id: 'common-2024-6',
    title: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
    prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show passion', 'Be specific', 'Show how you pursue knowledge'],
    year: '2024-2025'
  },
  {
    id: 'common-2024-7',
    title: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.',
    prompt: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Choose a topic you\'re passionate about', 'Make it personal', 'Show your unique perspective'],
    year: '2024-2025'
  }
];

// Helper functions
export function getEssayPromptsForCollege(collegeName: string): EssayPrompt[] {
  return ESSAY_PROMPTS_2024[collegeName] || [];
}

export function getCommonAppPrompts(): EssayPrompt[] {
  return COMMON_APP_PROMPTS_2024;
}

export function getAllCollegesWithPrompts(): string[] {
  return Object.keys(ESSAY_PROMPTS_2024);
}

export function searchEssayPrompts(query: string): EssayPrompt[] {
  const allPrompts: EssayPrompt[] = [];
  
  // Add all college-specific prompts
  Object.values(ESSAY_PROMPTS_2024).forEach(prompts => {
    allPrompts.push(...prompts);
  });
  
  // Add Common App prompts
  allPrompts.push(...COMMON_APP_PROMPTS_2024);
  
  // Filter by query
  const searchTerm = query.toLowerCase();
  return allPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchTerm) ||
    prompt.prompt.toLowerCase().includes(searchTerm) ||
    prompt.category.toLowerCase().includes(searchTerm)
  );
} 