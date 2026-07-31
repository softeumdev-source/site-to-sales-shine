import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * Abertura de chamado de suporte — exige login da plataforma Softeum.
 *
 * O cliente entra na aba de suporte com o MESMO e-mail e senha da plataforma
 * (Supabase Auth) e o navegador manda o token aqui. Este endpoint:
 *   1. valida o token no servidor (nunca confia no que o formulário diz);
 *   2. registra o chamado pela RPC `abrir_chamado`, que carimba tenant, e-mail
 *      e protocolo a partir do próprio token;
 *   3. envia o chamado para o suporte com os prints/PDFs em anexo e manda a
 *      confirmação com o protocolo para quem abriu.
 *
 * Sem token não há chamado: é assim que sabemos de qual empresa e de qual
 * responsável veio cada pedido de ajuda.
 */

const SUPPORT_INBOX = "comercial@softeum.com.br";
const FROM_INTERNAL = "Softeum Suporte <noreply@softeum.com.br>";
const FROM_CLIENT = "Softeum Suporte <noreply@softeum.com.br>";

/** Espelha os limites do formulário (src/lib/anexos.ts). */
const MAX_ANEXOS = 3;
const MAX_ANEXO_BYTES = 2 * 1024 * 1024;
const MAX_ANEXOS_TOTAL_BYTES = 3 * 1024 * 1024;
const TIPOS_ANEXO = ["image/png", "image/jpeg", "image/webp", "image/gif", "application/pdf"];

type AnexoRequest = { nome?: string; tipo?: string; base64?: string };

type TicketRequest = {
  nome?: string;
  telefone?: string;
  prioridade?: string;
  categoria?: string;
  assunto?: string;
  descricao?: string;
  referencia?: string;
  anexos?: AnexoRequest[];
};

type PriorityId = "P1" | "P2" | "P3";

const PRIORITIES: Record<PriorityId, { name: string; firstResponse: string; resolution: string }> = {
  P1: { name: "P1 - Crítico", firstResponse: "até 1 hora útil", resolution: "até 8 horas úteis" },
  P2: { name: "P2 - Alto", firstResponse: "até 4 horas úteis", resolution: "até 2 dias úteis" },
  P3: { name: "P3 - Normal", firstResponse: "até 1 dia útil", resolution: "conforme planejamento" },
};

