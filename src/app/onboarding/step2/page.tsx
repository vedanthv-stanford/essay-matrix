"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OnboardingStep2Page() {
  const { user } = useUser();
  const router = useRouter();
  const [graduationYear, setGraduationYear] = useState("");
  const [highSchoolName, setHighSchoolName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (!graduationYear || !highSchoolName.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding/step2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          graduationYear: parseInt(graduationYear),
          highSchoolName,
        }),
      });

      if (response.ok) {
        router.push("/onboarding/complete");
      } else {
        console.error("Failed to save step 2 data");
      }
    } catch (error) {
      console.error("Error saving step 2 data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const graduationYears = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Step 2 of 3</CardTitle>
          <CardDescription>
            Tell us about your academic background
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Expected Graduation Year</Label>
            <Select value={graduationYear} onValueChange={setGraduationYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select graduation year" />
              </SelectTrigger>
              <SelectContent>
                {graduationYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="highSchoolName">High School Name</Label>
            <Input
              id="highSchoolName"
              value={highSchoolName}
              onChange={(e) => setHighSchoolName(e.target.value)}
              placeholder="Enter your high school name"
              className="w-full"
            />
          </div>

          <Button
            onClick={handleNext}
            disabled={!graduationYear || !highSchoolName.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Saving..." : "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
