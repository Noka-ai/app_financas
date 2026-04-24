import { LoginForm } from '@/components/auth/LoginForm'
import { BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <BarChart3 className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-2xl text-slate-800">Finanças</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">Bem-vindo de volta</h1>
          <p className="text-slate-500 mt-1">Entre na sua conta para continuar</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <LoginForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            Não tem conta?{' '}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