const PRIORITY_COLOR: Record<PriorityId, string> = {
  P1: "#dc2626",
  P2: "#f59e0b",
  P3: "#0ea5e9",
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br>");

const clean = (value: unknown, maxLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const formatDateBR = (): string =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

const formatarTamanho = (bytes: number): string =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const row = (label: string, value: string, isLast = false) => `
    <tr>
      <td style="padding:10px 0;${isLast ? "" : "border-bottom:1px solid #e2e8f0;"}color:#64748b;width:170px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;${isLast ? "" : "border-bottom:1px solid #e2e8f0;"}font-weight:600;white-space:pre-wrap;">${value}</td>
    </tr>`;

const shell = (headerBg: string, title: string, subtitle: string, body: string) => `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.06);">
      <tr>
        <td style="padding:24px 28px;background:${headerBg};color:#ffffff;">
          <h1 style="margin:0;font-size:20px;font-weight:700;">${title}</h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">${subtitle}</p>
        </td>
      </tr>
      ${body}
    </table>
  </body>
</html>`;

type Ticket = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  categoria: string;
  assunto: string;
  descricao: string;
  referencia: string;
  prioridade: PriorityId;
};

type AnexoValidado = { nome: string; tipo: string; base64: string; tamanho: number };

const listaAnexosHtml = (anexos: AnexoValidado[]) =>
  anexos.length === 0
    ? ""
    : `
          <p style="margin:24px 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Anexos (${anexos.length})</p>
          <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.7;color:#334155;">
            ${anexos
              .map((a) => `<li>${escapeHtml(a.nome)} · ${formatarTamanho(a.tamanho)}</li>`)
              .join("")}
          </ul>`;

const buildInternalHtml = (ticket: Ticket, protocol: string, anexos: AnexoValidado[]) => {
  const sla = PRIORITIES[ticket.prioridade];

  const body = `
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 16px;font-size:13px;color:#64748b;">
            Protocolo <strong style="color:#0f172a;font-size:15px;">${protocol}</strong> · aberto em ${formatDateBR()}
          </p>
          <p style="margin:0 0 20px;">
            <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${PRIORITY_COLOR[ticket.prioridade]};color:#ffffff;font-size:12px;font-weight:700;">
              ${sla.name}
            </span>
            <span style="display:inline-block;margin-left:8px;font-size:12px;color:#64748b;">
              Primeiro retorno ${sla.firstResponse} · Resolução ${sla.resolution}
            </span>
          </p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">
            ${row("Assunto", escapeHtml(ticket.assunto))}
            ${row("Categoria", escapeHtml(ticket.categoria))}
            ${row("Empresa", escapeHtml(ticket.empresa))}
            ${row("Solicitante", escapeHtml(ticket.nome))}
            ${row("E-mail (autenticado)", `<a href="mailto:${escapeHtml(ticket.email)}" style="color:#0ea5e9;text-decoration:none;">${escapeHtml(ticket.email)}</a>`)}
            ${row("Telefone", ticket.telefone ? escapeHtml(ticket.telefone) : "Não informado")}
            ${row("Referência", ticket.referencia ? escapeHtml(ticket.referencia) : "Não informada", true)}
          </table>

          <p style="margin:24px 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Descrição</p>
          <div style="padding:16px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:14px;line-height:1.6;">
            ${nl2br(ticket.descricao)}
          </div>
          ${listaAnexosHtml(anexos)}

          <p style="margin:24px 0 0;font-size:13px;color:#64748b;">Responda este e-mail para falar direto com o cliente. Mantenha o protocolo no assunto.</p>
        </td>
      </tr>`;

  return shell(
    `linear-gradient(135deg,#1e3a8a,${PRIORITY_COLOR[ticket.prioridade]})`,
    `Novo chamado ${ticket.prioridade}: ${escapeHtml(ticket.assunto)}`,
    `Protocolo ${protocol} · ${escapeHtml(ticket.empresa)}`,
    body
  );
};

const buildClientHtml = (ticket: Ticket, protocol: string, anexos: AnexoValidado[]) => {
  const sla = PRIORITIES[ticket.prioridade];

  const body = `
      <tr>
        <td style="padding:28px;">
          <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
            Olá, ${escapeHtml(ticket.nome.split(" ")[0] || ticket.nome)}! Recebemos o seu chamado e ele já está na fila do nosso time técnico.
          </p>

          <div style="padding:20px;border-radius:10px;border:1px dashed #0ea5e9;background:#f0f9ff;text-align:center;">
            <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Protocolo</p>
            <p style="margin:6px 0 0;font-size:24px;font-weight:700;letter-spacing:0.02em;">${protocol}</p>
          </div>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;margin-top:24px;">
            ${row("Assunto", escapeHtml(ticket.assunto))}
            ${row("Categoria", escapeHtml(ticket.categoria))}
            ${row("Prioridade", sla.name)}
            ${row("Primeiro retorno", sla.firstResponse)}
            ${row("Previsão de resolução", sla.resolution)}
            ${row("Aberto em", formatDateBR(), true)}
          </table>

          <p style="margin:24px 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">O que você nos enviou</p>
          <div style="padding:16px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:14px;line-height:1.6;">
            ${nl2br(ticket.descricao)}
          </div>
          ${listaAnexosHtml(anexos)}

          <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#334155;">
            Os prazos são contados em horário de atendimento: segunda a sexta, das 08h às 18h (horário de Brasília), exceto feriados nacionais.
            Chamados abertos fora desse período começam a contar no próximo dia útil.
          </p>
          <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#334155;">
            Você acompanha o andamento na aba <strong>Suporte</strong> do site, entrando com o mesmo acesso da plataforma.
            Para complementar informações, basta responder este e-mail mantendo o protocolo no assunto.
          </p>
          <p style="margin:24px 0 0;font-size:13px;color:#64748b;">Equipe Softeum · ${SUPPORT_INBOX}</p>
        </td>
      </tr>`;

  return shell(
    "linear-gradient(135deg,#1e3a8a,#0ea5e9)",
    "Chamado recebido",
    `Protocolo ${protocol}`,
    body
  );
};

/** O corpo chega como objeto quando o runtime parseia o JSON, mas pode vir como string. */
const parseBody = (raw: unknown): TicketRequest => {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as TicketRequest;
    } catch {
      return {};
    }
  }
  return (raw ?? {}) as TicketRequest;
};

const supabaseEnv = () => ({
  url: (process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "").replace(/\/$/, ""),
  anonKey: process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY ?? "",
});

