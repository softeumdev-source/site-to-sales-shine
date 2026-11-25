import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { AlertTriangle, Check, Loader2, ShieldCheck } from "lucide-react";
import { Reveal, RevealHeading } from "@/components/site/motion";
import { cn } from "@/lib/utils";

/**
 * Validadores inteligentes: ao rolar, cada regra confere um trecho do pedido.
 * O trecho acende no documento e a regra fica verde (ou amarela = revisão).
 */

type Rule = { id: string; title: string; ok: string; warn?: string };

const rules: Rule[] = [
  { id: "cliente", title: "Cliente e CNPJ", ok: "Cliente encontrado no cadastro" },
  { id: "produtos", title: "Códigos dos produtos", ok: "Convertidos para os códigos do seu ERP (DE-PARA)" },
  { id: "itens", title: "Quantidades e valores", ok: "Itens e totais conferidos", warn: "1 item diferente do habitual: vai para revisão" },
  { id: "duplicado", title: "Pedido duplicado", ok: "Nenhum pedido igual recebido antes" },
];

type State = "idle" | "checking" | "ok" | "warn";

export const Validators = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const [p, setP] = useState(reduce ? 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => !reduce && setP(v));

  const stateOf = (i: number): State => {
    const start = 0.1 + i * 0.2;
    if (p < start) return "idle";
    if (p < start + 0.12) return "checking";
    return rules[i].warn ? "warn" : "ok";
  };
  const done = p > 0.92;

  // inclinação do documento com o mouse
  const docRef = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = docRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${-14 + ((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${6 + ((e.clientY - r.top) / r.height - 0.5) * -12}deg`);
  };

  const hl = (id: string) => {
    const i = rules.findIndex((r) => r.id === id);
    const s = stateOf(i);
    return cn(
      "rounded-md px-1 -mx-1 transition-colors duration-300",
      s === "checking" && "bg-accent/20 ring-2 ring-accent/50",
      s === "ok" && "bg-emerald-500/12 ring-1 ring-emerald-500/40",
      s === "warn" && "bg-amber-400/20 ring-2 ring-amber-400/60"
    );
  };

  return (
    <section id="validadores" className="relative overflow-hidden bg-muted/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-secondary">
              <ShieldCheck className="h-4 w-4" /> Validadores inteligentes
            </span>
          </Reveal>
          <RevealHeading
            text="Nenhum pedido errado chega no seu ERP."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-4 text-lg text-muted-foreground">
              Antes de lançar, cada pedido passa por regras de validação. O que está certo segue direto. O que é
              diferente espera você aprovar.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Documento 3D */}
          <div className="flex justify-center [perspective:1400px]" onMouseMove={onMove}>
            <div
              ref={docRef}
              className="relative w-full max-w-[420px] transition-transform duration-500 ease-out [transform-style:preserve-3d]"
              style={{ transform: "rotateX(var(--rx,6deg)) rotateY(var(--ry,-14deg))" }}
            >
              {/* espessura */}
              <span className="absolute inset-0 rounded-3xl bg-[#cad7ea]" style={{ transform: "translateZ(-14px)" }} />
              <span className="absolute inset-0 rounded-3xl bg-[#dce6f4]" style={{ transform: "translateZ(-7px)" }} />
              <div
                className="relative rounded-3xl p-6 text-[13px] text-[#1f2937] sm:p-8"
                style={{
                  background: "linear-gradient(160deg,#ffffff 0%,#f5f8fd 60%,#eaf0f9 100%)",
                  boxShadow: "inset 0 2px 0 #fff, 0 40px 60px -20px hsl(220 60% 30% / .35)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-base font-extrabold">PEDIDO DE COMPRA Nº 4521</p>
                    <p className="text-xs text-muted-foreground">Emissão 21/11/2026</p>
                  </div>
                  <span
                    className="rounded-lg px-2.5 py-1 font-display text-xs font-extrabold text-white"
                    style={{
                      background: "linear-gradient(180deg,#ff7a8e,#F0485E)",
                      boxShadow: "0 3px 0 #b42f43",
                      transform: "translateZ(30px)",
                    }}
                  >
                    PDF
                  </span>
                </div>

                <div className="mt-5 space-y-1">
                  <p>
                    <span className="text-muted-foreground">Cliente: </span>
                    <span className={hl("cliente")}>Distribuidora Alfa Ltda · 12.345.678/0001-90</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Entrega: </span>28 dias · Pgto 30/60
                  </p>
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-[#dbe3ef] bg-white/70">
                  <div className="grid grid-cols-[4.5rem_1fr_2.5rem_4.5rem] gap-2 bg-[#eef2f8] px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
                    <span>Código</span>
                    <span>Produto</span>
                    <span className="text-right">Qtd</span>
                    <span className="text-right">Total</span>
                  </div>
                  {[
                    ["CAB-2.5", "Cabo flex 2,5mm", "100", "4.900,00"],
                    ["DIS-32A", "Disjuntor 32A", "40", "2.680,00"],
                    ["TOM-10A", "Tomada 10A", "200", "850,00"],
                  ].map(([c, n, q, t], i) => (
                    <div key={c} className="grid grid-cols-[4.5rem_1fr_2.5rem_4.5rem] items-center gap-2 border-t border-[#eef2f8] px-3 py-1.5 text-[12px]">
                      <span className={cn("font-mono", hl("produtos"))}>{c}</span>
                      <span className="truncate">{n}</span>
                      <span className={cn("text-right tabular-nums", i === 2 ? hl("itens") : "")}>{q}</span>
                      <span className="text-right tabular-nums">{t}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-right font-semibold tabular-nums">
                  Total <span className={hl("itens")}>R$ 8.430,00</span>
                </p>

                {/* carimbo final */}
                <motion.div
                  initial={false}
                  animate={done ? { opacity: 1, scale: 1, rotate: -8 } : { opacity: 0, scale: 1.6, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute -right-3 bottom-16 rounded-xl border-2 border-amber-500 bg-amber-50/90 px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide text-amber-600 sm:-right-6"
                  style={{ transform: "translateZ(50px)" }}
                >
                  Revisar 1 item
                </motion.div>
              </div>
            </div>
          </div>

          {/* Regras */}
          <ol className="relative space-y-3">
            <span className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-border" />
            {rules.map((r, i) => {
              const s = stateOf(i);
              return (
                <li
                  key={r.id}
                  className={cn(
                    "relative flex gap-4 rounded-2xl p-3 transition-all duration-300",
                    s !== "idle" && "bg-background shadow-card"
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 flex h-[1.9rem] w-[1.9rem] shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300",
                      s === "idle" && "border-border bg-background text-muted-foreground",
                      s === "checking" && "border-accent bg-accent/10 text-accent",
                      s === "ok" && "border-emerald-500 bg-emerald-500 text-white",
                      s === "warn" && "border-amber-400 bg-amber-400 text-white"
                    )}
                  >
                    {s === "checking" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : s === "warn" ? (
                      <AlertTriangle className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : s === "ok" ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <span className="text-xs font-bold">{i + 1}</span>
                    )}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className={cn("font-display text-lg font-bold transition-opacity", s === "idle" && "opacity-50")}>{r.title}</p>
                    <p
                      className={cn(
                        "text-sm transition-colors",
                        s === "warn" ? "font-medium text-amber-600" : s === "ok" ? "text-emerald-700" : "text-muted-foreground"
                      )}
                    >
                      {s === "idle" ? "Aguardando" : s === "checking" ? "Conferindo…" : s === "warn" ? r.warn : r.ok}
                    </p>
                  </div>
                </li>
              );
            })}

            <li
              className={cn(
                "ml-[3.4rem] grid gap-2 pt-2 text-sm transition-all duration-500 sm:grid-cols-2",
                done ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
            >
              <span className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 font-medium text-emerald-700">
                <Check className="h-4 w-4" strokeWidth={3} /> Tudo certo: vai direto pro ERP
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-amber-400/15 px-3 py-2 font-medium text-amber-700">
                <AlertTriangle className="h-4 w-4" /> Diferente: você aprova em 1 clique
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};
