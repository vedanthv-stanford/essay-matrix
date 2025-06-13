import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
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