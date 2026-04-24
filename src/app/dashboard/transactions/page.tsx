import { createClient } from '@/lib/supabase/server'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { FilterBar } from '@/components/dashboard/FilterBar'
import { AddTransactionButton } from '@/components/dashboard/AddTransactionButton'
import { ExportCsvButton } from '@/components/dashboard/ExportCsvButton'
import { Transaction, Category } from '@/lib/types'

interface SearchParams {
  month?: string
  year?: string
  category?: string
  search?: string
}

export default async function TransactionsPage({
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

  let query = supabase
    .from('transactions')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  if (params.category && params.category !== 'all') {
    query = query.eq('category', params.category)
  }

  if (params.search) {
    query = query.ilike('description', `%${params.search}%`)
  }

  const { data: transactions } = await query
  const txs: Transaction[] = transactions ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transações</h1>
          <p className="text-slate-500 text-sm mt-0.5">{txs.length} transação(ões) encontrada(s)</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <ExportCsvButton transactions={txs} />
          <AddTransactionButton />
        </div>
      </div>

      <FilterBar
        currentMonth={month}
        currentYear={year}
        currentCategory={(params.category as Category) ?? 'all'}
        currentSearch={params.search ?? ''}
      />

      <TransactionList transactions={txs} />
    </div>
  )
}
