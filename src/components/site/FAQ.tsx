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
    a: "Sim. O sistema gera exportações no formato customizado para o seu ERP. A própria IA analisa o layout que você usa hoje e adapta — CSV, XML, JSON ou XLSX.",
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
    a: "Sim. Cada empresa tem seus dados completamente isolados (multi-tenant). Senhas nunca ficam expostas e a conexão com o Gmail é via OAuth, padrão Google de segurança.",
  },
  {
    q: "Posso testar antes de assinar?",
    a: "Sim. Temos um modo demo com dados fictícios realistas e cenários simulados para você explorar todas as funcionalidades antes de contratar.",
  },
  {
    q: "Em quanto tempo o sistema entra em operação?",
    a: "Em até 3 dias úteis a Softeum já está rodando na sua operação, conectada ao seu e-mail e ao seu ERP, processando pedidos reais automaticamente.",
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
