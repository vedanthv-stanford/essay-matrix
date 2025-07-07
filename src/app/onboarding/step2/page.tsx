"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OnboardingStep2Page() {
  const router = useRouter();
  const [graduationYear, setGraduationYear] = useState("");
  const [highSchoolName, setHighSchoolName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 6 }, (_, i) => currentYear + i);

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

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Academic Information</CardTitle>
        <CardDescription>
          Help us understand your academic background
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

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!graduationYear || !highSchoolName.trim() || isLoading}
            className="flex-1"
          >
            {isLoading ? "Saving..." : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 