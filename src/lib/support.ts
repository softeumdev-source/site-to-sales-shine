export type PriorityId = "P1" | "P2" | "P3";

export type Priority = {
  id: PriorityId;
  name: string;
  short: string;
  example: string;
  firstResponse: string;
  resolution: string;
  /** Texto curto usado no select do formulário. */
  selectLabel: string;
};

export const PRIORITIES: Priority[] = [
  {
    id: "P1",
    name: "P1 — Crítico",
    short: "Crítico",
    example: "Sistema parado, nenhum pedido sendo processado ou enviado ao ERP.",
    firstResponse: "até 1 hora útil",
    resolution: "até 8 horas úteis",
    selectLabel: "P1 — Crítico (operação parada)",
  },
  {
    id: "P2",
    name: "P2 — Alto",
    short: "Alto",
    example: "Erro em pedidos de um cliente específico, integração falhando parcialmente.",
    firstResponse: "até 4 horas úteis",
    resolution: "até 2 dias úteis",
    selectLabel: "P2 — Alto (parte da operação afetada)",
  },
  {
    id: "P3",
    name: "P3 — Normal",
    short: "Normal",
    example: "Dúvidas de uso, ajustes de cadastro, sugestões e melhorias.",
    firstResponse: "até 1 dia útil",
    resolution: "conforme planejamento",
    selectLabel: "P3 — Normal (dúvida, ajuste ou melhoria)",
  },
];

export const SUPPORT_CATEGORIES = [
  "Pedidos não processados / não enviados ao ERP",
  "Erro na leitura ou extração do pedido",
  "Integração com ERP (API ou exportação)",
  "Conexão com o e-mail / caixa de entrada",
  "Acesso, login e usuários",
  "Plano, cobrança e faturamento",
  "Dúvida de uso",
  "Sugestão de melhoria",
  "Outro assunto",
] as const;

export const BUSINESS_HOURS = {
  days: "Segunda a sexta-feira",
  hours: "08h às 18h (horário de Brasília)",
  exception: "Exceto feriados nacionais",
};

/** Chamado registrado no banco (tabela `chamados`, RLS por tenant). */
export type ChamadoStatus = "aberto" | "em_andamento" | "resolvido" | "cancelado";

export type Chamado = {
  id: string;
  protocolo: string;
  assunto: string;
  descricao: string;
  categoria: string;
  prioridade: PriorityId;
  status: ChamadoStatus;
  resposta: string | null;
  nome: string;
  email: string;
  anexos: { nome?: string; tipo?: string; tamanho_kb?: number }[] | null;
  criado_em: string;
  atualizado_em: string;
};

export const CHAMADO_STATUS: Record<ChamadoStatus, { label: string; classe: string }> = {
  aberto: { label: "Aberto", classe: "border-accent/40 bg-accent/10 text-accent" },
  em_andamento: {
    label: "Em andamento",
    classe: "border-primary/40 bg-primary/10 text-primary",
  },
  resolvido: {
    label: "Resolvido",
    classe: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
  },
  cancelado: { label: "Cancelado", classe: "border-border bg-muted text-muted-foreground" },
};
