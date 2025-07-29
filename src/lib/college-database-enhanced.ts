import raw from './college-data.json';

export type EnhancedCollegeData = typeof raw[number];
export const enhancedCollegeDatabase: EnhancedCollegeData[] = raw; 