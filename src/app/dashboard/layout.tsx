import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NavBar } from '@/components/dashboard/NavBar'
import { Toaster } from '@/components/ui/sonner'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar userEmail={user.email ?? ''} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
      <Toaster richColors position="top-right" />
    </div>
  )
}
