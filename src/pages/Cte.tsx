import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/site/MagneticButton";
import { useReveal } from "@/hooks/use-reveal";
import { useCounter } from "@/hooks/use-counter";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Mail,
  Brain,
  Database,
  Clock,
  AlertTriangle,
  FileX,
  TrendingDown,
} from "lucide-react";
import heroCte from "@/assets/hero-cte.jpg";

const problems = [
  {
    icon: Clock,
    title: "Volume alto, time pequeno",
    desc: "Empresas que recebem dezenas de entregas por dia têm dezenas de CT-es para digitar. É trabalho operacional puro que toma tempo do financeiro.",
  },
  {
    icon: AlertTriangle,
    title: "Erros que viram prejuízo",
    desc: "Valor do frete errado, CFOP incorreto ou CNPJ trocado geram lançamentos errados, retrabalho contábil e problemas fiscais.",
  },
  {
    icon: FileX,
    title: "Prazo de pagamento perdido",
    desc: "CT-e com vencimento em 3 dias que ninguém viu a tempo vira multa e juros desnecessários.",
  },
  {
    icon: TrendingDown,
    title: "Sem rastreabilidade",
    desc: "Sem o CT-e lançado, não tem como cruzar o custo do frete com o pedido. A margem real da operação fica invisível.",
  },
];

const steps = [
  {
    n: "01",
    icon: Mail,
    title: "Receba o CT-e por e-mail",
    desc: "A transportadora envia o XML ou PDF do CT-e para o e-mail da empresa. A Softeum monitora a caixa de entrada e captura automaticamente.",
  },
  {
    n: "02",
    icon: Brain,
    title: "A IA extrai todos os dados",
    desc: "Valor do frete, remetente, destinatário, peso, CFOP, impostos (ICMS) e chave de acesso são lidos e validados em segundos.",
  },
  {
    n: "03",
    icon: Database,
    title: "Lançamento direto no ERP",
    desc: "Os dados chegam prontos no seu sistema via API ou exportação no formato que o ERP já aceita. Sem redigitar. Sem conferir campo por campo.",
  },
];

const fields = [
  "Valor do frete",
  "Remetente (razão social + CNPJ)",
  "Destinatário (razão social + CNPJ)",
  "Chave de acesso",
  "Data de emissão",
  "Data de vencimento",
  "Peso bruto e líquido",
  "Quantidade de volumes",
  "CFOP",
  "ICMS",
  "Base de cálculo",
  "Transportadora",
  "Placa do veículo",
  "Município de origem",
  "Município de destino",
];

const metrics: Array<{ value: number; suffix: string; label: string }> = [
  { value: 90, suffix: "%", label: "redução no tempo de lançamento de fretes" },
  { value: 100, suffix: "%", label: "dos campos extraídos com precisão" },
  { value: 0, suffix: "", label: "digitação manual na operação" },
  { value: 24, suffix: "/7", label: "monitorando novos CT-es sem parar" },
];

