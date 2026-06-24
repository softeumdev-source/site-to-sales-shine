import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Softeum | Inteligência Empresarial Integrada',
  description:
    'Softeum oferece 19 soluções de gestão empresarial integradas: APM, CGR, ESG, IRM, QMP, IA e muito mais. Transforme processos em resultados.',
  keywords: 'APM, CGR, ESG, IRM, QMP, gestão empresarial, software de gestão, IA empresarial',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
