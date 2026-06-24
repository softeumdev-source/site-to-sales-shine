import { Settings2, BarChart3, Sparkles } from 'lucide-react'

const pillars = [
  {
    icon: Settings2,
    number: '01',
    title: 'Gestão de Processos',
    description:
      'Mapeamos, automatizamos e monitoramos cada processo da sua empresa, do operacional ao estratégico, eliminando retrabalho e aumentando a eficiência com visibilidade total.',
    tags: ['APM', 'ISM', 'TCM', 'PPS', 'DCM'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    number: '02',
    title: 'Performance & Qualidade',
    description:
      'Defina metas, monitore indicadores e garanta a conformidade em cada camada da organização. Da qualidade ao risco, da governança ao ESG: tudo integrado e rastreável.',
    tags: ['SPM', 'QMP', 'CGR', 'IRM', 'ESG'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Inovação com IA',
    description:
      'Automatize tarefas com inteligência artificial, capture pedidos por e-mail e WhatsApp, e desenvolva projetos de IA sob medida para transformar seu negócio de dentro para fora.',
    tags: ['IA First', 'Pedido Flow', 'TDM', 'IEM'],
    color: 'from-amber-400 to-orange-500',
  },
]

export default function PillarsSection() {
  return (
    <section className="bg-black py-32 px-6 relative overflow-hidden border-t border-white/5">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/25 mb-4">
            Nossa abordagem
          </p>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
            Três pilares que<br />
            <span className="text-white/25">transformam empresas</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.number}
                className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
              >
                {/* Number */}
                <div className="text-[80px] font-black text-white/[0.04] leading-none absolute top-4 right-6 select-none">
                  {pillar.number}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{pillar.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6">{pillar.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-white/10 text-white/40 group-hover:border-white/20 group-hover:text-white/60 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r ${pillar.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
