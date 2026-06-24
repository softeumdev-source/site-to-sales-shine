import { notFound } from 'next/navigation'
import Link from 'next/link'
import { solutions, solutionsBySlug } from '@/lib/solutions'
import {
  GitBranch, Target, CheckCircle2, Scale, Shield, Leaf, HeartPulse, FileText,
  Headphones, Kanban, Package, Truck, Wrench, GraduationCap, Lightbulb, Users2,
  Mail, Bot, Code2, ArrowLeft, CheckCheck, ArrowRight,
  Search, Settings, Rocket, BarChart3,
} from 'lucide-react'
import type { Metadata } from 'next'
import { GlowCard } from '@/components/ui/spotlight-card'
import { FeatureCard } from '@/components/ui/grid-feature-cards'
import SectionWithMockup from '@/components/ui/section-with-mockup'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  GitBranch, Target, CheckCircle2, Scale, Shield, Leaf, HeartPulse, FileText,
  Headphones, Kanban, Package, Truck, Wrench, GraduationCap, Lightbulb, Users2,
  Mail, Bot, Code2,
}

function getGlowColor(color: string): 'blue' | 'purple' | 'green' | 'red' | 'orange' {
  if (color.includes('red') || color.includes('rose')) return 'red'
  if (color.includes('purple') || color.includes('violet') || color.includes('fuchsia') || color.includes('indigo')) return 'purple'
  if (color.includes('green') || color.includes('emerald') || color.includes('teal') || color.includes('lime')) return 'green'
  if (color.includes('amber') || color.includes('orange') || color.includes('yellow')) return 'orange'
  return 'blue'
}

const categoryMetrics: Record<string, Array<{ value: string; label: string }>> = {
  process: [
    { value: '95%', label: 'Menos retrabalho' },
    { value: '3×', label: 'Produtividade' },
    { value: '70%', label: 'Redução de custos' },
  ],
  quality: [
    { value: '100%', label: 'Rastreabilidade' },
    { value: '98%', label: 'Conformidade' },
    { value: '5×', label: 'Mais eficiência' },
  ],
  people: [
    { value: '90%', label: 'Engajamento' },
    { value: '4×', label: 'Desenvolvimento' },
    { value: '60%', label: 'Menos turnover' },
  ],
  tech: [
    { value: '10×', label: 'Mais velocidade' },
    { value: '99.9%', label: 'Disponibilidade' },
    { value: '85%', label: 'Automação' },
  ],
  assets: [
    { value: '40%', label: 'Menos downtime' },
    { value: '3×', label: 'Vida útil' },
    { value: '60%', label: 'Menos corretiva' },
  ],
}

const slugCategory: Record<string, string> = {
  bpm: 'process', ppm: 'process', cwm: 'process', esm: 'process',
  'ia-first': 'tech', 'pedido-flow': 'tech', ecm: 'tech', slm: 'tech', csd: 'tech',
  hdm: 'people', icm: 'people',
  qms: 'quality', grc: 'quality', erm: 'quality',
  ehsm: 'assets', esg: 'assets', eam: 'assets', plm: 'assets',
}

const howItWorks = [
  {
    title: 'Diagnóstico',
    icon: Search,
    description: 'Mapeamos os processos e necessidades da sua empresa para entender o contexto atual.',
  },
  {
    title: 'Configuração',
    icon: Settings,
    description: 'Parametrizamos a plataforma para o seu fluxo de trabalho, integrando com sistemas existentes.',
  },
  {
    title: 'Implantação',
    icon: Rocket,
    description: 'Treinamos a equipe e colocamos o sistema em operação com suporte dedicado.',
  },
  {
    title: 'Evolução',
    icon: BarChart3,
    description: 'Monitoramos resultados com dashboards e evoluímos continuamente com sua operação.',
  },
]

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solution = solutionsBySlug[params.slug]
  if (!solution) return { title: 'Solução não encontrada | Softeum' }
  return {
    title: `${solution.name} | Softeum`,
    description: solution.description,
  }
}

