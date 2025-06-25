// College Data Management System
// This file handles fetching and managing college data from various sources

import { getAllColleges } from './college-database';

export interface CollegeData {
  id: string;
  name: string;
  location: string;
  type: 'Public' | 'Private' | 'Liberal Arts' | 'Community College';
  acceptanceRate: number;
  tuition: number;
  enrollment: number;
  website: string;
  essayPrompts: EssayPrompt[];
  applicationDeadlines: {
    earlyDecision?: string;
    earlyAction?: string;
    regularDecision?: string;
  };
  satRange?: {
    min: number;
    max: number;
  };
  actRange?: {
    min: number;
    max: number;
  };
  gpaRange?: {
    min: number;
    max: number;
  };
}

export interface EssayPrompt {
  id: string;
  title: string;
  prompt: string;
  wordLimit?: number;
  required: boolean;
  category: 'Common App' | 'Supplemental' | 'Why This School' | 'Major Specific' | 'Other';
  tips?: string[];
}

// Data Sources
const DATA_SOURCES = {
  // College Scorecard API (US Department of Education)
  COLLEGE_SCORECARD: 'https://api.data.gov/ed/collegescorecard/v1/schools',
  
  // Common App API (requires partnership)
  COMMON_APP: 'https://api.commonapp.org',
  
  // College Navigator (NCES)
  COLLEGE_NAVIGATOR: 'https://nces.ed.gov/collegenavigator/api',
  
  // Custom scraped data
  CUSTOM_DATABASE: '/api/colleges/database'
};

// Essay Prompts Database
const ESSAY_PROMPTS_DATABASE: Record<string, EssayPrompt[]> = {
  'Harvard University': [
    {
      id: 'harvard-1',
      title: 'Brief Personal Essay',
      prompt: 'Briefly describe an intellectual experience that was important to you.',
      wordLimit: 200,
      required: true,
      category: 'Supplemental',
      tips: ['Be specific about the experience', 'Show intellectual curiosity', 'Connect to your academic interests']
    },
    {
      id: 'harvard-2',
      title: 'Brief Personal Essay',
      prompt: 'Briefly describe an intellectual experience that was important to you.',
      wordLimit: 200,
      required: true,
      category: 'Supplemental',
      tips: ['Be specific about the experience', 'Show intellectual curiosity', 'Connect to your academic interests']
    }
  ],
  'Stanford University': [
    {
      id: 'stanford-1',
      title: 'What matters to you, and why?',
      prompt: 'What matters to you, and why?',
      wordLimit: 250,
      required: true,
      category: 'Supplemental',
      tips: ['Be authentic', 'Show your values', 'Connect to your experiences']
    },
    {
      id: 'stanford-2',
      title: 'Briefly describe one of your extracurricular activities or work experiences.',
      prompt: 'Briefly describe one of your extracurricular activities or work experiences.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
    }
  ],
  'Yale University': [
    {
      id: 'yale-1',
      title: 'Why Yale?',
      prompt: 'What is it about Yale that has led you to apply?',
      wordLimit: 125,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    }
  ],
  'Princeton University': [
    {
      id: 'princeton-1',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
    }
  ],
  'Columbia University': [
    {
      id: 'columbia-1',
      title: 'Why Columbia?',
      prompt: 'Why are you interested in attending Columbia University?',
      wordLimit: 200,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    }
  ],
  'University of Pennsylvania': [
    {
      id: 'upenn-1',
      title: 'Why Penn?',
      prompt: 'How will you explore your intellectual and academic interests at the University of Pennsylvania?',
      wordLimit: 300,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    }
  ],
  'Brown University': [
    {
      id: 'brown-1',
      title: 'Why Brown?',
      prompt: 'Why are you drawn to the area(s) of study you indicated earlier in this application?',
      wordLimit: 250,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    }
  ],
  'Dartmouth College': [
    {
      id: 'dartmouth-1',
      title: 'Why Dartmouth?',
      prompt: 'Why Dartmouth?',
      wordLimit: 100,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    }
  ],
  'Cornell University': [
    {
      id: 'cornell-1',
      title: 'Why Cornell?',
      prompt: 'Why are you drawn to studying the major you have selected?',
      wordLimit: 650,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    }
  ]
};

// Common App Essay Prompts
export const COMMON_APP_PROMPTS: EssayPrompt[] = [
  {
    id: 'common-1',
    title: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
    prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Be authentic', 'Show growth and reflection', 'Connect to your future goals']
  },
  {
    id: 'common-2',
    title: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
    prompt: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show resilience', 'Focus on learning and growth', 'Be honest about challenges']
  },
  {
    id: 'common-3',
    title: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
    prompt: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show critical thinking', 'Be respectful', 'Focus on the process, not just the outcome']
  },
  {
    id: 'common-4',
    title: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?',
    prompt: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show gratitude', 'Focus on impact', 'Connect to your character']
  },
  {
    id: 'common-5',
    title: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.',
    prompt: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show personal growth', 'Be specific about the event', 'Reflect on the impact']
  },
  {
    id: 'common-6',
    title: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
    prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Show passion', 'Be specific', 'Show how you pursue knowledge']
  },
  {
    id: 'common-7',
    title: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.',
    prompt: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.',
    wordLimit: 650,
    required: false,
    category: 'Common App',
    tips: ['Choose a topic you\'re passionate about', 'Make it personal', 'Show your unique perspective']
  }
];

