import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Progress } from "@/components/ui/progress";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  // Check if user has already completed onboarding
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { onboardingCompleted: true },
  });

  if (dbUser?.onboardingCompleted) {
    redirect("/colleges");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Setting up your profile</span>
              <span>Step 1 of 3</span>
            </div>
            <Progress value={33} className="w-full" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
} 