export default function SolutionPage({ params }: Props) {
  const solution = solutionsBySlug[params.slug]
  if (!solution) notFound()

  const Icon = iconMap[solution.icon]
  const glowColor = getGlowColor(solution.color)
  const otherSolutions = solutions.filter((s) => s.slug !== solution.slug).slice(0, 4)
  const metrics = categoryMetrics[slugCategory[solution.slug] ?? 'process']

  return (
    <div className="bg-black min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-[0.14]`} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br ${solution.color} rounded-full opacity-[0.08] blur-3xl`} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-white/50 hover:text-white/80 transition-colors mb-12"
          >
            <ArrowLeft className="w-3 h-3" /> Voltar ao início
          </Link>

          <div className="flex justify-center mb-8">
            <div className={`relative w-28 h-28 rounded-3xl bg-gradient-to-br ${solution.color} p-0.5`}>
              <div className="w-full h-full rounded-[26px] bg-black/60 backdrop-blur flex items-center justify-center">
                {Icon && <Icon className="w-14 h-14 text-white" />}
              </div>
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${solution.color} opacity-50 blur-2xl -z-10 scale-125`} />
            </div>
          </div>

          <div className={`text-7xl lg:text-9xl font-black bg-gradient-to-r ${solution.color} bg-clip-text text-transparent tracking-tighter leading-none mb-4`}>
            {solution.acronym}
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
            {solution.name}
          </h1>

          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white/55 mb-8">
            {solution.subtitle}
          </p>

          <p className="text-white/75 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            {solution.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contato"
              className="px-8 py-4 text-sm font-bold tracking-[0.12em] uppercase text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105"
            >
              Fale com um especialista
            </Link>
            <Link
              href="/#contato"
              className="px-8 py-4 text-sm font-bold tracking-[0.12em] uppercase text-white border border-white/30 rounded-full hover:bg-white/8 transition-all duration-200"
            >
              Solicitar demo
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="text-[9px] tracking-[0.3em] uppercase text-white">scroll</div>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>

        {/* Fade bottom do hero para preto */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </section>

      {/* ── Visão geral com card escuro ── */}
      <div>
        <SectionWithMockup
          title={
            <>
              {solution.tagline}
              <br />
              <span className="text-white/30">{solution.subtitle}</span>
            </>
          }
          description={solution.overview}
        >
          {/* Dark solution dashboard card */}
          <div className="relative w-full rounded-2xl bg-white/[0.03] border border-white/10 p-6 overflow-hidden">
            {/* Gradient top line */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${solution.color}`} />
            {/* Subtle glow */}
            <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-br ${solution.color} opacity-[0.08] blur-3xl`} />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className={`text-3xl font-black bg-gradient-to-r ${solution.color} bg-clip-text text-transparent leading-none`}>
                  {solution.acronym}
                </div>
                <div className="text-[11px] text-white/35 mt-1 font-medium">{solution.name}</div>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${solution.color} p-0.5`}>
                <div className="w-full h-full rounded-[10px] bg-black/70 flex items-center justify-center">
                  {Icon && <Icon className="w-5 h-5 text-white" />}
                </div>
              </div>
            </div>

            <div className="h-px bg-white/8 mb-5" />

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {metrics.map((m, i) => (
                <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/6">
                  <div className={`text-xl font-black bg-gradient-to-r ${solution.color} bg-clip-text text-transparent`}>
                    {m.value}
                  </div>
                  <div className="text-[10px] text-white/40 mt-0.5 leading-tight">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/8 mb-5" />

            {/* Top features */}
            <div className="space-y-2.5">
              {solution.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-white/55 leading-relaxed">
                  <CheckCheck className="w-3.5 h-3.5 text-white/30 flex-shrink-0 mt-0.5" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </SectionWithMockup>
      </div>

      {/* ── Funcionalidades com GlowCard ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-3">
              Funcionalidades
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              Tudo que você precisa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solution.features.map((feature, i) => (
              <GlowCard
                key={i}
                customSize
                glowColor={glowColor}
                className="w-full p-5"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${solution.color} flex items-center justify-center`}>
                    <CheckCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-white/85 leading-relaxed">{feature}</span>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona — FeatureCard grid (caixa) ── */}
      <section className="py-20 px-6 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-3">
              Processo
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              Como funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden">
            {howItWorks.map((step, i) => (
              <FeatureCard
                key={i}
                index={i}
                feature={step}
                className="bg-black rounded-none"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Resultados / Benefits ── */}
      <section className="py-20 px-6 bg-white/[0.03]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-3">
              Resultados
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              O que você vai ganhar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {solution.benefits.map((benefit, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300 bg-white/[0.02]"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${solution.color}`} />
                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${solution.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 blur-xl`} />

                <div className="text-[38px] font-black text-white/15 leading-none mb-4 tabular-nums">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} mb-8 mx-auto`}>
            {Icon && <Icon className="w-8 h-8 text-white" />}
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-6">
            Implante o {solution.acronym}<br />
            <span className="text-white/35">na sua empresa hoje</span>
          </h2>
          <p className="text-white/55 text-base mb-10 max-w-xl mx-auto">
            Nossos especialistas vão entender o seu contexto e desenhar a melhor estratégia de implementação para você.
          </p>
          <Link
            href="/#contato"
            className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold tracking-[0.12em] uppercase text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105"
          >
            Agendar conversa gratuita <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Outras soluções ── */}
      <section className="py-16 px-6 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/35 mb-2">
              Explore mais
            </p>
            <h2 className="text-2xl font-black text-white tracking-tight">Outras soluções Softeum</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {otherSolutions.map((other) => {
              const OtherIcon = iconMap[other.icon]
              return (
                <Link
                  key={other.slug}
                  href={`/solucoes/${other.slug}`}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200 group"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${other.color} p-0.5`}>
                    <div className="w-full h-full rounded-[10px] bg-black/60 flex items-center justify-center">
                      {OtherIcon && <OtherIcon className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white">{other.acronym}</div>
                    <div className="text-[10px] text-white/45 truncate">{other.subtitle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/0 group-hover:text-white/50 ml-auto flex-shrink-0 transition-all -translate-x-1 group-hover:translate-x-0" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
