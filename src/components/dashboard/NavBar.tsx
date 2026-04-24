'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { BarChart3, LayoutDashboard, List, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'

interface NavBarProps {
  userEmail: string
}

export function NavBar({ userEmail }: NavBarProps) {
  const pathname = usePathname()

  return (
    <header className="border-b bg-white dark:bg-slate-900 dark:border-slate-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-lg text-slate-800 dark:text-slate-100">Finanças</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/dashboard" active={pathname === '/dashboard'}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink href="/dashboard/transactions" active={pathname === '/dashboard/transactions'}>
              <List className="h-4 w-4" />
              Transações
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">{userEmail}</span>
          <ThemeToggle />
          <form action={logout}>
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="h-4 w-4 mr-1.5" />
              Sair
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t flex">
        <MobileNavLink href="/dashboard" active={pathname === '/dashboard'}>
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </MobileNavLink>
        <MobileNavLink href="/dashboard/transactions" active={pathname === '/dashboard/transactions'}>
          <List className="h-4 w-4" />
          Transações
        </MobileNavLink>
      </div>
    </header>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium transition-colors',
        active ? 'text-blue-600' : 'text-slate-500'
      )}
    >
      {children}
    </Link>
  )
}
