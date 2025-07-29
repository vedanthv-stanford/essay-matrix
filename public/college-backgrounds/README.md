# College Background Images

This directory contains background images for individual college pages.

## How to use:

1. **Place your images here**: Add college background images to this folder
2. **Naming convention**: Name each image using lowercase, no spaces, no special characters
   - Example: `harvarduniversity.jpg`
   - Example: `stanforduniversity.png`
   - Example: `universityofcaliforniaberkeley.jpg`
   - Example: `massachusettsinstituteoftechnology.jpg`

3. **Supported formats**: JPG, JPEG, PNG, WEBP

4. **Fallback image**: Create a `default.jpg` file in this directory to use as a fallback when a specific college's image is not found.

## Examples of college names to match:

- Harvard University → `harvarduniversity.jpg`
- Stanford University → `stanforduniversity.png`
- University of California, Berkeley → `universityofcaliforniaberkeley.jpg`
- Massachusetts Institute of Technology → `massachusettsinstituteoftechnology.jpg`
- Yale University → `yaleuniversity.webp`
- Princeton University → `princetonuniversity.webp`
- Columbia University → `columbiauniversity.jpg`
- University of Pennsylvania → `universityofpennslyvania.webp`
- Duke University → `dukeuniversity.jpg`
- Northwestern University → `northwesternuniversity.webp`

## Image recommendations:

- **Size**: 1920x1080 or larger for good quality
- **Aspect ratio**: 16:9 or similar widescreen format
- **Content**: Campus buildings, landmarks, or scenic views
- **Quality**: High resolution for crisp display
- **Format**: JPG for photos, PNG for graphics with transparency

The system will automatically:
- Try to find an image matching the exact college name
- Fall back to `default.jpg` if no specific image is found
- Handle different file extensions (jpg, jpeg, png, webp)
- Apply a light overlay for better text contrast 