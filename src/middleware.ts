import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/landing",
  "/api/webhook/clerk",
  "/sign-up(.*)",
  "/colleges",
]);

export default clerkMiddleware((auth, req) => {
  console.log("MIDDLEWARE: path=", req.nextUrl.pathname);
  
  // Allow all requests to pass through - let Clerk handle auth in components
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 