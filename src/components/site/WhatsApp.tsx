import { FileText, Bot, MessageCircle, CheckCircle2, ArrowRight, Sparkles, Database } from "lucide-react";
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

        {/* Visual moderno: jornada do pedido */}
        <div className="mx-auto mb-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-card backdrop-blur md:p-10">
            {/* glow background */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gradient-cta opacity-20 blur-3xl" />

            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {/* Origem: cliente */}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background shadow-soft">
                  <MessageCircle className="h-8 w-8" style={{ color: "#25D366" }} />
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "#25D366" }} />
                    <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: "#25D366" }} />
                  </span>
                </div>
                <p className="mt-3 font-display text-sm font-bold">Cliente no WhatsApp</p>
                <p className="text-xs text-muted-foreground">Inicia o pedido</p>
              </div>

              {/* Conector 1 */}
              <div className="hidden items-center md:flex">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
              </div>

              {/* Bifurcação: dois caminhos */}
              <div className="flex flex-col gap-3">
                <div className="group flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-elegant">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold leading-tight">Envia PDF</p>
                    <p className="text-xs text-muted-foreground">Softeum lê e extrai</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 rounded-2xl border border-border bg-background/80 p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-elegant">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold leading-tight">Conversa com IA</p>
                    <p className="text-xs text-muted-foreground">Fecha pedido natural</p>
                  </div>
                </div>
              </div>

              {/* Conector 2 */}
              <div className="hidden items-center md:flex">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
              </div>

              {/* Destino */}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-cta text-primary-foreground shadow-elegant">
                  <Database className="h-8 w-8" />
                  <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-accent" />
                </div>
                <p className="mt-3 font-display text-sm font-bold">Pedido no ERP</p>
                <p className="text-xs text-muted-foreground">Pronto pra faturar</p>
              </div>
            </div>

            {/* Linha de status / chip inferior */}
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Validação automática
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Confirmação no WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Integração via API ou exportação
              </span>
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
