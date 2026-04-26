import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Start", orders: "até 30", price: "R$ 345,00", users: "1" },
  { name: "Grow", orders: "até 100", price: "R$ 782,00", users: "2" },
  { name: "Scale", orders: "até 400", price: "R$ 2.990,00", users: "3" },
  { name: "Pro", orders: "até 800", price: "R$ 5.865,00", users: "4" },
  { name: "Enterprise", orders: "1000 +", price: "sob consulta", users: "sob consulta" },
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
            Planos simples, <span className="text-gradient-brand">por volume de pedidos</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escolha a faixa ideal para sua operação. Todos os planos incluem a solução personalizada.
          </p>
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
          <div className="grid divide-y divide-border md:grid-cols-5 md:divide-x md:divide-y-0">
            {plans.map((plan) => (
              <div key={plan.name} className="p-6 text-center transition hover:bg-muted/50 md:p-8">
                <h3 className="font-display text-2xl font-extrabold">{plan.name}</h3>
                <p className="mt-4 text-3xl font-black text-gradient-brand">{plan.price}</p>
                <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-semibold text-foreground/85">Pedidos/mês:</span> {plan.orders}</p>
                  <p><span className="font-semibold text-foreground/85">Usuários:</span> {plan.users}</p>
                </div>
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