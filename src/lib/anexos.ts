/**
 * Anexos do chamado de suporte (prints e PDFs).
 *
 * Os limites não são estéticos: o arquivo viaja em base64 dentro do JSON para a
 * função serverless, e a Vercel corta requisições acima de ~4,5 MB. Base64
 * infla o arquivo em ~33%, então 3 MB de arquivos viram ~4 MB de corpo — é o
 * teto seguro. Print de tela costuma ter menos de 500 KB.
 */
export const ANEXOS_MAX_ARQUIVOS = 3;
export const ANEXO_MAX_BYTES = 2 * 1024 * 1024;
export const ANEXOS_MAX_TOTAL_BYTES = 3 * 1024 * 1024;

export const TIPOS_ACEITOS = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
] as const;

export const ACCEPT_ANEXOS = ".png,.jpg,.jpeg,.webp,.gif,.pdf,image/*,application/pdf";

export type AnexoPreparado = {
  nome: string;
  tipo: string;
  tamanho: number;
  base64: string;
};

export const formatarTamanho = (bytes: number): string =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const tipoAceito = (arquivo: File): boolean => {
  const tipo = (arquivo.type || "").toLowerCase();
  if ((TIPOS_ACEITOS as readonly string[]).includes(tipo)) return true;
  // Alguns navegadores mandam type vazio: cai para a extensão.
  return /\.(png|jpe?g|webp|gif|pdf)$/i.test(arquivo.name);
};

/**
 * Decide quais arquivos entram na seleção atual. Devolve os aceitos e o motivo
 * de cada recusa, para a tela dizer exatamente o que aconteceu com cada print.
 */
export const validarAnexos = (
  novos: File[],
  jaSelecionados: File[] = [],
): { aceitos: File[]; erros: string[] } => {
  const aceitos: File[] = [];
  const erros: string[] = [];
  let total = jaSelecionados.reduce((soma, a) => soma + a.size, 0);
  let quantidade = jaSelecionados.length;

  for (const arquivo of novos) {
    if (quantidade >= ANEXOS_MAX_ARQUIVOS) {
      erros.push(`"${arquivo.name}": limite de ${ANEXOS_MAX_ARQUIVOS} arquivos por chamado.`);
      continue;
    }
    if (!tipoAceito(arquivo)) {
      erros.push(`"${arquivo.name}": envie imagem (PNG, JPG, WEBP, GIF) ou PDF.`);
      continue;
    }
    if (arquivo.size > ANEXO_MAX_BYTES) {
      erros.push(
        `"${arquivo.name}" tem ${formatarTamanho(arquivo.size)}: o limite por arquivo é ${formatarTamanho(ANEXO_MAX_BYTES)}.`,
      );
      continue;
    }
    if (total + arquivo.size > ANEXOS_MAX_TOTAL_BYTES) {
      erros.push(
        `"${arquivo.name}" estoura o total de ${formatarTamanho(ANEXOS_MAX_TOTAL_BYTES)} por chamado.`,
      );
      continue;
    }
    if (jaSelecionados.some((a) => a.name === arquivo.name && a.size === arquivo.size)) {
      erros.push(`"${arquivo.name}" já foi anexado.`);
      continue;
    }

    aceitos.push(arquivo);
    total += arquivo.size;
    quantidade += 1;
  }

  return { aceitos, erros };
};

/** Lê o arquivo e devolve o conteúdo em base64 puro (sem o prefixo data:). */
export const prepararAnexo = (arquivo: File): Promise<AnexoPreparado> =>
  new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error(`Não foi possível ler "${arquivo.name}".`));
    leitor.onload = () => {
      const resultado = String(leitor.result ?? "");
      const base64 = resultado.includes(",") ? resultado.slice(resultado.indexOf(",") + 1) : "";
      if (!base64) {
        reject(new Error(`Arquivo "${arquivo.name}" vazio ou ilegível.`));
        return;
      }
      resolve({
        nome: arquivo.name,
        tipo: arquivo.type || "application/octet-stream",
        tamanho: arquivo.size,
        base64,
      });
    };
    leitor.readAsDataURL(arquivo);
  });
