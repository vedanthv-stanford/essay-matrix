'use client'

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