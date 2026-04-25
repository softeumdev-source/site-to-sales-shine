import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const featureRows = [
  { label: "Acessos", key: "access" },
  { label: "Processamento automático", key: "processing" },
  { label: "Leitura de PDF por IA", key: "pdf" },
  { label: "Exportação para ERP", key: "erp" },
  { label: "Gestão de equipe", key: "team" },
  { label: "Aprovação automática", key: "approval" },
  { label: "Multi-empresa", key: "multi" },
  { label: "Relatórios e análises", key: "reports" },
  { label: "Operação sob medida", key: "custom" },
] as const;

const plans = [
  {
    name: "Starter",
    subtitle: "Inicial, básico",
    featured: false,
    values: {
      access: "1 acesso",
      processing: true,
      pdf: true,
      erp: true,
      team: false,
      approval: false,
      multi: false,
      reports: false,
      custom: false,
    },
  },
  {
    name: "Business",
    subtitle: "Pequenas e médias empresas",
    featured: true,
    values: {
      access: "3 acessos",
      processing: true,
      pdf: true,
      erp: true,
      team: true,
      approval: true,
      multi: false,
      reports: false,
      custom: false,
    },
  },
  {
    name: "Corporate",
    subtitle: "Empresas maiores",
    featured: false,
    values: {
      access: "6 acessos",
      processing: true,
      pdf: true,
      erp: true,
      team: true,
      approval: true,
      multi: true,
      reports: true,
      custom: false,
    },
  },
  {
    name: "Enterprise",
    subtitle: "Grandes organizações",
    featured: false,
    values: {
      access: "Ilimitado",
      processing: true,
      pdf: true,
      erp: true,
      team: true,
      approval: true,
      multi: true,
      reports: true,
      custom: true,
    },
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
            Comparação direta dos planos, com os 4 lado a lado em um modelo mais tradicional.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[980px] overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="grid grid-cols-[220px_repeat(4,minmax(0,1fr))]">
              <div className="border-b border-border bg-muted/40 p-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Comparativo
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">Recursos por plano</h3>
              </div>

              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.name;

                return (
                  <div
                    key={plan.name}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedPlan(plan.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedPlan(plan.name);
                    }}
                    className={cn(
                      "relative border-b border-l border-border p-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected ? "bg-muted/50" : "bg-background/30 hover:bg-muted/30"
                    )}
                  >
                    <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-brand transition-opacity", isSelected ? "opacity-100" : "opacity-0")} />
                    {plan.featured && (
                      <span className="mb-3 inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                        Mais escolhido
                      </span>
                    )}
                    <h4 className="font-display text-2xl font-extrabold leading-tight">{plan.name}</h4>
                    <p className="mt-1 min-h-10 text-sm text-muted-foreground">{plan.subtitle}</p>
                    <div className="mt-4 text-3xl font-extrabold leading-tight text-foreground">
                      {plan.values.access}
                    </div>
                  </div>
                );
              })}

              {featureRows.map((row) => (
                <>
                  <div key={`${row.key}-label`} className="border-b border-border bg-muted/30 p-4 text-sm font-medium text-foreground/80">
                    {row.label}
                  </div>
                  {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.name;
                    const value = plan.values[row.key];

                    return (
                      <div
                        key={`${plan.name}-${row.key}`}
                        className={cn(
                          "flex items-center justify-center border-b border-l border-border p-4 text-center transition-colors duration-300",
                          isSelected ? "bg-muted/40" : "bg-background"
                        )}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )
                        ) : (
                          <span className="text-sm font-semibold text-foreground">{value}</span>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}

              <div className="bg-muted/40 p-4" />
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.name;

                return (
                  <div
                    key={`${plan.name}-cta`}
                    className={cn(
                      "border-l border-border p-4",
                      isSelected ? "bg-muted/50" : "bg-background"
                    )}
                  >
                    <Button asChild variant={isSelected ? "hero" : "outline"} className="w-full">
                      <a href="#demo">{isSelected ? "Plano selecionado" : "Escolher plano"}</a>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};