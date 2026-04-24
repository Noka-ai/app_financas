import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BarChart3, Shield, Smartphone, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-slate-800">Finanças</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button>Começar grátis</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <TrendingUp className="h-4 w-4" />
          Controle financeiro simplificado
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Suas finanças sob{' '}
          <span className="text-blue-600">controle total</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
          Registre receitas e despesas, visualize gráficos por categoria e
          acompanhe seu saldo mensal — tudo em um único lugar.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/register">
            <Button size="lg" className="px-8">
              Criar conta grátis
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">
              Já tenho conta
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
            title="Dashboard Visual"
            description="Veja receitas, despesas e saldo em cards de resumo e gráficos de pizza por categoria."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-green-600" />}
            title="Dados Seguros"
            description="Autenticação segura via Supabase com isolamento total dos seus dados financeiros."
          />
          <FeatureCard
            icon={<Smartphone className="h-6 w-6 text-purple-600" />}
            title="100% Responsivo"
            description="Acesse do celular, tablet ou desktop com uma interface adaptável e moderna."
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
