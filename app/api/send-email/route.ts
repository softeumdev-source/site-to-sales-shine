import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

type LeadData = {
  nome: string
  empresa: string
  telefone: string
  email: string
  mensagem: string
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const buildHtml = (lead: LeadData, geo: Record<string, string>) => {
  const row = (label: string, value: string, isLast = false) => `
    <tr>
      <td style="padding:10px 0;${isLast ? '' : 'border-bottom:1px solid #e2e8f0;'}color:#64748b;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;${isLast ? '' : 'border-bottom:1px solid #e2e8f0;'}font-weight:600;white-space:pre-wrap;">${value}</td>
    </tr>`

  const locationLine = geo.city
    ? `${escapeHtml(geo.city)}${geo.region ? ` - ${escapeHtml(geo.region)}` : ''}${geo.country ? `, ${escapeHtml(geo.country)}` : ''}`
    : 'Não identificada'

  const mapLink =
    geo.latitude && geo.longitude
      ? `<br><a href="https://www.google.com/maps?q=${geo.latitude},${geo.longitude}" style="color:#0ea5e9;text-decoration:none;font-size:13px;" target="_blank">Ver no mapa</a>`
      : ''

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:24px;background:#f4f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.06);">
      <tr>
        <td style="padding:24px 28px;background:linear-gradient(135deg,#1e3a8a,#0ea5e9);color:#ffffff;">
          <h1 style="margin:0;font-size:20px;font-weight:700;">Novo contato via Softeum</h1>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.85;">Formulário de contato do site</p>
        </td>
      </tr>
      <tr>
        <td style="padding:28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">
            ${row('Nome', escapeHtml(lead.nome))}
            ${row('Empresa', escapeHtml(lead.empresa))}
            ${row('Telefone', escapeHtml(lead.telefone))}
            ${row('E-mail', `<a href="mailto:${escapeHtml(lead.email)}" style="color:#0ea5e9;text-decoration:none;">${escapeHtml(lead.email)}</a>`)}
            ${row('Mensagem', escapeHtml(lead.mensagem), true)}
          </table>
          <p style="margin:24px 0 0;font-size:13px;color:#64748b;">Responda este e-mail para falar direto com o lead.</p>
        </td>
      </tr>
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
              <td style="padding:10px 0;font-weight:600;">${geo.ip ? escapeHtml(geo.ip) : 'Não identificado'}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="padding:28px;"></td></tr>
    </table>
  </body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const nome = (body.nome ?? '').trim()
    const empresa = (body.empresa ?? '').trim()
    const telefone = (body.telefone ?? '').trim()
    const email = (body.email ?? '').trim()
    const mensagem = (body.mensagem ?? '').trim()

    if (!nome || !empresa || !email) {
      return NextResponse.json({ success: false, error: 'Campos obrigatórios faltando.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'RESEND_API_KEY não configurada.' }, { status: 500 })
    }

    const decode = (v: string | null) => {
      try { return v ? decodeURIComponent(v) : '' } catch { return v ?? '' }
    }

    const geo = {
      city: decode(req.headers.get('x-vercel-ip-city')),
      region: decode(req.headers.get('x-vercel-ip-country-region')),
      country: decode(req.headers.get('x-vercel-ip-country')),
      ip: (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim(),
      latitude: req.headers.get('x-vercel-ip-latitude') ?? '',
      longitude: req.headers.get('x-vercel-ip-longitude') ?? '',
    }

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: 'Softeum <noreply@softeum.com.br>',
      to: 'comercial@softeum.com.br',
      replyTo: email,
      subject: `Novo contato: ${nome} - ${empresa}`,
      html: buildHtml({ nome, empresa, telefone, email, mensagem }, geo),
    })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido.'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
