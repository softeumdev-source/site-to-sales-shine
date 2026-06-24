'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { solutions } from '@/lib/solutions'
import {
  GitBranch, Target, CheckCircle2, Scale, Shield, Leaf, HeartPulse, FileText,
  Headphones, Kanban, Package, Truck, Wrench, GraduationCap, Lightbulb, Users2,
  Mail, Bot, Code2, ChevronDown, Menu, X, ArrowRight,
} from 'lucide-react'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  GitBranch, Target, CheckCircle2, Scale, Shield, Leaf, HeartPulse, FileText,
  Headphones, Kanban, Package, Truck, Wrench, GraduationCap, Lightbulb, Users2,
  Mail, Bot, Code2,
}

export default function Navbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setSolutionsOpen(false)
    setMobileOpen(false)
  }, [pathname])

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setSolutionsOpen(true)
  }

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 150)
  }

  const groups = [
    {
      label: 'Processos & Desempenho',
      items: solutions.filter((s) => ['bpm', 'cpm', 'esm', 'cwm', 'ppm'].includes(s.slug)),
    },
    {
      label: 'Qualidade & Conformidade',
      items: solutions.filter((s) => ['qms', 'grc', 'erm', 'ehsm', 'esg'].includes(s.slug)),
    },
    {
      label: 'Ativos, Docs & Pessoas',
      items: solutions.filter((s) => ['eam', 'ecm', 'slm', 'hdm', 'icm', 'plm'].includes(s.slug)),
    },
    {
      label: 'Tecnologia & IA',
      items: solutions.filter((s) => ['pedido-flow', 'ia-first', 'csd'].includes(s.slug)),
    },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-black/10 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-lg font-black text-white tracking-[0.2em] hover:opacity-80 transition-opacity"
          >
            SOFTEUM
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
            >
              Início
            </Link>

            {/* Solutions dropdown trigger */}
            <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
              <button className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors">
                Soluções
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <Link
              href="/sobre"
              className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
            >
              Sobre
            </Link>

            <Link
              href="/#contato"
              className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors"
            >
              Contato
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/#contato"
              className="px-5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-105"
            >
              Fale Conosco
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      {solutionsOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 bg-black/98 border-b border-white/10 backdrop-blur-2xl"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <div className="max-w-7xl mx-auto px-10 py-8">
            <div className="grid grid-cols-4 gap-8">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-4">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((solution) => {
                      const Icon = iconMap[solution.icon]
                      return (
                        <Link
                          key={solution.slug}
                          href={`/solucoes/${solution.slug}`}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-150 group"
                        >
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${solution.color} p-0.5`}
                          >
                            <div className="w-full h-full rounded-md bg-black/60 flex items-center justify-center">
                              {Icon && <Icon className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <div className="text-white text-xs font-bold truncate">{solution.acronym}</div>
                            <div className="text-white/40 text-[10px] truncate group-hover:text-white/60 transition-colors">
                              {solution.subtitle}
                            </div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-all ml-auto flex-shrink-0 -translate-x-1 group-hover:translate-x-0" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <p className="text-[10px] text-white/30 tracking-wider">
                19 soluções integradas para transformar sua empresa
              </p>
              <Link
                href="/#contato"
                className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                Fale com um especialista <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-black/98 backdrop-blur-2xl overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            <Link href="/" className="block text-sm font-semibold tracking-widest uppercase text-white/80 py-2 border-b border-white/5">
              Início
            </Link>
            <div>
              <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-3">Soluções</p>
              <div className="grid grid-cols-2 gap-2">
                {solutions.map((solution) => {
                  const Icon = iconMap[solution.icon]
                  return (
                    <Link
                      key={solution.slug}
                      href={`/solucoes/${solution.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className={`w-6 h-6 rounded bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0`}>
                        {Icon && <Icon className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs text-white/70">{solution.acronym}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
            <Link href="/sobre" className="block text-sm font-semibold tracking-widest uppercase text-white/80 py-2 border-t border-white/5">
              Sobre
            </Link>
            <Link href="/#contato" className="block w-full text-center py-3 text-sm font-bold tracking-widest uppercase text-black bg-white rounded-full">
              Fale Conosco
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
