import collegeMetadata from './college-metadata.json';

export interface CollegeInfo {
  name: string;
  usNewsRank?: number; // Not present in JSON, so optional
  location?: string;   // Not present in JSON, so optional
  applicationSystems: string;
  appFeeDomestic: string;
  decisionTypes: string;
  freshmanAcceptanceRate: string;
  transferAcceptanceRate: string;
  testPolicy: string;
  academicCalendar: string;
  undergradPopulation2022: string;
  inStateCOA: string;
  outOfStateCOA: string;
  domain?: string;
  admissionsUrl?: string;
  essayUrl?: string;
  id?: string;
}

// Map the JSON data to the CollegeInfo interface
export const collegeDatabase: CollegeInfo[] = (collegeMetadata as any[]).map((c) => ({
  name: c.name,
  // usNewsRank and location are not present in the new JSON, so we leave them undefined
  applicationSystems: Array.isArray(c.applicationSystems) ? c.applicationSystems.join(', ') : (c.applicationSystems || ''),
  appFeeDomestic: c.appFeeDomestic !== undefined && c.appFeeDomestic !== null ? `$${c.appFeeDomestic}` : '',
  decisionTypes: Array.isArray(c.decisionTypes) ? c.decisionTypes.join(', ') : (c.decisionTypes || ''),
  freshmanAcceptanceRate: c.acceptanceRate !== undefined && c.acceptanceRate !== null ? `${(c.acceptanceRate * 100).toFixed(2)}%` : '',
  transferAcceptanceRate: c.transferAcceptanceRate !== undefined && c.transferAcceptanceRate !== null ? `${(c.transferAcceptanceRate * 100).toFixed(2)}%` : '',
  testPolicy: c.testPolicy || '',
  academicCalendar: c.academicCalendar || '',
  undergradPopulation2022: c.undergradPopulation !== undefined && c.undergradPopulation !== null ? c.undergradPopulation.toString() : '',
  inStateCOA: c.inStateTuition !== undefined && c.inStateTuition !== null ? `$${c.inStateTuition}` : '',
  outOfStateCOA: c.outOfStateTuition !== undefined && c.outOfStateTuition !== null ? `$${c.outOfStateTuition}` : '',
  domain: c.domain,
  admissionsUrl: c.admissionsUrl,
  essayUrl: c.essayUrl,
  id: c.id,
}));

export function findCollegeInfo(collegeName: string): CollegeInfo | null {
  const normalizedName = collegeName.toLowerCase().trim();

  // Exact match first
  const exactMatch = collegeDatabase.find(college =>
    college.name.toLowerCase() === normalizedName
  );

  if (exactMatch) {
    return exactMatch;
  }

  // Partial match (college name contains the search term)
  const partialMatch = collegeDatabase.find(college =>
    college.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(college.name.toLowerCase())
  );

  if (partialMatch) {
    return partialMatch;
  }

  // Try matching by removing common words
  const searchTerms = normalizedName.split(' ').filter(word =>
    !['university', 'college', 'institute', 'of', 'the', 'and'].includes(word)
  );

  for (const college of collegeDatabase) {
    const collegeTerms = college.name.toLowerCase().split(' ').filter(word =>
      !['university', 'college', 'institute', 'of', 'the', 'and'].includes(word)
    );

    if (searchTerms.some(term => collegeTerms.includes(term))) {
      return college;
    }
  }

  return null;
}

export function searchColleges(query: string, limit: number = 10): CollegeInfo[] {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase();
  return collegeDatabase
    .filter(college =>
      college.name.toLowerCase().includes(searchTerm) ||
      (college.location && college.location.toLowerCase().includes(searchTerm)) ||
      (college.domain && college.domain.toLowerCase().includes(searchTerm))
    )
    .slice(0, limit);
}

export function getAllColleges(): CollegeInfo[] {
  return collegeDatabase;
} 