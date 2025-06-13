import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Add your logic to handle AI requests
  return NextResponse.json({ message: 'AI request processed successfully' });
} 