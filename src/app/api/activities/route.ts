import { NextResponse } from 'next/server';

export async function GET() {
  // Add your logic to fetch activities
  return NextResponse.json({ message: 'Activities fetched successfully' });
}

export async function POST(request: Request) {
  // Add your logic to create a new activity
  return NextResponse.json({ message: 'Activity created successfully' });
} 