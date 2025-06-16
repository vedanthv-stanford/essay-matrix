'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Activity, 
  User, 
  FileText, 
  Users, 
  Zap,
  MessageSquare,
  CreditCard
} from 'lucide-react'

const navigation = [
  {
    name: 'My Colleges',
    href: '/colleges',
    icon: GraduationCap,
  },
  {
    name: 'Activities',
    href: '/activities',
    icon: Activity,
  },
  {
    name: 'Background',
    href: '/background',
    icon: User,
  },
  {
    name: 'Common App',
    href: '/common-app',
    icon: FileText,
  },
  {
    name: 'Upgrade',
    href: '/upgrade',
    icon: Zap,
  },
]

interface SidebarProps {
  userPlan?: 'free' | 'plus' | 'unlimited'
}

export function Sidebar({ userPlan = 'free' }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-background text-foreground border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-500">Sups</div>
          {userPlan === 'free' && (
            <Badge variant="secondary" className="ml-2 text-xs">
              FREE
            </Badge>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-accent-foreground hover:bg-accent"
          asChild
        >
          <Link href="/feedback">
            <MessageSquare className="mr-3 h-4 w-4" />
            Feedback
          </Link>
        </Button>
      </div>
    </div>
  )
} 