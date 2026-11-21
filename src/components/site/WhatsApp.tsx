import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, FileText, Mail, MessageCircle, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_GREEN = "#25D366";

const statement =
  "Seus clientes já mandam pedido pelo WhatsApp e pelo e-mail. Em PDF, em texto, até em foto do papel. A Softeum lê tudo e entrega o pedido pronto no seu ERP.";
// Palavras que ganham a cor da marca quando acendem.
const highlight = new Set(["WhatsApp", "e-mail.", "ERP."]);

const flows = [
  {
    icon: FileText,
    title: "O cliente manda o arquivo, a Softeum lança",
    desc: "PDF, mensagem de texto, imagem ou planilha. A Softeum identifica o formato, extrai os dados, valida os itens e envia para o ERP via API ou exportação.",
    bullets: [
      "Lê PDF, texto, imagem e planilha recebidos no WhatsApp",
      "Valida itens, quantidades e códigos",
      "Envia para o ERP via API REST ou exportação (CSV, JSON)",
      "Confirma o recebimento para o cliente no próprio WhatsApp",
    ],
  },
  {
    icon: Bot,
    title: "Sem arquivo? A IA fecha o pedido na conversa",
    desc: "Quando o cliente escreve em vez de anexar, a IA conversa com ele, explica os produtos do catálogo, tira dúvidas e monta o pedido completo.",
    bullets: [
      "Entende pedidos como \"quero 10 caixas do produto X\"",
      "Explica características e aplicações dos produtos",
      "Confirma o pedido com o cliente antes de enviar",
      "Atende 24h, mesmo sem vendedor online",
    ],
  },
];

/* ------------------------- Frase que acende palavra a palavra ------------------------ */

const Word = ({ word, range, p }: { word: string; range: [number, number]; p: MotionValue<number> }) => {
  const opacity = useTransform(p, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={cn(highlight.has(word) && "text-gradient-brand")}>
      {word}{" "}
    </motion.span>
  );
};

const ScrollWords = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");

  return (
    <p
      ref={ref}
      className="mx-auto max-w-4xl text-balance text-center font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl md:leading-[1.12]"
    >
      {reduce
        ? statement
        : words.map((w, i) => (
            <Word key={i} word={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
    </p>
  );
};

/* ----------------------------- Vídeo guiado pela rolagem ---------------------------- */

const stages = [
  { icon: Mail, label: "Pedido chega por e-mail ou WhatsApp", at: [0, 0.38] as const },
  { icon: FileText, label: "A Softeum lê e valida", at: [0.38, 0.72] as const },
  { icon: Server, label: "Pedido lançado no ERP", at: [0.72, 1.01] as const },
];

const ScrollVideo = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const target = useRef(0);
  const stageIdx = useTransform(scrollYProgress, (v) => (v < 0.38 ? 0 : v < 0.72 ? 1 : 2));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    target.current = v;
  });

  // Aproxima o tempo do vídeo da posição da rolagem a cada quadro (fica suave mesmo
  // com rodinha do mouse dando "saltos").
  useEffect(() => {
    if (reduce) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    let raf = 0;
    let current = 0;
    const tick = () => {
      const d = video.duration;
      if (d && Number.isFinite(d)) {
        const goal = target.current * (d - 0.05);
        current += (goal - current) * 0.18;
        if (Math.abs(video.currentTime - current) > 0.01) video.currentTime = current;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div ref={wrapRef} data-scroll-video className={cn("relative", !reduce && "h-[220vh]")}>
      <div className={cn("flex items-center", !reduce && "sticky top-16 h-[calc(100svh-4rem)]")}>
        <div className="relative w-full">
          <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-soft opacity-70 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-background shadow-elegant">
            <video
              ref={videoRef}
              src="/videos/pedido-erp.mp4"
              poster="/videos/pedido-erp-poster.webp"
              muted
              playsInline
              preload="auto"
              autoPlay={!!reduce}
              loop={!!reduce}
              aria-label="Animação: um pedido sai do e-mail e do WhatsApp e chega ao servidor do ERP"
              className="block aspect-video w-full object-cover"
            />

            {/* Legendas de etapa */}
            {!reduce && (
              <div className="absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-5">
                <div className="flex items-center gap-1 rounded-full border border-border/70 bg-background/90 p-1 shadow-soft backdrop-blur">
                  {stages.map((s, i) => (
                    <StageChip key={s.label} idx={i} stageIdx={stageIdx} icon={s.icon} label={s.label} />
                  ))}
                </div>
              </div>
            )}
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold shadow-soft backdrop-blur sm:left-5 sm:top-5">
              <MessageCircle className="h-3.5 w-3.5" style={{ color: WHATSAPP_GREEN }} />
              <Mail className="h-3.5 w-3.5 text-accent" />
              Duas entradas, um destino
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StageChip = ({
  idx,
  stageIdx,
  icon: Icon,
  label,
}: {
  idx: number;
  stageIdx: MotionValue<number>;
  icon: typeof Mail;
  label: string;
}) => {
  const active = useTransform(stageIdx, (v) => (v === idx ? 1 : 0));
  const bg = useTransform(active, [0, 1], ["hsl(var(--background) / 0)", "hsl(var(--primary))"]);
  const color = useTransform(active, [0, 1], ["hsl(var(--muted-foreground))", "hsl(var(--primary-foreground))"]);
  const maxWidth = useTransform(active, [0, 1], ["0rem", "16rem"]);
  return (
    <motion.span
      style={{ backgroundColor: bg, color }}
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors"
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <motion.span style={{ maxWidth }} className="overflow-hidden whitespace-nowrap transition-[max-width] duration-300">
        {label}
      </motion.span>
    </motion.span>
  );
};

/* ------------------------------------- Seção -------------------------------------- */

export const WhatsAppSection = () => {
  return (
    <section id="whatsapp" className="relative py-20 md:py-28">
      <div className="container">
        <div className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
            <MessageCircle className="h-4 w-4" style={{ color: WHATSAPP_GREEN }} />
            Pedidos pelo WhatsApp e e-mail
          </span>
        </div>

        <ScrollWords />

        <div className="mx-auto mt-12 max-w-5xl md:mt-16">
          <ScrollVideo />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:mt-20 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border">
          {flows.map((f, i) => (
            <div key={f.title} className={cn(i === 0 ? "md:pr-12" : "md:pl-12")}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-balance font-display text-2xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-3 text-muted-foreground">{f.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: WHATSAPP_GREEN }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
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
