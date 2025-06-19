import { NextResponse } from 'next/server';

// Comprehensive list of US colleges and universities
const colleges = [
  // Ivy League
  { name: 'Harvard University', location: 'Cambridge, MA', type: 'Private', acceptanceRate: 4.6, tuition: 54768, enrollment: 31200 },
  { name: 'Yale University', location: 'New Haven, CT', type: 'Private', acceptanceRate: 6.2, tuition: 59950, enrollment: 12300 },
  { name: 'Princeton University', location: 'Princeton, NJ', type: 'Private', acceptanceRate: 5.8, tuition: 57410, enrollment: 8200 },
  { name: 'Columbia University', location: 'New York, NY', type: 'Private', acceptanceRate: 6.1, tuition: 65000, enrollment: 31200 },
  { name: 'University of Pennsylvania', location: 'Philadelphia, PA', type: 'Private', acceptanceRate: 8.4, tuition: 61710, enrollment: 21600 },
  { name: 'Brown University', location: 'Providence, RI', type: 'Private', acceptanceRate: 7.1, tuition: 62680, enrollment: 10200 },
  { name: 'Dartmouth College', location: 'Hanover, NH', type: 'Private', acceptanceRate: 8.8, tuition: 60870, enrollment: 6500 },
  { name: 'Cornell University', location: 'Ithaca, NY', type: 'Private', acceptanceRate: 10.6, tuition: 61815, enrollment: 24000 },

  // Top Public Universities
  { name: 'University of California, Berkeley', location: 'Berkeley, CA', type: 'Public', acceptanceRate: 14.4, tuition: 44115, enrollment: 42000 },
  { name: 'University of California, Los Angeles', location: 'Los Angeles, CA', type: 'Public', acceptanceRate: 10.8, tuition: 44115, enrollment: 45000 },
  { name: 'University of Michigan', location: 'Ann Arbor, MI', type: 'Public', acceptanceRate: 20.2, tuition: 52766, enrollment: 48000 },
  { name: 'University of Virginia', location: 'Charlottesville, VA', type: 'Public', acceptanceRate: 20.7, tuition: 54000, enrollment: 25000 },
  { name: 'University of North Carolina at Chapel Hill', location: 'Chapel Hill, NC', type: 'Public', acceptanceRate: 19.2, tuition: 37000, enrollment: 30000 },
  { name: 'University of Texas at Austin', location: 'Austin, TX', type: 'Public', acceptanceRate: 31.8, tuition: 40000, enrollment: 52000 },
  { name: 'University of Wisconsin-Madison', location: 'Madison, WI', type: 'Public', acceptanceRate: 51.7, tuition: 39000, enrollment: 45000 },
  { name: 'University of Illinois at Urbana-Champaign', location: 'Urbana, IL', type: 'Public', acceptanceRate: 59.7, tuition: 34000, enrollment: 52000 },

  // Top Private Universities
  { name: 'Stanford University', location: 'Stanford, CA', type: 'Private', acceptanceRate: 4.3, tuition: 56169, enrollment: 17000 },
  { name: 'Massachusetts Institute of Technology', location: 'Cambridge, MA', type: 'Private', acceptanceRate: 6.7, tuition: 57786, enrollment: 11500 },
  { name: 'California Institute of Technology', location: 'Pasadena, CA', type: 'Private', acceptanceRate: 6.4, tuition: 56000, enrollment: 2200 },
  { name: 'University of Chicago', location: 'Chicago, IL', type: 'Private', acceptanceRate: 6.2, tuition: 61781, enrollment: 17000 },
  { name: 'Northwestern University', location: 'Evanston, IL', type: 'Private', acceptanceRate: 7.2, tuition: 60000, enrollment: 22000 },
  { name: 'Duke University', location: 'Durham, NC', type: 'Private', acceptanceRate: 7.7, tuition: 60488, enrollment: 17000 },
  { name: 'Johns Hopkins University', location: 'Baltimore, MD', type: 'Private', acceptanceRate: 11.2, tuition: 58720, enrollment: 28000 },
  { name: 'Vanderbilt University', location: 'Nashville, TN', type: 'Private', acceptanceRate: 9.1, tuition: 56050, enrollment: 13000 },

  // Liberal Arts Colleges
  { name: 'Williams College', location: 'Williamstown, MA', type: 'Liberal Arts', acceptanceRate: 12.6, tuition: 61050, enrollment: 2100 },
  { name: 'Amherst College', location: 'Amherst, MA', type: 'Liberal Arts', acceptanceRate: 11.3, tuition: 61000, enrollment: 1850 },
  { name: 'Swarthmore College', location: 'Swarthmore, PA', type: 'Liberal Arts', acceptanceRate: 8.9, tuition: 56000, enrollment: 1600 },
  { name: 'Pomona College', location: 'Claremont, CA', type: 'Liberal Arts', acceptanceRate: 6.6, tuition: 56000, enrollment: 1700 },
  { name: 'Wellesley College', location: 'Wellesley, MA', type: 'Liberal Arts', acceptanceRate: 16.2, tuition: 61000, enrollment: 2400 },
  { name: 'Bowdoin College', location: 'Brunswick, ME', type: 'Liberal Arts', acceptanceRate: 9.1, tuition: 58000, enrollment: 1800 },
  { name: 'Carleton College', location: 'Northfield, MN', type: 'Liberal Arts', acceptanceRate: 18.2, tuition: 58000, enrollment: 2000 },
  { name: 'Middlebury College', location: 'Middlebury, VT', type: 'Liberal Arts', acceptanceRate: 15.7, tuition: 60000, enrollment: 2600 },

  // State Universities
  { name: 'University of California, San Diego', location: 'La Jolla, CA', type: 'Public', acceptanceRate: 34.3, tuition: 44115, enrollment: 42000 },
  { name: 'University of California, Davis', location: 'Davis, CA', type: 'Public', acceptanceRate: 46.3, tuition: 44115, enrollment: 39000 },
  { name: 'University of California, Irvine', location: 'Irvine, CA', type: 'Public', acceptanceRate: 28.9, tuition: 44115, enrollment: 36000 },
  { name: 'University of California, Santa Barbara', location: 'Santa Barbara, CA', type: 'Public', acceptanceRate: 29.2, tuition: 44115, enrollment: 26000 },
  { name: 'University of Washington', location: 'Seattle, WA', type: 'Public', acceptanceRate: 53.5, tuition: 39000, enrollment: 48000 },
  { name: 'University of Florida', location: 'Gainesville, FL', type: 'Public', acceptanceRate: 30.1, tuition: 28000, enrollment: 52000 },
  { name: 'University of Georgia', location: 'Athens, GA', type: 'Public', acceptanceRate: 40.0, tuition: 31000, enrollment: 39000 },
  { name: 'University of Maryland', location: 'College Park, MD', type: 'Public', acceptanceRate: 44.2, tuition: 39000, enrollment: 41000 },

  // Engineering & Tech Schools
  { name: 'Georgia Institute of Technology', location: 'Atlanta, GA', type: 'Public', acceptanceRate: 21.3, tuition: 33000, enrollment: 32000 },
  { name: 'University of California, Santa Cruz', location: 'Santa Cruz, CA', type: 'Public', acceptanceRate: 58.8, tuition: 44115, enrollment: 19000 },
  { name: 'Rensselaer Polytechnic Institute', location: 'Troy, NY', type: 'Private', acceptanceRate: 47.0, tuition: 58000, enrollment: 7500 },
  { name: 'Worcester Polytechnic Institute', location: 'Worcester, MA', type: 'Private', acceptanceRate: 59.4, tuition: 55000, enrollment: 7000 },
  { name: 'Stevens Institute of Technology', location: 'Hoboken, NJ', type: 'Private', acceptanceRate: 52.7, tuition: 56000, enrollment: 7000 },

  // Business Schools
  { name: 'New York University', location: 'New York, NY', type: 'Private', acceptanceRate: 16.2, tuition: 58000, enrollment: 52000 },
  { name: 'Boston University', location: 'Boston, MA', type: 'Private', acceptanceRate: 18.9, tuition: 61000, enrollment: 36000 },
  { name: 'University of Southern California', location: 'Los Angeles, CA', type: 'Private', acceptanceRate: 11.4, tuition: 64000, enrollment: 48000 },
  { name: 'Georgetown University', location: 'Washington, DC', type: 'Private', acceptanceRate: 14.5, tuition: 62000, enrollment: 19000 },
  { name: 'Carnegie Mellon University', location: 'Pittsburgh, PA', type: 'Private', acceptanceRate: 15.4, tuition: 58000, enrollment: 16000 },

  // More State Schools
  { name: 'University of Minnesota', location: 'Minneapolis, MN', type: 'Public', acceptanceRate: 70.0, tuition: 33000, enrollment: 52000 },
  { name: 'University of Colorado Boulder', location: 'Boulder, CO', type: 'Public', acceptanceRate: 78.9, tuition: 38000, enrollment: 37000 },
  { name: 'University of Arizona', location: 'Tucson, AZ', type: 'Public', acceptanceRate: 84.6, tuition: 36000, enrollment: 45000 },
  { name: 'Arizona State University', location: 'Tempe, AZ', type: 'Public', acceptanceRate: 88.2, tuition: 30000, enrollment: 74000 },
  { name: 'University of Oregon', location: 'Eugene, OR', type: 'Public', acceptanceRate: 83.4, tuition: 39000, enrollment: 22000 },
  { name: 'University of Utah', location: 'Salt Lake City, UT', type: 'Public', acceptanceRate: 79.4, tuition: 28000, enrollment: 33000 },
  { name: 'University of Iowa', location: 'Iowa City, IA', type: 'Public', acceptanceRate: 83.5, tuition: 31000, enrollment: 32000 },
  { name: 'University of Kansas', location: 'Lawrence, KS', type: 'Public', acceptanceRate: 92.5, tuition: 28000, enrollment: 28000 },

  // Additional Private Universities
  { name: 'Rice University', location: 'Houston, TX', type: 'Private', acceptanceRate: 9.5, tuition: 54000, enrollment: 7000 },
  { name: 'Emory University', location: 'Atlanta, GA', type: 'Private', acceptanceRate: 15.8, tuition: 55000, enrollment: 15000 },
  { name: 'Wake Forest University', location: 'Winston-Salem, NC', type: 'Private', acceptanceRate: 29.4, tuition: 58000, enrollment: 8000 },
  { name: 'Tufts University', location: 'Medford, MA', type: 'Private', acceptanceRate: 14.6, tuition: 62000, enrollment: 12000 },
  { name: 'Brandeis University', location: 'Waltham, MA', type: 'Private', acceptanceRate: 33.5, tuition: 60000, enrollment: 5800 },
  { name: 'Case Western Reserve University', location: 'Cleveland, OH', type: 'Private', acceptanceRate: 27.4, tuition: 55000, enrollment: 12000 },
  { name: 'Lehigh University', location: 'Bethlehem, PA', type: 'Private', acceptanceRate: 46.1, tuition: 58000, enrollment: 7000 },
  { name: 'Villanova University', location: 'Villanova, PA', type: 'Private', acceptanceRate: 28.2, tuition: 58000, enrollment: 11000 },

  // More Liberal Arts
  { name: 'Davidson College', location: 'Davidson, NC', type: 'Liberal Arts', acceptanceRate: 17.8, tuition: 55000, enrollment: 1900 },
  { name: 'Colgate University', location: 'Hamilton, NY', type: 'Liberal Arts', acceptanceRate: 17.2, tuition: 61000, enrollment: 3000 },
  { name: 'Hamilton College', location: 'Clinton, NY', type: 'Liberal Arts', acceptanceRate: 16.4, tuition: 60000, enrollment: 2000 },
  { name: 'Bates College', location: 'Lewiston, ME', type: 'Liberal Arts', acceptanceRate: 17.3, tuition: 58000, enrollment: 1800 },
  { name: 'Colby College', location: 'Waterville, ME', type: 'Liberal Arts', acceptanceRate: 8.9, tuition: 61000, enrollment: 2000 },
  { name: 'Oberlin College', location: 'Oberlin, OH', type: 'Liberal Arts', acceptanceRate: 33.8, tuition: 58000, enrollment: 2900 },
  { name: 'Grinnell College', location: 'Grinnell, IA', type: 'Liberal Arts', acceptanceRate: 23.2, tuition: 58000, enrollment: 1700 },
  { name: 'Kenyon College', location: 'Gambier, OH', type: 'Liberal Arts', acceptanceRate: 34.3, tuition: 62000, enrollment: 1700 },

  // Additional Public Universities
  { name: 'University of Connecticut', location: 'Storrs, CT', type: 'Public', acceptanceRate: 48.8, tuition: 41000, enrollment: 27000 },
  { name: 'University of Delaware', location: 'Newark, DE', type: 'Public', acceptanceRate: 66.4, tuition: 36000, enrollment: 24000 },
  { name: 'University of Massachusetts Amherst', location: 'Amherst, MA', type: 'Public', acceptanceRate: 63.8, tuition: 37000, enrollment: 32000 },
  { name: 'University of New Hampshire', location: 'Durham, NH', type: 'Public', acceptanceRate: 84.2, tuition: 36000, enrollment: 15000 },
  { name: 'University of Rhode Island', location: 'Kingston, RI', type: 'Public', acceptanceRate: 75.5, tuition: 34000, enrollment: 18000 },
  { name: 'University of Vermont', location: 'Burlington, VT', type: 'Public', acceptanceRate: 67.3, tuition: 43000, enrollment: 13000 },
  { name: 'University of Maine', location: 'Orono, ME', type: 'Public', acceptanceRate: 90.8, tuition: 32000, enrollment: 12000 },
  { name: 'University of New Mexico', location: 'Albuquerque, NM', type: 'Public', acceptanceRate: 96.7, tuition: 25000, enrollment: 26000 }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    
    if (!query.trim()) {
      return NextResponse.json([]);
    }

    const searchTerm = query.toLowerCase();
    const filteredColleges = colleges
      .filter(college => 
        college.name.toLowerCase().includes(searchTerm) ||
        college.location.toLowerCase().includes(searchTerm)
      )
      .slice(0, limit);

    return NextResponse.json(filteredColleges);
  } catch (error) {
    console.error('Error searching colleges:', error);
    return NextResponse.json({ error: 'Failed to search colleges' }, { status: 500 });
  }
} 