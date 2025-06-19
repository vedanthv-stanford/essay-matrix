import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = params;

    const college = await db.college.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(college);
  } catch (error: any) {
    console.error('Error updating college:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update college' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await db.college.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'College deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting college:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete college' }, { status: 500 });
  }
} 