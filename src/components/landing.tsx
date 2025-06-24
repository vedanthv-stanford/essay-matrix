"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

function DarkModeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDark = () => {
    setIsDark((prev) => {
      const newDark = !prev;
      if (newDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newDark;
    });
  };

  return (
    <Button variant="ghost" onClick={toggleDark} aria-label="Toggle dark mode" size="icon" className="absolute top-4 right-4">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <DarkModeToggle />
      <h1 className="text-4xl font-bold mb-4">Welcome to Barca!</h1>
      <p className="text-lg text-muted-foreground mb-4 text-center">
        The only platform you need to get into your dream college. <br />
        <span className="block mx-auto">Get started by signing up or logging in.</span>
      </p>
      <div className="flex gap-4">
        <Link href="/colleges" passHref legacyBehavior>
          <Button>Sign Up</Button>
        </Link>
        <Link href="/colleges" passHref legacyBehavior>
          <Button className="dark:bg-white dark:text-black">Log In</Button>
        </Link>
      </div>
    </div>
  );
} 