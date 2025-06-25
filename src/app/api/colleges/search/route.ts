import { NextResponse } from 'next/server';
import { searchColleges } from '@/lib/college-database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    
    if (!query.trim()) {
      return NextResponse.json([]);
    }

    const colleges = searchColleges(query, limit);
    return NextResponse.json(colleges);
  } catch (error) {
    console.error('Error searching colleges:', error);
    return NextResponse.json({ error: 'Failed to search colleges' }, { status: 500 });
  }
} 