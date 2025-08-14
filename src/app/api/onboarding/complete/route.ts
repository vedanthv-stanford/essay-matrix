import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db, getUserByClerkId, upsertUserFromClerk } from "@/lib/db";

export async function POST() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create user in our database
    let user = await getUserByClerkId(clerkUser.id);
    if (!user) {
      // User doesn't exist yet - create them with basic info
      user = await upsertUserFromClerk({
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: 'User',
        lastName: '',
        imageUrl: clerkUser.imageUrl,
      });
    }

    // Mark onboarding as complete
    await db.user.update({
      where: { id: user.id },
      data: {
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in onboarding complete API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 