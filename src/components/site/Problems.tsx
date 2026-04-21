import { AlertTriangle, Clock, FileX, TrendingDown } from "lucide-react";

const problems = [
  { icon: Clock, title: "Excesso de digitação manual", desc: "Sua equipe gasta horas todo dia copiando pedidos do e-mail para o ERP." },
  { icon: AlertTriangle, title: "Alto índice de erros", desc: "Códigos trocados, quantidades erradas, pedidos perdidos no inbox." },
  { icon: FileX, title: "Processos lentos e gargalos", desc: "Pedidos que demoram horas (ou dias) para virar nota fiscal." },
  { icon: TrendingDown, title: "Dificuldade para escalar", desc: "Mais clientes = mais gente digitando. Crescimento limitado pela operação." },
];

export const Problems = () => {
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
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
