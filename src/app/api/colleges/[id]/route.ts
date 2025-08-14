import { NextRequest, NextResponse } from 'next/server';
import { db, getUserByClerkId } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserByClerkId(clerkUserId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { status, priority, type, ...otherFields } = body;

    // Verify the college belongs to the user
    const existingCollege = await db.college.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingCollege) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    // Update the college
    const updatedCollege = await db.college.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(type && { type }),
        ...otherFields,
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

    return NextResponse.json(updatedCollege);
  } catch (error) {
    console.error('Error updating college:', error);
    return NextResponse.json({ error: 'Failed to update college' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserByClerkId(clerkUserId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify the college belongs to the user
    const existingCollege = await db.college.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingCollege) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    // Delete the college
    await db.college.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting college:', error);
    return NextResponse.json({ error: 'Failed to delete college' }, { status: 500 });
  }
} 