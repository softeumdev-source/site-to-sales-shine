import { ArrowUpRight } from "lucide-react";
import { RevealItem, Stagger } from "@/components/site/motion";

/**
 * As 3 formas de o ERP receber o pedido (conforme docs.softeum.com.br),
 * apresentadas de forma sóbria: só texto, sem cores nem ilustração.
 */

const DOCS_URL = "https://docs.softeum.com.br/";

const ways = [
  {
    title: "Busca pela API",
    text: "O ERP consulta a API REST da Softeum e lança os pedidos prontos.",
  },
  {
    title: "Aviso no ERP",
    text: "A Softeum envia cada pedido aprovado para o endereço do ERP, na hora.",
  },
  {
    title: "Arquivo na pasta do ERP",
    text: "O pedido é gravado no layout que o ERP já importa: XML, CSV, TXT, SAP IDoc ou Protheus.",
  },
];

export const IntegrationWays = () => (
  <div className="mt-10">
    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Formas de integração</p>

    <Stagger as="ul" className="mt-3 divide-y divide-border border-y border-border" gap={0.08}>
      {ways.map((w) => (
        <RevealItem as="li" key={w.title} className="py-4">
          <p className="font-display text-lg font-semibold">{w.title}</p>
          <p className="mt-1 text-[15px] text-muted-foreground">{w.text}</p>
        </RevealItem>
      ))}
    </Stagger>

    <p className="mt-5 text-sm text-muted-foreground">
      O ERP também sincroniza produtos, compradores, vendedores e tabelas de preço.
    </p>
    <a
      href={DOCS_URL}
      target="_blank"
      rel="noreferrer"
      className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:underline hover:underline-offset-4"
    >
      Documentação técnica
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  </div>
);
