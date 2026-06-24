'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      nome: (data.get('nome') as string ?? '').trim(),
      empresa: (data.get('empresa') as string ?? '').trim(),
      telefone: (data.get('telefone') as string ?? '').trim(),
      email: (data.get('email') as string ?? '').trim(),
      mensagem: (data.get('mensagem') as string ?? '').trim(),
    }

    setLoading(true)
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.success) throw new Error(result.error ?? 'Falha ao enviar.')
      form.reset()
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contato" className="bg-black py-32 px-6 relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">
          Fale Conosco
        </p>
        <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-6">
          Pronto para<br />
          <span className="text-white/30">transformar sua empresa?</span>
        </h2>
        <p className="text-white/50 text-base mb-12 leading-relaxed">
          Entre em contato com nossos especialistas e descubra qual combinação de soluções Softeum é ideal para o seu negócio.
        </p>

        {sent ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-12 text-center">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-white text-lg font-bold mb-2">Mensagem enviada com sucesso!</p>
            <p className="text-white/50 text-sm">Nossa equipe entrará em contato em breve.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-2"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="Seu nome"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  required
                  placeholder="Nome da sua empresa"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="(47) 99999-9999"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">Mensagem</label>
              <textarea
                name="mensagem"
                rows={4}
                placeholder="Conte sobre o desafio que quer resolver..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm font-bold tracking-[0.15em] uppercase text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? 'Enviando...' : 'Enviar mensagem'}
            </button>
            <p className="text-center text-xs text-white/20">
              Resposta em até 1 dia útil. Seus dados estão seguros.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