const bearerToken = (req: VercelRequest): string => {
  const header = req.headers.authorization ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(Array.isArray(header) ? header[0] : header);
  return match ? match[1].trim() : "";
};

/** Valida o token no Supabase. Nunca confie no e-mail que veio no corpo. */
const usuarioDoToken = async (
  url: string,
  anonKey: string,
  token: string
): Promise<{ email: string } | null> => {
  const resposta = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
  });
  if (!resposta.ok) return null;
  const usuario = (await resposta.json().catch(() => null)) as { email?: string } | null;
  return usuario?.email ? { email: usuario.email } : null;
};

/** Nome da empresa do usuário — o RLS já limita ao tenant dele. */
const empresaDoUsuario = async (url: string, anonKey: string, token: string): Promise<string> => {
  const resposta = await fetch(`${url}/rest/v1/tenants?select=nome&limit=2`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
  });
  if (!resposta.ok) return "";
  const linhas = (await resposta.json().catch(() => [])) as { nome?: string }[];
  return linhas.length === 1 ? (linhas[0]?.nome ?? "") : "";
};

/** Decodifica e confere os anexos com os mesmos limites do formulário. */
const validarAnexos = (
  entrada: unknown
): { anexos: AnexoValidado[]; erro: string | null } => {
  if (!Array.isArray(entrada) || entrada.length === 0) return { anexos: [], erro: null };
  if (entrada.length > MAX_ANEXOS) {
    return { anexos: [], erro: `Envie no máximo ${MAX_ANEXOS} arquivos por chamado.` };
  }

  const anexos: AnexoValidado[] = [];
  let total = 0;

  for (const bruto of entrada as AnexoRequest[]) {
    const nome = clean(bruto?.nome, 160).replace(/[\r\n"]/g, "") || "anexo";
    const tipo = clean(bruto?.tipo, 100).toLowerCase();
    const base64 = typeof bruto?.base64 === "string" ? bruto.base64.replace(/\s/g, "") : "";

    if (!base64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
      return { anexos: [], erro: `Anexo "${nome}" inválido.` };
    }
    if (tipo && !TIPOS_ANEXO.includes(tipo)) {
      return { anexos: [], erro: `Anexo "${nome}": envie imagem (PNG, JPG, WEBP, GIF) ou PDF.` };
    }

    const tamanho = Math.floor((base64.length * 3) / 4);
    if (tamanho > MAX_ANEXO_BYTES) {
      return {
        anexos: [],
        erro: `Anexo "${nome}" tem ${formatarTamanho(tamanho)}: o limite por arquivo é ${formatarTamanho(MAX_ANEXO_BYTES)}.`,
      };
    }

    total += tamanho;
    if (total > MAX_ANEXOS_TOTAL_BYTES) {
      return {
        anexos: [],
        erro: `Os anexos somam mais de ${formatarTamanho(MAX_ANEXOS_TOTAL_BYTES)}. Reduza os arquivos e tente de novo.`,
      };
    }

    anexos.push({ nome, tipo: tipo || "application/octet-stream", base64, tamanho });
  }

  return { anexos, erro: null };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { url: supabaseUrl, anonKey } = supabaseEnv();
  if (!supabaseUrl || !anonKey) {
    console.error("[send-ticket] SUPABASE_URL/SUPABASE_ANON_KEY não configurados no ambiente.");
    return res.status(500).json({
      success: false,
      error: "Área de suporte indisponível no momento.",
    });
  }

  const token = bearerToken(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Entre com o seu acesso da plataforma Softeum para abrir o chamado.",
    });
  }

  const usuario = await usuarioDoToken(supabaseUrl, anonKey, token).catch(() => null);
  if (!usuario) {
    return res.status(401).json({
      success: false,
      error: "Sua sessão expirou. Entre de novo para abrir o chamado.",
    });
  }

  const body = parseBody(req.body);

  const nome = clean(body.nome, 120);
  const telefone = clean(body.telefone, 40);
  const categoria = clean(body.categoria, 120) || "Não informada";
  const assunto = clean(body.assunto, 160);
  const descricao = clean(body.descricao, 8000);
  const referencia = clean(body.referencia, 200);

  const rawPriority = clean(body.prioridade, 4).toUpperCase();
  const prioridade: PriorityId =
    rawPriority === "P1" || rawPriority === "P2" || rawPriority === "P3" ? rawPriority : "P3";

  if (!nome || !assunto || !descricao) {
    return res.status(400).json({
      success: false,
      error: "Campos obrigatórios faltando: nome, assunto e descrição.",
    });
  }

  const { anexos, erro: erroAnexo } = validarAnexos(body.anexos);
  if (erroAnexo) {
    return res.status(400).json({ success: false, error: erroAnexo });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[send-ticket] RESEND_API_KEY não configurada no ambiente.");
    return res.status(500).json({
      success: false,
      error: "Serviço de e-mail indisponível no momento.",
    });
  }

  // 1) Registra o chamado. O protocolo, o tenant e o e-mail vêm do banco a
  //    partir do token — o formulário não escolhe nada disso.
  const registro = await fetch(`${supabaseUrl}/rest/v1/rpc/abrir_chamado`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_nome: nome,
      p_prioridade: prioridade,
      p_categoria: categoria,
      p_assunto: assunto,
      p_descricao: descricao,
      p_telefone: telefone,
      p_referencia: referencia,
      p_anexos: anexos.map((a) => ({
        nome: a.nome,
        tipo: a.tipo,
        tamanho_kb: Math.max(1, Math.round(a.tamanho / 1024)),
      })),
    }),
  }).catch(() => null);

  if (!registro || !registro.ok) {
    const detalhe = (await registro?.json().catch(() => null)) as { message?: string } | null;
    console.error("[send-ticket] Falha ao registrar chamado:", registro?.status, detalhe);
    const semEmpresa = /empresa vinculada/i.test(detalhe?.message ?? "");
    const muitosChamados = /Muitos chamados/i.test(detalhe?.message ?? "");
    return res.status(semEmpresa || muitosChamados ? 403 : 500).json({
      success: false,
      error:
        detalhe?.message && (semEmpresa || muitosChamados)
          ? detalhe.message
          : "Não foi possível registrar o chamado. Tente novamente em instantes.",
    });
  }

  const linhas = (await registro.json().catch(() => [])) as { protocolo?: string }[];
  const protocolo = linhas[0]?.protocolo;
  if (!protocolo) {
    console.error("[send-ticket] RPC abrir_chamado não devolveu protocolo.");
    return res.status(500).json({
      success: false,
      error: "Não foi possível registrar o chamado. Tente novamente em instantes.",
    });
  }

  const empresa = (await empresaDoUsuario(supabaseUrl, anonKey, token).catch(() => "")) || "—";

  const ticket: Ticket = {
    nome,
    empresa,
    email: usuario.email,
    telefone,
    categoria,
    assunto,
    descricao,
    referencia,
    prioridade,
  };

  // 2) Avisa o suporte e o cliente. O chamado JÁ está registrado: falha de
  //    e-mail vira aviso na tela, não perda do chamado.
  const resend = new Resend(apiKey);
  const avisos: string[] = [];

  try {
    const internal = await resend.emails.send({
      from: FROM_INTERNAL,
      to: SUPPORT_INBOX,
      replyTo: usuario.email,
      subject: `[${prioridade}] ${protocolo} · ${empresa} — ${assunto}`,
      html: buildInternalHtml(ticket, protocolo, anexos),
      attachments: anexos.map((a) => ({ filename: a.nome, content: a.base64 })),
    });

    if (internal.error) {
      console.error("[send-ticket] Falha ao enviar e-mail interno:", internal.error);
      avisos.push("Não conseguimos enviar o aviso por e-mail ao time, mas o chamado foi registrado.");
    }
  } catch (err) {
    console.error("[send-ticket] Erro ao enviar e-mail interno:", err);
    avisos.push("Não conseguimos enviar o aviso por e-mail ao time, mas o chamado foi registrado.");
  }

  let clienteNotificado = true;
  try {
    const confirmation = await resend.emails.send({
      from: FROM_CLIENT,
      to: usuario.email,
      replyTo: SUPPORT_INBOX,
      subject: `Chamado ${protocolo} recebido — ${assunto}`,
      html: buildClientHtml(ticket, protocolo, anexos),
    });

    if (confirmation.error) {
      clienteNotificado = false;
      console.error("[send-ticket] Falha ao enviar confirmação ao cliente:", confirmation.error);
    }
  } catch (confirmationErr) {
    clienteNotificado = false;
    console.error("[send-ticket] Erro ao enviar confirmação ao cliente:", confirmationErr);
  }

  return res.status(200).json({
    success: true,
    protocolo,
    prioridade,
    empresa,
    email: usuario.email,
    clienteNotificado,
    avisos,
  });
}
