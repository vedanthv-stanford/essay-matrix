"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [name, setName] = useState(user?.firstName || "");
  const [isInternational, setIsInternational] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!name.trim() || isInternational === null) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          isInternational,
        }),
      });

      if (response.ok) {
        router.push("/onboarding/step2");
      } else {
        console.error("Failed to save onboarding data");
      }
    } catch (error) {
      console.error("Error saving onboarding data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
          <CardDescription>
            Let's get to know you better to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Are you an international or domestic student?</Label>
            <RadioGroup
              value={isInternational === null ? "" : isInternational.toString()}
              onValueChange={(value: string) => setIsInternational(value === "true")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="domestic" />
                <Label htmlFor="domestic">Domestic (US Citizen/Permanent Resident)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="international" />
                <Label htmlFor="international">International Student</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleNext}
            disabled={!name.trim() || isInternational === null || isLoading}
            className="w-full"
          >
            {isLoading ? "Saving..." : "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
