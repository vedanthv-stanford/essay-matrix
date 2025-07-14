import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
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

    // Check if user already exists in our database by ID or email
    const existingUserById = await db.user.findUnique({
      where: { id: user.id },
    });

    const userEmail = user.emailAddresses[0]?.emailAddress || "";
    const existingUserByEmail = userEmail ? await db.user.findUnique({
      where: { email: userEmail },
    }) : null;

    if (existingUserById) {
      // Update existing user
      await db.user.update({
        where: { id: user.id },
        data: {
          name,
          isInternational,
        },
      });
    } else if (existingUserByEmail) {
      // User exists with same email but different ID - this could be from a deleted Clerk user
      // Delete the old record and create a new one with the current Clerk ID
      await db.user.delete({
        where: { email: userEmail },
      });
      
      // Create new user with current Clerk ID
      await db.user.create({
        data: {
          id: user.id,
          name,
          email: userEmail,
          isInternational,
        },
      });
    } else {
      // Create new user
      await db.user.create({
        data: {
          id: user.id,
          name,
          email: userEmail,
          isInternational,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 