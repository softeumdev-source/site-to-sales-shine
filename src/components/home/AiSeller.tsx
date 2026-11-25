import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowLeft, Bot, Check, CheckCheck, Database, Ear, MessageCircle, Mic, PackageSearch, Phone, Video } from "lucide-react";
import { Reveal, RevealHeading } from "@/components/site/motion";
import { cn } from "@/lib/utils";

/**
 * IA vendedora no WhatsApp: a conversa vai se montando conforme a rolagem.
 * Cada mensagem aparece num ponto da rolagem (at), com "digitando…" antes das da IA.
 */

type Msg = { at: number; from: "client" | "ai" | "system"; node: ReactNode; time: string };

const Wave = () => (
  <span className="flex items-center gap-[3px]">
    {[0.4, 0.8, 0.55, 1, 0.5, 0.75, 0.35, 0.9, 0.6, 0.45, 0.8, 0.4, 0.65, 0.3].map((h, i) => (
      <i key={i} className="block w-[3px] rounded-full bg-[#5f7f74]" style={{ height: 22 * h }} />
    ))}
  </span>
);

const messages: Msg[] = [
  {
    at: 0.04,
    from: "client",
    time: "09:12",
    node: (
      <div className="w-[210px]">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
            <Mic className="h-4 w-4" />
          </span>
          <Wave />
          <span className="text-[10px] text-[#667781]">0:14</span>
        </div>
        <p className="mt-1.5 border-t border-black/5 pt-1.5 text-[11px] italic text-[#54656f]">
          “Oi, quero repor 10 caixas de cabo 2,5 e 40 disjuntores de 32.”
        </p>
      </div>
    ),
  },
  {
    at: 0.16,
    from: "ai",
    time: "09:12",
    node: (
      <p>
        Oi, Marcos! Anotei <b>10 cx de Cabo flex 2,5mm</b> e <b>40 Disjuntores 32A</b>. Quer incluir as tomadas 10A que você
        pediu no mês passado?
      </p>
    ),
  },
  { at: 0.3, from: "client", time: "09:13", node: <p>Pode sim, 200 tomadas. O cabo é antichama?</p> },
  {
    at: 0.42,
    from: "ai",
    time: "09:13",
    node: <p>É sim: isolação antichama 750V, rolo de 100 m. Segue o resumo pra você conferir 👇</p>,
  },
  {
    at: 0.54,
    from: "ai",
    time: "09:13",
    node: (
      <div className="w-[200px] max-w-full">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#008069]">Resumo do pedido</p>
        <div className="mt-1.5 space-y-1 text-[12px]">
          {[
            ["10 cx", "Cabo flex 2,5mm", "4.900,00"],
            ["40 un", "Disjuntor 32A", "2.680,00"],
            ["200 un", "Tomada 10A", "850,00"],
          ].map(([q, n, v]) => (
            <div key={n} className="flex justify-between gap-2">
              <span className="truncate">
                <span className="text-[#667781]">{q}</span> {n}
              </span>
              <span className="tabular-nums">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex justify-between border-t border-black/10 pt-1.5 text-[12px] font-bold">
          <span>Total</span>
          <span className="tabular-nums">R$ 8.430,00</span>
        </div>
        <span className="mt-2 block rounded-md border border-[#008069]/30 py-1 text-center text-[12px] font-semibold text-[#008069]">
          Confirmar pedido
        </span>
      </div>
    ),
  },
  { at: 0.68, from: "client", time: "09:14", node: <p>Confirmado ✅</p> },
  {
    at: 0.8,
    from: "ai",
    time: "09:14",
    node: <p>Pedido <b>4522</b> confirmado! Já está no nosso sistema. Obrigado, Marcos 🙌</p>,
  },
  {
    at: 0.9,
    from: "system",
    time: "",
    node: (
      <span className="flex items-center gap-1.5">
        <Database className="h-3.5 w-3.5" /> Pedido 4522 lançado no ERP
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    ),
  },
];

const skills = [
  { icon: MessageCircle, title: "Conversa como um vendedor", desc: "Atende com naturalidade, 24 horas por dia." },
  { icon: Ear, title: "Entende áudio", desc: "O cliente fala, a IA transcreve e anota o pedido." },
  { icon: PackageSearch, title: "Conhece o seu catálogo", desc: "Explica produtos e sugere o que o cliente costuma comprar." },
  { icon: Database, title: "Fecha e lança no ERP", desc: "Confirma com o cliente e envia o pedido validado." },
];
const skillAt = [0.04, 0.04, 0.3, 0.68];

const Bubble = ({ m }: { m: Msg }) => {
  if (m.from === "system") {
    return (
      <div className="flex justify-center">
        <span className="rounded-lg bg-[#d1f4e0] px-3 py-1.5 text-[11px] font-semibold text-[#0a7a43] shadow-sm">{m.node}</span>
      </div>
    );
  }
  const out = m.from === "client";
  return (
    <div className={cn("flex", out ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "relative max-w-[82%] rounded-xl px-2.5 pb-4 pt-1.5 text-[13px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,.13)]",
          out ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white"
        )}
      >
        {!out && (
          <span className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold text-[#008069]">
            <Bot className="h-3 w-3" /> Vendedor IA
          </span>
        )}
        {m.node}
        <span className="absolute bottom-1 right-2 flex items-center gap-0.5 text-[10px] text-[#667781]">
          {m.time}
          {out && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
        </span>
      </div>
    </div>
  );
};

const Typing = () => (
  <div className="flex justify-start">
    <span className="flex gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
      {[0, 1, 2].map((i) => (
        <i key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8696a0]" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  </div>
);

const PhoneChat = ({ p }: { p: number }) => {
  const visible = messages.filter((m) => p >= m.at);
  const next = messages.find((m) => p < m.at);
  const typing = next && next.from === "ai" && p > next.at - 0.07;
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full flex-col bg-[#efeae2]">
      {/* cabeçalho */}
      <div className="flex items-center gap-2 bg-[#008069] px-3 pb-2 pt-7 text-white">
        <ArrowLeft className="h-4 w-4" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold">SF</span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] font-semibold">Sua Empresa · Vendas</p>
          <p className="text-[10px] text-white/80">{typing ? "digitando…" : "online"}</p>
        </div>
        <Video className="h-4 w-4" />
        <Phone className="h-4 w-4" />
      </div>

      {/* mensagens: as mais novas ficam embaixo */}
      <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2.5 py-3">
        <AnimatePresence initial={false}>
          {visible.slice(-6).map((m) => (
            <motion.div
              key={m.at}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Bubble m={m} />
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Typing />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* campo de digitação */}
      <div className="flex items-center gap-2 px-2 pb-4 pt-1">
        <span className="flex-1 rounded-full bg-white px-3 py-2 text-[12px] text-[#8696a0]">Mensagem</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884] text-white">
          <Mic className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
};

export const AiSeller = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [p, setP] = useState(reduce ? 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => !reduce && setP(v));

  const phoneRef = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = phoneRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${-12 + ((e.clientX - r.left) / r.width - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${4 + ((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
  };

  const activeSkill = skillAt.reduce((acc, at, i) => (p >= at ? i : acc), 0);

  return (
    <section id="ia-whatsapp" className="relative bg-gradient-to-b from-background via-[#f2fbf5] to-background">
      <div ref={ref} className={cn("relative", !reduce && "h-[320vh]")}>
        <div
          className={cn(
            "container flex flex-col justify-center gap-6 py-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20",
            !reduce && "sticky top-16 h-[calc(100svh-4rem)]"
          )}
        >
          <div className="lg:max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0a9b52]">
                <MessageCircle className="h-4 w-4" /> IA vendedora no WhatsApp
              </span>
            </Reveal>
            <RevealHeading
              text="Um vendedor que atende 24h, ouve áudio e fecha pedido."
              delay={0.1}
              className="mt-3 text-balance font-display text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            />

            <ul className="mt-8 hidden space-y-2 lg:block">
              {skills.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "flex gap-4 rounded-2xl p-3 transition-all duration-300",
                    i === activeSkill ? "bg-background shadow-card" : "opacity-45"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      i <= activeSkill ? "bg-[#25D366] text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* celular: só o ponto atual */}
            <div className="mt-3 flex items-center gap-3 lg:hidden">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                {(() => {
                  const I = skills[activeSkill].icon;
                  return <I className="h-4 w-4" />;
                })()}
              </span>
              <p className="text-sm">
                <b>{skills[activeSkill].title}.</b> <span className="text-muted-foreground">{skills[activeSkill].desc}</span>
              </p>
            </div>
          </div>

          {/* Celular 3D */}
          <div className="flex justify-center [perspective:1400px]" onMouseMove={onMove}>
            <div
              ref={phoneRef}
              className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d] max-lg:[--rx:2deg] max-lg:[--ry:-4deg]"
              style={{ transform: "rotateX(var(--rx,4deg)) rotateY(var(--ry,-12deg))" }}
            >
              <span className="absolute inset-0 rounded-[3rem] bg-[#0b1324]" style={{ transform: "translateZ(-16px)" }} />
              <div
                className="relative h-[min(600px,50svh)] w-[min(290px,25svh)] overflow-hidden lg:h-[min(640px,70svh)] lg:w-[min(320px,35svh)] rounded-[3rem] border-[10px] border-[#121a2b] shadow-[0_50px_80px_-20px_rgba(10,40,30,.45)]"
              >
                <span className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#121a2b]" />
                <PhoneChat p={p} />
              </div>
              {/* selo IA flutuando */}
              <span
                className="absolute -left-14 top-[58%] hidden items-center gap-1.5 rounded-full bg-background px-3 py-2 text-xs font-semibold shadow-elegant sm:flex"
                style={{ transform: "translateZ(60px)" }}
              >
                <Bot className="h-4 w-4 text-[#0a9b52]" /> Respondido pela IA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
