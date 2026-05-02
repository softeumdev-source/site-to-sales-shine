import { AlertTriangle, Clock, FileX, TrendingDown } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const problems = [
  { icon: Clock, title: "Horas perdidas todo dia digitando", desc: "Seu time gasta horas copiando pedidos do e-mail para o ERP — tempo que deveria estar em vendas, não em retrabalho." },
  { icon: AlertTriangle, title: "Erros que custam caro", desc: "Códigos trocados, quantidades erradas e valores incorretos viram devolução, retrabalho e cliente insatisfeito." },
  { icon: FileX, title: "Pedidos esquecidos no inbox", desc: "Mensagem que ninguém abriu vira pedido não faturado, prazo perdido e venda que escapa." },
  { icon: TrendingDown, title: "Crescimento travado pela operação", desc: "Cada cliente novo significa mais gente digitando. Você não escala — só contrata mais." },
];

export const Problems = () => {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="problemas" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            O problema
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Cada pedido digitado na mão é{" "}
            <span className="text-gradient-brand">dinheiro saindo do caixa</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Se sua empresa recebe pedidos por e-mail, todo dia você perde tempo, comete erros e
            deixa receita na mesa. A boa notícia: dá pra acabar com isso.
          </p>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
  );
};
