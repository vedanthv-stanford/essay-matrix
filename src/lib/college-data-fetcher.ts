// Comprehensive College Data Fetcher
// This utility fetches college data from multiple sources

export interface CollegeData {
  id: string;
  name: string;
  location: string;
  type: 'Public' | 'Private' | 'Liberal Arts' | 'Community College';
  acceptanceRate?: number;
  tuition?: number;
  enrollment?: number;
  website?: string;
  essayPrompts: any[];
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
  ranking?: number;
  popularMajors?: string[];
  studentFacultyRatio?: number;
  graduationRate?: number;
  retentionRate?: number;
}

// Data Sources Configuration
const DATA_SOURCES = {
  // College Scorecard API (US Department of Education)
  COLLEGE_SCORECARD: {
    baseUrl: 'https://api.data.gov/ed/collegescorecard/v1/schools',
    apiKey: process.env.NEXT_PUBLIC_COLLEGE_SCORECARD_API_KEY,
    fields: [
      'school.name',
      'school.city',
      'school.state',
      'school.school_url',
      'school.ownership',
      'admissions.admission_rate.overall',
      'cost.tuition.in_state',
      'cost.tuition.out_of_state',
      'student.size',
      'student.faculty_ratio',
      'latest.student.retention_rate.overall.full_time',
      'latest.completion.rate_suppressed.overall',
      'latest.academics.program_available',
      'latest.admissions.sat_scores.average.overall',
      'latest.admissions.sat_scores.25th_percentile.critical_reading',
      'latest.admissions.sat_scores.75th_percentile.critical_reading',
      'latest.admissions.act_scores.midpoint.cumulative',
      'latest.admissions.act_scores.25th_percentile.cumulative',
      'latest.admissions.act_scores.75th_percentile.cumulative'
    ]
  },
  
  // College Navigator (NCES)
  COLLEGE_NAVIGATOR: {
    baseUrl: 'https://nces.ed.gov/collegenavigator/api',
    fields: [
      'unitid',
      'instnm',
      'city',
      'stabbr',
      'webaddr',
      'control',
      'admission_rate',
      'tuition_in_state',
      'tuition_out_state',
      'enrollment',
      'student_faculty_ratio',
      'retention_rate',
      'graduation_rate'
    ]
  }
};

export class CollegeDataFetcher {
  private static instance: CollegeDataFetcher;
  private cache: Map<string, CollegeData> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  static getInstance(): CollegeDataFetcher {
    if (!CollegeDataFetcher.instance) {
      CollegeDataFetcher.instance = new CollegeDataFetcher();
    }
    return CollegeDataFetcher.instance;
  }

  // Get comprehensive college data from multiple sources
  async getComprehensiveCollegeData(collegeName: string): Promise<CollegeData | null> {
    // Check cache first
    if (this.isCacheValid(collegeName)) {
      return this.cache.get(collegeName)!;
    }

    try {
      // Fetch data from multiple sources
      const [scorecardData, navigatorData, essayPrompts] = await Promise.all([
        this.fetchFromCollegeScorecard(collegeName),
        this.fetchFromCollegeNavigator(collegeName),
        this.getEssayPrompts(collegeName)
      ]);

      // Combine and enrich data
      const combinedData = this.combineDataSources(collegeName, scorecardData, navigatorData, essayPrompts);
      
      if (combinedData) {
        // Cache the result
        this.cache.set(collegeName, combinedData);
        this.cacheExpiry.set(collegeName, Date.now() + this.CACHE_DURATION);
      }

      return combinedData;
    } catch (error) {
      console.error(`Error fetching comprehensive data for ${collegeName}:`, error);
      return null;
    }
  }

