import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="bg-black py-32 px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">
              Sobre a Softeum
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Tecnologia que<br />
              <span className="text-white/30">transforma negócios</span>
            </h2>
            <p className="mt-6 text-white/50 text-base leading-relaxed">
              A Softeum é uma empresa especializada em software de gestão empresarial.
              Desenvolvemos soluções inteligentes que cobrem toda a cadeia de valor das
              organizações, desde a gestão de processos e qualidade até pessoas, ativos e inovação.
            </p>
            <p className="mt-4 text-white/40 text-sm leading-relaxed">
              Com uma plataforma modular e integrada, nossos clientes ganham visibilidade
              total, automatizam processos críticos e tomam decisões baseadas em dados reais.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Link
                href="/sobre"
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-white/70 transition-colors group"
              >
                Conheça nossa história
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: '18+', label: 'Soluções integradas' },
              { number: '100%', label: 'Cloud & on-premise' },
              { number: '24/7', label: 'Suporte especializado' },
              { number: 'LGPD', label: 'Conformidade garantida' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/5 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-3xl font-black text-white tracking-tight">{stat.number}</div>
                <div className="text-[11px] text-white/40 mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
