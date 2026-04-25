import { useState } from "react";
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
  const [selectedPlan, setSelectedPlan] = useState("Business");

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

        <div className="grid grid-cols-2 gap-4 pt-4 lg:gap-6 xl:grid-cols-4">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;

            return (
            <div
              key={plan.name}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPlan(plan.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedPlan(plan.name);
              }}
              className={cn(
                "group relative flex cursor-pointer rounded-2xl border bg-card p-4 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5 lg:p-6",
                isSelected
                  ? "border-accent/60 shadow-elegant"
                  : plan.featured
                    ? "border-accent/40"
                    : "border-border hover:border-secondary/40"
              )}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-t-2xl bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100" />
              {plan.featured && (
                <div className="absolute -top-3 left-6 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                  Mais escolhido
                </div>
              )}
              <div className="flex w-full flex-col">
                <div className="border-b border-border pb-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{plan.name}</h3>
                    <span
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 rounded-full border transition-all duration-300",
                        isSelected ? "border-accent bg-accent shadow-glow" : "border-border group-hover:border-accent"
                      )}
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.subtitle}</p>
                  <div className="mt-5 rounded-xl bg-muted/50 p-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Inclui
                    </span>
                    <span className="mt-1 block break-words font-display text-2xl font-extrabold leading-tight text-gradient-brand sm:text-3xl">
                      {plan.access}
                    </span>
                  </div>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-foreground/85 sm:gap-2.5 sm:text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={isSelected ? "hero" : "outline"} size="lg" className="mt-7 w-full">
                  <a href="#demo">{isSelected ? "Plano selecionado" : "Escolher plano"}</a>
                </Button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};