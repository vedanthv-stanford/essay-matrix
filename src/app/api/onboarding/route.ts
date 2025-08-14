import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db, upsertUserFromClerk } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, isInternational } = body;

    if (!name || typeof isInternational !== "boolean") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create or update user in our database using Clerk data
    const user = await upsertUserFromClerk({
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      imageUrl: clerkUser.imageUrl,
    });

    // Update the user with onboarding data
    await db.user.update({
      where: { id: user.id },
      data: {
        name,
        isInternational,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 