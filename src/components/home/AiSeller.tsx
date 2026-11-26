import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bot, Check, CheckCheck, Database, Mic, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Conversa do WhatsApp com a IA vendedora (usada em Channels.tsx). Cada mensagem
 * aparece num ponto do progresso `p` (at), com "digitando…" antes das da IA.
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

export const PhoneChat = ({ p }: { p: number }) => {
  const visible = messages.filter((m) => p >= m.at);
  const next = messages.find((m) => p < m.at);
  const typing = next && next.from === "ai" && p > next.at - 0.07;
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full flex-col bg-[#efeae2]">
      {/* cabeçalho */}
      <div className="flex items-center gap-2 bg-[#008069] px-3 pb-2 pt-7 text-white">
        <ArrowLeft className="h-4 w-4" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00473b] text-xs font-bold">SF</span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px] font-semibold">Sua Empresa · Vendas</p>
          <p className="text-[10px] text-white">{typing ? "digitando…" : "online"}</p>
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
        <span className="flex-1 rounded-full bg-white px-3 py-2 text-[12px] text-[#5b6b73]">Mensagem</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884] text-white">
          <Mic className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
};
