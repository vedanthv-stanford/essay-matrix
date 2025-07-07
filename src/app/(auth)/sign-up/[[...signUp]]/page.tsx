"use client";
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/onboarding");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            }
          }}
          redirectUrl="/onboarding"
          afterSignUpUrl="/onboarding"
        />
      </div>
    </div>
  );
} 