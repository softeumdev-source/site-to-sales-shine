import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  { name: "Starter", users: "1 acesso", subtitle: "Inicial, básico" },
  { name: "Business", users: "3 acessos", subtitle: "Pequenas e médias empresas" },
  { name: "Corporate", users: "6 acessos", subtitle: "Empresas maiores" },
  { name: "Enterprise", users: "Ilimitado", subtitle: "Grandes organizações" },
];

const included = ["Plano customizado", "IA para PDFs", "Exportação para ERP", "Aprovação e relatórios"];

export const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Business");
  const activePlan = plans.find((plan) => plan.name === selectedPlan)!;

  return (
    <section id="planos" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Planos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Planos customizados por{" "}
            <span className="text-gradient-brand">quantidade de usuários</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Todos os planos são adaptados para cada cliente. O que muda é a quantidade de acessos da equipe.
          </p>
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
          <div className="border-b border-border bg-muted/30 px-6 py-5 text-center md:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Escolha pela quantidade de usuários
            </p>
          </div>

          <div className="grid gap-0 md:grid-cols-4">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;

              return (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  className={cn(
                    "group relative min-h-[220px] border-b border-border p-7 text-left transition-all duration-300 hover:bg-muted/40 md:border-b-0 md:border-r md:p-8 md:last:border-r-0",
                    isSelected ? "bg-muted/60" : "bg-background"
                  )}
                >
                  <span className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-brand transition-opacity", isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60")} />
                  <span className={cn("mb-5 flex h-5 w-5 rounded-full border transition-all", isSelected ? "border-accent bg-accent shadow-glow" : "border-border group-hover:border-accent")} />
                  <span className="font-display text-3xl font-extrabold leading-tight">{plan.name}</span>
                  <span className="mt-2 block min-h-10 text-base text-muted-foreground">{plan.subtitle}</span>
                  <span className="mt-8 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Usuários
                  </span>
                  <span className="mt-1 block font-display text-4xl font-extrabold leading-tight text-gradient-brand">
                    {plan.users}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-8 border-t border-border bg-gradient-soft p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Selecionado
              </p>
              <h3 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
                {activePlan.name} — {activePlan.users}
              </h3>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                A solução é configurada para o seu ERP, fluxo de pedidos, equipe e regras de aprovação.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-base text-foreground/85">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild variant="hero" size="xl" className="w-full lg:w-auto">
              <a href="#demo">Falar sobre este plano</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};