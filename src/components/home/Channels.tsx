import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Check, Mail, MessageCircle } from "lucide-react";
import gmail from "@/assets/brands/gmail.svg";
import outlook from "@/assets/brands/outlook.svg";
import whatsappLogo from "@/assets/brands/whatsapp.svg";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { useFitScale } from "@/hooks/use-fit-scale";
import { cn } from "@/lib/utils";
import { MAIL_H, MAIL_W, MailWindow } from "./EmailFlow";
import { PhoneChat } from "./AiSeller";

/**
 * Seções separadas para e-mail e WhatsApp. A demonstração fica fixa na tela e
 * avança conforme a rolagem: o e-mail chega, abre, é lido e lançado; a conversa
 * do WhatsApp vai aparecendo mensagem por mensagem.
 */

/** Progresso 0 → 1 conforme a rolagem passa pela área alta da seção (a demonstração fica fixa na tela). */
function useScrollProgress() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [p, setP] = useState(reduce ? 0.95 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => !reduce && setP(Math.min(1, v * 1.05)));
  return { ref, p, reduce };
}

const Bullets = ({ items, color }: { items: string[]; color: string }) => (
  <Stagger as="ul" className="mt-6 space-y-3" delay={0.3} gap={0.08}>
    {items.map((b) => (
      <RevealItem as="li" from="left" key={b} className="flex items-start gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: color }}>
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
        <span className="text-[15px]">{b}</span>
      </RevealItem>
    ))}
  </Stagger>
);

/* ------------------------------------ E-mail ----------------------------------- */

const emailSteps = ["O pedido chega no e-mail", "O e-mail é aberto", "A Softeum lê o anexo", "Os validadores conferem", "Lançado no ERP"];
const emailStepAt = [0, 0.16, 0.3, 0.6, 0.8];

const EmailText = () => (
  <>
    <Reveal>
      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0b57d0]">
        <Mail className="h-4 w-4" /> Pedidos por e-mail
      </span>
    </Reveal>
    <RevealHeading
      text="O pedido chega no e-mail e entra no ERP sem ninguém abrir."
      delay={0.1}
      className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-[2.6rem] md:leading-[1.1]"
    />
    <Reveal delay={0.25}>
      <p className="mt-5 text-lg text-muted-foreground">
        A Softeum monitora a caixa comercial da sua empresa. Quando chega um pedido, ela abre o anexo, lê cada item,
        confere tudo e lança no ERP. Sua equipe não precisa copiar nem digitar nada.
      </p>
    </Reveal>
    <Bullets
      color="#0b57d0"
      items={[
        "Lê PDF, planilha, imagem e pedido escrito no corpo do e-mail",
        "Pedidos com muitos itens e layouts diferentes de cada cliente",
        "Avisa o cliente que o pedido foi recebido",
      ]}
    />
    <Reveal delay={0.4} className="mt-7 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <span>Funciona com</span>
      <img src={gmail} alt="Gmail" className="h-5 w-auto" />
      <img src={outlook} alt="Outlook" className="h-6 w-auto" />
      <span>e e-mail corporativo</span>
    </Reveal>
  </>
);

