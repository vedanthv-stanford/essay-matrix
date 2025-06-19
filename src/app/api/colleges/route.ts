import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // For development, if no userId is provided, use the test user
    const targetUserId = userId || 'test-user-id';
    
    // First try to find the test user, if not found, create one
    let testUser = await db.user.findUnique({
      where: { email: 'test@example.com' }
    });
    
    if (!testUser) {
      // Create test user if it doesn't exist
      testUser = await db.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          graduationYear: 2025,
          highSchoolName: 'Test High School',
          intendedMajor: 'Computer Science',
        }
      });
    }

    const colleges = await db.college.findMany({
      where: { userId: testUser.id },
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
    
    // For development, if no userId is provided, use the test user
    let targetUserId = userId;
    
    if (!targetUserId) {
      let testUser = await db.user.findUnique({
        where: { email: 'test@example.com' }
      });
      
      if (!testUser) {
        testUser = await db.user.create({
          data: {
            email: 'test@example.com',
            name: 'Test User',
            graduationYear: 2025,
            highSchoolName: 'Test High School',
            intendedMajor: 'Computer Science',
          }
        });
      }
      
      targetUserId = testUser.id;
    }
    
    if (!name) {
      return NextResponse.json({ error: 'College name is required' }, { status: 400 });
    }

    const college = await db.college.create({
      data: {
        userId: targetUserId,
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