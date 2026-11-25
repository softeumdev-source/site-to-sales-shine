import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { Reveal, RevealHeading } from "@/components/site/motion";
import { useFitScale } from "@/hooks/use-fit-scale";
import { cn } from "@/lib/utils";
import { MAIL_H, MAIL_W, MailWindow } from "./EmailFlow";
import { PhoneChat } from "./AiSeller";

/**
 * E-mail e WhatsApp numa seção só, com abas. A demonstração de cada canal
 * toca sozinha (não depende da rolagem) e, ao terminar, passa para a outra aba.
 */

type Key = "email" | "whatsapp";

const channels: Record<
  Key,
  { tab: string; icon: typeof Mail; color: string; title: string; text: string; bullets: string[]; duration: number }
> = {
  email: {
    tab: "Pedidos por e-mail",
    icon: Mail,
    color: "#0b57d0",
    title: "O pedido chega no e-mail e entra no ERP sem ninguém abrir.",
    text: "A Softeum monitora a caixa comercial da sua empresa. Quando chega um pedido, ela abre o anexo, lê cada item, confere tudo e lança no ERP. Sua equipe não precisa copiar nem digitar nada.",
    bullets: [
      "Funciona com o e-mail que você já usa (Gmail, Outlook ou corporativo)",
      "Lê PDF, planilha, imagem e pedido escrito no corpo do e-mail",
      "Pedidos com muitos itens e layouts diferentes de cada cliente",
      "Avisa o cliente que o pedido foi recebido",
    ],
    duration: 13000,
  },
  whatsapp: {
    tab: "IA vendedora no WhatsApp",
    icon: MessageCircle,
    color: "#0a9b52",
    title: "Um vendedor de IA que atende, tira dúvidas e fecha o pedido.",
    text: "Seus clientes já compram pelo WhatsApp. A IA da Softeum conversa como um vendedor da sua equipe, entende áudio, explica os produtos do catálogo, confirma o pedido com o cliente e lança no ERP.",
    bullets: [
      "Atende 24 horas, inclusive fora do expediente",
      "Entende mensagens de texto e áudio",
      "Explica produtos e sugere o que o cliente costuma comprar",
      "Também recebe pedidos em PDF, foto ou planilha pelo WhatsApp",
    ],
    duration: 12000,
  },
};
const order: Key[] = ["email", "whatsapp"];

export const ChannelsTabs = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [active, setActive] = useState<Key>("email");
  const [p, setP] = useState(reduce ? 0.95 : 0);
  const [paused, setPaused] = useState(false);
  const pRef = useRef(0);
  const { ref: fitRef, scale } = useFitScale(MAIL_W);
  const compact = scale < 0.72;
  const dw = compact ? 540 : MAIL_W;
  const s = Math.min(1, (scale * MAIL_W) / dw);

  // linha do tempo da demonstração (roda só com a seção visível)
  useEffect(() => {
    if (reduce || !inView || paused) return;
    const dur = channels[active].duration;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      pRef.current += dt / dur;
      if (pRef.current >= 1.18) {
        // segura o final por um instante e passa para o outro canal
        pRef.current = 0;
        setActive((a) => order[(order.indexOf(a) + 1) % order.length]);
      }
      setP(pRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, inView, paused, reduce]);

  const select = (k: Key) => {
    setActive(k);
    pRef.current = 0;
    setP(reduce ? 0.95 : 0);
  };

  const c = channels[active];
  const shownP = Math.min(1, p);

  return (
    <section ref={sectionRef} id="canais" className="relative py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">E-mail e WhatsApp</span>
          </Reveal>
          <RevealHeading
            text="Seus clientes pedem do jeito que preferem. A Softeum cuida do resto."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Os dois canais por onde mais chegam pedidos, automatizados de ponta a ponta. Veja cada um funcionando.
            </p>
          </Reveal>
        </div>

        {/* abas */}
        <div role="tablist" aria-label="Canais" className="mt-10 flex flex-wrap gap-2">
          {order.map((k) => {
            const ch = channels[k];
            const on = k === active;
            return (
              <button
                key={k}
                role="tab"
                aria-selected={on}
                onClick={() => select(k)}
                className={cn(
                  "relative flex items-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                  on ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-background text-foreground/70 hover:text-foreground"
                )}
              >
                <ch.icon className="h-4 w-4" style={on ? undefined : { color: ch.color }} />
                {ch.tab}
                {on && !reduce && (
                  <span className="absolute bottom-0 left-0 h-0.5 bg-white/70" style={{ width: `${shownP * 100}%` }} />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* texto do canal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ background: c.color }}>
                <c.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-balance font-display text-2xl font-bold tracking-tight md:text-3xl">{c.title}</h3>
              <p className="mt-4 text-muted-foreground">{c.text}</p>
              <ul className="mt-6 space-y-3">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: c.color }}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[15px]">{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#demo"
                className="group mt-8 inline-flex items-center gap-1.5 font-semibold text-foreground underline decoration-secondary decoration-2 underline-offset-4"
              >
                Ver com os pedidos da minha empresa
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* demonstração */}
          <div
            ref={fitRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative flex min-h-[420px] items-center justify-center"
          >
            <div className="pointer-events-none absolute inset-[-8%] rounded-[3rem] bg-[radial-gradient(closest-side,hsl(var(--brand-sky)/0.35),transparent)]" />
            <AnimatePresence mode="wait">
              {active === "email" ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative w-full [overflow:clip] [overflow-clip-margin:24px]"
                  style={{ height: MAIL_H * s }}
                >
                  <div className="origin-top-left" style={{ width: dw, height: MAIL_H, transform: `scale(${s})` }}>
                    <MailWindow p={shownP} compact={compact} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="wa"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative"
                >
                  <div className="relative h-[560px] w-[290px] overflow-hidden rounded-[2.8rem] border-[10px] border-[#121a2b] bg-[#121a2b] shadow-[0_50px_80px_-20px_rgba(10,40,30,.4)]">
                    <span className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#121a2b]" />
                    <div className="h-full overflow-hidden rounded-[2rem]">
                      <PhoneChat p={shownP} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {paused && !reduce && (
              <span className="absolute bottom-2 right-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-card">
                Pausado
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
