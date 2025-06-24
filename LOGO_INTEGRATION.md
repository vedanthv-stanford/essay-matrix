# Logo Integration with logo.dev

This application integrates with [logo.dev](https://logo.dev) to display college logos throughout the interface.

## Setup

### 1. Get a logo.dev API Key

1. Visit [logo.dev](https://logo.dev)
2. Sign up for a free account
3. Get your API key from your dashboard

### 2. Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
LOGO_DEV_SECRET_KEY=your_api_key_here
```

### 3. Features

- **Automatic Domain Lookup**: The system automatically maps college names to their domains for faster logo loading
- **Fallback System**: If a logo isn't found, the system displays college initials as a fallback
- **Caching**: Logos are cached for 24 hours to improve performance
- **Size Customization**: Logos can be requested in different sizes (default: 200px)
- **Format Support**: Supports PNG format (can be extended to other formats)

### 4. College Domain Mapping

The system includes a comprehensive mapping of college names to their domains in `src/lib/college-domains.ts`. This includes:

- All Ivy League universities
- Top private universities
- University of California system
- Top public universities
- Liberal arts colleges

### 5. Attribution

As required by logo.dev's terms of service, attribution is included in the footer of the application.

### 6. API Endpoints

- `GET /api/logo?name={collegeName}&domain={domain}&size={size}&format={format}`

### 7. Components

- `CollegeLogo`: React component for displaying college logos
- `Footer`: Includes required logo.dev attribution

### 8. Usage Example

```tsx
import { CollegeLogo } from '@/components/ui/college-logo';

<CollegeLogo 
  collegeName="Stanford University"
  domain="stanford.edu"
  size={48}
/>
```

### 9. Rate Limiting

Without an API key, you'll quickly hit rate limits. With a free logo.dev account, you'll have enough requests for most projects.

### 10. Troubleshooting

- If you see letters instead of logos, you've hit the rate limit - add an API key
- If a college logo isn't showing, check if the domain is in the mapping
- The system will fallback to initials if no logo is found

## College Domains Included

The system includes domains for over 100+ colleges and universities, including:

- All Ivy League schools
- Top 50 universities
- University of California system
- Major liberal arts colleges
- State flagship universities

See `src/lib/college-domains.ts` for the complete list. 