import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const colleges = await db.college.findMany({
      where: { userId },
      orderBy: [
        { priority: 'asc' },
        { createdAt: 'desc' }
      ],
    });
    
    return NextResponse.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, ...collegeData } = body;
    
    if (!userId || !name) {
      return NextResponse.json({ error: 'User ID and college name are required' }, { status: 400 });
    }

    const college = await db.college.create({
      data: {
        userId,
        name,
        ...collegeData,
      }
    });
    
    return NextResponse.json(college);
  } catch (error: any) {
    console.error('Error creating college:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'College already exists for this user' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create college' }, { status: 500 });
  }
} 