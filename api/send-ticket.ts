import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const SUPPORT_INBOX = "comercial@softeum.com.br";
const FROM_INTERNAL = "Softeum Suporte <noreply@softeum.com.br>";
const FROM_CLIENT = "Softeum Suporte <noreply@softeum.com.br>";

type TicketRequest = {
  nome?: string;
  empresa?: string;
  email?: string;
  telefone?: string;
  prioridade?: string;
  categoria?: string;
  assunto?: string;
  descricao?: string;
  referencia?: string;
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

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** Protocolo no formato SFT-AAMMDD-XXXX (data de Brasília). */
const buildProtocol = (): string => {
  const now = new Date(Date.now() - 3 * 60 * 60 * 1000); // UTC-3
  const stamp = [
    String(now.getUTCFullYear()).slice(2),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");

  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `SFT-${stamp}-${suffix}`;
};

const formatDateBR = (): string =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

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

const buildInternalHtml = (
  ticket: Required<Omit<TicketRequest, "prioridade">> & { prioridade: PriorityId },
  protocol: string
) => {
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
            ${row("E-mail", `<a href="mailto:${escapeHtml(ticket.email)}" style="color:#0ea5e9;text-decoration:none;">${escapeHtml(ticket.email)}</a>`)}
            ${row("Telefone", ticket.telefone ? escapeHtml(ticket.telefone) : "Não informado")}
            ${row("Referência", ticket.referencia ? escapeHtml(ticket.referencia) : "Não informada", true)}
          </table>

          <p style="margin:24px 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Descrição</p>
          <div style="padding:16px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;font-size:14px;line-height:1.6;">
            ${nl2br(ticket.descricao)}
          </div>

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

const buildClientHtml = (
  ticket: Required<Omit<TicketRequest, "prioridade">> & { prioridade: PriorityId },
  protocol: string
) => {
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

          <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#334155;">
            Os prazos são contados em horário de atendimento: segunda a sexta, das 08h às 18h (horário de Brasília), exceto feriados nacionais.
            Chamados abertos fora desse período começam a contar no próximo dia útil.
          </p>
          <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#334155;">
            Precisa complementar alguma informação? Basta responder este e-mail mantendo o protocolo no assunto.
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const body = parseBody(req.body);

  const nome = clean(body.nome, 120);
  const empresa = clean(body.empresa, 120);
  const email = clean(body.email, 160);
  const telefone = clean(body.telefone, 40);
  const categoria = clean(body.categoria, 120) || "Não informada";
  const assunto = clean(body.assunto, 160);
  const descricao = clean(body.descricao, 8000);
  const referencia = clean(body.referencia, 200);

  const rawPriority = clean(body.prioridade, 4).toUpperCase();
  const prioridade: PriorityId =
    rawPriority === "P1" || rawPriority === "P2" || rawPriority === "P3" ? rawPriority : "P3";

  if (!nome || !empresa || !email || !assunto || !descricao) {
    return res.status(400).json({
      success: false,
      error: "Campos obrigatórios faltando: nome, empresa, e-mail, assunto e descrição.",
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ success: false, error: "Informe um e-mail válido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[send-ticket] RESEND_API_KEY não configurada no ambiente.");
    return res.status(500).json({
      success: false,
      error: "Serviço de e-mail indisponível no momento.",
    });
  }

  const protocolo = buildProtocol();
  const ticket = {
    nome,
    empresa,
    email,
    telefone,
    categoria,
    assunto,
    descricao,
    referencia,
    prioridade,
  };

  const resend = new Resend(apiKey);

  try {
    const internal = await resend.emails.send({
      from: FROM_INTERNAL,
      to: SUPPORT_INBOX,
      replyTo: email,
      subject: `[${prioridade}] ${protocolo} · ${empresa} — ${assunto}`,
      html: buildInternalHtml(ticket, protocolo),
    });

    if (internal.error) {
      console.error("[send-ticket] Falha ao enviar e-mail interno:", internal.error);
      return res.status(500).json({ success: false, error: internal.error.message });
    }

    let clienteNotificado = true;
    try {
      const confirmation = await resend.emails.send({
        from: FROM_CLIENT,
        to: email,
        replyTo: SUPPORT_INBOX,
        subject: `Chamado ${protocolo} recebido — ${assunto}`,
        html: buildClientHtml(ticket, protocolo),
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
      clienteNotificado,
      id: internal.data?.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao abrir o chamado.";
    console.error("[send-ticket] Erro inesperado:", err);
    return res.status(500).json({ success: false, error: message });
  }
}
