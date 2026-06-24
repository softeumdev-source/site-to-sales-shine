'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'

const HorizonHero = dynamic(
  () => import('@/components/ui/horizon-hero').then((m) => ({ default: m.HorizonHero })),
  { ssr: false }
)

export default function SobrePage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Three.js Hero */}
      <HorizonHero />

      {/* About content */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">
                Nossa história
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-6">
                Tecnologia que<br />resolve problemas reais
              </h2>
              <div className="space-y-4 text-white/50 text-sm leading-relaxed">
                <p>
                  A Softeum nasceu da percepção de que as empresas precisam de soluções de gestão que funcionem de verdade: integradas, intuitivas e que entregam resultado mensurável.
                </p>
                <p>
                  Desenvolvemos uma plataforma modular com mais de 18 soluções que cobrem toda a cadeia de valor das organizações, desde a gestão de processos e qualidade até pessoas, ativos e inteligência artificial.
                </p>
                <p>
                  Nosso time é formado por especialistas em gestão empresarial, tecnologia e IA que trabalham lado a lado com os clientes para garantir implementações bem-sucedidas e resultados concretos.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Missão', text: 'Transformar a gestão das empresas com tecnologia inteligente, integrada e acessível.' },
                { title: 'Visão', text: 'Ser a plataforma de gestão empresarial mais completa e confiável do mercado brasileiro.' },
                { title: 'Valores', text: 'Resultado, integridade, inovação contínua e parceria verdadeira com os clientes.' },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-bold text-white mb-2 tracking-wide">{item.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '18+', label: 'Soluções disponíveis' },
            { number: '100%', label: 'Foco em resultado' },
            { number: 'LGPD', label: 'Conformidade total' },
            { number: '24/7', label: 'Suporte dedicado' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tight">{stat.number}</div>
              <div className="text-[11px] text-white/30 mt-2 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + Contato */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-5">
              Pronto para começar?
            </h2>
            <p className="text-white/40 text-base max-w-xl mx-auto mb-8">
              Fale com nossos especialistas e descubra como a Softeum pode transformar a gestão da sua empresa.
            </p>
            <Link
              href="/#contato"
              className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold tracking-[0.12em] uppercase text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105"
            >
              Agendar conversa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
            <a
              href="https://wa.me/5547996592551"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-1">WhatsApp</div>
                <div className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">(47) 9 9659-2551</div>
              </div>
            </a>

            <a
              href="mailto:comercial@softeum.com.br"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-1">E-mail</div>
                <div className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">comercial@softeum.com.br</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
