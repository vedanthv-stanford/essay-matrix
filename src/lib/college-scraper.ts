// College Data Scraping Utility
// This utility helps gather college data from various sources

import { CollegeData, EssayPrompt } from './college-data';

export interface ScrapedCollegeData {
  name: string;
  location: string;
  type: string;
  acceptanceRate?: number;
  tuition?: number;
  enrollment?: number;
  website?: string;
  essayPrompts: EssayPrompt[];
  applicationDeadlines?: {
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

// Essay Prompts from Common App and College Websites
const ESSAY_PROMPTS_2024: Record<string, EssayPrompt[]> = {
  'Harvard University': [
    {
      id: 'harvard-2024-1',
      title: 'Brief Personal Essay',
      prompt: 'Briefly describe an intellectual experience that was important to you.',
      wordLimit: 200,
      required: true,
      category: 'Supplemental',
      tips: ['Be specific about the experience', 'Show intellectual curiosity', 'Connect to your academic interests']
    },
    {
      id: 'harvard-2024-2',
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
      id: 'stanford-2024-1',
      title: 'What matters to you, and why?',
      prompt: 'What matters to you, and why?',
      wordLimit: 250,
      required: true,
      category: 'Supplemental',
      tips: ['Be authentic', 'Show your values', 'Connect to your experiences']
    },
    {
      id: 'stanford-2024-2',
      title: 'Briefly describe one of your extracurricular activities or work experiences.',
      prompt: 'Briefly describe one of your extracurricular activities or work experiences.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
    },
    {
      id: 'stanford-2024-3',
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
      id: 'yale-2024-1',
      title: 'Why Yale?',
      prompt: 'What is it about Yale that has led you to apply?',
      wordLimit: 125,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    },
    {
      id: 'yale-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
    }
  ],
  'Princeton University': [
    {
      id: 'princeton-2024-1',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
    },
    {
      id: 'princeton-2024-2',
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
      id: 'columbia-2024-1',
      title: 'Why Columbia?',
      prompt: 'Why are you interested in attending Columbia University?',
      wordLimit: 200,
      required: true,
      category: 'Why This School',
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    },
    {
      id: 'columbia-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
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
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    },
    {
      id: 'upenn-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
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
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    },
    {
      id: 'brown-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
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
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    },
    {
      id: 'dartmouth-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
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
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    },
    {
      id: 'cornell-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
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
      tips: ['Research specific programs', 'Mention faculty or research opportunities', 'Connect to your interests']
    },
    {
      id: 'mit-2024-2',
      title: 'Briefly describe an extracurricular activity or work experience.',
      prompt: 'Briefly describe an extracurricular activity or work experience.',
      wordLimit: 150,
      required: true,
      category: 'Supplemental',
      tips: ['Focus on impact and learning', 'Show leadership or initiative', 'Be specific about your role']
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
      tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role']
    },
    {
      id: 'ucb-2024-2',
      title: 'Personal Insight Questions',
      prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show creativity', 'Be specific', 'Connect to your interests']
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
      tips: ['Show leadership', 'Focus on positive impact', 'Be specific about your role']
    },
    {
      id: 'ucla-2024-2',
      title: 'Personal Insight Questions',
      prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.',
      wordLimit: 350,
      required: true,
      category: 'Supplemental',
      tips: ['Show creativity', 'Be specific', 'Connect to your interests']
    }
  ]
};

// College Data Sources
const COLLEGE_DATA_SOURCES = {
  // College Scorecard API
  COLLEGE_SCORECARD: 'https://api.data.gov/ed/collegescorecard/v1/schools',
  
  // College Navigator
  COLLEGE_NAVIGATOR: 'https://nces.ed.gov/collegenavigator/api',
  
  // Common App
  COMMON_APP: 'https://apply.commonapp.org',
  
  // College Websites (for essay prompts)
  COLLEGE_WEBSITES: {
    'Harvard University': 'https://college.harvard.edu/admissions/apply',
    'Stanford University': 'https://admission.stanford.edu/apply/essays',
    'Yale University': 'https://admissions.yale.edu/apply',
    'Princeton University': 'https://admission.princeton.edu/apply',
    'Columbia University': 'https://undergrad.admissions.columbia.edu/apply',
    'University of Pennsylvania': 'https://admissions.upenn.edu/apply',
    'Brown University': 'https://admission.brown.edu/apply',
    'Dartmouth College': 'https://admissions.dartmouth.edu/apply',
    'Cornell University': 'https://admissions.cornell.edu/apply',
    'Massachusetts Institute of Technology': 'https://mitadmissions.org/apply/',
    'University of California, Berkeley': 'https://admissions.berkeley.edu/apply',
    'University of California, Los Angeles': 'https://admission.ucla.edu/apply'
  }
};

export class CollegeDataScraper {
  private static instance: CollegeDataScraper;
  private cache: Map<string, ScrapedCollegeData> = new Map();

  static getInstance(): CollegeDataScraper {
    if (!CollegeDataScraper.instance) {
      CollegeDataScraper.instance = new CollegeDataScraper();
    }
    return CollegeDataScraper.instance;
  }

  // Get comprehensive college data
  async getComprehensiveCollegeData(collegeName: string): Promise<ScrapedCollegeData | null> {
    // Check cache first
    if (this.cache.has(collegeName)) {
      return this.cache.get(collegeName)!;
    }

    try {
      // Get basic college data
      const basicData = await this.getBasicCollegeData(collegeName);
      if (!basicData) return null;

      // Get essay prompts
      const essayPrompts = this.getEssayPrompts(collegeName);

      // Get additional data from multiple sources
      const additionalData = await this.getAdditionalCollegeData(collegeName);

      const comprehensiveData: ScrapedCollegeData = {
        ...basicData,
        ...additionalData,
        essayPrompts
      };

      // Cache the result
      this.cache.set(collegeName, comprehensiveData);
      return comprehensiveData;
    } catch (error) {
      console.error(`Error scraping data for ${collegeName}:`, error);
      return null;
    }
  }

  // Get basic college data from our existing database
  private async getBasicCollegeData(collegeName: string): Promise<Partial<ScrapedCollegeData> | null> {
    try {
      const response = await fetch(`/api/colleges/search?q=${encodeURIComponent(collegeName)}&limit=1`);
      if (response.ok) {
        const colleges = await response.json();
        if (colleges.length > 0) {
          return colleges[0];
        }
      }
    } catch (error) {
      console.error('Error fetching basic college data:', error);
    }
    return null;
  }

  // Get essay prompts for a college
  private getEssayPrompts(collegeName: string): EssayPrompt[] {
    return ESSAY_PROMPTS_2024[collegeName] || [];
  }

  // Get additional college data from external sources
  private async getAdditionalCollegeData(collegeName: string): Promise<Partial<ScrapedCollegeData>> {
    const additionalData: Partial<ScrapedCollegeData> = {};

    try {
      // Try to get data from College Scorecard API
      const scorecardData = await this.fetchFromCollegeScorecard(collegeName);
      if (scorecardData) {
        Object.assign(additionalData, scorecardData);
      }

      // Try to get application deadlines
      const deadlines = await this.getApplicationDeadlines(collegeName);
      if (deadlines) {
        additionalData.applicationDeadlines = deadlines;
      }

      // Try to get test score ranges
      const testScores = await this.getTestScoreRanges(collegeName);
      if (testScores) {
        additionalData.satRange = testScores.sat;
        additionalData.actRange = testScores.act;
      }

    } catch (error) {
      console.error('Error fetching additional college data:', error);
    }

    return additionalData;
  }

  // Fetch data from College Scorecard API
  private async fetchFromCollegeScorecard(collegeName: string): Promise<Partial<ScrapedCollegeData> | null> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_COLLEGE_SCORECARD_API_KEY;
      if (!apiKey) {
        console.warn('College Scorecard API key not found');
        return null;
      }

      const url = `${COLLEGE_DATA_SOURCES.COLLEGE_SCORECARD}?school.name=${encodeURIComponent(collegeName)}&api_key=${apiKey}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const school = data.results[0];
          return {
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

  // Get application deadlines (this would typically be scraped from college websites)
  private async getApplicationDeadlines(collegeName: string): Promise<ScrapedCollegeData['applicationDeadlines'] | null> {
    // This is a simplified version - in a real implementation, you'd scrape from college websites
    const deadlines: Record<string, ScrapedCollegeData['applicationDeadlines']> = {
      'Harvard University': {
        earlyAction: 'November 1',
        regularDecision: 'January 1'
      },
      'Stanford University': {
        earlyAction: 'November 1',
        regularDecision: 'January 2'
      },
      'Yale University': {
        earlyAction: 'November 1',
        regularDecision: 'January 2'
      }
    };

    return deadlines[collegeName] || null;
  }

  // Get test score ranges
  private async getTestScoreRanges(collegeName: string): Promise<{ sat?: { min: number; max: number }; act?: { min: number; max: number } } | null> {
    // This is a simplified version - in a real implementation, you'd get this from college websites or APIs
    const testScores: Record<string, { sat?: { min: number; max: number }; act?: { min: number; max: number } }> = {
      'Harvard University': {
        sat: { min: 1460, max: 1580 },
        act: { min: 33, max: 36 }
      },
      'Stanford University': {
        sat: { min: 1440, max: 1570 },
        act: { min: 32, max: 35 }
      },
      'Yale University': {
        sat: { min: 1460, max: 1580 },
        act: { min: 33, max: 36 }
      }
    };

    return testScores[collegeName] || null;
  }

  // Scrape essay prompts from college websites (this would be a more complex implementation)
  async scrapeEssayPromptsFromWebsite(collegeName: string): Promise<EssayPrompt[]> {
    // This is a placeholder - in a real implementation, you'd use a web scraping library
    // like Puppeteer or Cheerio to scrape essay prompts from college websites
    console.log(`Would scrape essay prompts from ${collegeName} website`);
    return [];
  }

  // Get all available essay prompts
  getAllEssayPrompts(): Record<string, EssayPrompt[]> {
    return ESSAY_PROMPTS_2024;
  }

  // Search colleges with comprehensive data
  async searchCollegesWithData(query: string, limit: number = 10): Promise<ScrapedCollegeData[]> {
    try {
      const response = await fetch(`/api/colleges/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (response.ok) {
        const colleges = await response.json();
        const comprehensiveData = await Promise.all(
          colleges.map(async (college: any) => {
            const fullData = await this.getComprehensiveCollegeData(college.name);
            return fullData || college;
          })
        );
        return comprehensiveData.filter(Boolean);
      }
    } catch (error) {
      console.error('Error searching colleges with data:', error);
    }
    return [];
  }
}

// Export singleton instance
export const collegeDataScraper = CollegeDataScraper.getInstance(); 