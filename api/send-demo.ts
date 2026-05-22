import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

type DemoRequest = {
  nome?: string;
  empresa?: string;
  telefone?: string;
  email?: string;
  pedidosMes?: string;
};

type GeoData = {
  city: string;
  region: string;
  country: string;
  ip: string;
  latitude: string;
  longitude: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const decodeHeader = (raw: string | string[] | undefined): string => {
  const value = Array.isArray(raw) ? raw[0] : (raw ?? "");
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const buildGeoSection = (geo: GeoData): string => {
  const allEmpty = !geo.city && !geo.region && !geo.country && !geo.ip && !geo.latitude && !geo.longitude;

  if (allEmpty) {
    return `
      <tr>
        <td style="padding:28px 28px 0;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Localização do lead</p>
          <p style="margin:0;font-size:14px;color:#64748b;">Localização não disponível (ambiente local ou proxy sem headers Vercel).</p>
        </td>
      </tr>`;
  }

  const locationLine = geo.city
    ? `${escapeHtml(geo.city)}${geo.region ? ` - ${escapeHtml(geo.region)}` : ""}${geo.country ? `, ${escapeHtml(geo.country)}` : ""}`
    : "Não identificada";

  const mapLink = geo.latitude && geo.longitude
    ? `<br><a href="https://www.google.com/maps?q=${escapeHtml(geo.latitude)},${escapeHtml(geo.longitude)}" style="color:#0ea5e9;text-decoration:none;font-size:13px;" target="_blank">Ver no mapa</a>`
    : "";

  return `
      <tr>
        <td style="padding:28px 28px 0;">
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Localização do lead</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;border-top:1px solid #e2e8f0;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;width:140px;vertical-align:top;">Cidade</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:600;">${locationLine}${mapLink}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#64748b;width:140px;vertical-align:top;">IP</td>
              <td style="padding:10px 0;font-weight:600;">${geo.ip ? escapeHtml(geo.ip) : "Não identificado"}</td>
            </tr>
          </table>
        </td>
      </tr>`;
};

const buildHtml = (lead: Required<DemoRequest>, geo: GeoData) => {
  const row = (label: string, value: string, isLast = false) => `
    <tr>
      <td style="padding:10px 0;${isLast ? "" : "border-bottom:1px solid #e2e8f0;"}color:#64748b;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;${isLast ? "" : "border-bottom:1px solid #e2e8f0;"}font-weight:600;white-space:pre-wrap;">${value}</td>
    </tr>`;

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.06);">
      <tr>
        <td style="padding:24px 28px;background:linear-gradient(135deg,#1e3a8a,#0ea5e9);color:#ffffff;">
          <h1 style="margin:0;font-size:20px;font-weight:700;">Novo lead da Softeum</h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.85;">Formulário "Agende uma demo"</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">
            ${row("Nome", escapeHtml(lead.nome))}
            ${row("Empresa", escapeHtml(lead.empresa))}
            ${row("Telefone", escapeHtml(lead.telefone))}
            ${row("E-mail", `<a href="mailto:${escapeHtml(lead.email)}" style="color:#0ea5e9;text-decoration:none;">${escapeHtml(lead.email)}</a>`)}
            ${row("Pedidos / mês", escapeHtml(lead.pedidosMes), true)}
          </table>
          <p style="margin:24px 0 0;font-size:13px;color:#64748b;">Responda este e-mail para falar direto com o lead.</p>
        </td>
      </tr>
      ${buildGeoSection(geo)}
      <tr>
        <td style="padding:16px 28px 28px;">
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const body = (req.body ?? {}) as DemoRequest;
  const nome = body.nome?.trim();
  const empresa = body.empresa?.trim();
  const telefone = body.telefone?.trim();
  const email = body.email?.trim();
  const pedidosMes = body.pedidosMes?.trim() || "Não informado";

  if (!nome || !empresa || !telefone || !email) {
    return res.status(400).json({
      success: false,
      error: "Campos obrigatórios faltando: nome, empresa, telefone e e-mail.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: "RESEND_API_KEY não configurada." });
  }

  let geo: GeoData = { city: "", region: "", country: "", ip: "", latitude: "", longitude: "" };
  try {
    const rawIp = Array.isArray(req.headers["x-forwarded-for"])
      ? req.headers["x-forwarded-for"][0]
      : (req.headers["x-forwarded-for"] ?? "");
    geo = {
      city: decodeHeader(req.headers["x-vercel-ip-city"]),
      region: decodeHeader(req.headers["x-vercel-ip-country-region"]),
      country: decodeHeader(req.headers["x-vercel-ip-country"]),
      ip: rawIp.split(",")[0].trim(),
      latitude: decodeHeader(req.headers["x-vercel-ip-latitude"]),
      longitude: decodeHeader(req.headers["x-vercel-ip-longitude"]),
    };
  } catch (geoErr) {
    console.error("[send-demo] Falha ao extrair geo headers:", geoErr);
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "Softeum <noreply@softeum.com.br>",
      to: "comercial@softeum.com.br",
      replyTo: email,
      subject: `Novo lead: ${nome} - ${empresa}`,
      html: buildHtml({ nome, empresa, telefone, email, pedidosMes }, geo),
    });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao enviar e-mail.";
    return res.status(500).json({ success: false, error: message });
  }
}
