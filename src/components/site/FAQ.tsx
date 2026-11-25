import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso instalar algo?",
    a: "Não. A Softeum funciona no navegador. Você acessa de qualquer computador, sem instalação e sem manutenção.",
  },
  {
    q: "Funciona com o meu ERP?",
    a: "Sim. Integramos via API (o pedido entra direto no ERP) ou geramos o arquivo de importação (CSV, XML, JSON ou XLSX) no layout exato que o seu ERP aceita. Atendemos SAP, TOTVS, Sankhya, Senior, Omie, Bling e outros ERPs de mercado, além de sistemas próprios.",
  },
  {
    q: "Que tipos de pedido a Softeum lê?",
    a: "PDF, planilha, XML, CSV, Word, foto ou print do pedido, mensagem de texto e áudio de WhatsApp. O seu cliente não precisa usar nenhum modelo específico.",
  },
  {
    q: "Como funciona a IA vendedora no WhatsApp?",
    a: "Ela conversa com o seu cliente como um vendedor: entende texto e áudio, explica os produtos do seu catálogo, monta o pedido, confirma com o cliente e envia para o ERP. Atende 24 horas por dia.",
  },
  {
    q: "E se a IA errar algum dado?",
    a: "Todo pedido passa pelos validadores antes de ir para o ERP. Se algo estiver diferente do esperado, o pedido fica aguardando a sua revisão. Você sempre tem a palavra final.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Os dados de cada empresa ficam isolados, com controle de acesso por usuário e conexão ao e-mail feita por protocolos seguros e padrão de mercado.",
  },
  {
    q: "Posso testar antes de contratar?",
    a: "Sim. Você testa grátis por 5 dias úteis, com acesso completo. Agende uma demonstração e a gente configura junto com você.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="bg-muted/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-2 shadow-card">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0 px-4">
                <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
