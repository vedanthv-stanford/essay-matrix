# Onboarding Flow Setup

## Overview
This document describes the multi-step onboarding flow that users go through after signing up with Clerk.

## Flow Structure

### 1. Sign Up Process
- Users sign up through Clerk on `/sign-up`
- After successful sign-up, they are redirected to `/onboarding`

### 2. Onboarding Steps

#### Step 1: Basic Information (`/onboarding`)
- Full Name
- International/Domestic student status
- Progress: 33%

#### Step 2: Academic Information (`/onboarding/step2`)
- Expected graduation year
- High school name
- Progress: 66%

#### Step 3: Completion (`/onboarding/complete`)
- Confirmation page
- Marks onboarding as complete
- Redirects to dashboard
- Progress: 100%

## Database Schema Changes

The User model has been updated with new fields:
```prisma
model User {
  // ... existing fields ...
  isInternational Boolean?  // true for international, false for domestic
  onboardingCompleted Boolean @default(false)
  // ... existing fields ...
}
```

## API Routes

### `/api/onboarding` (POST)
- Saves name and international status
- Creates or updates user record

### `/api/onboarding/step2` (POST)
- Saves graduation year and high school name
- Updates existing user record

### `/api/onboarding/complete` (POST)
- Marks onboarding as complete
- Sets `onboardingCompleted` to true

### `/api/user/onboarding-status` (GET)
- Returns user's onboarding completion status
- Used by dashboard to check if user needs onboarding

## Middleware

The middleware (`middleware.ts`) handles:
- Authentication checks
- Redirects unauthenticated users to sign-in
- Allows access to onboarding routes for authenticated users

## Dashboard Integration

The dashboard layout checks onboarding status:
- If onboarding is incomplete, redirects to `/onboarding`
- Shows loading state while checking
- Only renders dashboard content after onboarding is complete

## Components

### New UI Components
- `RadioGroup` - For international/domestic selection
- `Progress` - Shows onboarding progress

### Updated Components
- `DashboardLayout` - Added onboarding status check
- Sign-up and sign-in pages - Updated with Clerk components

## Testing the Flow

1. Start the development server: `npm run dev`
2. Navigate to `/sign-up`
3. Complete the sign-up process with Clerk
4. You should be redirected to `/onboarding`
5. Complete the onboarding steps
6. You should be redirected to `/dashboard`

## Environment Setup

Make sure you have:
1. Clerk environment variables configured
2. Database migrated with new schema
3. Prisma client regenerated

## Troubleshooting

If you encounter TypeScript errors about missing fields:
1. Run `npx prisma generate` to regenerate the client
2. Restart the TypeScript server in your IDE
3. Ensure the database migration was applied successfully 