const StepCaption = ({ steps, active, color }: { steps: string[]; active: number; color: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex gap-1">
      {steps.map((_, i) => (
        <span key={i} className="h-1.5 w-5 rounded-full transition-colors" style={{ background: i <= active ? color : "hsl(var(--border))" }} />
      ))}
    </div>
    <p className="text-sm font-semibold">{steps[active]}</p>
  </div>
);

export const EmailShowcase = () => {
  const { ref, p, reduce } = useScrollProgress();
  const { ref: fitRef, scale } = useFitScale(MAIL_W);
  const compact = scale < 0.72;
  const dw = compact ? 540 : MAIL_W;
  const s = Math.min(1, (scale * MAIL_W) / dw);
  const active = emailStepAt.reduce((acc, at, i) => (p >= at ? i : acc), 0);

  return (
    <section id="email" className="relative">
      {/* celular: texto completo antes da animação */}
      <div className="container pt-20 lg:hidden">
        <EmailText />
      </div>

      <div ref={ref} className={cn("relative", !reduce && "h-[300vh]")}>
        <div className={cn("flex items-center", reduce ? "py-16" : "sticky top-0 h-[100svh] pt-16")}>
          <div className="container grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div className="hidden lg:block">
              <EmailText />
              <div className="mt-8">
                <StepCaption steps={emailSteps} active={active} color="#0b57d0" />
              </div>
            </div>
            <div className="lg:hidden">
              <StepCaption steps={emailSteps} active={active} color="#0b57d0" />
            </div>

            <div ref={fitRef} className="relative w-full [overflow:clip] [overflow-clip-margin:30px]" style={{ height: MAIL_H * s }}>
              <div className="origin-top-left" style={{ width: dw, height: MAIL_H, transform: `scale(${s})` }}>
                <MailWindow p={p} compact={compact} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ----------------------------------- WhatsApp ---------------------------------- */

const waSkills = [
  { title: "Conversa como um vendedor", text: "Atende com naturalidade, 24 horas por dia." },
  { title: "Entende áudio", text: "O cliente fala e a IA anota o pedido." },
  { title: "Conhece o seu catálogo", text: "Explica produtos e sugere o que o cliente costuma comprar." },
  { title: "Fecha e lança no ERP", text: "Confirma com o cliente e envia o pedido validado." },
];

const WaText = ({ active }: { active: number }) => (
  <>
    <Reveal>
      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0a9b52]">
        <MessageCircle className="h-4 w-4" /> IA vendedora no WhatsApp
      </span>
    </Reveal>
    <RevealHeading
      text="Um vendedor de IA que atende, tira dúvidas e fecha o pedido."
      delay={0.1}
      className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-[2.6rem] md:leading-[1.1]"
    />
    <Reveal delay={0.25}>
      <p className="mt-5 text-lg text-muted-foreground">
        Seus clientes já compram pelo WhatsApp. A IA da Softeum conversa como um vendedor da sua equipe, confirma o pedido
        com o cliente e lança no ERP. Ela também recebe pedidos em PDF, foto ou planilha.
      </p>
    </Reveal>
    <Stagger as="ol" className="mt-7 grid gap-3 sm:grid-cols-2" delay={0.3} gap={0.08}>
      {waSkills.map((s, i) => (
        <RevealItem
          as="li"
          key={s.title}
          className={cn(
            "rounded-2xl border p-4 transition-all duration-300",
            i === active ? "border-[#25D366]/40 bg-white shadow-card" : "border-transparent bg-white/50"
          )}
        >
          <p className="flex items-center gap-2 font-display font-bold">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs text-white transition-colors",
                i <= active ? "bg-[#25D366]" : "bg-[#9fb8a8]"
              )}
            >
              {i + 1}
            </span>
            {s.title}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
        </RevealItem>
      ))}
    </Stagger>
  </>
);

export const WhatsAppShowcase = () => {
  const { ref, p, reduce } = useScrollProgress();
  const active = p < 0.16 ? 0 : p < 0.3 ? 1 : p < 0.66 ? 2 : 3;

  return (
    <section id="whatsapp" className="relative bg-[#f1fbf5]">
      <div className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(37,211,102,.18),transparent_65%)]" />

      {/* celular: texto completo antes da conversa */}
      <div className="container relative pt-20 lg:hidden">
        <WaText active={active} />
      </div>

      <div ref={ref} className={cn("relative", !reduce && "h-[320vh]")}>
        <div className={cn("flex items-center", reduce ? "py-16" : "sticky top-0 h-[100svh] pt-16")}>
          <div className="container relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* celular com a conversa */}
            <div className="flex justify-center [perspective:1400px]">
              <div className="relative [transform-style:preserve-3d]" style={{ transform: "rotateY(10deg) rotateX(4deg)" }}>
                <div className="relative h-[min(580px,72svh)] w-[min(300px,37svh)] overflow-hidden rounded-[2.8rem] border-[10px] border-[#121a2b] bg-[#121a2b] shadow-[0_50px_80px_-20px_rgba(10,60,30,.35)]">
                  <span className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#121a2b]" />
                  <div className="h-full overflow-hidden rounded-[2rem]">
                    <PhoneChat p={p} />
                  </div>
                </div>
                <img
                  src={whatsappLogo}
                  alt=""
                  className="absolute -right-8 -top-6 h-16 w-16 drop-shadow-[0_12px_20px_rgba(37,211,102,.45)]"
                  style={{ transform: "translateZ(60px)" }}
                />
              </div>
            </div>

            <div className="hidden lg:block">
              <WaText active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
