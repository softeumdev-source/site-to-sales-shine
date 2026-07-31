/**
 * De onde saem a URL e a chave pública do Supabase.
 *
 * O mesmo valor precisa chegar em dois lugares com fontes diferentes: o
 * navegador lê `import.meta.env` (só variáveis com prefixo `VITE_`) e as funções
 * serverless leem `process.env`. Por isso o resolvedor recebe a fonte de fora.
 *
 * Aceitamos mais de um nome para a mesma coisa porque projetos criados pelo
 * Lovable nascem com `VITE_SUPABASE_PUBLISHABLE_KEY` e `VITE_SUPABASE_PROJECT_ID`
 * em vez de `..._ANON_KEY` e `..._URL`. Exigir um nome específico só produz um
 * "suporte indisponível" silencioso por causa de uma variável com outro rótulo.
 */
export type FonteEnv = Record<string, string | undefined>;

/** Ordem de preferência para a URL do projeto. */
export const NOMES_URL = ["SUPABASE_URL", "VITE_SUPABASE_URL"] as const;

/** Ordem de preferência para a chave pública (anon/publishable). */
export const NOMES_CHAVE = [
  "SUPABASE_ANON_KEY",
  "VITE_SUPABASE_ANON_KEY",
  "SUPABASE_PUBLISHABLE_KEY",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_PUBLISHABLE_DEFAULT_KEY",
  "VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
] as const;

/** Último recurso: só o ref do projeto, de onde a URL é derivada. */
export const NOMES_PROJECT_ID = ["SUPABASE_PROJECT_ID", "VITE_SUPABASE_PROJECT_ID"] as const;

const primeiroValor = (fonte: FonteEnv, nomes: readonly string[]): string => {
  for (const nome of nomes) {
    const valor = fonte[nome];
    if (typeof valor === "string" && valor.trim()) return valor.trim();
  }
  return "";
};

export type SupabaseEnv = {
  url: string;
  anonKey: string;
  configurado: boolean;
  /** Nomes (nunca valores) das variáveis encontradas — usado no diagnóstico. */
  encontradas: string[];
};

export const resolverSupabaseEnv = (fonte: FonteEnv): SupabaseEnv => {
  const url = primeiroValor(fonte, NOMES_URL).replace(/\/$/, "");
  const projectId = primeiroValor(fonte, NOMES_PROJECT_ID);
  const anonKey = primeiroValor(fonte, NOMES_CHAVE);

  const urlFinal = url || (projectId ? `https://${projectId}.supabase.co` : "");

  const encontradas = [...NOMES_URL, ...NOMES_CHAVE, ...NOMES_PROJECT_ID].filter((nome) => {
    const valor = fonte[nome];
    return typeof valor === "string" && valor.trim().length > 0;
  });

  return {
    url: urlFinal,
    anonKey,
    configurado: Boolean(urlFinal && anonKey),
    encontradas,
  };
};
