"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/theme-context";

function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleDark = () => {
    // Toggle between light and dark (not auto)
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Show sun when dark, moon when light
  const isDark = resolvedTheme === 'dark';

  return (
    <Button variant="ghost" onClick={toggleDark} aria-label="Toggle dark mode" size="icon" className="absolute top-4 right-4">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export default function Landing() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (isSignedIn) {
      router.push("/colleges");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <DarkModeToggle />
      <h1 className="text-4xl font-bold mb-4">Welcome to Barca!</h1>
      <p className="text-lg text-muted-foreground mb-4 text-center">
        The only platform you need to get into your dream college. <br />
        <span className="block mx-auto">Get started by signing up or logging in.</span>
      </p>
      <div className="flex gap-4">
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
        <SignInButton mode="modal">
          <Button className="dark:bg-white dark:text-black">Log In</Button>
        </SignInButton>
      </div>
    </div>
  );
} 