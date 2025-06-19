# College Database Setup Guide

This guide explains how to set up and use the comprehensive college database system that includes essay prompts, acceptance rates, tuition, and other college information.

## Overview

The system provides:
- **College Data**: Name, location, type, acceptance rate, tuition, enrollment
- **Essay Prompts**: Current essay prompts for major US colleges
- **Application Deadlines**: Early decision, early action, regular decision dates
- **Test Score Ranges**: SAT and ACT score requirements
- **Additional Data**: Student-faculty ratio, graduation rates, retention rates

## Data Sources

### 1. College Scorecard API (Primary Source)
- **URL**: https://api.data.gov/ed/collegescorecard/v1/schools
- **Cost**: Free
- **Data**: Comprehensive college statistics from US Department of Education
- **Setup**: Get free API key from [api.data.gov](https://api.data.gov/signup/)

### 2. College Navigator (NCES)
- **URL**: https://nces.ed.gov/collegenavigator/api
- **Cost**: Free
- **Data**: Additional college statistics from National Center for Education Statistics

### 3. Essay Prompts Database
- **Source**: Manually curated database of current essay prompts
- **Coverage**: Top 50+ US colleges and universities
- **Updates**: Annual updates for new application cycles

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
# College Scorecard API (Required for comprehensive data)
NEXT_PUBLIC_COLLEGE_SCORECARD_API_KEY=your_api_key_here

# Optional: Additional API keys for enhanced data
NEXT_PUBLIC_COMMON_APP_API_KEY=your_common_app_key_here
```

### 2. Get College Scorecard API Key

1. Go to [api.data.gov/signup](https://api.data.gov/signup/)
2. Create a free account
3. Request access to College Scorecard API
4. Copy your API key to `.env.local`

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

## API Endpoints

### 1. Comprehensive College Data
```
GET /api/colleges/comprehensive
```

**Parameters:**
- `college`: Get data for specific college
- `q`: Search colleges by name
- `limit`: Number of results (default: 20)
- `popular`: Get popular colleges (true/false)

**Examples:**
```bash
# Get Harvard data
GET /api/colleges/comprehensive?college=Harvard%20University

# Search colleges
GET /api/colleges/comprehensive?q=stanford&limit=5

# Get popular colleges
GET /api/colleges/comprehensive?popular=true&limit=10
```

### 2. Essay Prompts
```
GET /api/colleges/essays
```

**Parameters:**
- `college`: Get prompts for specific college
- `q`: Search prompts by keyword
- `category`: Filter by category (common-app, supplemental, etc.)

**Examples:**
```bash
# Get Harvard essay prompts
GET /api/colleges/essays?college=Harvard%20University

# Search for "leadership" prompts
GET /api/colleges/essays?q=leadership

# Get Common App prompts
GET /api/colleges/essays?category=common-app
```

### 3. Basic College Search
```
GET /api/colleges/search
```

**Parameters:**
- `q`: Search query
- `limit`: Number of results

## Usage Examples

### Frontend Usage

```typescript
// Get comprehensive college data
const getCollegeData = async (collegeName: string) => {
  const response = await fetch(`/api/colleges/comprehensive?college=${encodeURIComponent(collegeName)}`);
  const data = await response.json();
  return data;
};

// Get essay prompts
const getEssayPrompts = async (collegeName: string) => {
  const response = await fetch(`/api/colleges/essays?college=${encodeURIComponent(collegeName)}`);
  const prompts = await response.json();
  return prompts;
};

// Search colleges
const searchColleges = async (query: string) => {
  const response = await fetch(`/api/colleges/comprehensive?q=${encodeURIComponent(query)}`);
  const colleges = await response.json();
  return colleges;
};
```

### Backend Usage

```typescript
import { collegeDataFetcher } from '@/lib/college-data-fetcher';
import { getEssayPromptsForCollege } from '@/lib/essay-prompts-database';

// Get comprehensive college data
const collegeData = await collegeDataFetcher.getComprehensiveCollegeData('Harvard University');

// Get essay prompts
const essayPrompts = getEssayPromptsForCollege('Harvard University');

// Search colleges
const searchResults = await collegeDataFetcher.searchCollegesWithData('stanford', 10);
```

## Data Structure

### College Data Object
```typescript
interface CollegeData {
  id: string;
  name: string;
  location: string;
  type: 'Public' | 'Private' | 'Liberal Arts' | 'Community College';
  acceptanceRate?: number;
  tuition?: number;
  enrollment?: number;
  website?: string;
  essayPrompts: EssayPrompt[];
  applicationDeadlines?: {
    earlyDecision?: string;
    earlyAction?: string;
    regularDecision?: string;
  };
  satRange?: { min: number; max: number };
  actRange?: { min: number; max: number };
  gpaRange?: { min: number; max: number };
  ranking?: number;
  popularMajors?: string[];
  studentFacultyRatio?: number;
  graduationRate?: number;
  retentionRate?: number;
}
```

### Essay Prompt Object
```typescript
interface EssayPrompt {
  id: string;
  title: string;
  prompt: string;
  wordLimit?: number;
  required: boolean;
  category: 'Common App' | 'Supplemental' | 'Why This School' | 'Major Specific' | 'Other';
  tips?: string[];
  year: string;
}
```

## Adding New Colleges

### 1. Add to Search Database
Edit `src/app/api/colleges/search/route.ts` and add the college to the `colleges` array.

### 2. Add Essay Prompts
Edit `src/lib/essay-prompts-database.ts` and add essay prompts to the `ESSAY_PROMPTS_2024` object.

### 3. Add Application Deadlines
Edit the `getApplicationDeadlines` method in `src/lib/college-data-fetcher.ts`.

## Caching

The system includes intelligent caching:
- **Cache Duration**: 24 hours
- **Cache Keys**: College names
- **Cache Storage**: In-memory Map
- **Cache Invalidation**: Automatic expiry

## Error Handling

The system handles various error scenarios:
- Missing API keys
- Network failures
- Invalid college names
- Rate limiting

## Performance Optimization

1. **Caching**: Reduces API calls and improves response times
2. **Parallel Requests**: Fetches data from multiple sources simultaneously
3. **Lazy Loading**: Only fetches data when needed
4. **Pagination**: Limits results to prevent overwhelming responses

## Monitoring and Maintenance

### Regular Tasks
1. **Update Essay Prompts**: Annually before application season
2. **Verify API Keys**: Ensure College Scorecard API key is active
3. **Check Data Accuracy**: Periodically verify college information
4. **Monitor API Limits**: Track usage to avoid rate limiting

### Data Sources to Monitor
- College Scorecard API documentation
- College Navigator updates
- College website changes
- Common App updates

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify key is correct in `.env.local`
   - Check if key has proper permissions
   - Ensure key is not expired

2. **No Data Returned**
   - Check college name spelling
   - Verify college exists in database
   - Check API response for errors

3. **Slow Response Times**
   - Check cache status
   - Verify network connectivity
   - Monitor API rate limits

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

## Future Enhancements

1. **Web Scraping**: Automatically scrape essay prompts from college websites
2. **Machine Learning**: Predict essay prompt changes
3. **User Contributions**: Allow users to submit new essay prompts
4. **International Colleges**: Expand to include international universities
5. **Real-time Updates**: WebSocket connections for live data updates

## Support

For issues or questions:
1. Check this documentation
2. Review API response logs
3. Verify environment variables
4. Test with known college names

## License

This system is part of the EssayConnector project and follows the same licensing terms. 