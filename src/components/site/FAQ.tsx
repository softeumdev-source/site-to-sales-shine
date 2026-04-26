import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Em quanto tempo o sistema entra em operação?",
    a: "Em até 3 dias úteis a Softeum já está rodando na sua operação, conectada ao seu e-mail e ao seu ERP, processando pedidos reais automaticamente.",
  },
  {
    q: "Funciona com qual ERP?",
    a: "A Softeum pode integrar com ERPs via API ou gerar arquivos exatamente no formato aceito pelo seu sistema, como CSV, XML, JSON ou XLSX.",
  },
  {
    q: "E se o pedido vier em um layout diferente?",
    a: "Nossa IA é treinada para interpretar layouts variados. Para clientes recorrentes que usam um modelo específico, criamos um perfil dedicado que aumenta a precisão para próximo de 100%.",
  },
  {
    q: "Os pedidos com erro são lançados mesmo assim?",
    a: "Não. Pedidos com qualquer divergência (preço, código não encontrado, condição inválida) ficam em uma fila de revisão para sua equipe aprovar com 1 clique. Isso garante segurança total.",
  },
  {
    q: "Quanto custa?",
    a: "A Softeum possui planos Starter, Business, Corporate e Enterprise, variando conforme número de acessos, volume de pedidos e necessidade da operação.",
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
