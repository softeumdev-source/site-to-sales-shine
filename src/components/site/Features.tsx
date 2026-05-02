import { useState } from "react";
import {
  Mail, Brain, Activity, Edit3, ShieldCheck, Copy, Send,
  BarChart3, Plug, Lock, Check, ArrowRight, Sparkles, AlertTriangle,
  Clock, FileText, Eye, Bell, History
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureGroup = {
  id: string;
  emoji: string;
  icon: typeof Mail;
  title: string;
  pitch: string;
  bullets: string[];
  preview: () => JSX.Element;
};

/* ============== Mini interactive previews ============== */

const InboxPreview = () => (
  <div className="space-y-2">
    {[
      { from: "compras@acme.com.br", subject: "Pedido 4521 — 12 itens", status: "novo" },
      { from: "vendas@distribmax.com", subject: "Reposição mensal — PDF anexo", status: "lido" },
      { from: "pedidos@techflow.com", subject: "Pedido urgente faturar hoje", status: "novo" },
    ].map((m, i) => (
      <div
        key={i}
        className="flex items-center gap-3 rounded-xl border border-border bg-background/80 p-3 transition-all hover:border-secondary/40 hover:shadow-soft"
        style={{ animationDelay: `${i * 100}ms` }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-brand text-white">
          <FileText className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs text-muted-foreground">{m.from}</div>
          <div className="truncate text-sm font-medium">{m.subject}</div>
        </div>
        {m.status === "novo" ? (
          <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-secondary">
            novo
          </span>
        ) : (
          <Check className="h-4 w-4 text-accent" />
        )}
      </div>
    ))}
  </div>
);

const AIExtractionPreview = () => (
  <div className="grid gap-3">
    <div className="rounded-xl border border-border bg-background/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cliente identificado
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
          <Sparkles className="h-3 w-3" /> 99% IA
        </span>
      </div>
      <div className="font-display text-base font-bold">Acme Comércio LTDA</div>
      <div className="text-xs text-muted-foreground">CNPJ 12.345.678/0001-90</div>
    </div>
    <div className="overflow-hidden rounded-xl border border-border bg-background/80">
      <div className="grid grid-cols-12 gap-2 border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-semibold uppercase text-muted-foreground">
        <div className="col-span-2">Cód.</div>
        <div className="col-span-6">Produto</div>
        <div className="col-span-2 text-right">Qtd</div>
        <div className="col-span-2 text-right">Conf.</div>
      </div>
      {[
        { c: "PRD-201", p: "Caixa 30x20 reforçada", q: 120, conf: 98 },
        { c: "PRD-318", p: "Filme stretch 500m", q: 24, conf: 96 },
        { c: "PRD-402", p: "Fita adesiva 50mm", q: 60, conf: 72 },
      ].map((r, i) => (
        <div
          key={i}
          className="grid animate-fade-in grid-cols-12 items-center gap-2 px-3 py-2 text-xs"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <div className="col-span-2 font-mono text-muted-foreground">{r.c}</div>
          <div className="col-span-6 font-medium">{r.p}</div>
          <div className="col-span-2 text-right font-semibold">{r.q}</div>
          <div className="col-span-2 text-right">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                r.conf >= 90
                  ? "bg-accent/15 text-accent"
                  : "bg-secondary/15 text-secondary"
              )}
            >
              {r.conf}%
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DashboardPreview = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-2">
      {[
        { l: "Pendentes", v: 12, c: "text-secondary" },
        { l: "Aprovados", v: 284, c: "text-accent" },
        { l: "Erros", v: 3, c: "text-destructive" },
      ].map((s) => (
        <div key={s.l} className="rounded-xl border border-border bg-background/80 p-3 text-center">
          <div className={cn("font-display text-2xl font-extrabold", s.c)}>{s.v}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
        </div>
      ))}
    </div>
    <div className="rounded-xl border border-border bg-background/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold">Atualizando ao vivo</span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          ao vivo
        </span>
      </div>
      <div className="flex h-16 items-end gap-1">
        {[40, 65, 50, 80, 45, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-brand transition-all"
            style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const ReviewPreview = () => (
  <div className="rounded-xl border border-border bg-background/80 p-4">
    <div className="mb-3 flex items-center gap-2 rounded-lg border border-secondary/30 bg-secondary/10 p-2 text-xs">
      <AlertTriangle className="h-4 w-4 text-secondary" />
      <span><b>1 campo</b> com baixa confiança — revise antes de aprovar.</span>
    </div>
    <div className="grid gap-2">
      <div>
        <label className="text-[10px] font-semibold uppercase text-muted-foreground">Quantidade</label>
        <div className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium">120</div>
      </div>
      <div>
        <label className="text-[10px] font-semibold uppercase text-muted-foreground">Preço unitário</label>
        <div className="mt-1 rounded-lg border-2 border-secondary bg-secondary/5 px-3 py-2 text-sm font-medium">
          R$ 12,40 <span className="text-xs text-secondary">(72% conf.)</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="rounded-lg bg-muted px-3 py-2 text-center text-xs">
          Subtotal: <b>R$ 1.488,00</b>
        </div>
        <div className="rounded-lg bg-accent/10 px-3 py-2 text-center text-xs text-accent">
          Total auto: <b>R$ 1.488,00</b>
        </div>
      </div>
    </div>
  </div>
);

const ApprovalPreview = () => (
  <div className="space-y-3">
    <div className="rounded-xl border border-border bg-background/80 p-3">
      <div className="mb-2 text-xs font-semibold">Regras de aprovação</div>
      <div className="space-y-2 text-xs">
        {[
          { txt: "Confiança ≥ 95% → aprovar automaticamente", on: true },
          { txt: "Pedido > R$ 10.000 → revisão manual", on: true },
          { txt: "Cliente novo → sempre revisar", on: false },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2">
            <span className={cn(!r.on && "text-muted-foreground line-through")}>{r.txt}</span>
            <span
              className={cn(
                "h-4 w-7 rounded-full p-0.5 transition-colors",
                r.on ? "bg-accent" : "bg-muted-foreground/30"
              )}
            >
              <span className={cn("block h-3 w-3 rounded-full bg-white transition-transform", r.on && "translate-x-3")} />
            </span>
          </div>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 p-3 text-xs">
      <Check className="h-4 w-4 text-accent" />
      <span>Aprovado por <b>Maria Silva</b> em 21/04 às 14:32</span>
    </div>
  </div>
);

const DuplicatePreview = () => (
  <div className="rounded-xl border-2 border-secondary/40 bg-secondary/5 p-4">
    <div className="mb-3 flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white">
        <Copy className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-bold">Pedido duplicado detectado</div>
        <div className="text-xs text-muted-foreground">Mesmo cliente, mesmos itens, há 2h</div>
      </div>
    </div>
    <div className="grid gap-1.5 text-xs">
      <div className="flex justify-between rounded-lg bg-background px-3 py-1.5">
        <span>Pedido #4521</span><span className="text-muted-foreground">12:30</span>
      </div>
      <div className="flex justify-between rounded-lg border border-secondary/40 bg-secondary/10 px-3 py-1.5">
        <span className="font-bold">Pedido #4538 (atual)</span><span className="text-secondary">14:42</span>
      </div>
    </div>
    <button className="mt-3 w-full rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-white">
      Bloquear automaticamente
    </button>
  </div>
);

const NotificationPreview = () => (
  <div className="space-y-2">
    {[
      { icon: Mail, t: "Pedido recebido", d: "Olá Acme, recebemos seu pedido #4521.", c: "bg-accent" },
      { icon: Check, t: "Pedido aprovado", d: "Seu pedido foi aprovado e está em separação.", c: "bg-secondary" },
      { icon: Bell, t: "Nota fiscal emitida", d: "NF 8821 disponível para download.", c: "bg-gradient-brand" },
    ].map((n, i) => (
      <div
        key={i}
        className="flex animate-fade-in items-start gap-3 rounded-xl border border-border bg-background/80 p-3"
        style={{ animationDelay: `${i * 200}ms` }}
      >
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white", n.c)}>
          <n.icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold">{n.t}</div>
          <div className="truncate text-xs text-muted-foreground">{n.d}</div>
        </div>
      </div>
    ))}
  </div>
);

const ReportsPreview = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-xl border border-border bg-background/80 p-3">
        <div className="text-[10px] uppercase text-muted-foreground">Vendas (mês)</div>
        <div className="font-display text-xl font-extrabold text-gradient-brand">R$ 482k</div>
        <div className="text-[10px] text-accent">↑ 18% vs anterior</div>
      </div>
      <div className="rounded-xl border border-border bg-background/80 p-3">
        <div className="text-[10px] uppercase text-muted-foreground">Ticket médio</div>
        <div className="font-display text-xl font-extrabold">R$ 1.7k</div>
        <div className="text-[10px] text-accent">↑ 6%</div>
      </div>
    </div>
    <div className="rounded-xl border border-border bg-background/80 p-3">
      <div className="mb-2 text-xs font-semibold">Top clientes</div>
      {[
        { n: "Acme Comércio", v: 84 },
        { n: "DistribMax", v: 62 },
        { n: "TechFlow", v: 41 },
      ].map((c) => (
        <div key={c.n} className="mb-1.5 last:mb-0">
          <div className="flex justify-between text-[11px]">
            <span>{c.n}</span><span className="text-muted-foreground">{c.v}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${c.v}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ErpPreview = () => (
  <div className="space-y-3">
    <div className="rounded-xl border border-border bg-background/80 p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Destino do pedido
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border-2 border-accent/40 bg-accent/5 p-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand" />
          <div>
            <div className="text-xs font-bold">Softeum</div>
            <div className="text-[10px] text-muted-foreground">Pedido validado</div>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-accent" />
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">
            ERP
          </div>
          <div>
            <div className="text-xs font-bold">SAP / TOTVS</div>
            <div className="text-[10px] text-muted-foreground">Lançado em 2s</div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["SAP", "TOTVS", "Sankhya", "Bling", "Omie", "Senior"].map((e) => (
          <span key={e} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium">{e}</span>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-border bg-background/80 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Importação direta por arquivo
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
          <Check className="h-3 w-3" /> pronto
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { fmt: "CSV", desc: "Obrigatório", color: "from-secondary to-accent" },
          { fmt: "XML", desc: "Integração robusta", color: "from-accent to-primary" },
          { fmt: "JSON", desc: "API / futuro", color: "from-primary to-secondary" },
          { fmt: "XLSX", desc: "Planilhas ERP", color: "from-secondary/80 to-primary/80" },
        ].map((f) => (
          <div
            key={f.fmt}
            className="flex items-center gap-2 rounded-lg border border-border bg-background p-2"
          >
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-[10px] font-bold text-white", f.color)}>
              {f.fmt}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold">.{f.fmt.toLowerCase()}</div>
              <div className="truncate text-[10px] text-muted-foreground">{f.desc}</div>
            </div>
            <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-accent" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SecurityPreview = () => (
  <div className="space-y-2">
    {[
      { icon: Lock, t: "Login com 2FA", d: "Autenticação em duas etapas obrigatória" },
      { icon: ShieldCheck, t: "Permissões por usuário", d: "Defina quem aprova, quem só visualiza" },
      { icon: History, t: "Auditoria completa", d: "Log de quem fez, quando e o quê" },
    ].map((s, i) => (
      <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-background/80 p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <s.icon className="h-4 w-4" />
        </div>
        <div>
          <div className="text-xs font-bold">{s.t}</div>
          <div className="text-[11px] text-muted-foreground">{s.d}</div>
        </div>
      </div>
    ))}
  </div>
);

/* ============== Feature data ============== */

const groups: FeatureGroup[] = [
  {
    id: "recebimento",
    emoji: "⚡",
    icon: Mail,
    title: "Captura automática dos pedidos por e-mail",
    pitch: "Conecte o e-mail comercial da sua empresa e deixe a Softeum trabalhar 24/7 por você.",
    bullets: [
      "Monitoramento automático da caixa de entrada a cada poucos minutos",
      "Funciona com qualquer provedor de e-mail (corporativo ou pessoal) via conexão segura ou encaminhamento",
      "Nenhum pedido fica esquecido — todos entram no fluxo automaticamente",
    ],
    preview: InboxPreview,
  },
  {
    id: "ia",
    emoji: "🤖",
    icon: Brain,
    title: "Leitura automática de PDF por IA avançada",
    pitch: "Nossa IA lê qualquer PDF de pedido, independente do layout ou formato.",
    bullets: [
      "Até 95% de precisão na leitura dos PDFs",
      "Extrai número do pedido, empresa, CNPJ, produtos, quantidades e preços",
      "Identifica endereço de entrega e outros dados importantes do pedido",
    ],
    preview: AIExtractionPreview,
  },
  {
    id: "painel",
    emoji: "📊",
    icon: Activity,
    title: "Painel de controle completo",
    pitch: "Visualize todos os pedidos recebidos e acompanhe cada etapa da operação.",
    bullets: [
      "Aprove ou reprove pedidos com um clique",
      "Edite informações, adicione observações e acompanhe alterações",
      "Filtros rápidos para encontrar qualquer pedido recebido",
    ],
    preview: DashboardPreview,
  },
  {
    id: "revisao",
    emoji: "✏️",
    icon: Edit3,
    title: "DE-PARA automático de códigos",
    pitch: "O Softeum aprende e converte os códigos dos clientes para os códigos do seu ERP.",
    bullets: [
      "Mapeamento inteligente entre códigos do cliente e do ERP",
      "Aprendizado que melhora a cada pedido processado",
      "Revisão rápida quando algum item exigir validação",
      "Histórico completo de alterações para rastreabilidade",
    ],
    preview: ReviewPreview,
  },
  {
    id: "aprovacao",
    emoji: "✅",
    icon: ShieldCheck,
    title: "Aprovação inteligente",
    pitch: "Automatize o que é confiável e revise só o necessário.",
    bullets: [
      "Aprovação manual ou automática",
      "Regras configuráveis por nível de confiança",
      "Controle total sobre quem aprovou e quando",
    ],
    preview: ApprovalPreview,
  },
  {
    id: "duplicidade",
    emoji: "🔁",
    icon: Copy,
    title: "Controle de duplicidade",
    pitch: "Evite pedidos repetidos e prejuízo.",
    bullets: [
      "Identificação automática de duplicados",
      "Bloqueio configurável",
      "Alertas visuais no sistema",
    ],
    preview: DuplicatePreview,
  },
  {
    id: "comunicacao",
    emoji: "📧",
    icon: Send,
    title: "Comunicação automática",
    pitch: "Seu cliente sempre informado, sem esforço.",
    bullets: [
      "Notificação de recebimento, aprovação ou erro",
      "Tudo automático e configurável",
    ],
    preview: NotificationPreview,
  },
  {
    id: "relatorios",
    emoji: "📈",
    icon: BarChart3,
    title: "Relatórios e insights",
    pitch: "Acompanhe volume, valores, aprovações e performance por período.",
    bullets: [
      "Volume de pedidos e valor processado",
      "Taxa de aprovação, produtos mais vendidos e ranking de clientes",
      "Relatórios visuais por período para tomada de decisão",
    ],
    preview: ReportsPreview,
  },
  {
    id: "erp",
    emoji: "⚙️",
    icon: Plug,
    title: "Integração com seu ERP via API ou exportação",
    pitch: "Os dois pilares da Softeum: integramos direto no seu ERP por API ou geramos o arquivo de importação no formato exato que ele aceita.",
    bullets: [
      "Integração direta via API com seu ERP — pedido cai já lançado, sem intervenção humana",
      "Exportação personalizada em CSV, XML, JSON ou XLSX no layout exato do seu sistema",
      "Suba uma única vez um arquivo modelo e a IA replica esse layout em todos os pedidos",
      "Compatível com SAP, TOTVS, Sankhya, Bling, Omie, Senior e outros — ou qualquer ERP customizado",
    ],
    preview: ErpPreview,
  },
  {
    id: "seguranca",
    emoji: "🔒",
    icon: Lock,
    title: "Segurança e controle",
    pitch: "Dados isolados por cliente, controle de acesso por empresa e rastreabilidade total.",
    bullets: [
      "Sessão única por usuário e controle de acesso por empresa",
      "Cada empresa visualiza apenas suas próprias informações",
      "Histórico detalhado: quem mudou o quê e quando",
    ],
    preview: SecurityPreview,
  },
  {
    id: "equipe",
    emoji: "👥",
    icon: ShieldCheck,
    title: "Gestão de equipe",
    pitch: "Adicione membros com diferentes níveis de acesso e controle aprovações.",
    bullets: [
      "Perfis de administrador e operador",
      "Controle de quem pode aprovar pedidos",
      "Acesso seguro para times comerciais, fiscais e operacionais",
    ],
    preview: SecurityPreview,
  },
];

/* ============== Main component ============== */

export const Features = () => {
  const [active, setActive] = useState(groups[0].id);
  const current = groups.find((g) => g.id === active)!;
  const Preview = current.preview;

  return (
    <section id="funcionalidades" className="relative overflow-hidden bg-muted/40 py-20 md:py-28">
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="container relative">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Funcionalidades
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Tudo que sua operação precisa para{" "}
            <span className="text-gradient-brand">vender mais e melhor</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Capacidades trabalhando juntas — do e-mail ao ERP, com IA, regras
            de aprovação e visibilidade total.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
          {/* Tab list */}
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:pb-0">
            {groups.map((g) => {
              const isActive = g.id === active;
              return (
                <button
                  key={g.id}
                  onClick={() => setActive(g.id)}
                  className={cn(
                    "group flex w-[84vw] max-w-[290px] shrink-0 items-center gap-3 rounded-xl border p-3 text-left transition-all sm:w-72 lg:w-full lg:max-w-none lg:shrink",
                    isActive
                      ? "border-transparent bg-card shadow-elegant"
                      : "border-border bg-card/50 hover:border-accent/40 hover:bg-card hover:shadow-soft"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all",
                      isActive
                        ? "bg-gradient-brand text-white shadow-glow"
                        : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                    )}
                  >
                    <g.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{g.emoji}</span>
                      <span className={cn("truncate text-sm font-bold", isActive && "text-foreground")}>
                        {g.title}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="hidden h-2 w-2 shrink-0 rounded-full bg-secondary lg:block" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div
            key={active}
            className="grid animate-fade-in gap-6 rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6 md:p-8 lg:grid-cols-2"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-glow">
                <span>{current.emoji}</span>
                <span>Funcionalidade vendável</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight md:text-3xl">
                {current.title}
              </h3>
              <p className="mt-2 text-base italic text-muted-foreground">
                "{current.pitch}"
              </p>

              <ul className="mt-6 space-y-2.5">
                {current.bullets.map((b, i) => (
                  <li
                    key={b}
                    className="flex animate-fade-in items-start gap-2.5"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 animate-tick items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-foreground/85">{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#demo"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
              >
                Ver na prática <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Preview */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/60 to-background p-3 sm:p-4 md:p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">softeum.app</span>
              </div>
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
