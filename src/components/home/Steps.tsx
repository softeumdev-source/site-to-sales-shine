import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Check, Database, Inbox, ScanText } from "lucide-react";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { useFitScale } from "@/hooks/use-fit-scale";
import { cn } from "@/lib/utils";
import { ClayIcon } from "./Clay";
import { Doc3D } from "./Doc3D";

/**
 * Como funciona: trilha com 3 estações 3D. Um pedido percorre a trilha
 * conforme a rolagem: chega, é lido e validado, e vira um pedido no ERP.
 * No celular vira uma lista vertical.
 */

const steps = [
  { icon: Inbox, title: "Recebe", desc: "Pedidos do e-mail e do WhatsApp entram sozinhos.", from: "#6BB8FF", to: "#2F7DE1" },
  { icon: ScanText, title: "Lê e valida", desc: "A IA extrai os dados e os validadores conferem tudo.", from: "#FF8FA0", to: "#F0485E" },
  { icon: Database, title: "Lança no ERP", desc: "O pedido entra pronto, via API ou arquivo.", from: "#2E4A72", to: "#0F2240" },
];

const W = 980;
const H = 430;
const X = [150, 490, 830];
const TRACK_Y = 250;
const checks = ["Cliente", "Produtos", "Quantidades", "Duplicidade"];

const Track = ({ p }: { p: number }) => {
  // posição do pedido entre a 1ª e a 3ª estação
  const t = Math.min(1, Math.max(0, (p - 0.08) / 0.8));
  const x = X[0] + (X[2] - X[0]) * t;
  const at = t < 0.3 ? 0 : t < 0.75 ? 1 : 2;
  const reading = t > 0.38 && t < 0.62;
  const done = t >= 0.97;

  return (
    <div className="relative" style={{ width: W, height: H }}>
      {/* trilha */}
      <div className="absolute h-1.5 rounded-full bg-border" style={{ left: X[0], width: X[2] - X[0], top: TRACK_Y }} />
      <div
        className="absolute h-1.5 rounded-full bg-gradient-to-r from-accent via-secondary to-primary"
        style={{ left: X[0], width: x - X[0], top: TRACK_Y }}
      />

      {/* estações */}
      {steps.map((s, i) => (
        <div key={s.title} className="absolute flex w-[240px] -translate-x-1/2 flex-col items-center text-center" style={{ left: X[i], top: TRACK_Y - 48 }}>
          <div
            className={cn("transition-transform duration-500 [transform-style:preserve-3d]", at >= i ? "scale-100" : "scale-90 opacity-60 grayscale")}
            style={{ transform: `rotateX(14deg) rotateY(-12deg)` }}
          >
            <ClayIcon icon={s.icon} from={s.from} to={s.to} size={100} />
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">Passo {i + 1}</p>
          <p className="mt-1 font-display text-2xl font-bold">{s.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
        </div>
      ))}

      {/* canais chegando na 1ª estação */}
      {[
        { k: "email" as const, dx: -120, dy: -150 },
        { k: "whatsapp" as const, dx: -40, dy: -190 },
        { k: "audio" as const, dx: 50, dy: -160 },
      ].map((c, i) => (
        <div
          key={c.k}
          className="absolute transition-all duration-500"
          style={{
            left: X[0] + c.dx * (1 - Math.min(1, t * 4)),
            top: TRACK_Y + c.dy * (1 - Math.min(1, t * 4)) - 30,
            opacity: t > 0.25 ? 0 : 1,
          }}
        >
          <Doc3D kind={c.k} size={52} float delay={i * 0.5} />
        </div>
      ))}

      {/* pedido viajando */}
      <div className="absolute -translate-x-1/2" style={{ left: x, top: TRACK_Y - 150 }}>
        {!done ? (
          <div className="relative">
            <Doc3D kind="pdf" size={56} />
            {reading && (
              <span className="absolute -inset-x-3 top-0 h-0.5 animate-[scan_1s_ease-in-out_infinite] rounded-full bg-accent shadow-[0_0_14px_hsl(var(--accent))]" />
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex w-[210px] items-center gap-2 rounded-2xl border border-border bg-background p-3 shadow-elegant"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Pedido 4521</p>
              <p className="text-xs text-muted-foreground">Lançado no ERP · R$ 8.430,00</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* validações na estação do meio */}
      <div className="absolute flex -translate-x-1/2 gap-1.5" style={{ left: X[1], top: 20 }}>
        {checks.map((c, i) => {
          const on = t > 0.42 + i * 0.05;
          return (
            <span
              key={c}
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-300",
                on ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700" : "translate-y-2 border-border bg-background text-muted-foreground opacity-0"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} /> {c}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const Steps = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [p, setP] = useState(reduce ? 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => !reduce && setP(v));
  const { ref: fitRef, scale } = useFitScale(W);

  return (
    <section id="como-funciona" className="relative bg-muted/40">
      {/* computador: trilha guiada pela rolagem */}
      <div ref={ref} className={cn("relative hidden lg:block", !reduce && "h-[260vh]")}>
        <div className={cn("container flex flex-col justify-center", !reduce && "sticky top-0 h-[100svh] pt-16")}>
          <div className="text-center">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">Como funciona</span>
            </Reveal>
            <RevealHeading
              text="Do pedido recebido ao ERP em 3 passos."
              delay={0.1}
              className="mx-auto mt-3 max-w-3xl text-balance font-display text-5xl font-bold tracking-tight"
            />
          </div>
          <div ref={fitRef} className="mx-auto mt-10 w-full max-w-[980px]" style={{ height: H * scale }}>
            <div className="origin-top-left" style={{ transform: `scale(${scale})` }}>
              <Track p={p} />
            </div>
          </div>
        </div>
      </div>

      {/* celular: lista vertical */}
      <div className="container py-20 lg:hidden">
        <div className="text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Como funciona</span>
          </Reveal>
          <RevealHeading
            text="Do pedido recebido ao ERP em 3 passos."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight"
          />
        </div>
        <Stagger as="ol" className="relative mx-auto mt-12 max-w-sm space-y-10" gap={0.15}>
          <span className="absolute bottom-10 left-[38px] top-10 w-1 rounded-full bg-gradient-to-b from-accent via-secondary to-primary" />
          {steps.map((s, i) => (
            <RevealItem as="li" from="left" key={s.title} className="relative flex items-center gap-6">
              <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(12deg) rotateY(-10deg)" }}>
                <ClayIcon icon={s.icon} from={s.from} to={s.to} size={78} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Passo {i + 1}</p>
                <p className="font-display text-xl font-bold">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
