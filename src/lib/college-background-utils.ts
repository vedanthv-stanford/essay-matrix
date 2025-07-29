import React from 'react';

/**
 * Utility functions for handling college background images
 */

export function getCollegeBackgroundImage(collegeName: string): string {
  const normalizedName = normalizeCollegeName(collegeName);
  
  // Try different image formats for the specific college
  const formats = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  
  for (const format of formats) {
    const imagePath = `/college-backgrounds/${normalizedName}.${format}`;
    console.log(`[College Background] Trying: ${imagePath}`);
    // In a real implementation, you might want to check if the file exists
    // For now, we'll rely on the browser's 404 handling
    return imagePath;
  }
  
  // Fallback to default image
  console.log(`[College Background] Using fallback for: ${collegeName}`);
  return '/college-backgrounds/default.jpg';
}

export function normalizeCollegeName(name: string): string {
  // Convert college name to match the image naming convention
  // Remove spaces and special characters, convert to lowercase
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric characters
    .trim();
}

export function getCollegeBackgroundStyle(collegeName: string): React.CSSProperties {
  const normalizedName = normalizeCollegeName(collegeName);
  const imagePath = getCollegeBackgroundImage(normalizedName);
  
  return {
    backgroundImage: `url(${imagePath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
} 