'use client'

import { Button } from '@/components/ui/button'
import { Transaction } from '@/lib/types'
import { Download } from 'lucide-react'

export function ExportCsvButton({ transactions }: { transactions: Transaction[] }) {
  function handleExport() {
    if (transactions.length === 0) return

    const headers = ['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor']
    const rows = transactions.map((t) => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.type === 'income' ? 'Receita' : 'Despesa',
      t.category,
      t.amount.toFixed(2).replace('.', ','),
    ])

    const csv = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transacoes_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={transactions.length === 0}>
      <Download className="h-4 w-4 mr-1.5" />
      Exportar CSV
    </Button>
  )
}