// College Data Management Functions
export class CollegeDataManager {
  private static instance: CollegeDataManager;
  private collegeCache: Map<string, CollegeData> = new Map();

  static getInstance(): CollegeDataManager {
    if (!CollegeDataManager.instance) {
      CollegeDataManager.instance = new CollegeDataManager();
    }
    return CollegeDataManager.instance;
  }

  // Fetch college data from multiple sources
  async getCollegeData(collegeName: string): Promise<CollegeData | null> {
    // Check cache first
    if (this.collegeCache.has(collegeName)) {
      return this.collegeCache.get(collegeName)!;
    }

    try {
      // Try to get data from our database first
      const localData = await this.getLocalCollegeData(collegeName);
      if (localData) {
        this.collegeCache.set(collegeName, localData);
        return localData;
      }

      // If not found locally, try external APIs
      const externalData = await this.fetchExternalCollegeData(collegeName);
      if (externalData) {
        this.collegeCache.set(collegeName, externalData);
        return externalData;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching data for ${collegeName}:`, error);
      return null;
    }
  }

  // Get college data from our local database
  private async getLocalCollegeData(collegeName: string): Promise<CollegeData | null> {
    try {
      const response = await fetch(`/api/colleges/database/${encodeURIComponent(collegeName)}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching local college data:', error);
    }
    return null;
  }

  // Fetch data from external APIs
  private async fetchExternalCollegeData(collegeName: string): Promise<CollegeData | null> {
    // Try College Scorecard API
    const scorecardData = await this.fetchFromCollegeScorecard(collegeName);
    if (scorecardData) {
      return this.enrichWithEssayPrompts(scorecardData);
    }

    // Try other sources...
    return null;
  }

  // Fetch from College Scorecard API
  private async fetchFromCollegeScorecard(collegeName: string): Promise<Partial<CollegeData> | null> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_COLLEGE_SCORECARD_API_KEY;
      const url = `${DATA_SOURCES.COLLEGE_SCORECARD}?school.name=${encodeURIComponent(collegeName)}&api_key=${apiKey}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const school = data.results[0];
          return {
            name: school['school.name'],
            location: `${school['school.city']}, ${school['school.state']}`,
            type: this.determineSchoolType(school),
            acceptanceRate: school['admissions.admission_rate.overall'] * 100,
            tuition: school['cost.tuition.in_state'],
            enrollment: school['student.size'],
            website: school['school.school_url']
          };
        }
      }
    } catch (error) {
      console.error('Error fetching from College Scorecard:', error);
    }
    return null;
  }

  // Enrich college data with essay prompts
  private enrichWithEssayPrompts(collegeData: Partial<CollegeData>): CollegeData {
    const essayPrompts = ESSAY_PROMPTS_DATABASE[collegeData.name!] || [];
    
    return {
      id: collegeData.name!.toLowerCase().replace(/\s+/g, '-'),
      name: collegeData.name!,
      location: collegeData.location!,
      type: collegeData.type!,
      acceptanceRate: collegeData.acceptanceRate!,
      tuition: collegeData.tuition!,
      enrollment: collegeData.enrollment!,
      website: collegeData.website!,
      essayPrompts,
      applicationDeadlines: {},
      satRange: undefined,
      actRange: undefined,
      gpaRange: undefined
    };
  }

  // Determine school type based on data
  private determineSchoolType(school: any): 'Public' | 'Private' | 'Liberal Arts' | 'Community College' {
    const ownership = school['school.ownership'];
    const locale = school['school.locale'];
    
    if (ownership === 1) return 'Public';
    if (ownership === 2) return 'Private';
    if (ownership === 3) return 'Private';
    
    // Fallback based on name patterns
    const name = school['school.name'].toLowerCase();
    if (name.includes('community college') || name.includes('cc')) return 'Community College';
    if (name.includes('college') && !name.includes('university')) return 'Liberal Arts';
    
    return 'Private';
  }

  // Get all essay prompts for a college
  getEssayPrompts(collegeName: string): EssayPrompt[] {
    return ESSAY_PROMPTS_DATABASE[collegeName] || [];
  }

  // Get Common App prompts
  getCommonAppPrompts(): EssayPrompt[] {
    return COMMON_APP_PROMPTS;
  }

  // Search colleges by name
  async searchColleges(query: string, limit: number = 10): Promise<CollegeData[]> {
    try {
      const response = await fetch(`/api/colleges/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (response.ok) {
        const colleges = await response.json();
        return colleges.map((college: any) => this.enrichWithEssayPrompts(college));
      }
    } catch (error) {
      console.error('Error searching colleges:', error);
    }
    return [];
  }

  // Get popular colleges (top schools)
  getPopularColleges(): string[] {
    // Get the first 20 colleges from the unified database as popular colleges
    return getAllColleges().slice(0, 20).map(college => college.name);
  }
}

// Export singleton instance
export const collegeDataManager = CollegeDataManager.getInstance(); 