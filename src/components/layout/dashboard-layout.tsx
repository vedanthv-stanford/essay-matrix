'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { Footer } from './footer'

interface DashboardLayoutProps {
  children: React.ReactNode
  userPlan?: 'free' | 'pro' | 'enterprise'
}

export function DashboardLayout({ 
  children, 
  userPlan = 'free' 
}: DashboardLayoutProps) {
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true)

  useEffect(() => {
    console.log('Dashboard useEffect running, user:', user, 'pathname:', pathname);
    
    // Don't check onboarding if we're already on onboarding pages
    if (pathname?.startsWith('/onboarding')) {
      console.log('Already on onboarding page, skipping check');
      setIsCheckingOnboarding(false);
      return;
    }

    const checkOnboardingStatus = async () => {
      if (!user) {
        console.log('No user, skipping onboarding check');
        setIsCheckingOnboarding(false);
        return;
      }

      try {
        console.log('Checking onboarding status for user:', user.id);
        const response = await fetch('/api/user/onboarding-status')
        if (response.ok) {
          const { onboardingCompleted } = await response.json()
          console.log('onboardingCompleted:', onboardingCompleted)
          if (!onboardingCompleted) {
            console.log('Onboarding not completed, redirecting to /onboarding');
            router.push('/onboarding')
            return
          } else {
            console.log('Onboarding completed, showing dashboard');
          }
        } else {
          console.error('Failed to get onboarding status:', response.status);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error)
      } finally {
        setIsCheckingOnboarding(false)
      }
    }

    checkOnboardingStatus()
  }, [user, router, pathname])

  if (isCheckingOnboarding) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userPlan={userPlan} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
} 