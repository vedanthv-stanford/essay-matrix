// College domain mapping for logo fetching
// This provides direct domain lookup for faster logo loading

export interface CollegeDomain {
  name: string;
  domain: string;
}

export const collegeDomains: CollegeDomain[] = [
  // Ivy League
  { name: "Harvard University", domain: "harvard.edu" },
  { name: "Yale University", domain: "yale.edu" },
  { name: "Princeton University", domain: "princeton.edu" },
  { name: "Columbia University", domain: "columbia.edu" },
  { name: "University of Pennsylvania", domain: "upenn.edu" },
  { name: "Brown University", domain: "brown.edu" },
  { name: "Dartmouth College", domain: "dartmouth.edu" },
  { name: "Cornell University", domain: "cornell.edu" },
  
  // Top Private Universities
  { name: "Stanford University", domain: "stanford.edu" },
  { name: "Massachusetts Institute of Technology", domain: "mit.edu" },
  { name: "California Institute of Technology", domain: "caltech.edu" },
  { name: "University of Chicago", domain: "uchicago.edu" },
  { name: "Northwestern University", domain: "northwestern.edu" },
  { name: "Duke University", domain: "duke.edu" },
  { name: "Johns Hopkins University", domain: "jhu.edu" },
  { name: "Vanderbilt University", domain: "vanderbilt.edu" },
  { name: "Rice University", domain: "rice.edu" },
  { name: "Emory University", domain: "emory.edu" },
  { name: "Wake Forest University", domain: "wfu.edu" },
  { name: "Tufts University", domain: "tufts.edu" },
  { name: "Brandeis University", domain: "brandeis.edu" },
  { name: "Case Western Reserve University", domain: "case.edu" },
  { name: "Lehigh University", domain: "lehigh.edu" },
  { name: "Villanova University", domain: "villanova.edu" },
  { name: "Rensselaer Polytechnic Institute", domain: "rpi.edu" },
  { name: "Worcester Polytechnic Institute", domain: "wpi.edu" },
  { name: "Stevens Institute of Technology", domain: "stevens.edu" },
  { name: "Carnegie Mellon University", domain: "cmu.edu" },
  { name: "New York University", domain: "nyu.edu" },
  { name: "Boston University", domain: "bu.edu" },
  { name: "Boston College", domain: "bc.edu" },
  { name: "Georgetown University", domain: "georgetown.edu" },
  { name: "University of Notre Dame", domain: "nd.edu" },
  { name: "Washington University in St. Louis", domain: "wustl.edu" },
  { name: "University of Southern California", domain: "usc.edu" },
  { name: "Pepperdine University", domain: "pepperdine.edu" },
  { name: "Loyola Marymount University", domain: "lmu.edu" },
  { name: "Santa Clara University", domain: "scu.edu" },
  { name: "University of San Francisco", domain: "usfca.edu" },
  { name: "University of San Diego", domain: "sandiego.edu" },
  
  // University of California System
  { name: "University of California, Berkeley", domain: "berkeley.edu" },
  { name: "University of California, Los Angeles", domain: "ucla.edu" },
  { name: "University of California, San Diego", domain: "ucsd.edu" },
  { name: "University of California, Davis", domain: "ucdavis.edu" },
  { name: "University of California, Irvine", domain: "uci.edu" },
  { name: "University of California, Santa Barbara", domain: "ucsb.edu" },
  { name: "University of California, Santa Cruz", domain: "ucsc.edu" },
  { name: "University of California, Riverside", domain: "ucr.edu" },
  { name: "University of California, Merced", domain: "ucmerced.edu" },
  
  // Top Public Universities
  { name: "University of Michigan", domain: "umich.edu" },
  { name: "University of Virginia", domain: "virginia.edu" },
  { name: "University of North Carolina", domain: "unc.edu" },
  { name: "University of Texas", domain: "utexas.edu" },
  { name: "University of Wisconsin", domain: "wisc.edu" },
  { name: "University of Illinois", domain: "illinois.edu" },
  { name: "University of Washington", domain: "washington.edu" },
  { name: "University of Florida", domain: "ufl.edu" },
  { name: "University of Georgia", domain: "uga.edu" },
  { name: "University of Maryland", domain: "umd.edu" },
  { name: "Georgia Institute of Technology", domain: "gatech.edu" },
  { name: "University of Minnesota", domain: "umn.edu" },
  { name: "University of Colorado", domain: "colorado.edu" },
  { name: "University of Arizona", domain: "arizona.edu" },
  { name: "Arizona State University", domain: "asu.edu" },
  { name: "University of Oregon", domain: "uoregon.edu" },
  { name: "University of Utah", domain: "utah.edu" },
  { name: "University of Iowa", domain: "uiowa.edu" },
  { name: "University of Kansas", domain: "ku.edu" },
  { name: "University of Connecticut", domain: "uconn.edu" },
  { name: "University of Delaware", domain: "udel.edu" },
  { name: "University of Massachusetts", domain: "umass.edu" },
  { name: "University of New Hampshire", domain: "unh.edu" },
  { name: "University of Rhode Island", domain: "uri.edu" },
  { name: "University of Vermont", domain: "uvm.edu" },
  { name: "University of Maine", domain: "umaine.edu" },
  { name: "University of New Mexico", domain: "unm.edu" },
  { name: "University of Nevada, Las Vegas", domain: "unlv.edu" },
  { name: "University of Nevada, Reno", domain: "unr.edu" },
  { name: "University of Wyoming", domain: "uwyo.edu" },
  { name: "University of Montana", domain: "umt.edu" },
  { name: "University of Idaho", domain: "uidaho.edu" },
  { name: "University of Alaska", domain: "alaska.edu" },
  
  // Liberal Arts Colleges
  { name: "Williams College", domain: "williams.edu" },
  { name: "Amherst College", domain: "amherst.edu" },
  { name: "Swarthmore College", domain: "swarthmore.edu" },
  { name: "Pomona College", domain: "pomona.edu" },
  { name: "Wellesley College", domain: "wellesley.edu" },
  { name: "Bowdoin College", domain: "bowdoin.edu" },
  { name: "Carleton College", domain: "carleton.edu" },
  { name: "Middlebury College", domain: "middlebury.edu" },
  { name: "Davidson College", domain: "davidson.edu" },
  { name: "Colgate University", domain: "colgate.edu" },
  { name: "Hamilton College", domain: "hamilton.edu" },
  { name: "Bates College", domain: "bates.edu" },
  { name: "Colby College", domain: "colby.edu" },
  { name: "Oberlin College", domain: "oberlin.edu" },
  { name: "Grinnell College", domain: "grinnell.edu" },
  { name: "Kenyon College", domain: "kenyon.edu" },
  { name: "Vassar College", domain: "vassar.edu" },
  { name: "Barnard College", domain: "barnard.edu" },
  { name: "Smith College", domain: "smith.edu" },
  { name: "Mount Holyoke College", domain: "mtholyoke.edu" },
  { name: "Bryn Mawr College", domain: "brynmawr.edu" },
  { name: "Haverford College", domain: "haverford.edu" },
  { name: "Scripps College", domain: "scrippscollege.edu" },
  { name: "Claremont McKenna College", domain: "cmc.edu" },
  { name: "Harvey Mudd College", domain: "hmc.edu" },
  { name: "Pitzer College", domain: "pitzer.edu" },
  { name: "Reed College", domain: "reed.edu" },
  { name: "Lewis & Clark College", domain: "lclark.edu" },
  { name: "Occidental College", domain: "oxy.edu" },
  { name: "Whitman College", domain: "whitman.edu" },
  { name: "Colorado College", domain: "coloradocollege.edu" },
  { name: "Macalester College", domain: "macalester.edu" },
  { name: "St. Olaf College", domain: "stolaf.edu" },
  { name: "Gustavus Adolphus College", domain: "gustavus.edu" },
  { name: "St. John's University", domain: "csbsju.edu" },
  { name: "University of St. Thomas", domain: "stthomas.edu" },
];

/**
 * Find the domain for a college name
 * @param collegeName - The name of the college to search for
 * @returns The domain if found, null otherwise
 */
export function findCollegeDomain(collegeName: string): string | null {
  const normalizedName = collegeName.toLowerCase().trim();
  
  // Exact match first
  const exactMatch = collegeDomains.find(college => 
    college.name.toLowerCase() === normalizedName
  );
  
  if (exactMatch) {
    return exactMatch.domain;
  }
  
  // Partial match (college name contains the search term)
  const partialMatch = collegeDomains.find(college => 
    college.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(college.name.toLowerCase())
  );
  
  if (partialMatch) {
    return partialMatch.domain;
  }
  
  // Try matching by removing common words
  const searchTerms = normalizedName.split(' ').filter(word => 
    !['university', 'college', 'institute', 'of', 'the', 'and'].includes(word)
  );
  
  for (const college of collegeDomains) {
    const collegeTerms = college.name.toLowerCase().split(' ').filter(word => 
      !['university', 'college', 'institute', 'of', 'the', 'and'].includes(word)
    );
    
    if (searchTerms.some(term => collegeTerms.includes(term))) {
      return college.domain;
    }
  }
  
  return null;
} 