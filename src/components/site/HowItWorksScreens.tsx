import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  FileText,
  Filter,
  Inbox,
  LayoutGrid,
  Mail,
  Menu,
  Paperclip,
  Pencil,
  Plus,
  Printer,
  Receipt,
  RefreshCw,
  Search,
  Send,
  Star,
  Tag,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ================================ Caixa de e-mail ================================ */

const mails = [
  { from: "Rede Gama Distribuição", subject: "Pedido 0388", snippet: "Segue pedido de reposição semanal conforme combinado…", time: "07:52", clip: true },
  { from: "Beta Materiais", subject: "Re: cotação de cabos", snippet: "Obrigado pelo retorno, vamos avaliar e voltamos…", time: "07:31" },
  { from: "Financeiro · Cliente C", subject: "Boleto NF 9912", snippet: "Prezados, segue o boleto referente à nota fiscal…", time: "ontem", clip: true },
  { from: "Construsul", subject: "Pedido 1170 - urgente", snippet: "Bom dia! Precisamos faturar ainda hoje, por favor…", time: "ontem", clip: true },
  { from: "Elétrica Norte", subject: "Tabela de preços dez/26", snippet: "Conforme solicitado, envio a tabela atualizada…", time: "19 nov" },
  { from: "Transportadora Via Sul", subject: "Coleta agendada", snippet: "Confirmamos a coleta para amanhã entre 8h e 12h…", time: "19 nov" },
  { from: "Rede Gama Distribuição", subject: "Pedido 0371", snippet: "Pedido em anexo. Favor confirmar o prazo de entrega…", time: "18 nov", clip: true },
];

const folders = [
  { icon: Inbox, label: "Caixa de entrada", count: "3", active: true },
  { icon: Star, label: "Com estrela" },
  { icon: Send, label: "Enviados" },
  { icon: FileText, label: "Rascunhos", count: "2" },
  { icon: Archive, label: "Arquivo" },
];

