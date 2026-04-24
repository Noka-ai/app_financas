'use client'

import { useState, useTransition } from 'react'
import { createTransaction, updateTransaction } from '@/app/actions/transactions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Transaction, TransactionType, Category } from '@/lib/types'
import { getCategoriesForType } from '@/lib/categories'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface TransactionFormProps {
  transaction?: Transaction
  onSuccess: () => void
}

export function TransactionForm({ transaction, onSuccess }: TransactionFormProps) {
  const [isPending, startTransition] = useTransition()
  const [type, setType] = useState<TransactionType>(transaction?.type ?? 'expense')
  const [category, setCategory] = useState<Category>(transaction?.category ?? 'Outros')

  const categories = getCategoriesForType(type)

  function handleTypeChange(newType: TransactionType) {
    setType(newType)
    const cats = getCategoriesForType(newType)
    if (!cats.includes(category)) {
      setCategory(cats[0])
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('type', type)
    formData.set('category', category)

    startTransition(async () => {
      const result = transaction
        ? await updateTransaction(transaction.id, formData)
        : await createTransaction(formData)

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(transaction ? 'Transação atualizada!' : 'Transação criada!')
        onSuccess()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
            type === 'income'
              ? 'bg-green-50 border-green-500 text-green-700'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50'
          }`}
        >
          Receita
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
            type === 'expense'
              ? 'bg-red-50 border-red-500 text-red-600'
              : 'border-slate-200 text-slate-500 hover:bg-slate-50'
          }`}
        >
          Despesa
        </button>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          placeholder="Ex: Supermercado"
          defaultValue={transaction?.description}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="amount">Valor (R$)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            defaultValue={transaction?.amount}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={transaction?.date ?? new Date().toISOString().split('T')[0]}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Categoria</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        {isPending
          ? 'Salvando...'
          : transaction
          ? 'Atualizar transação'
          : 'Adicionar transação'}
      </Button>
    </form>
  )
}
