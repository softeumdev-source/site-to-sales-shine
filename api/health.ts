import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Diagnóstico dos formulários do site (demo e chamados de suporte).
 *
 * Responde apenas com status — nunca com a chave nem com qualquer dado sensível.
 * Útil para descobrir rapidamente por que um envio falhou:
 *  - resendApiKey: "missing"     -> variável RESEND_API_KEY não configurada no projeto Vercel
 *  - resendApiKey: "invalid"     -> chave configurada mas rejeitada pela Resend
 *  - senderDomain.status != "verified" -> DNS do domínio remetente pendente na Resend
 */
const SENDER_DOMAIN = "softeum.com.br";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      success: false,
      resendApiKey: "missing",
      senderDomain: { name: SENDER_DOMAIN, status: "unknown" },
      hint: "Configure RESEND_API_KEY em Vercel > Settings > Environment Variables e refaça o deploy.",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!response.ok) {
      const detail = (await response.text().catch(() => "")).slice(0, 300);
      const rejected =
        response.status === 401 ||
        response.status === 403 ||
        /api key is invalid|restricted/i.test(detail);

      return res.status(200).json({
        success: false,
        resendApiKey: rejected ? "invalid" : "present",
        resendStatus: response.status,
        resendError: detail,
        senderDomain: { name: SENDER_DOMAIN, status: "unknown" },
        hint: rejected
          ? "A chave configurada foi rejeitada pela Resend. Gere uma nova chave em resend.com/api-keys, atualize RESEND_API_KEY na Vercel (Production, Preview e Development) e refaça o deploy."
          : `Resend respondeu ${response.status} ao consultar domínios.`,
      });
    }

    const payload = (await response.json()) as {
      data?: Array<{ name?: string; status?: string; region?: string }>;
    };

    const domain = payload.data?.find((d) => d.name === SENDER_DOMAIN);
    const status = domain?.status ?? "not_found";
    const verified = status === "verified";

    return res.status(200).json({
      success: verified,
      resendApiKey: "valid",
      senderDomain: { name: SENDER_DOMAIN, status },
      hint: verified
        ? "Chave válida e domínio verificado: os formulários devem enviar normalmente."
        : "O domínio remetente não está verificado na Resend. Reconfigure os registros DNS (SPF/DKIM) do domínio.",
    });
  } catch (err) {
    console.error("[health] Falha ao consultar a Resend:", err);
    return res.status(200).json({
      success: false,
      resendApiKey: "present",
      senderDomain: { name: SENDER_DOMAIN, status: "unknown" },
      hint: "Não foi possível consultar a API da Resend a partir da função.",
    });
  }
}
