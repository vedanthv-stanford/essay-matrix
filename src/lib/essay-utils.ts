import essays from './college-essays.json';
import { collegeDatabase } from './college-database';

// slug helper used both in UI and for route params
export const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export interface EssayPrompt {
  college: string;
  prompt: string;
  word_count: string;
}

const metaNames = new Set(collegeDatabase.map(c => c.name));

/** essays keyed by slug, filtered to colleges that exist in metadata */
export const essaysBySlug: Record<string, EssayPrompt[]> = {};
essays.forEach((e: EssayPrompt) => {
  if (!metaNames.has(e.college)) return; // ignore extras
  const key = slugify(e.college);
  (essaysBySlug[key] ??= []).push(e);
});

// Helps us warn about missing essays at build time
export const collegesMissingEssays = collegeDatabase
  .filter(c => !essaysBySlug[slugify(c.name)])
  .map(c => c.name); 