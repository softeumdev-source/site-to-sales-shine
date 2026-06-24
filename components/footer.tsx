import Link from 'next/link'
import { solutions } from '@/lib/solutions'
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react'

const solutionGroups = [
  { label: 'Processos & Projetos', items: solutions.filter(s => ['bpm','ppm','cwm','esm'].includes(s.slug)) },
  { label: 'Qualidade & Risco',    items: solutions.filter(s => ['qms','grc','erm','ehsm','esg'].includes(s.slug)) },
  { label: 'Pessoas & Ativos',     items: solutions.filter(s => ['hdm','icm','eam','plm','slm'].includes(s.slug)) },
  { label: 'Tecnologia & IA',      items: solutions.filter(s => ['ia-first','pedido-flow','ecm','csd'].includes(s.slug)) },
]

export default function Footer() {
  return (
    <footer className="bg-black px-6 pt-20 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-white/[0.06]">

          {/* Brand + contact */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-white font-black text-xl tracking-[0.15em]">
              SOFTEUM
            </Link>
            <p className="text-white/35 text-sm leading-relaxed max-w-[240px]">
              Software de gestão empresarial integrado para transformar processos em resultados reais.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href="mailto:comercial@softeum.com.br"
                className="flex items-center gap-3 group w-fit"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
                <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors">
                  comercial@softeum.com.br
                </span>
              </a>

              <a
                href="https://wa.me/5547996592551"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
                <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors">
                  (47) 9 9659-2551
                </span>
              </a>
            </div>
          </div>

          {/* Solution groups */}
          {solutionGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20 mb-5">
                {group.label}
              </p>
              <ul className="space-y-3">
                {group.items.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/solucoes/${s.slug}`}
                      className="group flex items-center gap-1.5 text-[12px] text-white/35 hover:text-white/75 transition-colors"
                    >
                      <span className="font-normal">{s.subtitle}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity -mt-0.5 flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-[11px] text-white/20">
            © {new Date().getFullYear()} Softeum Tecnologia. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1">
            {[
              { label: 'Sobre', href: '/sobre' },
              { label: 'Privacidade', href: '/privacidade' },
              { label: 'LGPD', href: '/lgpd' },
            ].map((item, i, arr) => (
              <span key={item.label} className="flex items-center">
                <Link href={item.href} className="text-[11px] text-white/20 hover:text-white/50 transition-colors px-3">
                  {item.label}
                </Link>
                {i < arr.length - 1 && <span className="text-white/10 text-xs">·</span>}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
