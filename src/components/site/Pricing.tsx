import { useState } from "react";
import { CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  { name: "Starter", users: "1 acesso", subtitle: "Para iniciar a automação" },
  { name: "Business", users: "3 acessos", subtitle: "Para equipes pequenas e médias" },
  { name: "Corporate", users: "6 acessos", subtitle: "Para operações maiores" },
  { name: "Enterprise", users: "Ilimitado", subtitle: "Para grandes organizações" },
];

const included = [
  "Plano customizado para cada cliente",
  "Leitura automática de PDF por IA",
  "Exportação ou integração com ERP",
  "Aprovação, relatórios e controle de equipe",
];

export const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Business");
  const activeIndex = plans.findIndex((plan) => plan.name === selectedPlan);
  const activePlan = plans[activeIndex];

  return (
    <section id="planos" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Planos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Um plano customizado para{" "}
            <span className="text-gradient-brand">cada tamanho de equipe</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Todos os planos são personalizados para a operação do cliente. O que muda é a quantidade de usuários.
          </p>
        </div>

        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Selecione o volume de usuários
                  </p>
                  <p className="font-display text-2xl font-extrabold">{activePlan.name}</p>
                </div>
              </div>

              <div className="relative px-2 pb-10 pt-6">
                <div className="absolute left-6 right-6 top-12 h-1 rounded-full bg-muted" />
                <div
                  className="absolute left-6 top-12 h-1 rounded-full bg-gradient-brand transition-all duration-500"
                  style={{ width: `calc(${(activeIndex / (plans.length - 1)) * 100}% - 0px)` }}
                />

                <div className="relative grid grid-cols-4 gap-3">
                  {plans.map((plan, index) => {
                    const isSelected = selectedPlan === plan.name;
                    const isPast = index <= activeIndex;

                    return (
                      <button
                        key={plan.name}
                        type="button"
                        onClick={() => setSelectedPlan(plan.name)}
                        className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span
                          className={cn(
                            "z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 group-hover:scale-110",
                            isSelected
                              ? "border-accent bg-gradient-brand text-primary-foreground shadow-glow"
                              : isPast
                                ? "border-accent bg-accent/15 text-accent"
                                : "border-border bg-background text-muted-foreground"
                          )}
                        >
                          {index + 1}
                        </span>
                        <span className="mt-4 font-display text-lg font-bold leading-tight">{plan.name}</span>
                        <span className="mt-1 text-sm font-semibold text-gradient-brand">{plan.users}</span>
                        <span className="mt-1 hidden max-w-[130px] text-xs text-muted-foreground sm:block">
                          {plan.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Plano selecionado
              </p>
              <h3 className="mt-2 font-display text-4xl font-extrabold text-gradient-brand">
                {activePlan.name}
              </h3>
              <p className="mt-2 text-xl font-bold">{activePlan.users}</p>
              <p className="mt-3 text-sm text-muted-foreground">{activePlan.subtitle}</p>

              <ul className="mt-6 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="hero" size="lg" className="mt-7 w-full">
                <a href="#demo">Falar sobre este plano</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};