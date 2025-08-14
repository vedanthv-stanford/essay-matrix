import { NextResponse } from 'next/server';
import { db, getUserByClerkId, upsertUserFromClerk } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user in our database
    let user = await getUserByClerkId(clerkUserId);
    if (!user) {
      // User doesn't exist yet - create them with basic info
      const clerkUser = await auth();
      if (clerkUser.userId) {
        user = await upsertUserFromClerk({
          id: clerkUser.userId,
          email: '', // Will be handled by upsertUserFromClerk
          firstName: 'User',
          lastName: '',
          imageUrl: '',
        });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    
    // Build where clause with user isolation
    const whereClause: any = { userId: user.id };
    
    if (status) {
      whereClause.status = status;
    }
    
    if (type) {
      whereClause.type = type;
    }

    const colleges = await db.college.findMany({
      where: whereClause,
      orderBy: [
        { priority: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        essays: {
          select: {
            id: true,
            title: true,
            wordCount: true,
            createdAt: true,
          }
        },
        essayPrompts: {
          select: {
            id: true,
            title: true,
            wordLimit: true,
            required: true,
            category: true,
          }
        }
      }
    });
    
    return NextResponse.json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, ...collegeData } = body;
    
    if (!name) {
      return NextResponse.json({ error: 'College name is required' }, { status: 400 });
    }

    // Get or create user in our database
    let user = await getUserByClerkId(clerkUserId);
    if (!user) {
      // User doesn't exist yet - create them with basic info
      const clerkUser = await auth();
      if (clerkUser.userId) {
        user = await upsertUserFromClerk({
          id: clerkUser.userId,
          email: '', // Will be handled by upsertUserFromClerk
          firstName: 'User',
          lastName: '',
          imageUrl: '',
        });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if college already exists for this user
    const existingCollege = await db.college.findFirst({
      where: {
        userId: user.id,
        name: name
      }
    });

    if (existingCollege) {
      return NextResponse.json({ 
        error: 'College already exists for this user',
        existingCollegeId: existingCollege.id
      }, { status: 409 });
    }

    const college = await db.college.create({
      data: {
        userId: user.id,
        name,
        ...collegeData,
      },
      include: {
        essays: {
          select: {
            id: true,
            title: true,
            wordCount: true,
            createdAt: true,
          }
        },
        essayPrompts: {
          select: {
            id: true,
            title: true,
            wordLimit: true,
            required: true,
            category: true,
          }
        }
      }
    });
    
    return NextResponse.json(college, { status: 201 });
  } catch (error: any) {
    console.error('Error creating college:', error);
    return NextResponse.json({ error: 'Failed to create college' }, { status: 500 });
  }
} 