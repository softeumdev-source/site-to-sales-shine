import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    subtitle: "Inicial, básico",
    access: "1 acesso",
    featured: false,
    items: ["Processamento automático de pedidos", "Leitura de PDF por IA", "Exportação para ERP"],
  },
  {
    name: "Business",
    subtitle: "Pequenas e médias empresas",
    access: "3 acessos",
    featured: true,
    items: ["Tudo do Starter", "Gestão de equipe", "Aprovação manual ou automática"],
  },
  {
    name: "Corporate",
    subtitle: "Empresas maiores",
    access: "6 acessos",
    featured: false,
    items: ["Tudo do Business", "Multi-empresa", "Relatórios e análises"],
  },
  {
    name: "Enterprise",
    subtitle: "Grandes organizações",
    access: "Ilimitado",
    featured: false,
    items: ["Tudo do Corporate", "Operação sob medida", "Controle avançado de acesso"],
  },
];

export const Pricing = () => {
  return (
    <section id="planos" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Planos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Escolha o plano ideal para a{" "}
            <span className="text-gradient-brand">sua operação</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comece com o número de acessos que sua equipe precisa e evolua conforme o volume de pedidos crescer.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto px-1 pb-4 pt-4 xl:overflow-visible">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex min-w-[300px] flex-1 rounded-2xl border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant xl:min-w-0",
                plan.featured ? "border-accent/50" : "border-border hover:border-secondary/40"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                  Mais escolhido
                </div>
              )}
              <div className="flex w-full flex-col">
                <div className="border-b border-border pb-5">
                  <h3 className="font-display text-2xl font-extrabold leading-tight">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.subtitle}</p>
                  <div className="mt-5 rounded-xl bg-muted/50 p-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Inclui
                    </span>
                    <span className="mt-1 block break-words font-display text-3xl font-extrabold leading-tight text-gradient-brand">
                      {plan.access}
                    </span>
                  </div>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={plan.featured ? "hero" : "outline"} size="lg" className="mt-7 w-full">
                  <a href="#demo">Escolher plano</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};