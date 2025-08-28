"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function OnboardingCompletePage() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to dashboard after completion
        router.push("/colleges");
      } else {
        console.error("Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">You're All Set!</CardTitle>
          <CardDescription>
            Welcome to your college application journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Your profile has been created and you're ready to start building your college list.
            </p>
            <p className="text-muted-foreground">
              You'll be redirected to your dashboard where you can start adding colleges and tracking your applications.
            </p>
          </div>

          <Button
            onClick={handleComplete}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Setting up..." : "Go to Dashboard"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
