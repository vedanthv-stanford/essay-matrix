import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Helper function to get user by Clerk ID
export async function getUserByClerkId(clerkId: string) {
  return await db.user.findUnique({
    where: { clerkId },
    include: {
      settings: true,
      subscription: true,
    },
  })
}

// Helper function to create or update user from Clerk
export async function upsertUserFromClerk(clerkData: {
  id: string
  email: string
  firstName?: string
  lastName?: string
  imageUrl?: string
}) {
  const fullName = `${clerkData.firstName || ''} ${clerkData.lastName || ''}`.trim() || 'User';
  
  // First check if user already exists
  const existingUser = await db.user.findUnique({
    where: { clerkId: clerkData.id }
  });
  
  if (existingUser) {
    // User exists, just update
    return await db.user.update({
      where: { clerkId: clerkData.id },
      data: {
        name: fullName,
        image: clerkData.imageUrl || undefined,
      },
      include: {
        settings: true,
        subscription: true,
      },
    });
  } else {
    // User doesn't exist, create new one
    // Handle empty email by using a unique placeholder
    const emailToUse = clerkData.email || `user-${clerkData.id}@temp.com`;
    
    return await db.user.create({
      data: {
        clerkId: clerkData.id,
        email: emailToUse,
        name: fullName,
        image: clerkData.imageUrl || undefined,
        onboardingCompleted: false,
        settings: {
          create: {
            theme: 'auto',
            notifications: true,
            privacyLevel: 'private',
            emailUpdates: true,
          },
        },
      },
      include: {
        settings: true,
        subscription: true,
      },
    });
  }
}

// Helper function to ensure user exists (creates if doesn't exist)
export async function ensureUserExists(clerkId: string) {
  let user = await getUserByClerkId(clerkId);
  
  if (!user) {
    // Create basic user if they don't exist
    user = await upsertUserFromClerk({
      id: clerkId,
      email: '',
      firstName: 'User',
      lastName: '',
      imageUrl: '',
    });
  }
  
  return user;
} 