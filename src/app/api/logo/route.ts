import { NextRequest, NextResponse } from 'next/server';
import { logoApi } from '@/lib/logo-api';
import { findCollegeDomain } from '@/lib/college-domains';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collegeName = searchParams.get('name');
  const domain = searchParams.get('domain');
  const size = searchParams.get('size') || '256'; // Increased default size for better quality
  const format = searchParams.get('format') || 'png';
  const highQuality = searchParams.get('highQuality') === 'true';

  if (!collegeName) {
    return NextResponse.json({ error: 'College name is required' }, { status: 400 });
  }

  try {
    // First try to find domain from our mapping if not provided
    const resolvedDomain = domain || findCollegeDomain(collegeName);
    
    // Get logo data using logo.dev API
    let logoData;
    if (highQuality) {
      logoData = await logoApi.getHighQualityLogo(
        collegeName, 
        resolvedDomain || undefined,
        parseInt(size),
        format
      );
    } else {
      logoData = await logoApi.getCollegeLogo(
        collegeName, 
        resolvedDomain || undefined,
        parseInt(size),
        format
      );
    }
    
    if (!logoData) {
      return NextResponse.json({ error: 'Logo not found' }, { status: 404 });
    }

    // Fetch the actual logo image from logo.dev
    const logoResponse = await fetch(logoData.url);
    
    if (!logoResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch logo' }, { status: 404 });
    }

    const logoBuffer = await logoResponse.arrayBuffer();
    const contentType = logoResponse.headers.get('content-type') || `image/${format}`;

    // Return the logo with caching headers
    return new NextResponse(logoBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800', // Cache for 24 hours
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Logo API error:', error);
    return NextResponse.json({ error: 'Failed to fetch logo' }, { status: 500 });
  }
} 