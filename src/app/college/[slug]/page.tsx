import { essaysBySlug, slugify } from '@/lib/essay-utils';
import { collegeDatabase } from '@/lib/college-database';
import { CollegeMetadata } from '@/components/ui/college-metadata';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  return collegeDatabase.map(c => ({ slug: slugify(c.name) }));
}

export default function CollegePage({ params }: { params: { slug: string } }) {
  const college = collegeDatabase.find(c => slugify(c.name) === params.slug);
  if (!college) return notFound();
  const prompts = essaysBySlug[params.slug] ?? [];
  if (prompts.length === 0) {
    if (typeof window === 'undefined') {
      // Only log on server/build
      // eslint-disable-next-line no-console
      console.warn(`No essay prompts found for ${college.name}`);
    }
  }
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <CollegeMetadata college={{ name: college.name }} enhancedData={college} />
      <section>
        <h2 className="text-xl font-semibold mb-4">Essay Prompts</h2>
        {prompts.length === 0 ? (
          <p className="text-muted-foreground">No prompts found.</p>
        ) : (
          <ul className="space-y-4">
            {prompts.map((p, i) => (
              <li key={i} className="border p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{p.prompt}</p>
                <span className="text-sm text-muted-foreground">{p.word_count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
} 