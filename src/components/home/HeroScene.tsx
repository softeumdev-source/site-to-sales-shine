import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Database, Sparkles } from "lucide-react";
import logo from "@/assets/logocerta.png";
import { useFitScale } from "@/hooks/use-fit-scale";
import { cn } from "@/lib/utils";
import { Doc3D, docMeta, type DocKind } from "./Doc3D";

/**
 * Cena do topo: documentos de vários canais entram na Softeum, passam pelos
 * validadores e saem como pedido no ERP. Tudo em CSS 3D + framer-motion.
 * Desenhada em 600x500 e escalada para caber no container.
 */

const W = 600;
const H = 500;

type Source = { kind: DocKind; x: number; y: number; file: string; origin: string };

const sources: Source[] = [
  { kind: "pdf", x: 40, y: 40, file: "pedido_4521.pdf", origin: "E-mail" },
  { kind: "whatsapp", x: 0, y: 150, file: "mensagem no WhatsApp", origin: "WhatsApp" },
  { kind: "audio", x: 36, y: 255, file: "áudio de 0:14", origin: "WhatsApp" },
  { kind: "xlsx", x: 0, y: 345, file: "reposicao_nov.xlsx", origin: "E-mail" },
  { kind: "img", x: 96, y: 420, file: "foto_pedido.jpg", origin: "WhatsApp" },
];

const clients = ["Distribuidora Alfa", "Rede Gama", "Construsul", "Beta Materiais", "Elétrica Norte"];
const totals = ["8.430,00", "2.115,40", "640,00", "12.980,00", "3.302,90"];
const validators = ["CNPJ", "Produtos", "Preços", "Duplicidade"];

const CORE = { x: 262, y: 200 };
const CYCLE = 3200;

