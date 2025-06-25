'use client';

import React, { useState, useEffect } from 'react';

interface CollegeLogoProps {
  collegeName: string;
  domain?: string;
  size?: number;
  className?: string;
  fallbackClassName?: string;
  showAttribution?: boolean;
  highQuality?: boolean;
}

export function CollegeLogo({ 
  collegeName, 
  domain,
  size = 64,
  className = "",
  fallbackClassName = "",
  showAttribution = false,
  highQuality = true
}: CollegeLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      setIsLoading(true);
      setError(false);
      setErrorMsg(null);
      
      try {
        // Use our server-side API route with size parameter
        const params = new URLSearchParams({ 
          name: collegeName,
          size: size.toString(),
          format: 'png',
          highQuality: highQuality.toString(), // Use the prop value
          _t: Date.now().toString() // Cache busting parameter
        });
        if (domain) params.append('domain', domain);
        
        const url = `/api/logo?${params.toString()}`;
        console.log('[CollegeLogo] Fetching logo:', url);
        const response = await fetch(url);
        
        if (response.ok) {
          // Convert the response to a blob URL for display
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setLogoUrl(url);
        } else {
          setError(true);
          const err = await response.json().catch(() => ({}));
          setErrorMsg(err?.error || 'Failed to load logo');
          console.error(`[CollegeLogo] Error response for ${collegeName}:`, err);
        }
      } catch (err) {
        setError(true);
        setErrorMsg('Network or unknown error');
        console.warn(`[CollegeLogo] Failed to load logo for ${collegeName}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, [collegeName, domain, size, highQuality]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (logoUrl) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse rounded-lg flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  // Show logo if available
  if (logoUrl && !error) {
    return (
      <div className="relative">
        <img
          src={logoUrl}
          alt={`${collegeName} logo`}
          className={`rounded-lg object-contain ${className}`}
          style={{ 
            width: size, 
            height: size,
            imageRendering: '-webkit-optimize-contrast'
          }}
          onError={() => setError(true)}
        />
        {showAttribution && (
          <div className="absolute -bottom-6 left-0 right-0 text-center">
            <a 
              href="https://logo.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Logos by Logo.dev
            </a>
          </div>
        )}
      </div>
    );
  }

  // Fallback to initials with error message if any
  return (
    <div 
      className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex flex-col items-center justify-center text-white font-semibold ${fallbackClassName}`}
      style={{ width: size, height: size, fontSize: `${size * 0.4}px` }}
    >
      {getInitials(collegeName)}
      {errorMsg && (
        <span className="block text-[10px] text-red-200 mt-1 text-center">{errorMsg}</span>
      )}
    </div>
  );
} 