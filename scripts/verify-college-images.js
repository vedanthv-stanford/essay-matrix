const fs = require('fs');
const path = require('path');

// Import the college database
const collegeMetadata = require('../src/lib/college_metadata.json');

// Comprehensive mapping for colleges with their exact filenames and extensions
const COLLEGE_IMAGE_MAPPING = {
  // Special characters and different naming
  'College of William & Mary': 'william&marycollege.jpg',
  'Texas A&M University': 'texasa&muniversity.jpg',
  'Florida A&M University': 'floridaa&muniversity.jpg',
  'Georgia Institute of Technology': 'georgiatech.jpeg',
  'Swarthmore College': 'swathmorecollege.webp', // Note: image is "swathmore" not "swarthmore"
  
  // Different naming conventions
  'Dartmouth College': 'dartmouthuniversity.png',
  'Harvey Mudd College': 'harveymudduniversity.jpg',
  'Haverford College': 'haverforduniversity.jpeg',
  'University of Notre Dame': 'notredameuniversity.jpg',
  'Pennsylvania State University': 'pennstateuniversity.jpg',
  'Vassar College': 'vassaruniversity.jpg',
  'Wellesley College': 'wellesleyuniversity.webp',
  'Worcester Polytechnic Institute': 'worcesterpolytechnic.jpg',
  
  // University name variations
  'University of Michigan-Ann Arbor': 'universityofmichigan.jpg',
  'University of Michigan–Ann Arbor': 'universityofmichigan.jpg', // Different dash character
  'University of Illinois Urbana-Champaign': 'universityofillinoisurbana-champaign.jpg',
  'University of Massachusetts Amherst': 'universityofmassamherst.jpg',
  'University of North Carolina at Chapel Hill': 'universityofnorthcarolinachapelhill.jpeg',
  'University of Pennsylvania': 'universityofpennslyvania.webp', // Note: "pennslyvania" typo in image
  
  // Standard colleges with correct extensions
  'American University': 'americanuniversity.jpg',
  'Amherst College': 'amherstcollege.webp',
  'Babson College': 'babsoncollege.jpg',
  'Barnard College': 'barnardcollege.jpg',
  'Boston College': 'bostoncollege.jpeg',
  'Boston University': 'bostonuniversity.jpg',
  'Bowdoin College': 'bowdoincollege.jpg',
  'Brandeis University': 'brandeisuniversity.jpg',
  'Brown University': 'brownuniversity.png',
  'Bucknell University': 'bucknelluniversity.jpg',
  'California Institute of Technology': 'californiainstituteoftechnology.webp',
  'Carnegie Mellon University': 'carnegiemellonuniversity.webp',
  'Chapman University': 'chapmanuniversity.jpg',
  'Claremont McKenna College': 'claremontmckennacollege.jpg',
  'Colgate University': 'colgateuniversity.webp',
  'Columbia University': 'columbiauniversity.jpg',
  'Cornell University': 'cornelluniversity.png',
  'Duke University': 'dukeuniversity.jpg',
  'Emory University': 'emoryuniversity.webp',
  'Fordham University': 'fordhamuniversity.jpg',
  'Georgetown University': 'georgetownuniversity.avif',
  'George Washington University': 'georgewashingtonuniversity.png',
  'Harvard University': 'harvarduniversity.webp',
  'Howard University': 'howarduniversity.jpg',
  'Johns Hopkins University': 'johnshopkinsuniversity.webp',
  'Lehigh University': 'lehighuniversity.jpg',
  'Loyola Marymount University': 'loyolamarymountuniversity.jpg',
  'Massachusetts Institute of Technology': 'massachusettsinstituteoftechnology.jpg',
  'New York University': 'newyorkuniversity.jpg',
  'Northwestern University': 'northwesternuniversity.webp',
  'Pepperdine University': 'pepperdineuniversity.jpg',
  'Pomona College': 'pomonacollege.jpg',
  'Princeton University': 'princetonuniversity.webp',
  'Purdue University': 'purdueuniversity.jpg',
  'Reed College': 'reedcollege.jpg',
  'Rensselaer Polytechnic Institute': 'rensselaerpolytechnicinstitute.png',
  'Rice University': 'riceuniversity.webp',
  'Santa Clara University': 'santaclarauniversity.jpg',
  'Spelman College': 'spelmancollege.jpg',
  'Stanford University': 'stanforduniversity.jpg',
  'Stony Brook University': 'stonybrookuniversity.jpg',
  'Syracuse University': 'syracuseuniversity.webp',
  'Tufts University': 'tuftsuniversity.jpg',
  'Tulane University': 'tulaneuniversity.jpg',
  'Tuskegee University': 'tuskegeeuniversity.jpg',
  'University of California, Berkeley': 'universityofcaliforniaberkeley.jpg',
  'University of California, Los Angeles': 'universityofcalifornialosangeles.jpg',
  'University of Chicago': 'universityofchicago.jpg',
  'University of Colorado Boulder': 'universityofcoloradoboulder.avif',
  'University of Georgia': 'universityofgeorgia.jpg',
  'University of Maryland': 'universityofmaryland.jpg',
  'University of Miami': 'universityofmiami.jpg',
  'University of Richmond': 'universityofrichmond.jpg',
  'University of Rochester': 'universityofrochester.jpg',
  'University of San Diego': 'universityofsandiego.jpg',
  'University of Southern California': 'universityofsoutherncalifornia.jpg',
  'University of Texas at Austin': 'universityoftexasataustin.avif',
  'University of Virginia': 'universityofvirginia.jpg',
  'University of Washington': 'universityofwashington.jpg',
  'University of Wisconsin-Madison': 'universityofwisconsinmadison.jpg',
  'Vanderbilt University': 'vanderbiltuniversity.jpg',
  'Villanova University': 'villanovauniversity.jpeg',
  'Virginia Tech': 'virginiatech.jpg',
  'Wake Forest University': 'wakeforestuniversity.jpg',
  'Washington University in St. Louis': 'washingtonuniversityinstlouis.jpg',
  'Yale University': 'yaleuniversity.webp',
};