export const HeroScene = () => {
  const reduce = useReducedMotion();
  const { ref: fitRef, scale } = useFitScale(W);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"travel" | "read" | "done">("travel");
  const [orders, setOrders] = useState<{ id: number; s: number }[]>([]);
  const seq = useRef(0);

  useEffect(() => {
    if (reduce) {
      setPhase("done");
      setOrders([2, 1, 0].map((s, id) => ({ id, s })));
      return;
    }
    let t1: number, t2: number;
    const run = (i: number) => {
      setStep(i);
      setPhase("travel");
      t1 = window.setTimeout(() => setPhase("read"), 800);
      t2 = window.setTimeout(() => {
        setPhase("done");
        setOrders((o) => [{ id: ++seq.current, s: i }, ...o].slice(0, 4));
      }, 2100);
    };
    run(0);
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % sources.length;
      run(i);
    }, CYCLE);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduce]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${8 + py * -10}deg`);
    el.style.setProperty("--ry", `${-10 + px * 14}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty("--rx", "8deg");
    tiltRef.current?.style.setProperty("--ry", "-10deg");
  };

  const src = sources[step];

  return (
    <div ref={fitRef} className="relative w-full" style={{ height: H * scale }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        className="absolute left-0 top-0 origin-top-left [perspective:1600px]"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
      >
        <div
          ref={tiltRef}
          className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
          style={{ transform: "rotateX(var(--rx,8deg)) rotateY(var(--ry,-10deg))" }}
        >
          {/* linhas de conexão */}
          <svg className="absolute inset-0 overflow-visible" width={W} height={H} aria-hidden>
            <defs>
              <linearGradient id="hs-line" x1="0" x2="1">
                <stop offset="0" stopColor="hsl(210 100% 60%)" stopOpacity=".15" />
                <stop offset="1" stopColor="hsl(350 95% 64%)" stopOpacity=".55" />
              </linearGradient>
            </defs>
            {sources.map((s, i) => (
              <path
                key={i}
                d={`M ${s.x + 70} ${s.y + 40} C ${s.x + 170} ${s.y + 40}, ${CORE.x - 60} ${CORE.y + 50}, ${CORE.x} ${CORE.y + 50}`}
                fill="none"
                stroke={i === step ? "url(#hs-line)" : "hsl(220 30% 80%)"}
                strokeWidth={i === step ? 2.5 : 1.5}
                strokeDasharray="4 6"
                className={cn(i === step && "animate-[dash_1s_linear_infinite]")}
              />
            ))}
            <path
              d={`M ${CORE.x + 120} ${CORE.y + 50} C ${CORE.x + 160} ${CORE.y + 50}, 400 ${CORE.y - 40}, 430 ${CORE.y - 40}`}
              fill="none"
              stroke="hsl(350 95% 64% / .5)"
              strokeWidth={2.5}
              strokeDasharray="4 6"
            />
          </svg>

          {/* fontes */}
          {sources.map((s, i) => (
            <div
              key={s.kind}
              className="absolute transition-all duration-500 [transform-style:preserve-3d]"
              style={{
                left: s.x,
                top: s.y,
                transform: `translateZ(${i === step ? 50 : 20}px) scale(${i === step ? 1.08 : 1})`,
                filter: i === step ? "none" : "saturate(.75)",
              }}
            >
              <Doc3D kind={s.kind} size={s.kind === "pdf" || s.kind === "xlsx" || s.kind === "img" ? 58 : 70} float delay={i * 0.7} />
            </div>
          ))}

          {/* documento viajando até o núcleo */}
          <AnimatePresence>
            {phase === "travel" && !reduce && (
              <motion.div
                key={`t-${step}`}
                className="absolute"
                initial={{ left: src.x + 20, top: src.y + 10, opacity: 0, scale: 0.6 }}
                animate={{ left: CORE.x + 40, top: CORE.y + 20, opacity: 1, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.75, ease: [0.5, 0, 0.2, 1] }}
              >
                <Doc3D kind={src.kind} size={44} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* núcleo Softeum */}
          <div className="absolute [transform-style:preserve-3d]" style={{ left: CORE.x, top: CORE.y, transform: "translateZ(40px)" }}>
            <span className="absolute inset-0 animate-ping-soft rounded-[34px] bg-secondary/30" />
            <span className="absolute inset-0 rounded-[34px] bg-[#0b1b33]" style={{ transform: "translateZ(-14px)" }} />
            <div
              className="relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-[34px] text-white"
              style={{
                background: "linear-gradient(160deg,#1d3557 0%,#0f2240 60%,#0a1830 100%)",
                boxShadow: "inset 0 2px 0 rgba(255,255,255,.18), 0 30px 50px -10px rgba(15,34,64,.55), 0 0 0 1px rgba(255,255,255,.06)",
              }}
            >
              <img src={logo} alt="" className="h-12 w-12" style={{ transform: "translateZ(20px)" }} />
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/70">IA Softeum</span>
            </div>

            {/* status de leitura + validadores */}
            <AnimatePresence mode="wait">
              {phase !== "travel" && (
                <motion.div
                  key={`r-${step}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -left-10 top-[132px] w-[200px] rounded-2xl border border-border bg-background/95 p-2.5 shadow-elegant backdrop-blur"
                >
                  <p className="flex items-center gap-1.5 truncate text-[11px] font-semibold">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-secondary" />
                    Lendo {src.file}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    {validators.map((v, k) => (
                      <motion.span
                        key={v}
                        initial={{ opacity: 0.25 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 + k * 0.22 }}
                        className="flex items-center gap-1 rounded-md bg-muted px-1.5 py-1 text-[10px] font-medium"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.15 + k * 0.22, type: "spring", stiffness: 400, damping: 15 }}
                          className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-white"
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </motion.span>
                        {v}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ERP */}
          <div
            className="absolute right-0 top-[86px] w-[200px] overflow-hidden rounded-2xl border border-border bg-background shadow-elegant"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex items-center gap-1.5 bg-[#0f2a44] px-3 py-2 text-[11px] font-semibold text-white">
              <Database className="h-3.5 w-3.5 text-accent" /> Seu ERP · Pedidos
            </div>
            <div className="min-h-[188px] divide-y divide-border">
              <AnimatePresence initial={false}>
                {orders.map(({ id, s: o }) => (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, x: 30, backgroundColor: "rgba(255,214,102,.45)" }}
                    animate={{ opacity: 1, x: 0, backgroundColor: "rgba(255,255,255,0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, backgroundColor: { duration: 1.6 } }}
                    className="flex items-center gap-2 px-3 py-2"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                      <Doc3D kind={sources[o].kind} size={20} />
                    </span>
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="truncate text-[11px] font-semibold">{clients[o]}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {docMeta[sources[o].kind].name} · R$ {totals[o]}
                      </p>
                    </div>
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* aviso de pedido lançado */}
          <AnimatePresence>
            {phase === "done" && !reduce && (
              <motion.div
                key={`ok-${step}`}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute bottom-[34px] right-[10px] flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-[12px] font-semibold text-primary-foreground shadow-elegant"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                Pedido lançado no ERP · origem {src.origin}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
