'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Settings, LogOut, CreditCard, Sun, Moon } from 'lucide-react'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { useTheme } from '@/contexts/theme-context'

interface HeaderProps {
  userPlan?: 'free' | 'pro' | 'enterprise'
}

export function Header({ userPlan = 'free' }: HeaderProps) {
  const { user, isSignedIn } = useUser();
  
  const planColors = {
    free: 'bg-muted text-muted-foreground',
    pro: 'bg-primary text-primary-foreground',
    enterprise: 'bg-secondary text-secondary-foreground'
  }

  const planLabels = {
    free: 'Free',
    pro: 'Pro',
    enterprise: 'Enterprise'
  }

  if (!isSignedIn) {
    return null; // Don't show header if not signed in
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="flex h-16 items-center px-6">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <Badge variant="secondary" className={planColors[userPlan]}>
            {planLabels[userPlan]}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl || ''} alt={user?.fullName || ''} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.fullName || user?.firstName || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.emailAddresses[0]?.emailAddress || 'No email'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SignOutButton redirectUrl="/landing">
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

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
    <Button variant="ghost" onClick={toggleDark} aria-label="Toggle dark mode" size="icon">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
} 