'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth' // You'll need to create this

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(authOptions)
  
  // Mock user data for now - replace with actual session data
  const mockUser = {
    name: 'Ved',
    email: 'ved@example.com',
    image: null
  }

  return (
    <DashboardLayout user={mockUser} userPlan="free">
      {children}
    </DashboardLayout>
  )
} 