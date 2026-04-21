import { AlertTriangle, Clock, FileX, TrendingDown } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const problems = [
  { icon: Clock, title: "Excesso de digitação manual", desc: "Sua equipe gasta horas todo dia copiando pedidos do e-mail para o ERP." },
  { icon: AlertTriangle, title: "Alto índice de erros", desc: "Códigos trocados, quantidades erradas, pedidos perdidos no inbox." },
  { icon: FileX, title: "Processos lentos e gargalos", desc: "Pedidos que demoram horas (ou dias) para virar nota fiscal." },
  { icon: TrendingDown, title: "Dificuldade para escalar", desc: "Mais clientes = mais gente digitando. Crescimento limitado pela operação." },
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
            Pedidos por e-mail estão{" "}
            <span className="text-gradient-brand">travando seu negócio</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Empresas que recebem pedidos por e-mail enfrentam desafios diários
            que impactam a eficiência, a margem e o crescimento.
          </p>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant",
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-x-0 -top-1 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground">
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
