// College domain mapping for logo fetching
// This now uses the unified college database for consistency

export interface CollegeDomain {
  name: string;
  domain: string;
}

// Import from unified database
import { collegeDatabase, findCollegeInfo } from './college-database';

// Create the domains array from the unified database
export const collegeDomains: CollegeDomain[] = collegeDatabase.map(college => ({
  name: college.name,
  domain: college.domain
}));

/**
 * Find the domain for a college name
 * @param collegeName - The name of the college to search for
 * @returns The domain if found, null otherwise
 */
export function findCollegeDomain(collegeName: string): string | null {
  const collegeInfo = findCollegeInfo(collegeName);
  return collegeInfo?.domain || null;
} 