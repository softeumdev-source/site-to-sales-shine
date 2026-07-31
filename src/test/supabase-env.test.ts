import { describe, it, expect } from "vitest";
import { resolverSupabaseEnv } from "@/lib/supabase-env";

const URL_PROJETO = "https://rhjyadwjdrqoxqivpztf.supabase.co";
const CHAVE = "eyJhbGciOiJIUzI1NiJ9.fake";

describe("resolverSupabaseEnv", () => {
  it("usa os nomes sem prefixo quando existem", () => {
    const env = resolverSupabaseEnv({ SUPABASE_URL: URL_PROJETO, SUPABASE_ANON_KEY: CHAVE });
    expect(env).toMatchObject({ url: URL_PROJETO, anonKey: CHAVE, configurado: true });
  });

  it("cai para os nomes VITE_ quando os do servidor não existem", () => {
    const env = resolverSupabaseEnv({
      VITE_SUPABASE_URL: URL_PROJETO,
      VITE_SUPABASE_ANON_KEY: CHAVE,
    });
    expect(env.configurado).toBe(true);
  });

  it("aceita a chave publishable criada pelo Lovable", () => {
    const env = resolverSupabaseEnv({
      VITE_SUPABASE_URL: URL_PROJETO,
      VITE_SUPABASE_PUBLISHABLE_KEY: CHAVE,
    });
    expect(env.anonKey).toBe(CHAVE);
    expect(env.configurado).toBe(true);
  });

  it("deriva a URL a partir do project id quando só ele existe", () => {
    const env = resolverSupabaseEnv({
      VITE_SUPABASE_PROJECT_ID: "rhjyadwjdrqoxqivpztf",
      VITE_SUPABASE_ANON_KEY: CHAVE,
    });
    expect(env.url).toBe(URL_PROJETO);
    expect(env.configurado).toBe(true);
  });

  it("tira a barra final da URL", () => {
    const env = resolverSupabaseEnv({ SUPABASE_URL: `${URL_PROJETO}/`, SUPABASE_ANON_KEY: CHAVE });
    expect(env.url).toBe(URL_PROJETO);
  });

  it("ignora valores em branco", () => {
    const env = resolverSupabaseEnv({ SUPABASE_URL: "   ", VITE_SUPABASE_URL: URL_PROJETO, SUPABASE_ANON_KEY: CHAVE });
    expect(env.url).toBe(URL_PROJETO);
  });

  it("não fica configurado só com a URL", () => {
    const env = resolverSupabaseEnv({ SUPABASE_URL: URL_PROJETO });
    expect(env.configurado).toBe(false);
    expect(env.anonKey).toBe("");
  });

  it("lista os NOMES encontrados para o diagnóstico, nunca os valores", () => {
    const env = resolverSupabaseEnv({
      VITE_SUPABASE_URL: URL_PROJETO,
      VITE_SUPABASE_PUBLISHABLE_KEY: CHAVE,
    });
    expect(env.encontradas).toEqual(["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"]);
    expect(env.encontradas.join()).not.toContain(CHAVE);
  });
});
