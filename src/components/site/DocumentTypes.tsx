import { ShoppingCart, Receipt, Truck, CreditCard, Package } from "lucide-react";

const documents = [
  {
    icon: ShoppingCart,
    title: "Pedido de Venda",
    description: "PDF do representante direto para o ERP, sem digitar",
  },
  {
    icon: Receipt,
    title: "NFS-e",
    description: "Nota Fiscal de Serviço de qualquer município do Brasil",
  },
  {
    icon: Truck,
    title: "CT-e",
    description: "Conhecimento de Transporte, frete processado automaticamente",
  },
  {
    icon: CreditCard,
    title: "Boleto / Fatura",
    description: "Vencimento, valor e código de barras extraídos sem digitar",
  },
  {
    icon: Package,
    title: "NF-e de Entrada",
    description: "Nota fiscal de produto de fornecedor lançada no ERP",
  },
];

export const DocumentTypes = () => {
  return (
    <section id="documentos" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Documentos suportados
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Muito além de pedidos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            O Softeum processa qualquer documento fiscal que chega no seu e-mail
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc, i) => (
            <div
              key={doc.title}
              className={
                "animate-fade-in flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant" +
                (i === 4 ? " sm:col-span-2 lg:col-span-1 lg:col-start-2" : "")
              }
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                <doc.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">{doc.title}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{doc.description}</span>
                <span className="mt-2 w-fit rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
                  Disponível
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
