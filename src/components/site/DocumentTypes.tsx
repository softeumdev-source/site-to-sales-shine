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
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc, index) => (
            <div
              key={doc.title}
              className={
                "rounded-2xl border border-border bg-card p-6 shadow-card" +
                (index === 4 ? " sm:col-span-2 lg:col-span-1 lg:col-start-2" : "")
              }
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand p-3 text-white shadow-glow">
                <doc.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-bold text-base">{doc.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{doc.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
