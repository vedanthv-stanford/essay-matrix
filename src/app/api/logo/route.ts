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

  console.log(`Logo API called for: ${collegeName}, domain: ${domain}`);

  if (!collegeName) {
    return NextResponse.json({ error: 'College name is required' }, { status: 400 });
  }

  try {
    // First try to find domain from our mapping if not provided
    const resolvedDomain = domain || findCollegeDomain(collegeName);
    console.log(`Resolved domain: ${resolvedDomain}`);
    
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
    
    console.log(`Logo data received:`, logoData);
    
    if (!logoData) {
      return NextResponse.json({ error: 'Logo not found' }, { status: 404 });
    }

    // Check if this is a fallback URL (from Wikimedia or other sources)
    const isFallbackUrl = logoData.url.includes('wikimedia.org') || 
                         logoData.url.includes('upload.wikimedia.org') ||
                         !logoData.url.includes('logo.dev');

    console.log(`Is fallback URL: ${isFallbackUrl}, URL: ${logoData.url}`);

    // Fetch the actual logo image
    const logoResponse = await fetch(logoData.url);
    
    if (!logoResponse.ok) {
      console.error(`Failed to fetch logo from ${logoData.url}: ${logoResponse.status}`);
      return NextResponse.json({ error: 'Failed to fetch logo' }, { status: 404 });
    }

    const logoBuffer = await logoResponse.arrayBuffer();
    const contentType = logoResponse.headers.get('content-type') || `image/${format}`;

    console.log(`Successfully fetched logo, content-type: ${contentType}`);

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