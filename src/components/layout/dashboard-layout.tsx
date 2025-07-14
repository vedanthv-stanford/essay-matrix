'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true)

  useEffect(() => {
    console.log('Dashboard useEffect running, user:', user);
    const checkOnboardingStatus = async () => {
      if (!user) return

      try {
        const response = await fetch('/api/user/onboarding-status')
        if (response.ok) {
          const { onboardingCompleted } = await response.json()
          console.log('onboardingCompleted:', onboardingCompleted)
          if (!onboardingCompleted) {
            router.push('/onboarding')
            return
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error)
      } finally {
        setIsCheckingOnboarding(false)
      }
    }

    checkOnboardingStatus()
  }, [user, router])

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