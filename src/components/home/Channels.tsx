import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FileText, Mail, MessageCircle, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/motion";

const WHATSAPP_GREEN = "#25D366";

const statement =
  "Seus clientes já mandam pedido pelo WhatsApp e pelo e-mail. Em PDF, em texto, até em foto do papel. A Softeum lê tudo e entrega o pedido pronto no seu ERP.";
// Palavras que ganham a cor da marca quando acendem.
const highlight = new Set(["WhatsApp", "e-mail.", "ERP."]);

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

  // Em tela em pé (celular) o vídeo é cortado nas laterais; então a imagem desliza
  // do e-mail (esquerda) até o servidor (direita) acompanhando a rolagem.
  const objectPosition = useTransform(scrollYProgress, [0.05, 0.9], ["6% 50%", "94% 50%"]);

  return (
    <div ref={wrapRef} data-scroll-video className={cn("relative", !reduce && "h-[220vh]")}>
      <div className={cn("relative h-[100svh] w-full overflow-hidden bg-background", !reduce && "sticky top-0")}>
        <motion.video
          ref={videoRef}
          src="/videos/pedido-erp.mp4"
          poster="/videos/pedido-erp-poster.webp"
          muted
          playsInline
          preload="auto"
          autoPlay={!!reduce}
          loop={!!reduce}
          aria-label="Animação: um pedido sai do e-mail e do WhatsApp e chega ao servidor do ERP"
          style={reduce ? undefined : { objectPosition }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <span className="absolute left-1/2 top-20 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-soft backdrop-blur md:top-24">
          <MessageCircle className="h-3.5 w-3.5" style={{ color: WHATSAPP_GREEN }} />
          <Mail className="h-3.5 w-3.5 text-accent" />
          Duas entradas, um destino
        </span>

        {/* Legendas de etapa */}
        {!reduce && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-10">
            <div className="flex items-center gap-1 rounded-full border border-border/70 bg-background/90 p-1 shadow-soft backdrop-blur">
              {stages.map((s, i) => (
                <StageChip key={s.label} idx={i} stageIdx={stageIdx} icon={s.icon} label={s.label} />
              ))}
            </div>
          </div>
        )}
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

export const Channels = () => (
  <section id="canais" className="relative pt-20 md:pt-28">
    <div className="container">
      <Reveal from="down" className="mb-10 flex justify-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
          <MessageCircle className="h-4 w-4" style={{ color: WHATSAPP_GREEN }} />
          E-mail e WhatsApp
        </span>
      </Reveal>
      <ScrollWords />
    </div>
    <div className="mt-12 md:mt-16">
      <ScrollVideo />
    </div>
  </section>
);