  // Fetch data from College Scorecard API
  private async fetchFromCollegeScorecard(collegeName: string): Promise<any> {
    try {
      const { baseUrl, apiKey, fields } = DATA_SOURCES.COLLEGE_SCORECARD;
      
      if (!apiKey) {
        console.warn('College Scorecard API key not found');
        return null;
      }

      const url = `${baseUrl}?school.name=${encodeURIComponent(collegeName)}&fields=${fields.join(',')}&api_key=${apiKey}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0];
        }
      }
    } catch (error) {
      console.error('Error fetching from College Scorecard:', error);
    }
    return null;
  }

  // Fetch data from College Navigator
  private async fetchFromCollegeNavigator(collegeName: string): Promise<any> {
    try {
      const { baseUrl, fields } = DATA_SOURCES.COLLEGE_NAVIGATOR;
      const url = `${baseUrl}/search?name=${encodeURIComponent(collegeName)}&fields=${fields.join(',')}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0];
        }
      }
    } catch (error) {
      console.error('Error fetching from College Navigator:', error);
    }
    return null;
  }

  // Get essay prompts for a college
  private async getEssayPrompts(collegeName: string): Promise<any[]> {
    try {
      const response = await fetch(`/api/colleges/essays?college=${encodeURIComponent(collegeName)}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching essay prompts:', error);
    }
    return [];
  }

  // Combine data from multiple sources
  private combineDataSources(collegeName: string, scorecardData: any, navigatorData: any, essayPrompts: any[]): CollegeData | null {
    // Use scorecard data as primary source, fallback to navigator data
    const primaryData = scorecardData || navigatorData;
    
    if (!primaryData) {
      return null;
    }

    const collegeData: CollegeData = {
      id: this.generateId(collegeName),
      name: collegeName,
      location: this.extractLocation(primaryData),
      type: this.determineSchoolType(primaryData),
      acceptanceRate: this.extractAcceptanceRate(primaryData),
      tuition: this.extractTuition(primaryData),
      enrollment: this.extractEnrollment(primaryData),
      website: this.extractWebsite(primaryData),
      essayPrompts,
      applicationDeadlines: this.getApplicationDeadlines(collegeName),
      satRange: this.extractSATRange(primaryData),
      actRange: this.extractACTRange(primaryData),
      gpaRange: undefined, // Would need additional data source
      ranking: undefined, // Would need US News or similar ranking data
      popularMajors: this.extractPopularMajors(primaryData),
      studentFacultyRatio: this.extractStudentFacultyRatio(primaryData),
      graduationRate: this.extractGraduationRate(primaryData),
      retentionRate: this.extractRetentionRate(primaryData)
    };

    return collegeData;
  }

  // Helper methods for data extraction
  private generateId(collegeName: string): string {
    return collegeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  private extractLocation(data: any): string {
    const city = data['school.city'] || data.city;
    const state = data['school.state'] || data.stabbr;
    return city && state ? `${city}, ${state}` : 'Location not available';
  }

  private determineSchoolType(data: any): 'Public' | 'Private' | 'Liberal Arts' | 'Community College' {
    const ownership = data['school.ownership'] || data.control;
    
    if (ownership === 1) return 'Public';
    if (ownership === 2) return 'Private';
    if (ownership === 3) return 'Private';
    
    // Fallback based on name patterns
    const name = (data['school.name'] || data.instnm || '').toLowerCase();
    if (name.includes('community college') || name.includes('cc')) return 'Community College';
    if (name.includes('college') && !name.includes('university')) return 'Liberal Arts';
    
    return 'Private';
  }

  private extractAcceptanceRate(data: any): number | undefined {
    const rate = data['admissions.admission_rate.overall'] || data.admission_rate;
    return rate ? rate * 100 : undefined;
  }

  private extractTuition(data: any): number | undefined {
    return data['cost.tuition.in_state'] || data.tuition_in_state;
  }

  private extractEnrollment(data: any): number | undefined {
    return data['student.size'] || data.enrollment;
  }

  private extractWebsite(data: any): string | undefined {
    return data['school.school_url'] || data.webaddr;
  }

  private extractSATRange(data: any): { min: number; max: number } | undefined {
    const avg = data['latest.admissions.sat_scores.average.overall'];
    const min25 = data['latest.admissions.sat_scores.25th_percentile.critical_reading'];
    const max75 = data['latest.admissions.sat_scores.75th_percentile.critical_reading'];
    
    if (min25 && max75) {
      return { min: min25, max: max75 };
    }
    return undefined;
  }

  private extractACTRange(data: any): { min: number; max: number } | undefined {
    const min25 = data['latest.admissions.act_scores.25th_percentile.cumulative'];
    const max75 = data['latest.admissions.act_scores.75th_percentile.cumulative'];
    
    if (min25 && max75) {
      return { min: min25, max: max75 };
    }
    return undefined;
  }

  private extractPopularMajors(data: any): string[] | undefined {
    // This would need additional data source or web scraping
    return undefined;
  }

  private extractStudentFacultyRatio(data: any): number | undefined {
    return data['student.faculty_ratio'] || data.student_faculty_ratio;
  }

  private extractGraduationRate(data: any): number | undefined {
    return data['latest.completion.rate_suppressed.overall'] || data.graduation_rate;
  }

  private extractRetentionRate(data: any): number | undefined {
    return data['latest.student.retention_rate.overall.full_time'] || data.retention_rate;
  }

  private getApplicationDeadlines(collegeName: string): any {
    // This would typically be scraped from college websites
    const deadlines: Record<string, any> = {
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

    return deadlines[collegeName] || {};
  }

  // Cache management
  private isCacheValid(collegeName: string): boolean {
    const expiry = this.cacheExpiry.get(collegeName);
    return expiry ? Date.now() < expiry : false;
  }

  // Search colleges with comprehensive data
  async searchCollegesWithData(query: string, limit: number = 10): Promise<CollegeData[]> {
    try {
      // First get basic college list
      const response = await fetch(`/api/colleges/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (response.ok) {
        const colleges = await response.json();
        
        // Get comprehensive data for each college
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

  // Get popular colleges with full data
  async getPopularCollegesWithData(limit: number = 20): Promise<CollegeData[]> {
    const popularColleges = [
      'Harvard University',
      'Stanford University',
      'Yale University',
      'Princeton University',
      'Columbia University',
      'University of Pennsylvania',
      'Brown University',
      'Dartmouth College',
      'Cornell University',
      'Massachusetts Institute of Technology',
      'University of California, Berkeley',
      'University of California, Los Angeles',
      'University of Michigan',
      'University of Virginia',
      'University of North Carolina at Chapel Hill',
      'University of Texas at Austin',
      'University of Wisconsin-Madison',
      'University of Illinois at Urbana-Champaign',
      'University of California, San Diego',
      'University of California, Davis'
    ];

    const collegeData = await Promise.all(
      popularColleges.slice(0, limit).map(name => 
        this.getComprehensiveCollegeData(name)
      )
    );
    
    return collegeData.filter((data): data is CollegeData => data !== null);
  }
}

// Export singleton instance
export const collegeDataFetcher = CollegeDataFetcher.getInstance(); 