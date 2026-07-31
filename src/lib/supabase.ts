import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase do site — é o MESMO projeto da plataforma de pedidos, então
 * o cliente entra na aba de suporte com o e-mail e a senha que já usa lá.
 *
 * Duas diferenças importantes em relação ao client da plataforma:
 *
 * 1. É criado sob demanda e devolve `null` quando as variáveis não estão
 *    configuradas. O site institucional não pode ficar em branco por causa de
 *    uma env faltando no Vercel — o resto das páginas (home, planos, termos)
 *    continua no ar e só a área de suporte avisa que está indisponível.
 * 2. Usa uma chave de storage própria (`softeum-suporte-auth`) para a sessão do
 *    site não brigar com a da plataforma caso um dia dividam o mesmo domínio.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

export const supabaseConfigurado = Boolean(url && anonKey);

export const getSupabase = (): SupabaseClient | null => {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        storageKey: "softeum-suporte-auth",
        persistSession: true,
        autoRefreshToken: true,
        // O site não usa magic link/OAuth: nada de token vindo pela URL.
        detectSessionInUrl: false,
      },
    });
  }
  return client;
};
