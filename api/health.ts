import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolverSupabaseEnv } from "../src/lib/supabase-env";

/**
 * Diagnóstico dos formulários do site (demo e chamados de suporte).
 *
 * Responde apenas com status — nunca com a chave nem com qualquer dado sensível.
 * Útil para descobrir rapidamente por que um envio falhou:
 *  - resendApiKey: "missing"     -> variável RESEND_API_KEY não configurada no projeto Vercel
 *  - resendApiKey: "invalid"     -> chave configurada mas rejeitada pela Resend
 *  - senderDomain.status != "verified" -> DNS do domínio remetente pendente na Resend
 *  - supabase.status: "missing"  -> login do suporte fora do ar (falta SUPABASE_URL/ANON_KEY)
 */
const SENDER_DOMAIN = "softeum.com.br";

/**
 * Só diz se está configurado e se responde — nunca devolve a chave.
 *
 * Reporta URL e chave separadamente, e lista os NOMES das variáveis presentes
 * (nunca os valores). "missing" sem mais nada obrigava a adivinhar qual das duas
 * faltava; com o nome à vista dá para ver na hora que a variável existe com
 * outro rótulo ou que não foi marcada para Production.
 */
const diagnosticoSupabase = async () => {
  const { url, anonKey, configurado, encontradas } = resolverSupabaseEnv(process.env);

  if (!configurado) {
    return {
      status: "missing" as const,
      url: url ? ("ok" as const) : ("missing" as const),
      anonKey: anonKey ? ("ok" as const) : ("missing" as const),
      variaveisEncontradas: encontradas,
      hint: "Faltou URL ou chave pública do Supabase nesta função. Confira se a variável existe COM ESSE NOME e se está marcada para o ambiente Production — e refaça o deploy depois de salvar.",
    };
  }

  try {
    const resposta = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: anonKey } });
    return resposta.ok
      ? { status: "ok" as const, variaveisEncontradas: encontradas }
      : { status: "erro" as const, authStatus: resposta.status, variaveisEncontradas: encontradas };
  } catch {
    return { status: "inacessivel" as const, variaveisEncontradas: encontradas };
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const supabase = await diagnosticoSupabase();
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      success: false,
      resendApiKey: "missing",
      senderDomain: { name: SENDER_DOMAIN, status: "unknown" },
      supabase,
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
        supabase,
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
      supabase,
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
      supabase,
      hint: "Não foi possível consultar a API da Resend a partir da função.",
    });
  }
}
