const fs = require('fs');
const path = require('path');

// Import the college database
const collegeMetadata = require('../src/lib/college_metadata.json');

function normalizeCollegeName(name) {
  let normalized = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters but keep spaces
    .trim();
  
  // Then remove spaces to match the image file naming
  return normalized.replace(/\s+/g, '');
}

function findSimilarImages(normalizedName, existingFiles) {
  // Try to find similar image names
  const similar = existingFiles.filter(file => {
    const fileWithoutExt = file.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
    return fileWithoutExt.includes(normalizedName) || 
           normalizedName.includes(fileWithoutExt) ||
           fileWithoutExt.length > normalizedName.length * 0.8; // 80% similarity
  });
  return similar;
}

function analyzeMissingImages() {
  const backgroundsDir = path.join(__dirname, '../public/college-backgrounds');
  const existingFiles = fs.readdirSync(backgroundsDir)
    .filter(file => !file.startsWith('.') && file !== 'README.md' && !file.endsWith('.zip'));

  console.log('Analyzing missing college background images...\n');
  
  const missingColleges = [
    'Dartmouth College',
    'Florida A&M University', 
    'Georgia Institute of Technology',
    'Harvey Mudd College',
    'Haverford College',
    'University of Illinois Urbana-Champaign',
    'University of Massachusetts Amherst',
    'University of Michigan-Ann Arbor',
    'University of North Carolina at Chapel Hill',
    'University of Notre Dame',
    'University of Pennsylvania',
    'Pennsylvania State University',
    'Swarthmore College',
    'Texas A&M University',
    'Vassar College',
    'Wellesley College',
    'College of William & Mary',
    'Worcester Polytechnic Institute'
  ];
  
  missingColleges.forEach(collegeName => {
    const normalizedName = normalizeCollegeName(collegeName);
    const similarImages = findSimilarImages(normalizedName, existingFiles);
    
    console.log(`\n🔍 ${collegeName}`);
    console.log(`   Expected: ${normalizedName}`);
    
    if (similarImages.length > 0) {
      console.log(`   Found similar files:`);
      similarImages.forEach(img => console.log(`     - ${img}`));
    } else {
      console.log(`   No similar files found`);
    }
  });
}

if (require.main === module) {
  analyzeMissingImages();
}

module.exports = { analyzeMissingImages }; 