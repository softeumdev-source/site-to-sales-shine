import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/motion";

/** Faixa curta no meio da página para levar à demonstração. */
export const CtaBand = () => (
  <section className="relative py-6">
    <div className="container">
      <Reveal
        from="scale"
        className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] bg-primary px-8 py-10 text-primary-foreground md:flex-row md:items-center md:px-12"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,hsl(var(--brand-blue)/0.5),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,hsl(var(--brand-coral)/0.35),transparent_70%)]" />
        <div className="relative">
          <p className="font-display text-2xl font-bold tracking-tight md:text-3xl">Quer ver com os pedidos da sua empresa?</p>
          <p className="mt-2 text-white/70">Demonstração de 30 minutos, sem compromisso. Teste grátis por 5 dias úteis.</p>
        </div>
        <a
          href="#demo"
          className="group relative inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-semibold text-primary transition-transform hover:scale-[1.03]"
        >
          Agendar demonstração
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </div>
  </section>
);