function normalizeCollegeName(name) {
  let normalized = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters but keep spaces
    .trim();
  
  // Then remove spaces to match the image file naming
  return normalized.replace(/\s+/g, '');
}

function getCollegeImageName(collegeName) {
  // Check if we have a special mapping for this college
  if (COLLEGE_IMAGE_MAPPING[collegeName]) {
    return COLLEGE_IMAGE_MAPPING[collegeName];
  }
  
  // For colleges without special mapping, try different formats
  const normalizedName = normalizeCollegeName(collegeName);
  const formats = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  return `${normalizedName}.${formats[0]}`;
}

function checkCollegeImages() {
  const backgroundsDir = path.join(__dirname, '../public/college-backgrounds');
  const existingFiles = fs.readdirSync(backgroundsDir)
    .filter(file => !file.startsWith('.') && file !== 'README.md' && !file.endsWith('.zip'));

  console.log('Checking college background images with improved mapping...\n');
  
  let missingImages = [];
  let foundImages = [];
  
  collegeMetadata.colleges.forEach(college => {
    const imageName = getCollegeImageName(college.name);
    const hasImage = existingFiles.includes(imageName);
    
    if (hasImage) {
      foundImages.push({ name: college.name, imageName: imageName });
    } else {
      missingImages.push({ name: college.name, imageName: imageName });
    }
  });
  
  console.log(`✅ Found images for ${foundImages.length} colleges:`);
  foundImages.forEach(item => {
    console.log(`  - ${item.name} → ${item.imageName}`);
  });
  
  console.log(`\n❌ Missing images for ${missingImages.length} colleges:`);
  missingImages.forEach(item => {
    console.log(`  - ${item.name} → ${item.imageName}`);
  });
  
  console.log(`\n📊 Summary: ${foundImages.length}/${collegeMetadata.colleges.length} colleges have background images (${Math.round(foundImages.length/collegeMetadata.colleges.length*100)}%)`);
  
  return { foundImages, missingImages };
}

if (require.main === module) {
  checkCollegeImages();
}

module.exports = { checkCollegeImages, getCollegeImageName }; 