"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const completeOnboarding = async () => {
      try {
        const response = await fetch("/api/onboarding/complete", {
          method: "POST",
        });

        if (response.ok) {
          setIsLoading(false);
        } else {
          console.error("Failed to complete onboarding");
        }
      } catch (error) {
        console.error("Error completing onboarding:", error);
      }
    };

    completeOnboarding();
  }, []);

  const handleGetStarted = () => {
    router.push("/colleges");
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome to Your Dashboard!</CardTitle>
        <CardDescription>
          Your profile has been set up successfully. You're all ready to start your college application journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            You can now:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Browse and search colleges</li>
            <li>• Track your application progress</li>
            <li>• Manage your activities and essays</li>
            <li>• Get personalized recommendations</li>
          </ul>
        </div>

        <Button
          onClick={handleGetStarted}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? "Setting up your account..." : "Get Started"}
        </Button>
      </CardContent>
    </Card>
  );
} 