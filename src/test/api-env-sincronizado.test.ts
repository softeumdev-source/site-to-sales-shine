import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { NOMES_CHAVE, NOMES_PROJECT_ID, NOMES_URL } from "@/lib/supabase-env";

/**
 * As funções em `api/` rodam como lambdas isoladas: a Vercel NÃO empacota
 * arquivos de fora de `api/`. Um `import` de `../src/lib/...` passa no build
 * local e derruba a rota em produção com ERR_MODULE_NOT_FOUND — foi o que
 * aconteceu com /api/health e /api/send-ticket.
 *
 * Por isso o resolvedor de variáveis é duplicado dentro de cada função. Estes
 * testes cobrem os dois riscos que a duplicação cria: alguém reintroduzir o
 * import proibido, e as listas de nomes divergirem em silêncio.
 */
const ARQUIVOS_API = ["api/health.ts", "api/send-ticket.ts"];

const ler = (caminho: string) => readFileSync(resolve(__dirname, "../..", caminho), "utf8");

const extrairLista = (fonte: string, nomeDaConstante: string): string[] => {
  const trecho = new RegExp(`const ${nomeDaConstante}\\s*=\\s*\\[([^\\]]*)\\]`, "m").exec(fonte);
  if (!trecho) return [];
  return [...trecho[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
};

describe("funções em api/ são autocontidas", () => {
  it.each(ARQUIVOS_API)("%s não importa nada de fora de api/", (arquivo) => {
    const fonte = ler(arquivo);
    const importsRelativos = [...fonte.matchAll(/from\s+"(\.[^"]*)"/g)].map((m) => m[1]);
    const paraFora = importsRelativos.filter((caminho) => caminho.startsWith("../"));

    expect(paraFora, `${arquivo} importa de fora de api/: ${paraFora.join(", ")}`).toEqual([]);
  });

  it.each(ARQUIVOS_API)("%s aceita exatamente os mesmos nomes de variável", (arquivo) => {
    const fonte = ler(arquivo);

    expect(extrairLista(fonte, "NOMES_URL")).toEqual([...NOMES_URL]);
    expect(extrairLista(fonte, "NOMES_CHAVE")).toEqual([...NOMES_CHAVE]);
    expect(extrairLista(fonte, "NOMES_PROJECT_ID")).toEqual([...NOMES_PROJECT_ID]);
  });
});
