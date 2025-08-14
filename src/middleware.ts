import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/landing",
  "/api/logo",
  "/sign-up(.*)",
  "/colleges",
]);

export default clerkMiddleware((auth, req) => {
  // Basic middleware - let Clerk handle authentication
  // User synchronization will be handled in individual API routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 