import { Mail, Brain, Database } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Mail,
    title: "Pedido chega no e-mail",
    desc: "Seu cliente envia o pedido em PDF para a caixa de e-mail de sempre. Nada muda para ele.",
  },
  {
    n: "02",
    icon: Brain,
    title: "IA lê e interpreta tudo",
    desc: "Nossa IA identifica produtos, códigos, quantidades, condições e cliente — mesmo em layouts diferentes.",
  },
  {
    n: "03",
    icon: Database,
    title: "Lançado direto no ERP",
    desc: "Em segundos, o pedido aparece no seu ERP pronto para faturar. Sem digitação, sem erro.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="relative bg-muted/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Do e-mail ao seu ERP em{" "}
            <span className="text-gradient-brand">3 passos</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Conecte uma vez. A Softeum cuida do resto, 24/7.
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative animate-fade-up rounded-2xl border border-border bg-card p-8 shadow-card"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="font-display text-5xl font-extrabold text-muted-foreground/20">
                  {s.n}
                </span>
              </div>
              <h3 className="mb-3 font-display text-xl font-bold">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
