import { FileText, Zap, ShieldCheck, Workflow, BarChart3, Plug } from "lucide-react";

const features = [
  { icon: FileText, title: "Leitura inteligente de PDF", desc: "Extrai dados de qualquer layout de pedido — tabelas, observações, condições comerciais." },
  { icon: Plug, title: "Integração com seu ERP", desc: "Conecta via API a SAP, TOTVS, Sankhya, Bling, Omie e outros sistemas." },
  { icon: Zap, title: "Processamento em segundos", desc: "Do recebimento ao lançamento no ERP em menos de 1 minuto, 24 horas por dia." },
  { icon: ShieldCheck, title: "Validação automática", desc: "Confere códigos, preços e condições antes de lançar. Pedidos com divergência ficam em revisão." },
  { icon: Workflow, title: "Fluxo de aprovação", desc: "Configure regras: aprovação manual para pedidos acima de X, alertas, notificações." },
  { icon: BarChart3, title: "Dashboard e relatórios", desc: "Acompanhe volume de pedidos, tempo médio, taxa de erro e produtividade ganha." },
];

export const Features = () => {
  return (
    <section id="funcionalidades" className="bg-muted/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Funcionalidades</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Tudo que sua operação precisa para{" "}
            <span className="text-gradient-brand">automatizar pedidos</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma plataforma completa, pensada para empresas que recebem dezenas ou
            milhares de pedidos por e-mail.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
