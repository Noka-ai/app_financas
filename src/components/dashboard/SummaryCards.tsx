import { Card, CardContent } from '@/components/ui/card'
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function SummaryCards({
  totalIncome,
  totalExpense,
  balance,
}: {
  totalIncome: number
  totalExpense: number
  balance: number
}) {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Receitas</span>
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
              <ArrowUpCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
          <p className="text-xs text-slate-400 mt-1">Total do período</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Despesas</span>
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
              <ArrowDownCircle className="h-5 w-5 text-red-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</p>
          <p className="text-xs text-slate-400 mt-1">Total do período</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Saldo</span>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
              <Wallet className={`h-5 w-5 ${balance >= 0 ? 'text-blue-600' : 'text-orange-500'}`} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-500'}`}>
            {formatCurrency(balance)}
          </p>
          <p className="text-xs text-slate-400 mt-1">{balance >= 0 ? 'Positivo' : 'Negativo'}</p>
        </CardContent>
      </Card>
    </div>
  )
}
