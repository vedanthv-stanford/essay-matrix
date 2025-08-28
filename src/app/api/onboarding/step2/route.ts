import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db, getUserByClerkId, upsertUserFromClerk } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { graduationYear, highSchoolName } = body;

    if (!graduationYear || !highSchoolName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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

    // Update user with step 2 data
    await db.user.update({
      where: { id: user.id },
      data: {
        graduationYear,
        highSchoolName,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in onboarding step 2 API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 