export const InboxLayer = ({ p }: { p: MotionValue<number> }) => {
  const opacity = useTransform(p, [0, 0.3, 0.38], [1, 1, 0]);
  const scale = useTransform(p, [0.3, 0.38], [1, 0.95]);
  // novo e-mail chega no topo e empurra a lista
  const newH = useTransform(p, [0, 0.1], [0, 1]);
  const newOpacity = useTransform(p, [0.02, 0.1], [0, 1]);
  const listY = useTransform(newH, [0, 1], [-46, 0]);
  const unread = useTransform(p, [0.08, 0.12], [0, 1]);
  const select = useTransform(p, [0.12, 0.17], [0, 1]);
  // e-mail aberto desliza por cima da lista
  const readX = useTransform(p, [0.19, 0.26], ["100%", "0%"]);
  const badge = useTransform(p, (v) => (v < 0.1 ? "2" : "3"));

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex flex-col bg-white text-[#202124]">
      {/* Barra superior do app de e-mail */}
      <div className="flex items-center gap-2 border-b border-[#e8eaed] px-3 py-2 sm:gap-3">
        <Menu className="h-4 w-4 text-[#5f6368]" />
        <span className="flex items-center gap-1.5 pr-2 text-[13px] font-semibold text-[#5f6368]">
          <Mail className="h-4 w-4 text-secondary" /> <span className="hidden sm:inline">Correio</span>
        </span>
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#eef1f6] px-3 py-1.5 text-[11px] text-[#5f6368]">
          <Search className="h-3.5 w-3.5" /> Pesquisar e-mails
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
          V
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Pastas */}
        <aside className="hidden w-[9.5rem] shrink-0 flex-col gap-0.5 bg-[#f6f8fc] px-2 py-2 md:flex">
          <span className="mb-2 flex w-fit items-center gap-2 rounded-2xl bg-[#c2e7ff] px-3 py-2 text-[11px] font-semibold">
            <Pencil className="h-3.5 w-3.5" /> Escrever
          </span>
          {folders.map((f) => (
            <span
              key={f.label}
              className={cn(
                "flex items-center gap-2 rounded-r-full px-2 py-1 text-[11px]",
                f.active ? "bg-[#d3e3fd] font-bold" : "text-[#444746]"
              )}
            >
              <f.icon className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1 truncate">{f.label}</span>
              {f.count &&
                (f.active ? <motion.span>{badge}</motion.span> : <span className="text-[10px]">{f.count}</span>)}
            </span>
          ))}
          <span className="mt-2 px-2 text-[10px] font-semibold text-[#444746]">Marcadores</span>
          <span className="flex items-center gap-2 px-2 py-1 text-[11px] text-[#444746]">
            <Tag className="h-3.5 w-3.5 text-secondary" /> Pedidos
          </span>
        </aside>

        {/* Lista */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="flex items-center gap-3 border-b border-[#e8eaed] px-3 py-1.5 text-[#5f6368]">
            <span className="h-3 w-3 rounded-[3px] border border-[#5f6368]" />
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="ml-auto text-[10px]">1–50 de 1.284</span>
          </div>

          <motion.div style={{ opacity: newOpacity }} className="relative">
            <MailRow
              from="Distribuidora Alfa"
              subject="Pedido de compra nº 4521"
              snippet="Bom dia! Segue em anexo o pedido de reposição mensal…"
              time="08:14"
              unread
              attachment="pedido_4521.pdf"
            />
            <motion.span style={{ opacity: select }} className="pointer-events-none absolute inset-0 bg-[#c2dbff]/60" />
            <motion.span style={{ opacity: unread }} className="absolute left-0 top-0 h-full w-0.5 bg-secondary" />
          </motion.div>

          <motion.div style={{ y: listY }}>
            {mails.map((m, i) => (
              <MailRow key={i} {...m} unread={i === 0} attachment={undefined} />
            ))}
          </motion.div>

          {/* E-mail aberto */}
          <motion.div style={{ x: readX }} className="absolute inset-0 flex flex-col bg-white px-3 py-2 sm:px-5">
            <div className="flex items-center gap-3 text-[#5f6368]">
              <ArrowLeft className="h-3.5 w-3.5" />
              <Archive className="h-3.5 w-3.5" />
              <Trash2 className="h-3.5 w-3.5" />
            </div>
            <p className="mt-2 text-[14px] font-medium sm:text-base">
              Pedido de compra nº 4521{" "}
              <span className="rounded bg-[#e8eaed] px-1 align-middle text-[9px] font-normal text-[#5f6368]">Caixa de entrada</span>
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[11px] font-bold text-white">D</span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[11px] font-semibold">
                  Distribuidora Alfa <span className="font-normal text-[#5f6368]">&lt;compras@distribuidoraalfa.com.br&gt;</span>
                </p>
                <p className="text-[10px] text-[#5f6368]">para comercial</p>
              </div>
              <span className="text-[10px] text-[#5f6368]">08:14</span>
            </div>
            <div className="mt-3 space-y-1.5 text-[11px] leading-relaxed text-[#3c4043]">
              <p>Bom dia,</p>
              <p>Segue em anexo o pedido de reposição mensal. Entrega em 28 dias, pagamento 30/60.</p>
              <p>Att., Marcos · Compras</p>
            </div>
            <div className="mt-3 flex w-44 items-center gap-2 rounded-lg border border-[#dadce0] p-2">
              <span className="flex h-8 w-7 items-center justify-center rounded bg-[#ea4335] text-[8px] font-bold text-white">PDF</span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[10px] font-medium">pedido_4521.pdf</p>
                <p className="text-[9px] text-[#5f6368]">184 KB</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const MailRow = ({
  from,
  subject,
  snippet,
  time,
  unread,
  clip,
  attachment,
}: {
  from: string;
  subject: string;
  snippet: string;
  time: string;
  unread?: boolean;
  clip?: boolean;
  attachment?: string;
}) => (
  <div
    className={cn(
      "flex items-start gap-2 border-b border-[#eef0f2] px-3 py-1.5 text-[11px] sm:gap-3",
      unread ? "bg-white" : "bg-[#f2f6fc]"
    )}
  >
    <span className="mt-0.5 hidden h-3 w-3 shrink-0 rounded-[3px] border border-[#9aa0a6] sm:block" />
    <Star className="mt-0.5 h-3 w-3 shrink-0 text-[#9aa0a6]" />
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline gap-2">
        <span className={cn("w-24 shrink-0 truncate sm:w-32", unread && "font-bold")}>{from}</span>
        <span className="min-w-0 flex-1 truncate">
          <span className={cn(unread && "font-bold")}>{subject}</span>
          <span className="text-[#5f6368]"> – {snippet}</span>
        </span>
        {clip && !attachment && <Paperclip className="h-3 w-3 shrink-0 text-[#9aa0a6]" />}
        <span className={cn("shrink-0 text-[10px]", unread ? "font-bold" : "text-[#5f6368]")}>{time}</span>
      </div>
      {attachment && (
        <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-[#dadce0] bg-white px-2 py-0.5 text-[10px] sm:ml-[8.5rem]">
          <span className="rounded-sm bg-[#ea4335] px-0.5 text-[7px] font-bold text-white">PDF</span>
          {attachment}
        </span>
      )}
    </div>
  </div>
);

/* ===================================== ERP ===================================== */

type Row = { n: string; date: string; client: string; cnpj: string; cond: string; seller: string; total: string; status: Status };
type Status = "faturado" | "liberado" | "aguardando";

const rows: Row[] = [
  { n: "004520", date: "21/11/26", client: "REDE GAMA DISTRIBUICAO", cnpj: "08.112.334/0001-07", cond: "28 DDL", seller: "CARLA M.", total: "2.115,40", status: "liberado" },
  { n: "004519", date: "21/11/26", client: "BETA MATERIAIS ELETR", cnpj: "21.774.902/0001-55", cond: "30/60", seller: "JOAO P.", total: "12.980,00", status: "faturado" },
  { n: "004518", date: "20/11/26", client: "CONSTRUSUL LTDA", cnpj: "33.019.448/0002-11", cond: "A VISTA", seller: "CARLA M.", total: "640,00", status: "faturado" },
  { n: "004517", date: "20/11/26", client: "ELETRICA NORTE", cnpj: "04.551.210/0001-90", cond: "30/60/90", seller: "ANA R.", total: "3.302,90", status: "aguardando" },
  { n: "004516", date: "19/11/26", client: "REDE GAMA DISTRIBUICAO", cnpj: "08.112.334/0001-07", cond: "28 DDL", seller: "CARLA M.", total: "1.877,00", status: "faturado" },
  { n: "004515", date: "19/11/26", client: "MATERIAIS SAO JOSE", cnpj: "17.300.665/0001-23", cond: "30 DDL", seller: "JOAO P.", total: "5.410,75", status: "faturado" },
  { n: "004514", date: "18/11/26", client: "CONSTRUSUL LTDA", cnpj: "33.019.448/0002-11", cond: "A VISTA", seller: "ANA R.", total: "980,00", status: "faturado" },
  { n: "004513", date: "18/11/26", client: "LUZ & CIA COMERCIO", cnpj: "29.845.117/0001-40", cond: "30/60", seller: "CARLA M.", total: "7.264,10", status: "faturado" },
];

const statusStyle: Record<Status, { label: string; dot: string }> = {
  faturado: { label: "Faturado", dot: "bg-[#1a73e8]" },
  liberado: { label: "Liberado", dot: "bg-[#188038]" },
  aguardando: { label: "Aguard. aprov.", dot: "bg-[#f9ab00]" },
};

// colunas: nº | emissão | cliente | cnpj | cond | vendedor | total | situação
const cols =
  "grid grid-cols-[3.4rem_minmax(0,1fr)_4.2rem_5.6rem] md:grid-cols-[3.4rem_3.4rem_minmax(0,1fr)_7.4rem_3.4rem_4.4rem_5.6rem]";

export const ErpLayer = ({ p }: { p: MotionValue<number> }) => {
  const opacity = useTransform(p, [0.66, 0.74], [0, 1]);
  const y = useTransform(p, [0.66, 0.74], [30, 0]);
  const rowH = useTransform(p, [0.76, 0.82], [0, 1]);
  const rowOpacity = useTransform(p, [0.78, 0.83], [0, 1]);
  const listY = useTransform(rowH, [0, 1], [-25, 0]);
  const pendingOpacity = useTransform(p, [0.87, 0.91], [1, 0]);
  const readyOpacity = useTransform(p, [0.87, 0.91], [0, 1]);
  const count = useTransform(p, (v) => (v < 0.8 ? "1.283" : "1.284"));

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col bg-[#f3f5f8] font-sans text-[#1f2937]">
      {/* Menu de módulos */}
      <div className="flex items-center gap-3 bg-[#0f2a44] px-3 py-1.5 text-[10px] text-white/70">
        <span className="flex items-center gap-1.5 font-bold text-white">
          <LayoutGrid className="h-3.5 w-3.5 text-accent" /> GESTÃO
        </span>
        <span className="rounded bg-white/15 px-1.5 py-0.5 font-semibold text-white">Vendas</span>
        <span className="hidden sm:inline">Compras</span>
        <span className="hidden sm:inline">Estoque</span>
        <span>Financeiro</span>
        <span className="hidden md:inline">Fiscal</span>
        <span className="ml-auto hidden md:inline">Filial 01 · Matriz</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold text-white">CM</span>
      </div>

      {/* Título + ações */}
      <div className="border-b border-[#d8dee6] bg-white px-3 py-2">
        <p className="text-[9px] text-[#6b7280]">Vendas › Pedidos de venda</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <p className="mr-2 text-[13px] font-bold">Pedidos de venda</p>
          <ErpBtn primary icon={Plus} label="Incluir" />
          <ErpBtn icon={Pencil} label="Alterar" className="hidden sm:flex" />
          <ErpBtn icon={Receipt} label="Faturar" />
          <ErpBtn icon={Printer} label="Imprimir" className="hidden md:flex" />
          <ErpBtn icon={Download} label="Exportar" className="hidden md:flex" />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[9px] text-[#4b5563]">
          <span className="flex items-center gap-1 rounded border border-[#d1d5db] px-1.5 py-0.5">
            <Filter className="h-2.5 w-2.5" /> Situação: Todas <ChevronDown className="h-2.5 w-2.5" />
          </span>
          <span className="hidden rounded border border-[#d1d5db] px-1.5 py-0.5 sm:inline">Emissão: 01/11/26 a 21/11/26</span>
          <span className="ml-auto flex items-center gap-1 rounded border border-[#d1d5db] bg-[#f9fafb] px-1.5 py-0.5">
            <Search className="h-2.5 w-2.5" /> Pesquisar
          </span>
        </div>
      </div>

      {/* Grade */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-white text-[9.5px] sm:text-[10px]">
        <div className={cn(cols, "gap-2 border-b border-[#cfd6df] bg-[#e9edf2] px-3 py-1 font-semibold uppercase text-[#4b5563]")}>
          <span>Pedido</span>
          <span className="hidden md:block">Emissão</span>
          <span>Cliente</span>
          <span className="hidden md:block">CNPJ</span>
          <span className="hidden md:block">Cond. pgto</span>
          <span className="text-right">Total R$</span>
          <span>Situação</span>
        </div>

        {/* pedido novo, vindo da Softeum */}
        <motion.div style={{ opacity: rowOpacity }} className={cn(cols, "relative items-center gap-2 border-b border-[#f1d58a] bg-[#fff6d6] px-3 py-1")}>
          <span className="font-mono font-semibold">004521</span>
          <span className="hidden md:block">21/11/26</span>
          <span className="flex min-w-0 items-center gap-1 font-semibold">
            <span className="truncate">DISTRIBUIDORA ALFA LTDA</span>
            <span className="hidden shrink-0 items-center gap-0.5 rounded bg-secondary/15 px-1 text-[8px] font-bold text-secondary lg:inline-flex">
              <Mail className="h-2.5 w-2.5" /> E-MAIL
            </span>
          </span>
          <span className="hidden whitespace-nowrap font-mono md:block">12.345.678/0001-90</span>
          <span className="hidden md:block">30/60</span>
          <span className="text-right font-mono font-semibold tabular-nums">8.430,00</span>
          <span className="relative inline-grid">
            <motion.span style={{ opacity: pendingOpacity }} className="col-start-1 row-start-1 flex items-center gap-1 whitespace-nowrap text-[#6b7280]">
              <RefreshCw className="h-2.5 w-2.5 animate-spin" /> Importando
            </motion.span>
            <motion.span style={{ opacity: readyOpacity }} className="col-start-1 row-start-1 flex items-center gap-1 whitespace-nowrap font-semibold text-[#188038]">
              <Check className="h-3 w-3" /> Liberado
            </motion.span>
          </span>
        </motion.div>

        <motion.div style={{ y: listY }}>
          {rows.map((r, i) => (
            <div key={r.n} className={cn(cols, "items-center gap-2 border-b border-[#eef1f4] px-3 py-1", i % 2 && "bg-[#f8fafc]")}>
              <span className="font-mono">{r.n}</span>
              <span className="hidden md:block">{r.date}</span>
              <span className="truncate">{r.client}</span>
              <span className="hidden whitespace-nowrap font-mono text-[#6b7280] md:block">{r.cnpj}</span>
              <span className="hidden md:block">{r.cond}</span>
              <span className="text-right font-mono tabular-nums">{r.total}</span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <i className={cn("h-1.5 w-1.5 rounded-full", statusStyle[r.status].dot)} />
                {statusStyle[r.status].label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Rodapé */}
      <div className="flex items-center gap-3 border-t border-[#d8dee6] bg-[#f9fafb] px-3 py-1 text-[9px] text-[#6b7280]">
        <span>
          Registros: 1–9 de <motion.span>{count}</motion.span>
        </span>
        <motion.span style={{ opacity: readyOpacity }} className="ml-auto font-semibold text-[#188038]">
          Pedido 004521 importado do e-mail · 0 digitações
        </motion.span>
      </div>
    </motion.div>
  );
};

const ErpBtn = ({
  icon: Icon,
  label,
  primary,
  className,
}: {
  icon: typeof Plus;
  label: string;
  primary?: boolean;
  className?: string;
}) => (
  <span
    className={cn(
      "flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium",
      primary ? "bg-[#1a73e8] text-white" : "border border-[#d1d5db] bg-white text-[#374151]",
      className
    )}
  >
    <Icon className="h-3 w-3" /> {label}
  </span>
);
