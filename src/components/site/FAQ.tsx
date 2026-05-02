import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso instalar algo?",
    a: "Não. O Softeum funciona 100% no navegador. Você acessa de qualquer computador, em qualquer lugar — sem instalação e sem manutenção.",
  },
  {
    q: "Funciona com o meu ERP?",
    a: "Sim. A Softeum integra com o seu ERP de duas formas: via API (o pedido entra direto, sem nenhum clique) ou por exportação no formato customizado que ele aceita. A própria IA analisa o layout que você já usa e gera CSV, XML, JSON ou XLSX exatamente nesse padrão. Funciona com SAP, TOTVS, Sankhya, Bling, Omie, Senior e ERPs personalizados.",
  },
  {
    q: "Como o sistema lê o pedido?",
    a: "Inteligência artificial extrai os dados do PDF anexado no e-mail. Funciona com qualquer formato de pedido — não é preciso que o seu cliente use um modelo específico.",
  },
  {
    q: "E se a IA errar algum dado?",
    a: "O sistema tem 8 regras de validação. Se houver qualquer inconsistência, o pedido fica pendente para revisão humana. Você sempre tem a palavra final antes de exportar.",
  },
  {
    q: "Quantos usuários posso cadastrar?",
    a: "Depende do plano contratado. Cada plano define um limite de membros, com 3 níveis de acesso: Administrador, Membro e Dono da Conta.",
  },
  {
    q: "Quantos pedidos posso processar?",
    a: "Depende do plano. Há opções para diferentes volumes mensais — fale com nosso comercial para encontrar a faixa ideal para sua operação.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Cada empresa tem seus dados completamente isolados (multi-tenant). Senhas nunca ficam expostas e a conexão com o e-mail da sua empresa é feita via protocolos seguros e padrão de mercado (OAuth quando disponível).",
  },
  {
    q: "Posso testar antes de assinar?",
    a: "Sim. Você pode testar gratuitamente por 5 dias úteis com acesso completo a todas as funcionalidades.",
  },
  {
    q: "Como começa a operação na minha empresa?",
    a: "Conectamos o e-mail da sua empresa, configuramos a integração com o ERP (via API ou exportação personalizada) e validamos os primeiros pedidos junto com você. A partir daí, a Softeum passa a processar tudo automaticamente, com o seu time apenas revisando o que precisa de atenção.",
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
