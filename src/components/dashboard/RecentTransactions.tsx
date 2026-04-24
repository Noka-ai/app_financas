import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Transaction } from '@/lib/types'
import { CATEGORY_COLORS } from '@/lib/categories'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

export function RecentTransactions({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold text-slate-700">
          Transações Recentes
        </CardTitle>
        <Link
          href="/dashboard/transactions"
          className="text-xs text-blue-600 hover:underline flex items-center gap-0.5"
        >
          Ver todas
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
            Nenhuma transação no período
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[t.category] ?? '#6b7280',
                    }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {t.description}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDate(t.date)} · {t.category}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold flex-shrink-0 ${
                    t.type === 'income' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
