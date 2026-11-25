import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BellRing, Database, FolderInput, RefreshCw } from "lucide-react";
import logo from "@/assets/logocerta.png";
import { cn } from "@/lib/utils";

/**
 * Os 3 jeitos de o ERP receber o pedido, como descritos na documentação
 * (docs.softeum.com.br): busca pela API, aviso no endereço do ERP e arquivo por SFTP.
 */

const DOCS_URL = "https://docs.softeum.com.br/";

type Way = {
  key: string;
  tab: string;
  icon: typeof RefreshCw;
  title: string;
  text: string;
  when: string;
  /** o que trafega entre Softeum e ERP */
  wire: string;
  /** sentido da seta: o ERP busca (←) ou a Softeum envia (→) */
  dir: "pull" | "push";
  chips: string[];
};

const ways: Way[] = [
  {
    key: "api",
    tab: "Busca pela API",
    icon: RefreshCw,
    title: "O ERP busca os pedidos prontos",
    text: "O ERP chama a API REST da Softeum de tempos em tempos, lança os pedidos e confirma com o número dele.",
    when: "ERP dentro da rede da empresa, sem endereço público.",
    wire: "GET /v1/pedidos",
    dir: "pull",
    chips: ["API REST", "Chave de acesso", "OpenAPI 3.1"],
  },
  {
    key: "webhook",
    tab: "Aviso no ERP",
    icon: BellRing,
    title: "A Softeum avisa o ERP na hora",
    text: "Assim que o pedido fica pronto, a Softeum envia um POST assinado para o endereço do ERP, que lança e responde com o número.",
    when: "ERP ou ferramenta de integração com endereço HTTPS.",
    wire: "POST pedido.aprovado",
    dir: "push",
    chips: ["Webhook", "Assinatura", "Sem duplicar"],
  },
  {
    key: "sftp",
    tab: "Arquivo por SFTP",
    icon: FolderInput,
    title: "O pedido vira um arquivo na pasta do ERP",
    text: "A Softeum grava o arquivo no layout do seu ERP, numa pasta que ele já importa. A TI não precisa programar.",
    when: "ERP que já importa pedido de uma pasta.",
    wire: "pedido_4521.xml",
    dir: "push",
    chips: ["XML", "CSV", "TXT", "SAP IDoc", "Protheus"],
  },
];

const syncs = ["Produtos", "Compradores", "Vendedores", "Tabelas de preço"];

/** Diagrama: Softeum ⇄ ERP com o pedido trafegando na linha. */
const Flow = ({ way }: { way: Way }) => (
  <div className="relative flex items-center justify-between gap-3 rounded-2xl bg-[#0b1626] px-4 py-5 text-white">
    <div className="flex flex-col items-center gap-1.5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <img src={logo} alt="" className="h-7 w-7" />
      </span>
      <span className="text-[11px] text-white/60">Softeum</span>
    </div>

    <div className="relative mx-1 h-12 flex-1">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-white/25" />
      {/* pacote andando na linha */}
      <span
        className={cn(
          "absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#6BB8FF] shadow-[0_0_12px_#6BB8FF]",
          way.dir === "push" ? "animate-[wire_1.8s_ease-in-out_infinite]" : "animate-[wire-back_1.8s_ease-in-out_infinite]"
        )}
      />
      <span className="absolute inset-x-0 -top-0.5 truncate text-center font-mono text-[11px] text-[#9ccaff]">
        {way.dir === "pull" ? "← " : ""}
        {way.wire}
        {way.dir === "push" ? " →" : ""}
      </span>
    </div>

    <div className="flex flex-col items-center gap-1.5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
        <Database className="h-5 w-5 text-[#6BB8FF]" />
      </span>
      <span className="text-[11px] text-white/60">Seu ERP</span>
    </div>
  </div>
);

export const IntegrationWays = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);

  // troca de aba sozinha até a pessoa clicar em uma
  useEffect(() => {
    if (reduce || !inView || touched) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % ways.length), 5000);
    return () => window.clearInterval(id);
  }, [inView, touched, reduce]);

  const w = ways[i];

  return (
    <div ref={ref} className="mt-8">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3 jeitos de o ERP receber o pedido</p>

      <div role="tablist" className="mt-3 grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
        {ways.map((x, k) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={k === i}
            onClick={() => {
              setI(k);
              setTouched(true);
            }}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-semibold transition-all sm:text-sm",
              k === i ? "bg-background text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <x.icon className="hidden h-4 w-4 sm:block" />
            {x.tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={w.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-5"
        >
          <p className="font-display text-xl font-bold">{w.title}</p>
          <p className="mt-1.5 text-[15px] text-muted-foreground">{w.text}</p>
          <div className="mt-4">
            <Flow way={w} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {w.chips.map((c) => (
              <span key={c} className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] font-medium">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm">
            <span className="font-semibold">Quando usar:</span> <span className="text-muted-foreground">{w.when}</span>
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">O ERP também envia os cadastros</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {syncs.map((s) => (
              <span key={s} className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                {s}
              </span>
            ))}
          </div>
        </div>
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Documentação para a TI
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};
