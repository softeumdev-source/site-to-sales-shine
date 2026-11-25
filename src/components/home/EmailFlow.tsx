import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Database,
  Download,
  FileText,
  Inbox,
  Mail,
  Menu,
  MoreVertical,
  Paperclip,
  Pencil,
  Printer,
  RefreshCw,
  ScanText,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import logo from "@/assets/logocerta.png";
import { Reveal, RevealHeading } from "@/components/site/motion";
import { useFitScale } from "@/hooks/use-fit-scale";
import { cn } from "@/lib/utils";

/**
 * Pedido chegando no e-mail, num cliente de e-mail no estilo Gmail/Outlook.
 * A rolagem conduz: chega → abre → anexo aberto e lido pela Softeum →
 * validado → lançado no ERP e e-mail etiquetado.
 */

export const MAIL_W = 820;
const W = MAIL_W;
export const MAIL_H = 540;
const H = MAIL_H;

const mails = [
  { from: "Rede Gama Distribuição", subject: "Pedido 0388", snippet: "Segue pedido de reposição semanal conforme combinado", time: "07:52", clip: true },
  { from: "Beta Materiais", subject: "Re: cotação de cabos", snippet: "Obrigado pelo retorno, vamos avaliar e voltamos ainda hoje", time: "07:31" },
  { from: "Financeiro · Cliente C", subject: "Boleto NF 9912", snippet: "Prezados, segue o boleto referente à nota fiscal", time: "ontem", clip: true },
  { from: "Construsul", subject: "Pedido 1170 - urgente", snippet: "Bom dia! Precisamos faturar ainda hoje, por favor", time: "ontem", clip: true },
  { from: "Elétrica Norte", subject: "Tabela de preços dez/26", snippet: "Conforme solicitado, envio a tabela atualizada", time: "19 nov" },
  { from: "Transportadora Via Sul", subject: "Coleta agendada", snippet: "Confirmamos a coleta para amanhã entre 8h e 12h", time: "19 nov" },
  { from: "Rede Gama Distribuição", subject: "Pedido 0371", snippet: "Pedido em anexo. Favor confirmar o prazo de entrega", time: "18 nov", clip: true },
  { from: "Materiais São José", subject: "Pedido 2231", snippet: "Segue nosso pedido do mês com 14 itens", time: "18 nov", clip: true },
];

const fields = [
  { label: "Cliente", value: "Distribuidora Alfa Ltda" },
  { label: "CNPJ", value: "12.345.678/0001-90" },
  { label: "Itens", value: "3 produtos · 340 un." },
  { label: "Total", value: "R$ 8.430,00" },
];
const validations = ["Cliente cadastrado", "Códigos convertidos (DE-PARA)", "Quantidades e valores", "Sem pedido duplicado"];

const steps = [
  { icon: Inbox, title: "O pedido chega no e-mail", desc: "A Softeum monitora a caixa comercial o tempo todo." },
  { icon: Paperclip, title: "Abre o anexo sozinha", desc: "PDF, planilha, imagem ou texto no corpo do e-mail." },
  { icon: ScanText, title: "Lê e valida cada campo", desc: "Cliente, produtos, quantidades e valores conferidos." },
  { icon: Database, title: "Lança no ERP", desc: "E marca o e-mail como processado." },
];
const stepAt = [0, 0.16, 0.36, 0.8];

/* ------------------------------- Janela de e-mail ------------------------------ */

