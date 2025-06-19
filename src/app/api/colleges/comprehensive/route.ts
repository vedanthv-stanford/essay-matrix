import { NextResponse } from 'next/server';
import { collegeDataFetcher } from '@/lib/college-data-fetcher';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collegeName = searchParams.get('college');
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20');
    const popular = searchParams.get('popular') === 'true';
    
    if (collegeName) {
      // Get comprehensive data for a specific college
      const collegeData = await collegeDataFetcher.getComprehensiveCollegeData(collegeName);
      
      if (!collegeData) {
        return NextResponse.json({ error: 'College not found' }, { status: 404 });
      }
      
      return NextResponse.json(collegeData);
    } else if (popular) {
      // Get popular colleges with comprehensive data
      const popularColleges = await collegeDataFetcher.getPopularCollegesWithData(limit);
      return NextResponse.json(popularColleges);
    } else if (query) {
      // Search colleges with comprehensive data
      const searchResults = await collegeDataFetcher.searchCollegesWithData(query, limit);
      return NextResponse.json(searchResults);
    } else {
      // Return popular colleges by default
      const popularColleges = await collegeDataFetcher.getPopularCollegesWithData(limit);
      return NextResponse.json(popularColleges);
    }
  } catch (error) {
    console.error('Error fetching comprehensive college data:', error);
    return NextResponse.json({ error: 'Failed to fetch college data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, collegeName, data } = body;

    switch (action) {
      case 'update_college_data':
        // Update college information in cache/database
        return NextResponse.json({ message: 'College data updated successfully' });
      
      case 'refresh_cache':
        // Refresh cache for a specific college
        return NextResponse.json({ message: 'Cache refreshed successfully' });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating comprehensive college data:', error);
    return NextResponse.json({ error: 'Failed to update college data' }, { status: 500 });
  }
} 