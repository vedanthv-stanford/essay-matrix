# Google Drive Integration Setup

This guide will help you set up Google Drive integration for the Common App page, allowing users to import documents directly from their Google Drive.

## Prerequisites

1. A Google Cloud Platform account
2. A Google Cloud project
3. Google Drive API enabled

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for your project (required for API usage)

### 2. Enable Google Drive API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

### 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Click "Create"
7. Copy the **Client ID** and **Client Secret**

### 3. Create API Key

1. In "Credentials", click "Create Credentials" > "API Key"
2. Copy the generated API key
3. (Optional) Restrict the API key to Google Drive API only for security

### 4. Configure Environment Variables

Create a `.env.local` file in your project root and add:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
```

### 5. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Essay Matrix"
   - User support email: your email
   - Developer contact information: your email
4. Add scopes:
   - `https://www.googleapis.com/auth/drive.readonly`
5. Add test users (your email address)
6. Save and continue

## Security Considerations

- **API Key**: Restrict to specific APIs and domains
- **OAuth Scopes**: Only request read-only access to Drive
- **Client ID**: Keep secure, but it's safe to expose in client-side code
- **Rate Limits**: Google Drive API has quotas, monitor usage

## Testing

1. Start your development server: `npm run dev`
2. Go to the Common App page
3. Click "Import from Google Drive"
4. Sign in with your Google account
5. Grant permissions to access Drive
6. Select a Google Doc to import

## Troubleshooting

### Common Issues

1. **"Google Drive integration not configured"**
   - Check that environment variables are set correctly
   - Ensure `.env.local` is in the project root

2. **"This app isn't verified"**
   - Add your email as a test user in OAuth consent screen
   - Or verify your app with Google (requires additional steps)

3. **"Access denied"**
   - Check that the correct scopes are added
   - Ensure the API is enabled

4. **Documents not loading**
   - Check browser console for errors
   - Verify API key restrictions
   - Check API quotas

### Debug Mode

Enable debug logging by adding to your browser console:
```javascript
localStorage.setItem('google-drive-debug', 'true')
```

## Production Deployment

1. Update OAuth consent screen to "In production"
2. Add your production domain to authorized origins
3. Update environment variables in your hosting platform
4. Test thoroughly with production credentials

## Support

For Google API issues, check:
- [Google Drive API Documentation](https://developers.google.com/drive/api)
- [Google Cloud Console Help](https://cloud.google.com/docs)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

For app-specific issues, check the browser console and network tab for error details.
