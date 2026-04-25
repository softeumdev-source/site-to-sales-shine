import { useState } from "react";
import { ArrowRight, CheckCircle2, Minus, Plus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  { name: "Starter", users: "1", label: "1 usuário", fit: "operação individual" },
  { name: "Business", users: "3", label: "3 usuários", fit: "time comercial" },
  { name: "Corporate", users: "6", label: "6 usuários", fit: "equipe estruturada" },
  { name: "Enterprise", users: "∞", label: "usuários ilimitados", fit: "grandes operações" },
];

const deliverables = [
  "Fluxo adaptado ao processo real do cliente",
  "Leitura automática de PDFs com IA",
  "Exportação ou integração com ERP",
  "Aprovação, relatórios e gestão de equipe",
];

export const Pricing = () => {
  const [active, setActive] = useState(1);
  const tier = tiers[active];

  return (
    <section id="planos" className="overflow-hidden py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Planos</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Planos customizados pelo <span className="text-gradient-brand">tamanho do seu time</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A solução é moldada para cada cliente. O que define o plano é a quantidade de usuários na operação.
          </p>
        </div>

        <div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-card shadow-elegant">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-border p-6 md:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Monte seu plano
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold">Quantos usuários?</h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow">
                  <UsersRound className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={() => setActive((value) => Math.max(0, value - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition hover:-translate-y-0.5 hover:border-accent hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Diminuir usuários"
                >
                  <Minus className="h-5 w-5" />
                </button>

                <div className="min-w-[190px] text-center">
                  <div className="font-display text-7xl font-black leading-none text-gradient-brand md:text-8xl">
                    {tier.users}
                  </div>
                  <p className="mt-3 text-lg font-bold">{tier.label}</p>
                  <p className="text-sm text-muted-foreground">{tier.fit}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setActive((value) => Math.min(tiers.length - 1, value + 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition hover:-translate-y-0.5 hover:border-accent hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Aumentar usuários"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-10 grid grid-cols-4 gap-2">
                {tiers.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "h-3 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      index <= active ? "bg-gradient-brand shadow-glow" : "bg-muted hover:bg-accent/30"
                    )}
                    aria-label={`Selecionar ${item.name}`}
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {tiers.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5",
                      active === index
                        ? "border-accent bg-accent/10 text-foreground shadow-soft"
                        : "border-border bg-background text-muted-foreground hover:border-accent"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-soft p-6 md:p-8">
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-border bg-background/85 p-6 shadow-soft md:p-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Plano recomendado
                  </p>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-5xl font-black text-gradient-brand">{tier.name}</h3>
                      <p className="mt-2 text-lg font-bold">Customizado para {tier.label}</p>
                    </div>
                    <span className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-bold text-accent">
                      Sob medida
                    </span>
                  </div>

                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {deliverables.map((item) => (
                      <li key={item} className="flex gap-3 text-sm font-medium text-foreground/85">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-muted-foreground">
                    Sem pacote engessado: escopo, integrações e implantação são ajustados conforme o cliente.
                  </p>
                  <Button asChild variant="hero" size="lg" className="mt-5 w-full">
                    <a href="#demo">
                      Falar sobre este plano
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};