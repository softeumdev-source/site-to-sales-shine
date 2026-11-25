import { BellRing, Check, Keyboard, ShieldCheck, TrendingUp, Users, X } from "lucide-react";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";

const before = ["Abrir cada e-mail e mensagem", "Baixar e abrir o anexo", "Digitar item por item no ERP", "Conferir e corrigir erros", "Responder o cliente"];
const after = ["O pedido entra sozinho no ERP", "Sua equipe só revisa o que for diferente"];

const benefits = [
  {
    icon: Keyboard,
    title: "Fim da digitação manual",
    text: "Nenhum pedido é copiado à mão. A Softeum lê o documento e lança no ERP, do jeito que ele aceita.",
  },
  {
    icon: ShieldCheck,
    title: "Menos erros e retrabalho",
    text: "Validadores conferem cliente, produtos, quantidades e valores antes de lançar. Código trocado não passa.",
  },
  {
    icon: BellRing,
    title: "Nenhum pedido esquecido",
    text: "Todo pedido que chega no e-mail ou no WhatsApp é capturado, a qualquer hora, inclusive fora do expediente.",
  },
  {
    icon: Users,
    title: "Equipe focada em vender",
    text: "Quem passava o dia digitando volta a atender clientes e a vender mais.",
  },
  {
    icon: TrendingUp,
    title: "Cresça sem contratar para digitar",
    text: "Mais clientes e mais pedidos sem aumentar o time operacional.",
  },
];

export const WhyAutomate = () => (
  <section id="beneficios" className="relative py-20 md:py-28">
    <div className="container grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
      <div>
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Por que automatizar</span>
        </Reveal>
        <RevealHeading
          text="Pare de digitar pedidos. Automatize o fluxo de ponta a ponta."
          delay={0.1}
          className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        />
        <Reveal delay={0.3}>
          <p className="mt-5 text-lg text-muted-foreground">
            Em muitas empresas, cada pedido ainda passa pelas mãos de alguém: abrir o e-mail, ler o PDF, digitar no ERP e
            conferir. A Softeum faz esse trabalho sozinha, com a mesma atenção de uma pessoa e sem cansar.
          </p>
        </Reveal>

        {/* antes x depois */}
        <Reveal delay={0.4} className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted/50 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Hoje, sem Softeum</p>
            <ul className="mt-3 space-y-2">
              {before.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-secondary" strokeWidth={3} />
                  <span className="line-through decoration-secondary/40">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-elegant">
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">Com Softeum</p>
            <ul className="mt-3 space-y-2">
              {after.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-medium">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" strokeWidth={3} />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/60">Do recebimento ao ERP, sem digitar.</p>
          </div>
        </Reveal>
      </div>

      <Stagger className="grid content-center gap-x-10 gap-y-9 sm:grid-cols-2" gap={0.08} delay={0.2}>
        {benefits.map((b, i) => (
          <RevealItem key={b.title} className={i === benefits.length - 1 ? "sm:col-span-2" : undefined}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <b.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{b.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{b.text}</p>
          </RevealItem>
        ))}
      </Stagger>
    </div>
  </section>
);
