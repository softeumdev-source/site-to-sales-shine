import { FileText, Bot, MessageCircle, ArrowDown, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const flows = [
  {
    icon: FileText,
    title: "Envio direto por PDF",
    desc: "O cliente envia um PDF de pedido pelo WhatsApp — o Softeum detecta automaticamente, extrai os dados, valida os itens e envia direto para o seu ERP via API ou exportação. Sem redigitar. Sem retrabalho. Zero fricção para o cliente.",
    bullets: [
      "Leitura automática do PDF recebido no WhatsApp",
      "Validação de itens, quantidades e códigos",
      "Envio automático para o ERP via API REST",
      "Exportação disponível como alternativa (CSV, JSON)",
      "Confirmação automática enviada ao cliente no próprio WhatsApp",
    ],
  },
  {
    icon: Bot,
    title: "IA que fecha pedidos como um vendedor",
    desc: "Quando o cliente não envia um PDF, a IA entra em ação. Ela conversa de forma natural e humanizada, explica os produtos do catálogo, tira dúvidas sobre características e aplicações, fecha o pedido completo e envia direto para o sistema — tudo sem intervenção humana.",
    bullets: [
      "Conversa humanizada, sem respostas robóticas",
      "Explica produtos: características, aplicações e diferenciais",
      "Tira dúvidas sobre o catálogo antes de fechar o pedido",
      "Entende linguagem natural: \"quero 10 caixas do produto X\"",
      "Confirma o pedido com o cliente antes de enviar",
      "Integração direta com o ERP após confirmação",
      "Disponível 24h, sem precisar de vendedor online",
    ],
  },
];

export const WhatsAppSection = () => {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="whatsapp" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-soft opacity-60" />

      <div className="container relative">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
            <MessageCircle className="h-4 w-4" style={{ color: "#25D366" }} />
            Pedidos pelo WhatsApp
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            PDF ou conversa,{" "}
            <span className="text-gradient-brand">você escolhe</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Seus clientes já estão no WhatsApp. Agora o Softeum também.
          </p>
        </div>

        {/* Mini fluxo visual */}
        <div className="mx-auto mb-14 max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="flex flex-col items-center gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-medium">
              <MessageCircle className="h-4 w-4" style={{ color: "#25D366" }} />
              Cliente no WhatsApp
            </div>
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
            <div className="grid w-full gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full border border-border bg-background px-4 py-2 font-medium">Envia PDF</div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-white shadow-glow">
                  <FileText className="h-4 w-4" />
                  Softeum lê
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full border border-border bg-background px-4 py-2 font-medium">Não tem PDF</div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-white shadow-glow">
                  <Bot className="h-4 w-4" />
                  IA conversa
                </div>
              </div>
            </div>
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
            <div className="rounded-full border border-border bg-background px-4 py-2 font-medium">Pedido validado</div>
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
            <div className="rounded-full bg-gradient-cta px-5 py-2 font-semibold text-primary-foreground shadow-elegant">
              ERP / Exportação
            </div>
          </div>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid gap-6 md:grid-cols-2 md:gap-8">
          {flows.map((f, i) => (
            <div
              key={f.title}
              className={cn(
                "group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-700 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant md:p-8",
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <f.icon className="h-7 w-7" />
                </div>
                <MessageCircle className="h-6 w-6" style={{ color: "#25D366" }} />
              </div>
              <h3 className="mb-3 font-display text-xl font-bold md:text-2xl">{f.title}</h3>
              <p className="mb-5 text-muted-foreground">{f.desc}</p>
              <ul className="space-y-2.5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="hero" size="xl" className="h-auto min-h-14 whitespace-normal px-6 text-center">
            <a href="#demo">
              Quero receber pedidos pelo WhatsApp
              <ArrowRight className="ml-1 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
