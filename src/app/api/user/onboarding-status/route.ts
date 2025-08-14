import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db, getUserByClerkId } from "@/lib/db";

export async function GET() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's onboarding status using clerkId
    const dbUser = await getUserByClerkId(clerkUser.id);
    console.log('DB user:', dbUser);
    console.log('Returning onboardingCompleted:', dbUser?.onboardingCompleted === true);

    return NextResponse.json({
      onboardingCompleted: dbUser?.onboardingCompleted === true,
    });
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 