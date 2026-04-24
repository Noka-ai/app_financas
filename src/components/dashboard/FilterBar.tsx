'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { CATEGORIES } from '@/lib/categories'
import { Category } from '@/lib/types'
import { MonthFilter } from './MonthFilter'
import { useTransition, useState } from 'react'
import { Search } from 'lucide-react'

export function FilterBar({
  currentMonth,
  currentYear,
  currentCategory,
  currentSearch,
}: {
  currentMonth: number
  currentYear: number
  currentCategory: Category | 'all'
  currentSearch: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState(currentSearch)

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startTransition(() => updateParam('search', searchValue))
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <MonthFilter currentMonth={currentMonth} currentYear={currentYear} />

        <Select
          value={currentCategory ?? 'all'}
          onValueChange={(v) => v != null && updateParam('category', v === 'all' ? '' : v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-48">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por descrição..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
