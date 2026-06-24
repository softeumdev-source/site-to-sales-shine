'use client'

import dynamic from 'next/dynamic'
import BenefitsSection from '@/components/benefits-section'
import AboutSection from '@/components/about-section'
import ContactSection from '@/components/contact-section'
import PillarsSection from '@/components/pillars-section'
import StatsSection from '@/components/stats-section'
import TestimonialsSection from '@/components/ui/testimonial-v2'

/* Canvas components carregam só no client */
const SofteumHero = dynamic(
  () => import('@/components/ui/softeum-hero').then((m) => ({ default: m.SofteumHero })),
  { ssr: false },
)

export default function HomePage() {
  return (
    <>
      <SofteumHero />
      <PillarsSection />
      <StatsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
