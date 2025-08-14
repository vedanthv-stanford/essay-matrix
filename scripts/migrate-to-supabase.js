#!/usr/bin/env node

/**
 * Migration script to move from SQLite to PostgreSQL
 * Run this after setting up your Supabase database
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting migration to Supabase...\n');

// Step 1: Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('Please create .env.local with your Supabase credentials:');
  console.log(`
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE-ROLE-KEY]
  `);
  process.exit(1);
}

try {
  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install @supabase/supabase-js', { stdio: 'inherit' });
  
  // Step 3: Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Step 4: Push schema to database
  console.log('🗄️  Pushing schema to Supabase...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  // Step 5: Generate Prisma client again (to ensure it's up to date)
  console.log('🔧 Regenerating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('\n✅ Migration completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Test your app with the new database');
  console.log('2. Update your API routes to use better user isolation');
  console.log('3. Add Row Level Security policies in Supabase dashboard');
  
} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  console.log('\nTroubleshooting:');
  console.log('1. Check your DATABASE_URL in .env.local');
  console.log('2. Ensure your Supabase database is running');
  console.log('3. Verify your database credentials');
  process.exit(1);
}
