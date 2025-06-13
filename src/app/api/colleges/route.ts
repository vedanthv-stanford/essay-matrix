import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const colleges = await db.college.findMany();
    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const college = await db.college.create({
      data: body
    });
    return NextResponse.json(college);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create college' }, { status: 500 });
  }
} 