# Database Setup Guide

## Prerequisites

1. **PostgreSQL Database**: You need a PostgreSQL database running locally or remotely
2. **Node.js**: Make sure you have Node.js installed

## Setup Steps

### 1. Create Environment File

Create a `.env` file in the root directory with the following content:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sups_ai_clone"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# OpenAI (for AI features)
OPENAI_API_KEY="your-openai-api-key"

# Stripe (for payments)
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# UploadThing (for file uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

### 2. Database Options

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a database named `sups_ai_clone`
3. Update the DATABASE_URL with your credentials

#### Option B: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string and update DATABASE_URL

#### Option C: Railway
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add a PostgreSQL database
4. Copy the connection string and update DATABASE_URL

### 3. Push Database Schema

Once you have your DATABASE_URL set up, run:

```bash
npx prisma db push
```

### 4. Seed the Database

To populate the database with sample data:

```bash
npm run db:seed
```

### 5. Start the Development Server

```bash
npm run dev
```

## Features Available

Once set up, you'll have access to:

- **College Management**: Add, edit, delete colleges from a comprehensive database of 100+ US universities
- **Application Tracking**: Track application status (In Progress, Applied, Accepted, Rejected, Waitlisted)
- **Search & Filter**: Search colleges by name or location, filter by status
- **College Details**: View acceptance rates, tuition, enrollment, and other key information
- **Priority Ranking**: Set priority levels for your college list

## Database Schema

The application includes the following main models:

- **User**: User profiles and authentication
- **College**: College applications with detailed information
- **Activity**: Extracurricular activities
- **Essay**: College essays and supplements
- **Subscription**: Payment and subscription management

## Troubleshooting

### Common Issues

1. **"Environment variable not found: DATABASE_URL"**
   - Make sure you have a `.env` file in the root directory
   - Check that the DATABASE_URL is correctly formatted

2. **"Connection refused"**
   - Verify your database is running
   - Check your connection string format
   - Ensure your database credentials are correct

3. **"Schema validation error"**
   - Run `npx prisma generate` to regenerate the Prisma client
   - Make sure your database URL points to a PostgreSQL database

### Getting Help

If you encounter issues:
1. Check the Prisma documentation: https://www.prisma.io/docs
2. Verify your database connection
3. Check the console for detailed error messages 