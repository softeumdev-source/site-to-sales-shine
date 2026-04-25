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
        <div className="mx-auto mb-10 max-w-2xl text-center">
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

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="grid gap-0 md:grid-cols-4">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;

              return (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  className={cn(
                    "group relative border-b border-border p-5 text-left transition-all duration-300 hover:bg-muted/40 md:border-b-0 md:border-r md:last:border-r-0",
                    isSelected ? "bg-muted/50" : "bg-background"
                  )}
                >
                  <span className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-brand transition-opacity", isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60")} />
                  <span className="font-display text-xl font-extrabold">{plan.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{plan.subtitle}</span>
                  <span className="mt-4 block font-display text-3xl font-extrabold text-gradient-brand">
                    {plan.users}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 border-t border-border bg-muted/30 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Selecionado
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold">
                {activePlan.name} — {activePlan.users}
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/85">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild variant="hero" size="lg" className="w-full lg:w-auto">
              <a href="#demo">Falar sobre este plano</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};