import { NextResponse } from 'next/server';
import { getEssayPromptsForCollege, getCommonAppPrompts, searchEssayPrompts } from '@/lib/essay-prompts-database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collegeName = searchParams.get('college');
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    
    if (collegeName) {
      // Get essay prompts for a specific college
      const prompts = getEssayPromptsForCollege(collegeName);
      return NextResponse.json(prompts);
    } else if (query) {
      // Search essay prompts
      const prompts = searchEssayPrompts(query);
      return NextResponse.json(prompts);
    } else if (category === 'common-app') {
      // Get Common App prompts
      const prompts = getCommonAppPrompts();
      return NextResponse.json(prompts);
    } else {
      // Get all available prompts
      const allPrompts = getCommonAppPrompts();
      return NextResponse.json(allPrompts);
    }
  } catch (error) {
    console.error('Error fetching essay prompts:', error);
    return NextResponse.json({ error: 'Failed to fetch essay prompts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, collegeName, essayPrompt } = body;

    switch (action) {
      case 'add_prompt':
        // Add a new essay prompt to a college
        // This would typically save to a database
        return NextResponse.json({ message: 'Essay prompt added successfully' });
      
      case 'update_prompt':
        // Update an existing essay prompt
        return NextResponse.json({ message: 'Essay prompt updated successfully' });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating essay prompts:', error);
    return NextResponse.json({ error: 'Failed to update essay prompts' }, { status: 500 });
  }
} 