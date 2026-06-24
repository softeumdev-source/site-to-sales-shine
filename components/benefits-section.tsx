import HighlightCard from '@/components/ui/highlight-card'
import { Zap, Globe, Lock, TrendingUp } from 'lucide-react'

const benefits = [
  {
    title: 'Integração Total',
    description: [
      'Todas as soluções Softeum se integram entre si,',
      'criando um ecossistema único e coeso',
      'para toda a sua empresa.',
    ],
    icon: <Globe className="w-8 h-8 text-white" />,
  },
  {
    title: 'Rápido Resultado',
    description: [
      'Implementação ágil com time especializado,',
      'entregando valor desde as primeiras semanas,',
      'sem longos projetos de TI.',
    ],
    icon: <Zap className="w-8 h-8 text-white" />,
  },
  {
    title: 'Seguro & Conforme',
    description: [
      'Plataforma em conformidade com LGPD,',
      'ISO 27001 e os mais rígidos padrões',
      'de segurança da informação.',
    ],
    icon: <Lock className="w-8 h-8 text-white" />,
  },
  {
    title: 'ROI Comprovado',
    description: [
      'Clientes reportam retorno sobre investimento',
      'em menos de 12 meses com redução de custos',
      'e ganhos de produtividade mensuráveis.',
    ],
    icon: <TrendingUp className="w-8 h-8 text-white" />,
  },
]

export default function BenefitsSection() {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">
            Por que Softeum
          </p>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
            Uma plataforma.<br />
            <span className="text-white/30">Resultados reais.</span>
          </h2>
          <p className="mt-6 text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Desenvolvemos soluções que conectam estratégia, processos e pessoas em um único ecossistema digital.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {benefits.map((b) => (
            <HighlightCard key={b.title} title={b.title} description={b.description} icon={b.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
