import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import gmail from "@/assets/brands/gmail.svg";
import outlook from "@/assets/brands/outlook.svg";
import whatsappLogo from "@/assets/brands/whatsapp.svg";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { useFitScale } from "@/hooks/use-fit-scale";
import { cn } from "@/lib/utils";
import { MAIL_H, MAIL_W, MailWindow } from "./EmailFlow";
import { PhoneChat } from "./AiSeller";

/**
 * Seções separadas para e-mail e WhatsApp. Cada uma tem o seu texto e a sua
 * demonstração, que toca sozinha em loop enquanto está visível (pausa no mouse).
 */

/** Progresso 0 → 1 em `duration` ms, em loop, só com o elemento visível. */
function useLoop(duration: number) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [paused, setPaused] = useState(false);
  const [p, setP] = useState(reduce ? 0.95 : 0);
  const v = useRef(0);

  useEffect(() => {
    if (reduce || !inView || paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      v.current += (now - last) / duration;
      last = now;
      if (v.current > 1.2) v.current = 0; // segura o final um instante e recomeça
      setP(Math.min(1, v.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, inView, paused, reduce]);

  return { ref, p, setPaused };
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

const DemoLink = () => (
  <a href="#demo" className="group mt-8 inline-flex items-center gap-1.5 font-semibold underline decoration-secondary decoration-2 underline-offset-4">
    Ver com os pedidos da minha empresa
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </a>
);

/* ------------------------------------ E-mail ----------------------------------- */

export const EmailShowcase = () => {
  const { ref, p, setPaused } = useLoop(13000);
  const { ref: fitRef, scale } = useFitScale(MAIL_W);
  const compact = scale < 0.72;
  const dw = compact ? 540 : MAIL_W;
  const s = Math.min(1, (scale * MAIL_W) / dw);

  return (
    <section ref={ref} id="email" className="relative py-20 md:py-28">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0b57d0]">
              <Mail className="h-4 w-4" /> Pedidos por e-mail
            </span>
          </Reveal>
          <RevealHeading
            text="O pedido chega no e-mail e entra no ERP sem ninguém abrir."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-[2.75rem] md:leading-[1.1]"
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
          <DemoLink />
        </div>

        <div
          ref={fitRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative w-full [overflow:clip] [overflow-clip-margin:30px]"
          style={{ height: MAIL_H * s }}
        >
          <div className="origin-top-left" style={{ width: dw, height: MAIL_H, transform: `scale(${s})` }}>
            <MailWindow p={p} compact={compact} />
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

export const WhatsAppShowcase = () => {
  const { ref, p, setPaused } = useLoop(12000);
  const active = p < 0.16 ? 0 : p < 0.3 ? 1 : p < 0.66 ? 2 : 3;

  return (
    <section ref={ref} id="whatsapp" className="relative overflow-hidden bg-[#f1fbf5] py-20 md:py-28">
      <div className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(37,211,102,.18),transparent_65%)]" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* celular */}
        <Reveal from="scale" className="order-2 flex justify-center lg:order-1">
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative [perspective:1400px]">
            <div className="relative [transform-style:preserve-3d]" style={{ transform: "rotateY(10deg) rotateX(4deg)" }}>
              <div className="relative h-[580px] w-[300px] overflow-hidden rounded-[2.8rem] border-[10px] border-[#121a2b] bg-[#121a2b] shadow-[0_50px_80px_-20px_rgba(10,60,30,.35)]">
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
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0a9b52]">
              <MessageCircle className="h-4 w-4" /> IA vendedora no WhatsApp
            </span>
          </Reveal>
          <RevealHeading
            text="Um vendedor de IA que atende, tira dúvidas e fecha o pedido."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-[2.75rem] md:leading-[1.1]"
          />
          <Reveal delay={0.25}>
            <p className="mt-5 text-lg text-muted-foreground">
              Seus clientes já compram pelo WhatsApp. A IA da Softeum conversa como um vendedor da sua equipe, confirma o
              pedido com o cliente e lança no ERP. Ela também recebe pedidos em PDF, foto ou planilha.
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
          <DemoLink />
        </div>
      </div>
    </section>
  );
};
