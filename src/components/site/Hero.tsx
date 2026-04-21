import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, Mail, Brain, Database, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-dashboard.jpg";
import { useCounter } from "@/hooks/use-counter";

export const Hero = () => {
  const orders = useCounter(1284, true, 1800);
  const time = useCounter(98, true, 1600);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);

  const steps = [
    { icon: Mail, label: "E-mail recebido", color: "bg-secondary" },
    { icon: Brain, label: "IA processando", color: "bg-accent" },
    { icon: Database, label: "Lançado no ERP", color: "bg-gradient-brand" },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero">
      {/* Decorative animated blobs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] animate-blob rounded-full bg-secondary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[500px] w-[500px] animate-blob rounded-full bg-accent/25 blur-3xl [animation-delay:3s]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[400px] animate-blob rounded-full bg-primary/5 blur-3xl [animation-delay:6s]" />

      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
        <div className="animate-fade-up space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur transition-all hover:border-secondary/40 hover:shadow-glow">
            <Sparkles className="h-3.5 w-3.5 animate-pulse-soft text-secondary" />
            Pedidos do e-mail integrados direto ao ERP
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Automatize seus{" "}
            <span className="relative inline-block">
              <span className="text-gradient-brand">pedidos com IA</span>
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-brand opacity-60" />
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A Softeum lê os pedidos em PDF do seu e-mail e lança automaticamente no ERP.
            Sem digitação, sem retrabalho, sem erros — sua equipe focada no que faz o negócio crescer.
          </p>

          <ul className="grid gap-2.5 text-sm md:grid-cols-2">
            {["Zero digitação manual", "Redução de até 95% nos erros", "Integra com seu ERP atual", "Piloto gratuito de 15 dias"].map((b, i) => (
              <li key={b} className="flex animate-fade-in items-center gap-2" style={{ animationDelay: `${300 + i * 100}ms` }}>
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span className="text-foreground/80">{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#demo">
                Agende uma demo gratuita
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#funcionalidades">Ver funcionalidades</a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Sem cartão de crédito • Setup em dias, não meses
          </p>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute -inset-6 animate-pulse-soft rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl" />
          <img
            src={heroImage}
            alt="Plataforma Softeum: pedidos por e-mail processados por IA e enviados ao ERP"
            width={1536}
            height={1024}
            className="relative w-full rounded-3xl border border-border/60 shadow-elegant transition-transform hover:scale-[1.01]"
          />

          {/* Floating stat cards */}
          <div className="absolute -left-4 top-10 hidden animate-float rounded-2xl border border-border/60 bg-background/95 p-4 shadow-soft backdrop-blur md:block">
            <div className="text-xs text-muted-foreground">Pedidos processados hoje</div>
            <div className="font-display text-2xl font-bold tabular-nums">+{orders.toLocaleString("pt-BR")}</div>
          </div>
          <div className="absolute -right-2 bottom-8 hidden animate-float [animation-delay:1.5s] rounded-2xl border border-border/60 bg-background/95 p-4 shadow-soft backdrop-blur md:block">
            <div className="text-xs text-muted-foreground">Tempo economizado</div>
            <div className="font-display text-2xl font-bold tabular-nums text-gradient-brand">{time}%</div>
          </div>

          {/* Live processing pill */}
          <div className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-border/60 bg-background/95 px-4 py-2 shadow-elegant backdrop-blur md:flex">
            {steps.map((s, i) => {
              const isActive = i === step;
              return (
                <div key={s.label} className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-white transition-all ${
                      isActive ? `${s.color} scale-110 shadow-glow` : "bg-muted-foreground/30"
                    }`}
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </div>
                  {i < steps.length - 1 && <Zap className="h-3 w-3 text-muted-foreground/40" />}
                </div>
              );
            })}
            <span className="ml-1 text-xs font-medium">{steps[step].label}</span>
          </div>
        </div>
      </div>

      {/* Logos / trust strip with marquee */}
      <div className="border-y border-border/40 bg-background/40 backdrop-blur">
        <div className="container py-6">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Empresas que confiam na Softeum
          </p>
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-12 opacity-70">
              {[...Array(2)].map((_, k) =>
                ["Acme Corp", "TechFlow", "DistribMax", "OrderPro", "ERPCloud", "LogiBase", "ProSales", "FastShip"].map((n) => (
                  <span key={`${k}-${n}`} className="font-display text-lg font-bold tracking-tight text-muted-foreground whitespace-nowrap">
                    {n}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
