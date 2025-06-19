import { NextResponse } from 'next/server';
import { collegeDataManager } from '@/lib/college-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    if (query) {
      // Search for specific colleges
      const colleges = await collegeDataManager.searchColleges(query, limit);
      return NextResponse.json(colleges);
    } else {
      // Return popular colleges
      const popularColleges = collegeDataManager.getPopularColleges();
      const collegeData = await Promise.all(
        popularColleges.slice(0, limit).map(name => 
          collegeDataManager.getCollegeData(name)
        )
      );
      
      return NextResponse.json(collegeData.filter(Boolean));
    }
  } catch (error) {
    console.error('Error fetching college database:', error);
    return NextResponse.json({ error: 'Failed to fetch college database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, collegeName, essayPrompt } = body;

    switch (action) {
      case 'add_essay_prompt':
        // Add a new essay prompt to a college
        // This would typically save to a database
        return NextResponse.json({ message: 'Essay prompt added successfully' });
      
      case 'update_college_data':
        // Update college information
        return NextResponse.json({ message: 'College data updated successfully' });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating college database:', error);
    return NextResponse.json({ error: 'Failed to update college database' }, { status: 500 });
  }
} 