export const MailWindow = ({ p, compact }: { p: number; compact?: boolean }) => {
  const arrived = p > 0.04;
  const opened = p > 0.16;
  const preview = p > 0.3 && p < 0.9;
  const fieldsOn = (i: number) => p > 0.38 + i * 0.05;
  const valOn = (i: number) => p > 0.6 + i * 0.04;
  const launched = p > 0.8;
  const back = p >= 0.9;
  const unread = arrived && !opened ? 13 : 12;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#f6f8fc] text-[#1f1f1f] shadow-[0_40px_80px_-30px_rgba(20,40,80,.45)] ring-1 ring-black/5">
      {/* barra do navegador */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#e9edf3] px-3 py-2">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex w-[46%] items-center justify-center gap-1.5 rounded-md bg-white/80 px-2 py-0.5 text-[10px] text-[#5f6368]">
          <ShieldCheck className="h-3 w-3" /> mail.suaempresa.com.br
        </span>
      </div>

      {/* topo do app */}
      <div className="flex items-center gap-3 px-3 py-2">
        <Menu className="h-4 w-4 text-[#444746]" />
        <span className={cn("flex items-center gap-1.5 text-[15px] text-[#444746]", compact ? "pr-0" : "pr-6")}>
          <Mail className="h-5 w-5 text-[#EA4335]" /> Correio
        </span>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#e9eef6] px-4 py-2 text-[12px] text-[#444746]">
          <Search className="h-4 w-4" /> Pesquisar e-mail
        </div>
        <Settings className="h-4 w-4 text-[#444746]" />
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b57d0] text-[11px] font-bold text-white">C</span>
      </div>

      <div className={cn("flex min-h-0 flex-1 gap-2 pb-2 pr-2", compact && "pl-2")}>
        {/* pastas */}
        <aside className={cn("w-[150px] shrink-0 pl-2", compact && "hidden")}>
          <span className="flex w-fit items-center gap-2 rounded-2xl bg-[#c2e7ff] px-4 py-3 text-[12px] font-medium">
            <Pencil className="h-4 w-4" /> Escrever
          </span>
          <div className="mt-3 space-y-0.5 text-[12px]">
            {[
              { i: Inbox, l: "Entrada", c: String(unread), active: true },
              { i: Star, l: "Com estrela" },
              { i: Clock, l: "Adiados" },
              { i: Send, l: "Enviados" },
              { i: FileText, l: "Rascunhos", c: "2" },
            ].map((f) => (
              <span
                key={f.l}
                className={cn("flex items-center gap-3 rounded-r-full py-1.5 pl-3 pr-3", f.active ? "bg-[#d3e3fd] font-bold" : "text-[#444746]")}
              >
                <f.i className="h-4 w-4" />
                <span className="flex-1">{f.l}</span>
                {f.c && <span className="text-[11px]">{f.c}</span>}
              </span>
            ))}
            <p className="px-3 pb-1 pt-3 text-[11px] font-medium text-[#444746]">Marcadores</p>
            <span className="flex items-center gap-3 py-1 pl-3 text-[#444746]">
              <Tag className="h-4 w-4 text-[#1e8e3e]" /> Pedidos
            </span>
          </div>
        </aside>

        {/* painel principal */}
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-white">
          {/* lista */}
          <div className="flex items-center gap-4 border-b border-[#f1f3f4] px-4 py-2 text-[#444746]">
            <span className="h-3.5 w-3.5 rounded-[3px] border-2 border-[#757575]" />
            <RefreshCw className="h-4 w-4" />
            <MoreVertical className="h-4 w-4" />
            <span className="ml-auto text-[11px]">1–50 de 1.284</span>
            <ChevronLeft className="h-4 w-4 opacity-40" />
            <ChevronRight className="h-4 w-4" />
          </div>
          <div className="flex border-b border-[#f1f3f4] text-[12px]">
            <span className="flex items-center gap-2 border-b-[3px] border-[#0b57d0] px-5 py-2 font-medium text-[#0b57d0]">
              <Inbox className="h-4 w-4" /> Principal
            </span>
            <span className="flex items-center gap-2 px-5 py-2 text-[#444746]">
              <Tag className="h-4 w-4" /> Promoções
            </span>
          </div>

          <div>
            <motion.div
              initial={false}
              animate={{ height: arrived ? "auto" : 0, opacity: arrived ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <Row
                from="Distribuidora Alfa"
                subject="Pedido de compra nº 4521"
                snippet="Bom dia! Segue em anexo o pedido de reposição mensal"
                time="08:14"
                compact={compact}
                unread={!opened}
                fresh={!opened}
                attachment
                label={back ? "Pedido lançado" : undefined}
              />
            </motion.div>
            {mails.map((m) => (
              <Row key={m.subject} {...m} compact={compact} />
            ))}
          </div>

          {/* e-mail aberto */}
          <motion.div
            initial={false}
            animate={{ x: opened && !back ? "0%" : "102%" }}
            transition={{ duration: 0.5, ease: [0.3, 0, 0.2, 1] }}
            className="absolute inset-0 flex flex-col bg-white px-5 py-3"
          >
            <div className="flex items-center gap-5 text-[#444746]">
              <ArrowLeft className="h-4 w-4" />
              <Archive className="h-4 w-4" />
              <Trash2 className="h-4 w-4" />
              <Mail className="h-4 w-4" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <p className="text-[19px]">Pedido de compra nº 4521</p>
              <span className="rounded bg-[#e8eaed] px-1.5 text-[10px] text-[#444746]">Entrada</span>
              <AnimatePresence>
                {launched && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1 rounded bg-[#ceead6] px-1.5 text-[10px] font-semibold text-[#0d652d]"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} /> Pedido lançado
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8710a] text-sm font-bold text-white">M</span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-[12px]">
                  <b>Marcos Souza</b> <span className="text-[#5f6368]">&lt;compras@distribuidoraalfa.com.br&gt;</span>
                </p>
                <p className="text-[11px] text-[#5f6368]">para comercial</p>
              </div>
              <span className="text-[11px] text-[#5f6368]">08:14 (agora)</span>
            </div>
            <div className="mt-4 space-y-2 pl-12 text-[13px] leading-relaxed text-[#222]">
              <p>Bom dia,</p>
              <p>Segue em anexo o pedido de reposição mensal. Entrega em 28 dias, pagamento 30/60.</p>
              <p>Att.,<br />Marcos · Compras</p>
            </div>
            <div className="mt-5 border-t border-[#f1f3f4] pl-12 pt-4">
              <p className="text-[12px] font-medium">Um anexo</p>
              <div
                className={cn(
                  "mt-2 w-[180px] overflow-hidden rounded-lg border transition-shadow",
                  opened && p > 0.25 ? "border-[#0b57d0] shadow-[0_0_0_2px_#0b57d0]" : "border-[#dadce0]"
                )}
              >
                <div className="flex h-[78px] flex-col gap-1.5 bg-[#f1f3f4] p-3">
                  {[1, 0.7, 0.85, 0.5].map((w, i) => (
                    <i key={i} className="block h-1.5 rounded-full bg-[#c6cbd1]" style={{ width: `${w * 100}%` }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 border-t border-[#dadce0] px-2.5 py-2">
                  <span className="rounded bg-[#ea4335] px-1 text-[8px] font-bold text-white">PDF</span>
                  <span className="truncate text-[11px] font-medium">pedido_4521.pdf</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* notificação de novo e-mail */}
      <AnimatePresence>
        {arrived && !opened && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="absolute right-4 top-24 z-20 flex w-[250px] items-start gap-2.5 rounded-xl bg-white p-3 shadow-[0_12px_30px_-8px_rgba(0,0,0,.3)] ring-1 ring-black/5"
          >
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#EA4335]" />
            <div className="min-w-0 leading-tight">
              <p className="text-[11px] font-bold">Distribuidora Alfa</p>
              <p className="truncate text-[11px]">Pedido de compra nº 4521</p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#5f6368]">
                <Paperclip className="h-3 w-3" /> pedido_4521.pdf
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* visualizador do anexo + painel da Softeum */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex flex-col bg-[#202124]/95"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 text-white/90">
              <X className="h-4 w-4" />
              <span className="rounded bg-[#ea4335] px-1 text-[9px] font-bold text-white">PDF</span>
              <span className="text-[12px]">pedido_4521.pdf</span>
              <span className="ml-auto flex gap-4">
                <Printer className="h-4 w-4" />
                <Download className="h-4 w-4" />
              </span>
            </div>
            <div className={cn("flex min-h-0 flex-1 gap-4 pb-5", compact ? "gap-2 px-2" : "px-6")}>
              {/* documento */}
              <motion.div
                initial={{ y: 30, scale: 0.94 }}
                animate={{ y: 0, scale: 1 }}
                className={cn("relative shrink-0 overflow-hidden rounded bg-white p-5 text-[11px] text-[#222]", compact ? "w-[250px] p-3" : "w-[330px]")}
              >
                <p className="font-display text-[13px] font-extrabold">PEDIDO DE COMPRA Nº 4521</p>
                <p className="text-[10px] text-[#666]">Emissão 21/11/2026</p>
                <div className="mt-3 space-y-1">
                  <p className={cn("rounded px-1 -mx-1 transition-colors", fieldsOn(0) && "bg-[#e8f0fe] ring-1 ring-[#0b57d0]/40")}>
                    Cliente: Distribuidora Alfa Ltda
                  </p>
                  <p className={cn("rounded px-1 -mx-1 transition-colors", fieldsOn(1) && "bg-[#e8f0fe] ring-1 ring-[#0b57d0]/40")}>
                    CNPJ: 12.345.678/0001-90
                  </p>
                  <p>Entrega: 28 dias · Pgto 30/60</p>
                </div>
                <div className={cn("mt-3 overflow-hidden rounded border border-[#e0e0e0] transition-shadow", fieldsOn(2) && "ring-2 ring-[#0b57d0]/40")}>
                  <div className="grid grid-cols-[3.5rem_1fr_2rem_3.6rem] gap-1.5 bg-[#f1f3f4] px-2 py-1 text-[9px] font-semibold text-[#555]">
                    <span>Código</span>
                    <span>Produto</span>
                    <span className="text-right">Qtd</span>
                    <span className="text-right">Total</span>
                  </div>
                  {[
                    ["CAB-2.5", "Cabo flex 2,5mm", "100", "4.900,00"],
                    ["DIS-32A", "Disjuntor 32A", "40", "2.680,00"],
                    ["TOM-10A", "Tomada 10A", "200", "850,00"],
                  ].map(([c, n, q, t]) => (
                    <div key={c} className="grid grid-cols-[3.5rem_1fr_2rem_3.6rem] gap-1.5 border-t border-[#eee] px-2 py-1 text-[10px]">
                      <span className="font-mono">{c}</span>
                      <span className="truncate">{n}</span>
                      <span className="text-right">{q}</span>
                      <span className="text-right">{t}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-right font-bold">
                  <span className={cn("rounded px-1 transition-colors", fieldsOn(3) && "bg-[#e8f0fe] ring-1 ring-[#0b57d0]/40")}>
                    Total R$ 8.430,00
                  </span>
                </p>
                {p < 0.6 && (
                  <span className="absolute inset-x-0 top-0 h-0.5 animate-[scan_1.4s_ease-in-out_infinite] bg-[#0b57d0] shadow-[0_0_16px_#0b57d0]" />
                )}
              </motion.div>

              {/* painel Softeum */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex min-w-0 flex-1 flex-col rounded-xl bg-white p-3.5"
              >
                <div className="flex items-center gap-2">
                  <img src={logo} alt="" className="h-6 w-6" />
                  <p className="text-[12px] font-bold">Softeum</p>
                  <span
                    className={cn(
                      "ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      launched ? "bg-[#ceead6] text-[#0d652d]" : "bg-[#e8f0fe] text-[#0b57d0]"
                    )}
                  >
                    {launched ? <Check className="h-3 w-3" strokeWidth={3} /> : <Sparkles className="h-3 w-3" />}
                    {launched ? "Lançado no ERP" : p > 0.58 ? "Validando" : "Lendo anexo"}
                  </span>
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#5f6368]">Dados extraídos</p>
                <div className="mt-1.5 space-y-1.5">
                  {fields.map((f, i) => (
                    <div
                      key={f.label}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 transition-all duration-300",
                        fieldsOn(i) ? "border-[#dadce0] opacity-100" : "translate-x-3 border-transparent opacity-0"
                      )}
                    >
                      <span className="text-[10px] text-[#5f6368]">{f.label}</span>
                      <span className="truncate text-[11px] font-semibold">{f.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#5f6368]">Validadores</p>
                <div className="mt-1.5 space-y-1">
                  {validations.map((v, i) => (
                    <p key={v} className={cn("flex items-center gap-1.5 text-[11px] transition-opacity", valOn(i) ? "opacity-100" : "opacity-30")}>
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full transition-colors",
                          valOn(i) ? "bg-[#1e8e3e] text-white" : "bg-[#e8eaed]"
                        )}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {v}
                    </p>
                  ))}
                </div>
                <AnimatePresence>
                  {launched && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-auto flex items-center gap-2 rounded-lg bg-[#0f2240] px-3 py-2 text-[11px] font-semibold text-white"
                    >
                      <Database className="h-4 w-4 text-[#6BB8FF]" /> Pedido 4521 lançado no ERP
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Row = ({
  from,
  subject,
  snippet,
  time,
  unread,
  clip,
  attachment,
  fresh,
  label,
  compact,
}: {
  from: string;
  subject: string;
  snippet: string;
  time: string;
  unread?: boolean;
  clip?: boolean;
  attachment?: boolean;
  fresh?: boolean;
  label?: string;
  compact?: boolean;
}) => (
  <div
    className={cn(
      "relative flex items-start gap-3 border-b border-[#f1f3f4] px-4 py-2 text-[12px] transition-colors duration-700",
      fresh ? "bg-[#fff8e1]" : unread ? "bg-white" : "bg-[#f8fafd]"
    )}
  >
    <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-[3px] border-2 border-[#c4c7c5]" />
    <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c4c7c5]" />
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline gap-3">
        <span className={cn("shrink-0 truncate", compact ? "w-[96px]" : "w-[130px]", unread && "font-bold")}>{from}</span>
        <span className="min-w-0 flex-1 truncate">
          {label && (
            <span className="mr-1.5 rounded bg-[#ceead6] px-1.5 py-px text-[10px] font-semibold text-[#0d652d]">{label}</span>
          )}
          <span className={cn(unread && "font-bold")}>{subject}</span>
          <span className="text-[#5f6368]"> - {snippet}</span>
        </span>
        <span className={cn("shrink-0 text-[11px]", unread ? "font-bold" : "text-[#5f6368]")}>{time}</span>
      </div>
      {attachment && (
        <span className={cn("mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#dadce0] bg-white px-2.5 py-0.5 text-[11px]", compact ? "ml-[108px]" : "ml-[142px]")}>
          <span className="rounded-sm bg-[#ea4335] px-0.5 text-[7px] font-bold text-white">PDF</span>
          pedido_4521.pdf
        </span>
      )}
    </div>
    {clip && !attachment && <Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c4c7c5]" />}
  </div>
);

/* ------------------------------------ Seção ------------------------------------ */

export const EmailFlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [p, setP] = useState(reduce ? 0.7 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => !reduce && setP(v));
  const { ref: fitRef, scale } = useFitScale(W);
  // em telas estreitas usa uma janela mais compacta, para o texto ficar legível
  const compact = scale < 0.72;
  const dw = compact ? 540 : W;
  const s = Math.min(1, (scale * W) / dw);

  const tiltRef = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${-6 + ((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${3 + ((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
  };

  const active = stepAt.reduce((acc, at, i) => (p >= at ? i : acc), 0);

  return (
    <section id="pedidos-email" className="relative bg-gradient-to-b from-background via-[#eef4fd] to-background">
      <div ref={ref} className={cn("relative", !reduce && "h-[360vh]")}>
        <div
          className={cn(
            "container flex flex-col justify-center gap-6 py-6 lg:grid lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12",
            !reduce && "sticky top-0 h-[100svh] pt-20"
          )}
        >
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0b57d0]">
                <Mail className="h-4 w-4" /> Pedidos por e-mail
              </span>
            </Reveal>
            <RevealHeading
              text="O pedido chega no e-mail e já sai lançado."
              delay={0.1}
              className="mt-3 text-balance font-display text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]"
            />
            <ol className="mt-7 hidden space-y-1.5 lg:block">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn("flex gap-3.5 rounded-2xl p-3 transition-all duration-300", i === active ? "bg-background shadow-card" : "opacity-45")}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                      i <= active ? "bg-[#0b57d0] text-white" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display font-bold">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-3 flex items-center gap-3 lg:hidden">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0b57d0] text-white">
                {(() => {
                  const I = steps[active].icon;
                  return <I className="h-4 w-4" />;
                })()}
              </span>
              <p className="text-sm">
                <b>{steps[active].title}.</b> <span className="text-muted-foreground">{steps[active].desc}</span>
              </p>
            </div>
          </div>

          <div ref={fitRef} className="w-full [perspective:1600px]" style={{ height: H * s }} onMouseMove={onMove}>
            <div
              ref={tiltRef}
              className="origin-top-left transition-transform duration-500 ease-out"
              style={{ width: dw, height: H, transform: `scale(${s}) rotateX(var(--rx,3deg)) rotateY(var(--ry,-6deg))` }}
            >
              <MailWindow p={p} compact={compact} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
