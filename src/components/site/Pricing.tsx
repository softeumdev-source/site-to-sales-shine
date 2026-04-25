import { useState } from "react";
import { CheckCircle2, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  { name: "Starter", users: "1 acesso", subtitle: "Para iniciar a automação", tone: "Implantação enxuta" },
  { name: "Business", users: "3 acessos", subtitle: "Para equipes pequenas e médias", tone: "Operação em crescimento" },
  { name: "Corporate", users: "6 acessos", subtitle: "Para operações maiores", tone: "Times com mais controle" },
  { name: "Enterprise", users: "Ilimitado", subtitle: "Para grandes organizações", tone: "Estrutura sob medida" },
];

const included = [
  "Plano customizado para cada cliente",
  "Leitura automática de PDF por IA",
  "Exportação ou integração com ERP",
  "Aprovação, relatórios e controle de equipe",
];

export const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Business");
  const [previewPlan, setPreviewPlan] = useState<string | null>(null);
  const activeName = previewPlan ?? selectedPlan;
  const activeIndex = plans.findIndex((plan) => plan.name === activeName);
  const activePlan = plans[activeIndex];
  const selectedIndex = plans.findIndex((plan) => plan.name === selectedPlan);

  const handleSpotlight = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

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

        <div
          className="spotlight mx-auto max-w-6xl rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-10"
          onMouseMove={handleSpotlight}
          onMouseLeave={() => setPreviewPlan(null)}
        >
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
                    const isPreview = activeName === plan.name;

                    return (
                      <button
                        key={plan.name}
                        type="button"
                        onClick={() => setSelectedPlan(plan.name)}
                        onMouseEnter={() => setPreviewPlan(plan.name)}
                        onFocus={() => setPreviewPlan(plan.name)}
                        onBlur={() => setPreviewPlan(null)}
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
                          {isSelected ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                        </span>
                        <span
                          className={cn(
                            "mt-4 font-display text-lg font-bold leading-tight transition-colors",
                            isPreview && "text-gradient-brand"
                          )}
                        >
                          {plan.name}
                        </span>
                        <span className="mt-1 text-sm font-semibold text-gradient-brand">{plan.users}</span>
                        <span className="mt-1 hidden max-w-[130px] text-xs text-muted-foreground sm:block">
                          {plan.subtitle}
                        </span>
                        <span
                          className={cn(
                            "mt-4 h-1.5 w-10 rounded-full bg-muted transition-all duration-300",
                            isPreview && "w-16 bg-gradient-brand shadow-glow",
                            isSelected && "w-16 bg-gradient-brand"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-3 rounded-2xl border border-border bg-background/70 p-4 sm:grid-cols-4">
                {plans.map((plan, index) => (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => setSelectedPlan(plan.name)}
                    onMouseEnter={() => setPreviewPlan(plan.name)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selectedIndex === index
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card hover:border-accent/60"
                    )}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {plan.users}
                    </span>
                    <span className="mt-1 block font-display text-base font-bold">{plan.tone}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {previewPlan ? "Prévia do plano" : "Plano selecionado"}
                </p>
                <Sparkles className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="mt-2 font-display text-4xl font-extrabold text-gradient-brand">
                {activePlan.name}
              </h3>
              <p className="mt-2 text-xl font-bold">{activePlan.users}</p>
              <p className="mt-3 text-sm text-muted-foreground">{activePlan.tone}. {activePlan.subtitle}.</p>

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