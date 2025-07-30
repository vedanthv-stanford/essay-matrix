export const dynamic = 'force-dynamic';
import collegeEssays from '@/lib/college-essays.json';
import collegeMetadata from '@/lib/college_metadata.json';
import { notFound } from 'next/navigation';
import { getCollegeBackgroundStyle } from '@/lib/college-background-utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CollegePage({ params }: { params: { college: string } }) {
  const collegeName = decodeURIComponent(params.college);
  // Try to find the college in metadata (case-insensitive, trimmed)
  const collegeMeta = collegeMetadata.colleges.find((c: any) => c.name.trim().toLowerCase() === collegeName.trim().toLowerCase());
  if (!collegeMeta) return notFound();
  // Find all essays for this college (case-insensitive match)
  const essays = collegeEssays.filter((e: any) => e.college.trim().toLowerCase() === collegeMeta.name.trim().toLowerCase());

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <div className="mb-6 p-4 border rounded-lg bg-card">
        <Button variant="outline" asChild>
          <Link href="/colleges" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden rounded-lg mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={getCollegeBackgroundStyle(collegeMeta.name)}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 flex items-end h-full p-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">{collegeMeta.name}</h1>
            <div className="text-lg opacity-90">{collegeMeta.location}</div>
          </div>
        </div>
      </div>
      
      <div className="py-8">
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
    </div>
  );
} 