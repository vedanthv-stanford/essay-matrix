export const dynamic = 'force-dynamic';
import collegeEssays from '@/lib/college-essays.json';
import collegeMetadata from '@/lib/college_metadata.json';
import { notFound } from 'next/navigation';

export default function CollegePage({ params }: { params: { college: string } }) {
  const collegeName = decodeURIComponent(params.college);
  // Try to find the college in metadata (case-insensitive, trimmed)
  const collegeMeta = collegeMetadata.colleges.find((c: any) => c.name.trim().toLowerCase() === collegeName.trim().toLowerCase());
  if (!collegeMeta) return notFound();
  // Find all essays for this college (case-insensitive match)
  const essays = collegeEssays.filter((e: any) => e.college.trim().toLowerCase() === collegeMeta.name.trim().toLowerCase());

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{collegeMeta.name}</h1>
      <div className="mb-6 text-muted-foreground">
        <div><b>Location:</b> {collegeMeta.location}</div>
        <div><b>Acceptance Rate:</b> {collegeMeta.acceptanceRate}</div>
        <div><b>Application Fee:</b> {collegeMeta.appFeeDomestic}</div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Essay Prompts</h2>
      {essays.length === 0 ? (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded">No essay prompts found for this college.</div>
      ) : (
        <ul className="space-y-4">
          {essays.map((essay: any, idx: number) => (
            <li key={idx} className="p-4 border rounded bg-card">
              <div className="font-medium mb-1">Prompt {idx + 1}:</div>
              <div className="mb-2">{essay.prompt}</div>
              {essay.word_count && <div className="text-xs text-muted-foreground">{essay.word_count}</div>}
            </li>
          ))}
        </ul>
      )}
      {/* Debug info for troubleshooting */}
      <div className="mt-8 text-xs text-muted-foreground">
        <hr className="my-2" />
        <div>Debug: Essays found: {essays.length}</div>
        <div>Debug: College name used for matching: "{collegeMeta.name}"</div>
      </div>
    </div>
  );
} 