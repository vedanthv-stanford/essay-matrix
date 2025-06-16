'use client'

import { Sidebar } from './sidebar'
import { Header } from './header'

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  userPlan?: 'free' | 'pro' | 'enterprise'
}

export function DashboardLayout({ 
  children, 
  user, 
  userPlan = 'free' 
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} userPlan={userPlan} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 