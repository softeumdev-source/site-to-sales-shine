import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import featureImg from "@/assets/feature-ai.jpg";
import { useReveal } from "@/hooks/use-reveal";
import { useCounter } from "@/hooks/use-counter";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

const benefits: Array<{ value: number; suffix: string; label: string }> = [
  { value: 98, suffix: "%", label: "menos tempo gasto digitando pedidos" },
  { value: 95, suffix: "%", label: "redução de erros operacionais" },
  { value: 24, suffix: "/7", label: "processando pedidos sem parar" },
  { value: 10, suffix: "x", label: "mais capacidade sem contratar" },
];

const items = [
  "Mais produtividade no dia a dia da equipe",
  "Escalabilidade sem aumentar custo de pessoal",
  "Pedidos faturados no mesmo dia",
  "Clientes mais satisfeitos com prazos cumpridos",
  "Funciona com qualquer ERP que tenha API",
  "Reconhece layouts variados de pedido em PDF",
];

const StatCard = ({ b, i, shown }: { b: typeof benefits[number]; i: number; shown: boolean }) => {
  const v = useCounter(b.value, shown, 1500 + i * 150);
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "spotlight group rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-elegant",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="font-display text-4xl font-extrabold tabular-nums text-gradient-brand md:text-5xl">
        {v}
        <span>{b.suffix}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{b.label}</p>
    </div>
  );
};

export const Benefits = () => {
  const stats = useReveal<HTMLDivElement>();
  const content = useReveal<HTMLDivElement>(0.2);

  return (
    <section id="beneficios" className="py-20 md:py-28">
      <div className="container">
        <div ref={stats.ref} className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <StatCard key={b.label} b={b} i={i} shown={stats.shown} />
          ))}
        </div>

        <div ref={content.ref} className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className={cn(
              "relative order-2 transition-all duration-700 lg:order-1",
              content.shown ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-15 blur-2xl" />
            <img
              src={featureImg}
              alt="IA da Softeum lendo PDF de pedido e estruturando em dados"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative w-full rounded-3xl border border-border shadow-elegant transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          <div
            className={cn(
              "order-1 transition-all duration-700 lg:order-2",
              content.shown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Por que a Softeum
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Enquanto a Softeum cuida dos pedidos,{" "}
              <span className="text-gradient-animated">você cuida do negócio</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tecnologia com IA que lê, entende e organiza pedidos automaticamente.
              Sua operação ganha velocidade, sua equipe ganha tempo, e seu negócio ganha escala.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {items.map((it, i) => (
                <li
                  key={it}
                  className={cn(
                    "flex items-start gap-2.5 transition-all duration-500",
                    content.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  )}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform group-hover:scale-110">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground/80">{it}</span>
                </li>
              ))}
            </ul>

            <MagneticButton>
              <Button asChild variant="hero" size="lg" className="mt-8">
                <a href="#demo">Quero conhecer a Softeum</a>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
