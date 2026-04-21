import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[500px] w-[500px] rounded-full bg-accent/25 blur-3xl" />

      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
        <div className="animate-fade-up space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Pedidos do e-mail integrados direto ao ERP
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Automatize seus{" "}
            <span className="text-gradient-brand">pedidos com IA</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A Softeum lê os pedidos em PDF do seu e-mail e lança automaticamente no ERP.
            Sem digitação, sem retrabalho, sem erros — sua equipe focada no que faz o negócio crescer.
          </p>

          <ul className="grid gap-2.5 text-sm md:grid-cols-2">
            {["Zero digitação manual", "Redução de até 95% nos erros", "Integra com seu ERP atual", "Piloto gratuito de 15 dias"].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span className="text-foreground/80">{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#demo">
                Agende uma demo gratuita
                <ArrowRight className="ml-1 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="#como-funciona">Ver como funciona</a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Sem cartão de crédito • Setup em dias, não meses
          </p>
        </div>

        <div className="relative animate-fade-up [animation-delay:200ms]">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl" />
          <img
            src={heroImage}
            alt="Plataforma Softeum: pedidos por e-mail processados por IA e enviados ao ERP"
            width={1536}
            height={1024}
            className="relative w-full rounded-3xl border border-border/60 shadow-elegant"
          />
          {/* Floating stat cards */}
          <div className="absolute -left-4 top-10 hidden animate-float rounded-2xl border border-border/60 bg-background/95 p-4 shadow-soft backdrop-blur md:block">
            <div className="text-xs text-muted-foreground">Pedidos processados hoje</div>
            <div className="font-display text-2xl font-bold">+1.284</div>
          </div>
          <div className="absolute -right-2 bottom-8 hidden animate-float [animation-delay:1.5s] rounded-2xl border border-border/60 bg-background/95 p-4 shadow-soft backdrop-blur md:block">
            <div className="text-xs text-muted-foreground">Tempo economizado</div>
            <div className="font-display text-2xl font-bold text-gradient-brand">98%</div>
          </div>
        </div>
      </div>

      {/* Logos / trust strip */}
      <div className="border-y border-border/40 bg-background/40 backdrop-blur">
        <div className="container py-6">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Empresas que confiam na Softeum
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 opacity-70">
            {["Acme Corp", "TechFlow", "DistribMax", "OrderPro", "ERPCloud", "LogiBase"].map((n) => (
              <span key={n} className="font-display text-lg font-bold tracking-tight text-muted-foreground">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
