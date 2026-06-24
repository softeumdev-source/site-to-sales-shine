const stats = [
  { value: '60%', label: 'de redução no tempo\nde execução de processos' },
  { value: '18+', label: 'soluções integradas\nem uma única plataforma' },
  { value: '24/7', label: 'suporte especializado\npara sua operação' },
  { value: '100%', label: 'cloud, on-premise\nou híbrido' },
]

export default function StatsSection() {
  return (
    <section className="bg-black py-24 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Horizontal glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-black px-8 py-10 flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              <div className="text-5xl lg:text-6xl font-black text-white tracking-tight mb-3 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-[11px] text-white/30 leading-relaxed tracking-wide whitespace-pre-line">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
