import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Starter", users: "1 usuário" },
  { name: "Business", users: "3 usuários" },
  { name: "Corporate", users: "6 usuários" },
  { name: "Enterprise", users: "Ilimitado" },
];

const included = [
  "Plano customizado para cada cliente",
  "IA para leitura automática de PDFs",
  "Exportação ou integração com ERP",
  "Suporte na implantação da operação",
];

export const Pricing = () => {
  return (
    <section id="planos" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Planos</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Planos simples, <span className="text-gradient-brand">customizados por usuário</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Todos recebem a mesma solução personalizada. O que muda é apenas a quantidade de acessos.
          </p>
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
          <div className="grid divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
            {plans.map((plan) => (
              <div key={plan.name} className="p-6 text-center transition hover:bg-muted/50 md:p-8">
                <h3 className="font-display text-2xl font-extrabold">{plan.name}</h3>
                <p className="mt-4 text-3xl font-black text-gradient-brand">{plan.users}</p>
                <p className="mt-3 text-sm text-muted-foreground">Plano sob medida</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-gradient-soft p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <ul className="grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="hero" size="lg" className="w-full md:w-auto">
                <a href="#demo">
                  Falar com especialista
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};