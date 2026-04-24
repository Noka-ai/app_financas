'use client'

import { useState, useTransition } from 'react'
import { Transaction } from '@/lib/types'
import { deleteTransaction } from '@/app/actions/transactions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TransactionForm } from './TransactionForm'
import { CATEGORY_COLORS } from '@/lib/categories'
import { toast } from 'sonner'
import { Pencil, Trash2 } from 'lucide-react'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')
}

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [deleting, startDelete] = useTransition()

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return
    startDelete(async () => {
      const result = await deleteTransaction(id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Transação excluída!')
      }
    })
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-12 text-center">
        <p className="text-slate-400 dark:text-slate-500 text-sm">Nenhuma transação encontrada para os filtros aplicados.</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Data</th>
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Descrição</th>
                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3 hidden sm:table-cell">Categoria</th>
                <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Valor</th>
                <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.description}</span>
                    <span className="sm:hidden block text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[t.category]}20`,
                        color: CATEGORY_COLORS[t.category],
                      }}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <span
                      className={`text-sm font-semibold ${
                        t.type === 'income' ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'}
                      {formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={() => setEditing(t)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                        onClick={() => handleDelete(t.id)}
                        disabled={deleting}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Transação</DialogTitle>
          </DialogHeader>
          {editing && (
            <TransactionForm
              transaction={editing}
              onSuccess={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
