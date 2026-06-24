import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-[120px] font-black text-white/5 leading-none tracking-tighter">404</div>
        <h1 className="text-2xl font-black text-white mt-4 mb-2 tracking-tight">Página não encontrada</h1>
        <p className="text-white/40 text-sm mb-8">O endereço que você buscou não existe.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-widest uppercase text-black bg-white rounded-full hover:bg-white/90 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </Link>
      </div>
    </div>
  )
}
