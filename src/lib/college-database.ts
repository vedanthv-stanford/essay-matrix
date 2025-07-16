import collegeMetadataRaw from './college_metadata.json';

const collegeMetadata = collegeMetadataRaw.colleges;

export interface CollegeInfo {
  name: string;
  usNewsRank?: number; // Not present in JSON, so optional
  location?: string;   // Now present in JSON
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
  // usNewsRank is not present in the new JSON, so we leave it undefined
  location: c.location || '', // Map the location field
  applicationSystems: Array.isArray(c.applicationSystems) ? c.applicationSystems.join(', ') : (c.applicationSystems || ''),
  appFeeDomestic: c.appFeeDomestic || '',
  decisionTypes: Array.isArray(c.decisionTypes) ? c.decisionTypes.join(', ') : (c.decisionTypes || ''),
  freshmanAcceptanceRate: c.acceptanceRate || '',
  transferAcceptanceRate: c.transferAcceptanceRate || '',
  testPolicy: c.testPolicy || '',
  academicCalendar: c.academicCalendar || '',
  undergradPopulation2022: c.undergradPopulation !== undefined && c.undergradPopulation !== null ? c.undergradPopulation.toString() : '',
  inStateCOA: c.inStateTuition || '',
  outOfStateCOA: c.outOfStateTuition || '',
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