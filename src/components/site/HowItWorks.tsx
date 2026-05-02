import { Mail, Brain, Database, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    icon: Mail,
    title: "Conecte o e-mail da sua empresa",
    desc: "Em poucos cliques você conecta o e-mail comercial à Softeum, com autenticação segura. A partir daí, todo pedido recebido entra no fluxo automaticamente.",
  },
  {
    n: "02",
    icon: Brain,
    title: "A IA lê e valida cada pedido",
    desc: "Nossa IA extrai produto, quantidade, valor, comprador, CNPJ e prazo de qualquer PDF, em segundos. Regras de validação garantem que nada passe errado para o ERP.",
  },
  {
    n: "03",
    icon: Database,
    title: "Pedido entregue no seu ERP",
    desc: "Integração direta via API ou exportação no formato exato do seu ERP. O pedido cai pronto pra faturar, sem digitar, sem retrabalho, sem dor de cabeça.",
  },
];

export const HowItWorks = () => {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="como-funciona" className="relative bg-muted/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Como funciona
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Do e-mail ao seu ERP em{" "}
            <span className="text-gradient-brand">3 passos</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A Softeum recebe, interpreta e entrega o pedido no seu ERP. Você só revisa o que precisa.
          </p>
        </div>

        <div ref={ref} className="relative grid gap-8 md:grid-cols-3">
          {/* Animated connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block">
            <div
              className={cn(
                "h-full bg-gradient-to-r from-secondary via-accent to-primary transition-all duration-1000",
                shown ? "w-full" : "w-0"
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
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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

              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 animate-bounce-soft text-accent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