const MetricCard = ({ b, i, shown }: { b: typeof metrics[number]; i: number; shown: boolean }) => {
  const v = useCounter(b.value, shown, 1500 + i * 150);
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-elegant",
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

const Cte = () => {
  const problemReveal = useReveal<HTMLDivElement>();
  const stepsReveal = useReveal<HTMLDivElement>();
  const metricsReveal = useReveal<HTMLDivElement>();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Softeum CT-e",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Automatize a leitura e o lançamento de CT-e no seu ERP. A Softeum captura XML/PDF do e-mail, extrai todos os campos e integra direto ao sistema.",
  };

  return (
    <main className="min-h-screen bg-background font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-blob rounded-full bg-secondary/25 blur-3xl md:-top-32 md:h-[500px] md:w-[500px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 animate-blob rounded-full bg-accent/25 blur-3xl [animation-delay:3s] md:-bottom-32 md:h-[500px] md:w-[500px]" />

        <div className="container relative grid gap-10 py-14 md:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
          <div className="animate-fade-up space-y-6 text-center sm:text-left md:space-y-7">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 animate-pulse-soft text-secondary" />
              <span className="truncate">Automação fiscal</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Chega de digitar CT-e manualmente.
            </h1>

            <p className="font-display text-2xl font-bold leading-snug text-gradient-animated md:text-3xl">
              Frete automatizado do recebimento ao ERP.
            </p>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:mx-0 md:text-lg">
              Toda entrega que chega na sua empresa vem acompanhada de um CT-e — Conhecimento de
              Transporte Eletrônico. Hoje alguém do financeiro abre o PDF, digita valor do frete,
              remetente, destinatário, peso e impostos no sistema. Com a Softeum, isso para em
              segundos.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <MagneticButton className="w-full sm:w-auto">
                <Button asChild variant="hero" size="xl" className="group w-full sm:w-auto">
                  <a href="/#demo">
                    Agende uma demo gratuita
                    <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.15} className="w-full sm:w-auto">
                <Button asChild variant="outline" size="xl" className="w-full sm:w-auto">
                  <a href="#como-funciona-cte">Ver como funciona</a>
                </Button>
              </MagneticButton>
            </div>
          </div>

          <ul className="grid gap-4">
            {[
              "Zero digitação manual de CT-e",
              "100% dos dados extraídos automaticamente",
              "Integração direta com seu ERP",
            ].map((b, i) => (
              <li
                key={b}
                className="flex animate-fade-in items-center gap-3 rounded-2xl border border-border/60 bg-background/70 p-5 shadow-card backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-elegant"
                style={{ animationDelay: `${200 + i * 150}ms` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="font-display text-base font-semibold text-foreground/90 md:text-lg">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
              O problema
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Cada CT-e digitado na mão é{" "}
              <span className="text-gradient-brand">tempo e dinheiro perdido</span>
            </h2>
          </div>

          <div ref={problemReveal.ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p, i) => (
              <div
                key={p.title}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                }}
                className={cn(
                  "spotlight group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-secondary/40 hover:shadow-elegant",
                  problemReveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-x-0 -top-1 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:shadow-glow">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona-cte" className="relative bg-muted/40 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Como funciona
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Do e-mail ao ERP em <span className="text-gradient-brand">3 passos</span>
            </h2>
          </div>

          <div ref={stepsReveal.ref} className="relative grid gap-8 md:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block">
              <div
                className={cn(
                  "h-full bg-gradient-to-r from-secondary via-accent to-primary transition-all duration-1000",
                  stepsReveal.shown ? "w-full" : "w-0"
                )}
              />
            </div>

            {steps.map((s, i) => (
              <div
                key={s.n}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                }}
                className={cn(
                  "spotlight group relative rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-700 hover:-translate-y-2 hover:border-accent/40 hover:shadow-elegant",
                  stepsReveal.shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <s.icon className="h-7 w-7" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 blur-xl transition-opacity group-hover:opacity-60" />
                  </div>
                  <span className="font-display text-5xl font-extrabold text-muted-foreground/20 transition-all duration-500 group-hover:scale-110 group-hover:text-gradient-brand">
                    {s.n}
                  </span>
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE É EXTRAÍDO */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
              O que é extraído
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Todos os campos do CT-e,{" "}
              <span className="text-gradient-brand">sem nenhuma exceção</span>
            </h2>
          </div>

          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
            {fields.map((f, i) => (
              <span
                key={f}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 text-sm font-medium text-foreground/80 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-card hover:text-foreground hover:shadow-glow"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container">
          <div ref={metricsReveal.ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((b, i) => (
              <MetricCard key={b.label} b={b} i={i} shown={metricsReveal.shown} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden py-16 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-soft" />
        <div className="container relative">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-gradient-cta p-8 text-center text-primary-foreground shadow-elegant md:p-14">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Automação fiscal de ponta a ponta</span>
            </div>

            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Pare de perder tempo com CT-e.
            </h2>
            <p className="mt-4 font-display text-xl font-bold md:text-2xl">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Seu frete no ERP em minutos, não em horas.
              </span>
            </p>

            <div className="mt-8 flex justify-center">
              <MagneticButton>
                <Button asChild variant="hero" size="xl" className="group">
                  <a href="/#demo">
                    Quero automatizar meus CT-es
                    <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </MagneticButton>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/90">
              {["Demo gratuita", "Sem instalar nada", "Funciona com qualquer ERP"].map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cte;
