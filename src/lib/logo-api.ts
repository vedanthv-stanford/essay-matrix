// Logo API service using logo.dev for both domain search and logo fetching
// All requests are server-side to keep the secret key safe

export interface LogoSearchResult {
  name: string;
  domain: string;
  logo_url?: string;
}

export interface LogoApiResponse {
  url: string;
  width?: number;
  height?: number;
}

export class LogoApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.LOGO_DEV_SECRET_KEY || '';
    this.baseUrl = 'https://api.logo.dev';
  }

  /**
   * Search for a brand/college domain using logo.dev Brand Search API
   * @param query - The college name to search for
   * @returns Promise<LogoSearchResult[]>
   */
  async searchBrand(query: string): Promise<LogoSearchResult[]> {
    if (!this.apiKey) {
      throw new Error('LOGO_DEV_SECRET_KEY is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`logo.dev API error: ${response.status}`);
      }

      const results: LogoSearchResult[] = await response.json();
      return results;
    } catch (error) {
      console.error(`Failed to search for brand "${query}":`, error);
      throw error;
    }
  }

  /**
   * Get fallback logo URL for universities that don't work with logo.dev API
   * @param collegeName - The name of the college
   * @returns string | null
   */
  private getFallbackLogoUrl(collegeName: string): string | null {
    const fallbackLogos: { [key: string]: string } = {
      'University of Houston': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/University_of_Houston_Logo.svg/1216px-University_of_Houston_Logo.svg.png',
      'University of Miami': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Miami_Hurricanes_logo.svg/1200px-Miami_Hurricanes_logo.svg.png',
      'Cornell University': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/2048px-Cornell_University_seal.svg.png',
    };

    console.log(`Checking fallback for: "${collegeName}"`);
    const fallbackUrl = fallbackLogos[collegeName];
    if (fallbackUrl) {
      console.log(`Found fallback URL for ${collegeName}: ${fallbackUrl}`);
    } else {
      console.log(`No fallback URL found for ${collegeName}`);
    }
    return fallbackUrl || null;
  }

  /**
   * Get logo URL for a college by domain (preferred) or name (fallback)
   * @param collegeName - The name of the college
   * @param domain - The domain of the college (preferred)
   * @param size - Size of the logo (default: 256 for better quality)
   * @param format - Format of the logo (default: png for transparency)
   * @returns Promise<LogoApiResponse | null>
   */
  async getCollegeLogo(collegeName: string, domain?: string, size: number = 256, format: string = 'png'): Promise<LogoApiResponse | null> {
    try {
      // Check for known fallback URLs first
      const fallbackUrl = this.getFallbackLogoUrl(collegeName);
      if (fallbackUrl) {
        return {
          url: fallbackUrl,
          width: size,
          height: size
        };
      }

      if (domain) {
        // Use logo.dev's direct image URL with API key if available
        const params = new URLSearchParams({
          size: size.toString(),
          format: format
        });
        
        if (this.apiKey) {
          params.append('token', this.apiKey);
        }
        
        return {
          url: `https://img.logo.dev/${domain}?${params.toString()}`,
          width: size,
          height: size
        };
      }
      
      // Fallback: search by name
      const results = await this.searchBrand(collegeName);
      if (!results.length) return null;
      
      // Prefer .edu domains
      const eduResult = results.find(r => r.domain.endsWith('.edu'));
      const result = eduResult || results[0];
      
      if (!result.domain) return null;
      
      // Use the found domain to construct the logo URL
      const params = new URLSearchParams({
        size: size.toString(),
        format: format
      });
      
      if (this.apiKey) {
        params.append('token', this.apiKey);
      }
      
      return {
        url: `https://img.logo.dev/${result.domain}?${params.toString()}`,
        width: size,
        height: size
      };
    } catch (error) {
      console.warn(`Failed to get logo for ${collegeName}:`, error);
      return null;
    }
  }

  /**
   * Get logo with fallback to initials
   * @param collegeName - The name of the college
   * @param domain - The domain of the college (preferred)
   * @param size - Size of the logo (default: 256 for better quality)
   * @param format - Format of the logo (default: png for transparency)
   * @returns Promise<LogoApiResponse | null>
   */
  async getLogoWithFallback(collegeName: string, domain?: string, size: number = 256, format: string = 'png'): Promise<LogoApiResponse | null> {
    try {
      return await this.getCollegeLogo(collegeName, domain, size, format);
    } catch (error) {
      console.warn(`Using fallback for ${collegeName}:`, error);
      return null; // Return null to use initials fallback
    }
  }

  /**
   * Get high-quality logo URL for a college
   * This method requests a larger size for better quality, especially useful for high-DPI displays
   * @param collegeName - The name of the college
   * @param domain - The domain of the college (preferred)
   * @param displaySize - The display size needed (will request 2x for high quality)
   * @param format - Format of the logo (default: png for transparency)
   * @returns Promise<LogoApiResponse | null>
   */
  async getHighQualityLogo(collegeName: string, domain?: string, displaySize: number = 128, format: string = 'png'): Promise<LogoApiResponse | null> {
    // Request 2x the display size for high-DPI displays and better quality
    const requestSize = Math.max(displaySize * 2, 256);
    
    try {
      return await this.getCollegeLogo(collegeName, domain, requestSize, format);
    } catch (error) {
      console.warn(`Failed to get high-quality logo for ${collegeName}:`, error);
      // Fallback to regular size
      return await this.getCollegeLogo(collegeName, domain, displaySize, format);
    }
  }

  /**
   * Check if API key is configured
   * @returns boolean
   */
  hasApiKey(): boolean {
    return !!this.apiKey;
  }
}

// Export singleton instance
export const logoApi = new LogoApiService(); 