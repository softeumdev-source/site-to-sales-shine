import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check, FileText, Inbox, Paperclip, ScanText, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Inbox,
    title: "O pedido chega no seu e-mail",
    desc: "Conectamos o e-mail comercial da sua empresa. Cada pedido que chega com PDF entra no fluxo sozinho, sem ninguém precisar abrir.",
  },
  {
    icon: ScanText,
    title: "A IA lê e confere cada campo",
    desc: "Cliente, CNPJ, itens, quantidades, valores e prazo são extraídos em segundos e validados contra o seu cadastro.",
  },
  {
    icon: Server,
    title: "O pedido cai pronto no ERP",
    desc: "Via API ou no formato de importação do seu ERP. Sua equipe só confere o que a regra mandou revisar.",
  },
];

const fields = [
  { label: "Cliente", value: "Distribuidora Alfa" },
  { label: "CNPJ", value: "12.345.678/0001-90" },
  { label: "Itens", value: "3 itens · 160 un." },
  { label: "Total", value: "R$ 8.430,00" },
];

/* ---------- Stage pieces (all driven by scroll progress p: 0 → 1) ---------- */

const InboxLayer = ({ p }: { p: MotionValue<number> }) => {
  const opacity = useTransform(p, [0, 0.3, 0.38], [1, 1, 0]);
  const scale = useTransform(p, [0.3, 0.38], [1, 0.94]);
  const newY = useTransform(p, [0, 0.1], [-56, 0]);
  const newOpacity = useTransform(p, [0, 0.08], [0, 1]);
  const highlight = useTransform(p, [0.14, 0.22], [0, 1]);
  const othersY = useTransform(p, [0, 0.1], [-52, 0]);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex flex-col p-4 sm:p-6">
      <WindowBar label="Caixa de entrada · comercial@suaempresa.com.br" />
      <div className="relative mt-3 flex-1 space-y-2 overflow-hidden">
        <motion.div
          style={{ y: newY, opacity: newOpacity }}
          className="relative flex items-center gap-3 rounded-xl border border-secondary/30 bg-background p-3 shadow-soft"
        >
          <motion.span
            style={{ opacity: highlight }}
            className="absolute inset-0 rounded-xl ring-2 ring-secondary/60"
          />
          <Avatar letter="A" className="bg-secondary/15 text-secondary" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold">compras@distribuidoraalfa.com.br</p>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase text-secondary-foreground">
                Novo
              </span>
            </div>
            <p className="truncate text-xs text-muted-foreground">Pedido de compra nº 4521 · reposição mensal</p>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-foreground/70">
              <Paperclip className="h-3 w-3" /> pedido_4521.pdf
            </span>
          </div>
        </motion.div>

        <motion.div style={{ y: othersY }} className="space-y-2">
          {[
            ["B", "vendas@betamateriais.com", "Re: cotação de cabos · enviado ontem"],
            ["C", "financeiro@cliente-c.com.br", "Boleto referente à NF 9912"],
            ["D", "pedidos@redegama.com.br", "Pedido 0388 · PDF anexo · processado"],
            ["E", "compras@construsul.com.br", "Pedido 1170 · processado"],
            ["F", "contato@fornecedor-x.com", "Tabela de preços atualizada"],
          ].map(([l, from, subj]) => (
            <div key={from} className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/70 p-3">
              <Avatar letter={l} className="bg-accent/10 text-accent" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground/70">{from}</p>
                <p className="truncate text-xs text-muted-foreground">{subj}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const PdfLayer = ({ p }: { p: MotionValue<number> }) => {
  const opacity = useTransform(p, [0.32, 0.4, 0.62, 0.7], [0, 1, 1, 0]);
  const y = useTransform(p, [0.32, 0.4], [40, 0]);
  const docScale = useTransform(p, [0.62, 0.7], [1, 0.9]);
  const scan = useTransform(p, [0.4, 0.6], ["0%", "100%"]);
  const scanOpacity = useTransform(p, [0.4, 0.42, 0.58, 0.61], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 grid grid-rows-[auto_1fr] content-start gap-3 p-4 sm:grid-cols-[1.15fr_1fr] sm:grid-rows-1 sm:content-center sm:items-center sm:gap-5 sm:p-6">
      {/* Documento */}
      <motion.div
        style={{ scale: docScale }}
        className="relative overflow-hidden rounded-xl border border-border bg-background p-3 shadow-elegant sm:p-4"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
          <FileText className="h-3.5 w-3.5" /> pedido_4521.pdf
        </div>
        <p className="mt-2 font-display text-xs font-extrabold sm:text-sm">PEDIDO DE COMPRA Nº 4521</p>
        <div className="mt-2 space-y-1.5 text-[10px] leading-tight text-foreground/70 sm:text-[11px]">
          <p>Distribuidora Alfa Ltda.</p>
          <p>CNPJ 12.345.678/0001-90</p>
          <p>Entrega: 28 dias · Pgto 30/60</p>
        </div>
        <div className="mt-3 overflow-hidden rounded-md border border-border text-[9px] sm:text-[10px]">
          {[
            ["CAB-2.5", "Cabo flex 2,5mm", "100"],
            ["DIS-32A", "Disjuntor 32A", "40"],
            ["TOM-10A", "Tomada 10A", "20"],
          ].map(([code, name, qty], i) => (
            <div key={code} className={cn("grid grid-cols-[auto_1fr_auto] gap-2 px-2 py-1", i % 2 && "bg-muted/60")}>
              <span className="font-mono text-foreground/60">{code}</span>
              <span className="truncate">{name}</span>
              <span className="tabular-nums">{qty}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-right text-[10px] font-bold tabular-nums sm:text-xs">Total R$ 8.430,00</p>

        {/* Feixe de leitura */}
        <motion.div style={{ top: scan, opacity: scanOpacity }} className="pointer-events-none absolute inset-x-0 -translate-y-1/2">
          <div className="h-10 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
          <div className="-mt-5 h-0.5 bg-accent shadow-[0_0_14px_hsl(var(--accent))]" />
        </motion.div>
      </motion.div>

      {/* Campos extraídos */}
      <div className="grid grid-cols-2 content-start gap-2 sm:flex sm:flex-col sm:justify-center">
        <p className="col-span-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Campos extraídos</p>
        {fields.map((f, i) => (
          <Field key={f.label} p={p} start={0.43 + i * 0.04} label={f.label} value={f.value} />
        ))}
      </div>
    </motion.div>
  );
};

const Field = ({ p, start, label, value }: { p: MotionValue<number>; start: number; label: string; value: string }) => {
  const opacity = useTransform(p, [start, start + 0.03], [0, 1]);
  const x = useTransform(p, [start, start + 0.03], [-16, 0]);
  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 shadow-card"
    >
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Check className="h-2.5 w-2.5" />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">{label}</p>
        <p className="truncate text-[11px] font-semibold sm:text-xs">{value}</p>
      </div>
    </motion.div>
  );
};

const ErpLayer = ({ p }: { p: MotionValue<number> }) => {
  const opacity = useTransform(p, [0.66, 0.74], [0, 1]);
  const y = useTransform(p, [0.66, 0.74], [40, 0]);
  const rowOpacity = useTransform(p, [0.76, 0.82], [0, 1]);
  const rowX = useTransform(p, [0.76, 0.82], [60, 0]);
  const pendingOpacity = useTransform(p, [0.86, 0.9], [1, 0]);
  const readyOpacity = useTransform(p, [0.86, 0.9], [0, 1]);
  const rowsY = useTransform(p, [0.76, 0.82], [-40, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col p-4 sm:p-6">
      <WindowBar label="ERP · Pedidos de venda" dark />
      <div className="mt-3 overflow-hidden rounded-xl border border-border bg-background text-[11px] sm:text-xs">
        <div className="grid grid-cols-[3.2rem_1fr_auto] gap-3 border-b border-border bg-muted/70 px-3 py-2 font-semibold text-muted-foreground sm:grid-cols-[3.5rem_1fr_6rem_auto]">
          <span>Nº</span>
          <span>Cliente</span>
          <span className="hidden sm:block">Valor</span>
          <span>Status</span>
        </div>
        <motion.div
          style={{ opacity: rowOpacity, x: rowX }}
          className="grid grid-cols-[3.2rem_1fr_auto] items-center gap-3 border-b border-border bg-secondary/5 px-3 py-2.5 sm:grid-cols-[3.5rem_1fr_6rem_auto]"
        >
          <span className="font-mono font-semibold">4521</span>
          <span className="truncate font-medium">Distribuidora Alfa</span>
          <span className="hidden tabular-nums sm:block">R$ 8.430,00</span>
          <span className="relative inline-grid">
            <motion.span
              style={{ opacity: pendingOpacity }}
              className="col-start-1 row-start-1 whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
            >
              Validando…
            </motion.span>
            <motion.span
              style={{ opacity: readyOpacity }}
              className="col-start-1 row-start-1 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"
            >
              <Check className="h-3 w-3" /> Pronto p/ faturar
            </motion.span>
          </span>
        </motion.div>
        <motion.div style={{ y: rowsY }}>
          {[
            ["4520", "Rede Gama", "R$ 2.115,40"],
            ["4519", "Beta Materiais", "R$ 12.980,00"],
            ["4518", "Construsul", "R$ 640,00"],
            ["4517", "Elétrica Norte", "R$ 3.302,90"],
            ["4516", "Rede Gama", "R$ 1.877,00"],
          ].map(([n, c, v]) => (
            <div
              key={n}
              className="grid grid-cols-[3.2rem_1fr_auto] items-center gap-3 border-b border-border/60 px-3 py-2.5 text-foreground/60 last:border-0 sm:grid-cols-[3.5rem_1fr_6rem_auto]"
            >
              <span className="font-mono">{n}</span>
              <span className="truncate">{c}</span>
              <span className="hidden tabular-nums sm:block">{v}</span>
              <span className="whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold">Faturado</span>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.p style={{ opacity: readyOpacity }} className="mt-3 text-center text-xs text-muted-foreground">
        Do e-mail ao ERP sem ninguém digitar uma linha.
      </motion.p>
    </motion.div>
  );
};

const WindowBar = ({ label, dark }: { label: string; dark?: boolean }) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium",
      dark ? "bg-primary text-primary-foreground/80" : "bg-background/80 text-muted-foreground"
    )}
  >
    <span className="flex gap-1">
      <i className="h-2 w-2 rounded-full bg-secondary/70" />
      <i className="h-2 w-2 rounded-full bg-accent/50" />
      <i className="h-2 w-2 rounded-full bg-muted-foreground/30" />
    </span>
    <span className="truncate">{label}</span>
  </div>
);

const Avatar = ({ letter, className }: { letter: string; className?: string }) => (
  <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold", className)}>
    {letter}
  </span>
);

/* ---------------------------------- Section --------------------------------- */

export const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.67 ? 1 : 2);
  });

  // Sem animação: mostra o estado final (pedido no ERP), em uma altura normal.
  const finalState = useTransform(scrollYProgress, () => 1);
  const p = reduce ? finalState : scrollYProgress;

  return (
    <section id="como-funciona" className="relative bg-muted/40">
      <div ref={ref} className={cn("relative", reduce ? "" : "h-[300vh]")}>
        <div
          className={cn(
            "container flex flex-col justify-center gap-5 py-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14",
            !reduce && "sticky top-16 h-[calc(100svh-4rem)]"
          )}
        >
          {/* Texto e passos */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Como funciona</span>
            <h2 className="mt-2 text-balance font-display text-2xl font-bold sm:text-3xl tracking-tight md:text-5xl">
              Do e-mail ao seu ERP, sem digitar
            </h2>

            <ol className="mt-6 hidden space-y-1 lg:block">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "relative rounded-2xl py-4 pl-14 pr-4 transition-colors duration-300",
                    active === i ? "bg-background shadow-card" : "opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      active === i ? "bg-primary text-primary-foreground" : "bg-muted-foreground/15 text-foreground/60"
                    )}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p
                    className={cn(
                      "overflow-hidden text-sm text-muted-foreground transition-all duration-500",
                      active === i ? "mt-1 max-h-24 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>

            {/* Mobile: só o passo atual */}
            <div className="mt-4 lg:hidden" aria-live="polite">
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={cn("h-1 flex-1 rounded-full transition-colors", i <= active ? "bg-primary" : "bg-border")}
                  />
                ))}
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">
                {active + 1}. {steps[active].title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{steps[active].desc}</p>
            </div>
          </div>

          {/* Palco animado */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-soft opacity-80 blur-2xl" />
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[hsl(var(--brand-sky)/0.25)] via-background to-[hsl(var(--brand-pink)/0.2)] shadow-elegant sm:aspect-[5/4] lg:aspect-[16/11]">
              <InboxLayer p={p} />
              <PdfLayer p={p} />
              <ErpLayer p={p} />
            </div>
            {!reduce && (
              <div className="mt-4 hidden h-1 overflow-hidden rounded-full bg-border lg:block">
                <motion.div style={{ width: bar }} className="h-full bg-primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
