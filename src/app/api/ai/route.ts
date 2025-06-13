import { NextResponse } from 'next/server';
import { generateEssay } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const essay = await generateEssay(body);
    return NextResponse.json(essay);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate essay' }, { status: 500 });
  }
} 