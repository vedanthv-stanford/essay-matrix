# 🚀 Supabase Migration Guide

This guide will help you migrate from SQLite to Supabase for better multi-user support.

## 📋 **Prerequisites**

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Node.js & npm**: Ensure you have the latest LTS version
3. **Git**: For version control during migration

## 🔧 **Step 1: Set Up Supabase Project**

### **1.1 Create New Project**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `barca-college-app` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### **1.2 Get Database Credentials**
1. Go to **Settings** → **Database**
2. Copy the **Connection string** (PostgreSQL)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL**
   - **anon public** key
   - **service_role** key

## ⚙️ **Step 2: Update Environment Variables**

Create or update your `.env.local` file:

```env
# Database (Replace with your Supabase credentials)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]

# Keep existing keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[YOUR-CLERK-KEY]
CLERK_SECRET_KEY=[YOUR-CLERK-SECRET]
STRIPE_SECRET_KEY=[YOUR-STRIPE-SECRET]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[YOUR-STRIPE-PUBLISHABLE]
STRIPE_WEBHOOK_SECRET=[YOUR-STRIPE-WEBHOOK]
LOGO_DEV_SECRET_KEY=[YOUR-LOGO-DEV-KEY]
```

## 🗄️ **Step 3: Run Migration Script**

### **3.1 Install Dependencies**
```bash
npm install @supabase/supabase-js
```

### **3.2 Run Migration**
```bash
node scripts/migrate-to-supabase.js
```

This script will:
- ✅ Install Supabase dependencies
- ✅ Generate new Prisma client
- ✅ Push schema to Supabase
- ✅ Regenerate Prisma client

## 🔒 **Step 4: Set Up Row Level Security (RLS)**

### **4.1 Enable RLS in Supabase Dashboard**
1. Go to **Authentication** → **Policies**
2. Enable RLS on all tables:
   - `User`
   - `College`
   - `Activity`
   - `Essay`
   - `EssayPrompt`
   - `Subscription`

### **4.2 Create RLS Policies**

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users can only access their own data
CREATE POLICY "Users can only access their own data" ON "User"
  FOR ALL USING (auth.uid()::text = "clerkId");

-- Users can only access their own colleges
CREATE POLICY "Users can only access their own colleges" ON "College"
  FOR ALL USING (auth.uid()::text = "clerkId");

-- Users can only access their own activities
CREATE POLICY "Users can only access their own activities" ON "Activity"
  FOR ALL USING (auth.uid()::text = "clerkId");

-- Users can only access their own essays
CREATE POLICY "Users can only access their own essays" ON "Essay"
  FOR ALL USING (auth.uid()::text = "clerkId");

-- Users can only access their own subscriptions
CREATE POLICY "Users can only access their own subscriptions" ON "Subscription"
  FOR ALL USING (auth.uid()::text = "clerkId");
```

## 🧪 **Step 5: Test the Migration**

### **5.1 Start Development Server**
```bash
npm run dev
```

### **5.2 Test User Authentication**
1. Sign up/sign in with Clerk
2. Check if user is created in Supabase
3. Verify data isolation between users

### **5.3 Test API Routes**
1. Create a college (should be user-specific)
2. Fetch colleges (should only show user's colleges)
3. Try to access another user's data (should fail)

## 🔍 **Step 6: Monitor & Optimize**

### **6.1 Check Database Performance**
- Go to **Supabase Dashboard** → **Database** → **Logs**
- Monitor query performance
- Check for slow queries

### **6.2 Add Database Indexes**
```sql
-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_college_user_status ON "College"("clerkId", "status");
CREATE INDEX CONCURRENTLY idx_activity_user_type ON "Activity"("clerkId", "type");
CREATE INDEX CONCURRENTLY idx_essay_user_college ON "Essay"("clerkId", "collegeId");
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Connection Failed**
```bash
Error: connect ECONNREFUSED
```
**Solution**: Check your DATABASE_URL and ensure Supabase is running

#### **2. Authentication Failed**
```bash
Error: Invalid API key
```
**Solution**: Verify your Supabase API keys in `.env.local`

#### **3. Schema Push Failed**
```bash
Error: P1001: Can't reach database server
```
**Solution**: Check firewall settings and database password

#### **4. RLS Policies Not Working**
```bash
Error: new row violates row-level security policy
```
**Solution**: Ensure RLS is enabled and policies are correctly set

### **Debug Commands**
```bash
# Check Prisma schema
npx prisma validate

# Check database connection
npx prisma db pull

# Reset database (⚠️ DESTRUCTIVE)
npx prisma db push --force-reset

# View database in browser
npx prisma studio
```

## 📊 **Performance Improvements**

### **1. Connection Pooling**
```typescript
// lib/db.ts
export const db = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Add connection pooling
  log: ['query', 'error', 'warn'],
})
```

### **2. Query Optimization**
```typescript
// Always include user filtering
const colleges = await db.college.findMany({
  where: { clerkId: user.clerkId },
  include: { essays: true },
  orderBy: { priority: 'asc' }
});
```

### **3. Caching Strategy**
```typescript
// Implement Redis or Supabase Edge Functions
// Cache frequently accessed data
```

## 🎯 **Next Steps**

After successful migration:

1. **User Management**: Implement user roles and permissions
2. **Data Backup**: Set up automated backups
3. **Monitoring**: Add performance monitoring
4. **Scaling**: Plan for horizontal scaling
5. **Security**: Implement additional security measures

## 📞 **Support**

If you encounter issues:

1. Check [Supabase Documentation](https://supabase.com/docs)
2. Review [Prisma Documentation](https://www.prisma.io/docs)
3. Check Supabase Discord community
4. Review this migration guide again

---

**🎉 Congratulations!** You've successfully migrated to Supabase for better multi-user support!
