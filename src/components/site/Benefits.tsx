import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import featureImg from "@/assets/feature-ai.jpg";

const benefits = [
  { stat: "98%", label: "menos tempo gasto digitando pedidos" },
  { stat: "95%", label: "redução de erros operacionais" },
  { stat: "24/7", label: "processando pedidos sem parar" },
  { stat: "10x", label: "mais capacidade sem contratar" },
];

const items = [
  "Mais produtividade no dia a dia da equipe",
  "Escalabilidade sem aumentar custo de pessoal",
  "Pedidos faturados no mesmo dia",
  "Clientes mais satisfeitos com prazos cumpridos",
  "Funciona com qualquer ERP que tenha API",
  "Reconhece layouts variados de pedido em PDF",
];

export const Benefits = () => {
  return (
    <section id="beneficios" className="py-20 md:py-28">
      <div className="container">
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <div className="font-display text-4xl font-extrabold text-gradient-brand md:text-5xl">{b.stat}</div>
              <p className="mt-2 text-sm text-muted-foreground">{b.label}</p>
            </div>
          ))}
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-15 blur-2xl" />
            <img
              src={featureImg}
              alt="IA da Softeum lendo PDF de pedido e estruturando em dados"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative w-full rounded-3xl border border-border shadow-elegant"
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Por que a Softeum
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Enquanto a Softeum cuida dos pedidos,{" "}
              <span className="text-gradient-brand">você cuida do negócio</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tecnologia com IA que lê, entende e organiza pedidos automaticamente.
              Sua operação ganha velocidade, sua equipe ganha tempo, e seu negócio ganha escala.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {items.map((it) => (
                <li key={it} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm text-foreground/80">{it}</span>
                </li>
              ))}
            </ul>

            <Button asChild variant="hero" size="lg" className="mt-8">
              <a href="#demo">Quero conhecer a Softeum</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
