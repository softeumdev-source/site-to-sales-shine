import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles, Mail, Brain, Database, Zap, ShieldCheck, Cpu, Headphones, Plug, Lock } from "lucide-react";
import { useEffect, useRef, useState, MouseEvent } from "react";
import heroImage from "@/assets/hero-dashboard.jpg";
import { useCounter } from "@/hooks/use-counter";
import { MagneticButton } from "./MagneticButton";

export const Hero = () => {
  const orders = useCounter(1284, true, 1800);
  const time = useCounter(98, true, 1600);
  const [step, setStep] = useState(0);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 2200);
    return () => clearInterval(id);
  }, []);

  const onImgMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = imgWrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 8}deg`);
    el.style.setProperty("--tx", `${px * 10}px`);
    el.style.setProperty("--ty", `${py * 10}px`);
  };
  const onImgLeave = () => {
    const el = imgWrapRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
  };

  const steps = [
    { icon: Mail, label: "E-mail recebido", color: "bg-secondary" },
    { icon: Brain, label: "IA processando", color: "bg-accent" },
    { icon: Database, label: "Lançado no ERP", color: "bg-gradient-brand" },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero">
      {/* Subtle animated grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" />

      {/* Decorative animated blobs */}
      <div className="pointer-events-none absolute -top-32 -right-20 h-[500px] w-[500px] animate-blob rounded-full bg-secondary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-[500px] w-[500px] animate-blob rounded-full bg-accent/25 blur-3xl [animation-delay:3s]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[400px] animate-blob rounded-full bg-primary/5 blur-3xl [animation-delay:6s]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute block h-1.5 w-1.5 animate-float rounded-full bg-gradient-brand opacity-50"
            style={{
              top: `${(i * 53) % 90 + 5}%`,
              left: `${(i * 37) % 90 + 5}%`,
              animationDelay: `${(i * 0.4) % 6}s`,
              animationDuration: `${6 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
        <div className="animate-fade-up space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur transition-all hover:scale-105 hover:border-secondary/40 hover:shadow-glow">
            <Sparkles className="h-3.5 w-3.5 animate-pulse-soft text-secondary" />
            Processamento automático de pedidos
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Automatize seus{" "}
            <span className="relative inline-block">
              <span className="text-gradient-animated">pedidos com IA</span>
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-brand opacity-60" />
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Chega de digitar pedidos manualmente. A Softeum transforma e-mails com PDF em pedidos prontos
            para o seu ERP em minutos, com zero esforço humano.
          </p>

          <ul className="grid gap-2.5 text-sm md:grid-cols-2">
            {["Zero digitação manual", "Até 95% de precisão na leitura", "Integração ou exportação para ERP", "Pedidos processados em minutos"].map((b, i) => (
              <li
                key={b}
                className="flex animate-fade-in items-center gap-2 transition-transform hover:translate-x-1"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span className="text-foreground/80">{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <MagneticButton>
              <Button asChild variant="hero" size="xl" className="group">
                <a href="#demo">
                  Agende uma demo gratuita
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <Button asChild variant="outline" size="xl">
                <a href="#funcionalidades">Ver funcionalidades</a>
              </Button>
            </MagneticButton>
          </div>

          <p className="text-xs text-muted-foreground">
            Seu cliente envia o pedido por e-mail com PDF em anexo. O Softeum lê, interpreta e processa automaticamente.
          </p>
        </div>

        <div
          ref={imgWrapRef}
          onMouseMove={onImgMove}
          onMouseLeave={onImgLeave}
          className="group relative animate-fade-up [animation-delay:200ms] [perspective:1200px]"
        >
          <div className="absolute -inset-6 animate-pulse-soft rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl" />

          <div
            className="relative transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform:
                "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translate3d(var(--tx,0), var(--ty,0), 0)",
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={heroImage}
              alt="Plataforma Softeum: pedidos por e-mail processados por IA e enviados ao ERP"
              width={1536}
              height={1024}
              className="relative w-full rounded-3xl border border-border/60 shadow-elegant"
            />

            {/* Floating stat cards (parallax-stacked) */}
            <div
              className="absolute -left-4 top-10 hidden animate-float rounded-2xl border border-border/60 bg-background/95 p-4 shadow-soft backdrop-blur md:block"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="text-xs text-muted-foreground">Pedidos processados hoje</div>
              <div className="font-display text-2xl font-bold tabular-nums">+{orders.toLocaleString("pt-BR")}</div>
            </div>
            <div
              className="absolute -right-2 bottom-8 hidden animate-float [animation-delay:1.5s] rounded-2xl border border-border/60 bg-background/95 p-4 shadow-soft backdrop-blur md:block"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="text-xs text-muted-foreground">Tempo economizado</div>
              <div className="font-display text-2xl font-bold tabular-nums text-gradient-brand">{time}%</div>
            </div>

            {/* Live processing pill */}
            <div
              className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-border/60 bg-background/95 px-4 py-2 shadow-elegant backdrop-blur md:flex"
              style={{ transform: "translate(-50%, 0) translateZ(100px)" }}
            >
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
      </div>

      {/* Carrossel de ganhos da solução */}
      <div className="border-y border-border/40 bg-background/40 backdrop-blur">
        <div className="container py-6">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            O que você ganha com a Softeum
          </p>
          <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-10 opacity-90 [animation-duration:60s] group-hover:[animation-duration:180s]">
              {[...Array(2)].map((_, k) =>
                [
                  "+98% de tempo economizado",
                  "−95% de erros nos pedidos",
                  "Pedidos faturados no mesmo dia",
                  "10x mais capacidade sem contratar",
                  "Equipe focada em vender, não digitar",
                  "Clientes recebendo no prazo",
                  "Operação rodando 24/7 sem parar",
                  "Margem maior, retrabalho zero",
                  "Escalabilidade sem aumentar custo",
                  "ROI já no primeiro mês",
                ].map((n, idx) => (
                  <span
                    key={`${k}-${idx}`}
                    className="group/item flex cursor-default items-center gap-3 whitespace-nowrap font-display text-lg font-bold tracking-tight text-muted-foreground transition-all duration-300 hover:scale-105 hover:text-foreground"
                  >
                    {n}
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-glow" />
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
