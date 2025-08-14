/**
 * Cache Management Utilities for Logo System
 */

const CACHE_KEY_PREFIX = 'college_logo_cache_';

/**
 * Clear all logo caches from localStorage
 */
export const clearAllLogoCaches = (): void => {
  try {
    const keys = Object.keys(localStorage);
    const logoKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
    
    logoKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log(`[CacheManager] Cleared ${logoKeys.length} logo caches`);
  } catch (error) {
    console.warn('[CacheManager] Failed to clear logo caches:', error);
  }
};

/**
 * Clear logo caches for a specific college
 */
export const clearCollegeLogoCaches = (collegeName: string): void => {
  try {
    const keys = Object.keys(localStorage);
    const normalizedName = collegeName.toLowerCase().replace(/\s+/g, '_');
    const collegeKeys = keys.filter(key => 
      key.startsWith(CACHE_KEY_PREFIX) && 
      key.includes(normalizedName)
    );
    
    collegeKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log(`[CacheManager] Cleared ${collegeKeys.length} caches for ${collegeName}`);
  } catch (error) {
    console.warn(`[CacheManager] Failed to clear caches for ${collegeName}:`, error);
  }
};

/**
 * Clear logo caches for a specific theme
 */
export const clearThemeLogoCaches = (theme: string): void => {
  try {
    const keys = Object.keys(localStorage);
    const themeKeys = keys.filter(key => 
      key.startsWith(CACHE_KEY_PREFIX) && 
      key.includes(`_${theme}`)
    );
    
    themeKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log(`[CacheManager] Cleared ${themeKeys.length} caches for theme ${theme}`);
  } catch (error) {
    console.warn(`[CacheManager] Failed to clear caches for theme ${theme}:`, error);
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = (): { total: number; byTheme: Record<string, number> } => {
  try {
    const keys = Object.keys(localStorage);
    const logoKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
    
    const byTheme: Record<string, number> = {};
    logoKeys.forEach(key => {
      // Extract theme from cache key
      const themeMatch = key.match(/_([^_]+)$/);
      if (themeMatch) {
        const theme = themeMatch[1];
        byTheme[theme] = (byTheme[theme] || 0) + 1;
      }
    });
    
    return {
      total: logoKeys.length,
      byTheme
    };
  } catch (error) {
    console.warn('[CacheManager] Failed to get cache stats:', error);
    return { total: 0, byTheme: {} };
  }
};

/**
 * Clear expired caches
 */
export const clearExpiredCaches = (): void => {
  try {
    const keys = Object.keys(localStorage);
    const logoKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
    const now = Date.now();
    const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    let expiredCount = 0;
    logoKeys.forEach(key => {
      try {
        const cached = localStorage.getItem(key);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (now - parsed.timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            expiredCount++;
          }
        }
      } catch (error) {
        // Remove invalid cache entries
        localStorage.removeItem(key);
        expiredCount++;
      }
    });
    
    console.log(`[CacheManager] Cleared ${expiredCount} expired caches`);
  } catch (error) {
    console.warn('[CacheManager] Failed to clear expired caches:', error);
  }
};
