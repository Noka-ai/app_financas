import { createClient } from '@/lib/supabase/server'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { MonthFilter } from '@/components/dashboard/MonthFilter'
import { AddTransactionButton } from '@/components/dashboard/AddTransactionButton'
import { Transaction } from '@/lib/types'

interface SearchParams {
  month?: string
  year?: string
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const now = new Date()
  const month = params.month ? parseInt(params.month) : now.getMonth() + 1
  const year = params.year ? parseInt(params.year) : now.getFullYear()

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = new Date(year, month, 0).toISOString().split('T')[0]

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  const txs: Transaction[] = transactions ?? []

  const totalIncome = txs.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = txs.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Visão geral das suas finanças</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <MonthFilter currentMonth={month} currentYear={year} />
          <AddTransactionButton />
        </div>
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <CategoryChart transactions={txs} />
        <RecentTransactions transactions={txs.slice(0, 8)} />
      </div>
    </div>
  )
}
