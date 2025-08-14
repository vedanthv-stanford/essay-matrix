'use client';

import React, { useState } from 'react';

export function CacheManager() {
  const [isClearing, setIsClearing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const clearLogoCache = () => {
    setIsClearing(true);
    setMessage(null);
    
    try {
      const keys = Object.keys(localStorage);
      const logoKeys = keys.filter(key => key.startsWith('college_logo_cache_'));
      
      logoKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      setMessage(`Cleared ${logoKeys.length} cached logos`);
      console.log(`[CacheManager] Cleared ${logoKeys.length} cached logos`);
    } catch (error) {
      setMessage('Failed to clear cache');
      console.warn('[CacheManager] Failed to clear cache:', error);
    } finally {
      setIsClearing(false);
    }
  };

  const getCacheStats = () => {
    try {
      const keys = Object.keys(localStorage);
      const logoKeys = keys.filter(key => key.startsWith('college_logo_cache_'));
      return logoKeys.length;
    } catch (error) {
      return 0;
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Logo Cache Management</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Cached logos: {getCacheStats()}
        </p>
        <button
          onClick={clearLogoCache}
          disabled={isClearing}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isClearing ? 'Clearing...' : 'Clear Logo Cache'}
        </button>
        {message && (
          <p className={`text-sm ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        <p className="text-xs text-gray-500">
          Logos are cached for 7 days to reduce API calls. Clear cache if you need fresh logos.
        </p>
      </div>
    </div>
  );
}
