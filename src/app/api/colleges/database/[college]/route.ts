import { NextResponse } from 'next/server';
import { collegeDataManager } from '@/lib/college-data';

export async function GET(
  request: Request,
  { params }: { params: { college: string } }
) {
  try {
    const collegeName = decodeURIComponent(params.college);
    
    // Get comprehensive college data
    const collegeData = await collegeDataManager.getCollegeData(collegeName);
    
    if (!collegeData) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }
    
    return NextResponse.json(collegeData);
  } catch (error) {
    console.error('Error fetching college data:', error);
    return NextResponse.json({ error: 'Failed to fetch college data' }, { status: 500 });
  }
} 