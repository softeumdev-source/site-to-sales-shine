'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Testimonial {
  text: string
  image: string
  name: string
  role: string
  solution: string
}

const testimonials: Testimonial[] = [
  {
    text: 'O APM da Softeum transformou completamente a forma como gerenciamos nossos processos internos. Reduzimos o retrabalho em mais de 80% e ganhamos visibilidade total dos fluxos.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Carla Mendonça',
    role: 'Diretora de Operações',
    solution: 'APM',
  },
  {
    text: 'Implementamos o QMP e em poucos meses conseguimos a certificação ISO 9001. A plataforma é intuitiva e o suporte da equipe foi excepcional em cada etapa.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Ricardo Alves',
    role: 'Gerente de Qualidade',
    solution: 'QMP',
  },
  {
    text: 'O CGR nos deu controle total sobre os riscos regulatórios. Hoje tomamos decisões com segurança e cumprimos 100% das exigências de conformidade do setor.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Fernanda Costa',
    role: 'Chief Compliance Officer',
    solution: 'CGR',
  },
  {
    text: 'Com o PPS conseguimos gerenciar mais de 40 projetos simultâneos sem perder o controle. Os dashboards em tempo real mudaram nossa capacidade de entrega.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Marcos Oliveira',
    role: 'PMO Corporativo',
    solution: 'PPS',
  },
  {
    text: 'O AMM revolucionou nossa manutenção industrial. Reduzimos as paradas não programadas em 40% e aumentamos a vida útil dos equipamentos de forma significativa.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Juliana Ferreira',
    role: 'Gestora de Ativos',
    solution: 'AMM',
  },
  {
    text: 'A Softeum entendeu nossas necessidades e entregou uma solução que superou todas as expectativas. O IA First automatizou processos que antes tomavam horas da equipe.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Beatriz Santos',
    role: 'Head de Inovação',
    solution: 'IA First',
  },
  {
    text: 'O TDM centralizou toda a gestão de pessoas da empresa. Onboarding, desenvolvimento e avaliação de desempenho nunca foram tão eficientes e organizados.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Eduardo Lima',
    role: 'Diretor de RH',
    solution: 'TDM',
  },
  {
    text: 'Com o ESG da Softeum conseguimos estruturar nossa estratégia de sustentabilidade e reportar com transparência para stakeholders e investidores.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'Patrícia Rocha',
    role: 'Gerente de Sustentabilidade',
    solution: 'ESG',
  },
  {
    text: 'O Pedido Flow eliminou os gargalos do nosso ciclo de vendas. Hoje processamos o triplo de pedidos com a mesma equipe, com rastreabilidade total.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150',
    name: 'André Cavalcanti',
    role: 'Diretor Comercial',
    solution: 'Pedido Flow',
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

function TestimonialsColumn({
  className,
  testimonials: items,
  duration = 10,
}: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-4 pb-4 list-none m-0 p-0"
      >
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {items.map(({ text, image, name, role, solution }, i) => (
              <motion.li
                key={`${idx}-${i}`}
                aria-hidden={idx === 1 ? 'true' : 'false'}
                whileHover={{ scale: 1.02, y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] max-w-xs w-full cursor-default select-none hover:border-white/15 hover:bg-white/[0.05] transition-colors duration-300"
              >
                <blockquote className="m-0 p-0">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
                    {solution}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed m-0">
                    {text}
                  </p>
                  <footer className="flex items-center gap-3 mt-5">
                    <img
                      width={36}
                      height={36}
                      src={image}
                      alt={`Foto de ${name}`}
                      className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                    />
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic text-sm text-white leading-tight">
                        {name}
                      </cite>
                      <span className="text-[11px] text-white/40 mt-0.5">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl px-6 mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-16">
          <div className="border border-white/15 py-1 px-4 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 bg-white/[0.04] mb-6">
            Depoimentos
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-white/45 text-base leading-relaxed">
            Empresas de todos os portes transformaram sua gestão com as soluções Softeum.
          </p>
        </div>

        {/* Scrolling columns */}
        <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </motion.div>
    </section>
  )
}
