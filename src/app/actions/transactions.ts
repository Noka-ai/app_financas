'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Category, TransactionType } from '@/lib/types'

export async function createTransaction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Não autorizado' }

  const { error } = await supabase.from('transactions').insert({
    user_id: user.id,
    description: formData.get('description') as string,
    amount: parseFloat(formData.get('amount') as string),
    date: formData.get('date') as string,
    type: formData.get('type') as TransactionType,
    category: formData.get('category') as Category,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/transactions')
  return { success: true }
}

export async function updateTransaction(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Não autorizado' }

  const { error } = await supabase
    .from('transactions')
    .update({
      description: formData.get('description') as string,
      amount: parseFloat(formData.get('amount') as string),
      date: formData.get('date') as string,
      type: formData.get('type') as TransactionType,
      category: formData.get('category') as Category,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/transactions')
  return { success: true }
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Não autorizado' }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/transactions')
  return { success: true }
}
