import { describe, it, expect } from "vitest";
import {
  ANEXOS_MAX_ARQUIVOS,
  ANEXOS_MAX_TOTAL_BYTES,
  ANEXO_MAX_BYTES,
  formatarTamanho,
  validarAnexos,
} from "@/lib/anexos";

/** File falso com tamanho controlado (jsdom não precisa do conteúdo real). */
const arquivo = (nome: string, tipo: string, bytes: number): File => {
  const f = new File(["x"], nome, { type: tipo });
  Object.defineProperty(f, "size", { value: bytes });
  return f;
};

describe("validarAnexos", () => {
  it("aceita print e PDF dentro dos limites", () => {
    const { aceitos, erros } = validarAnexos([
      arquivo("erro.png", "image/png", 300 * 1024),
      arquivo("pedido.pdf", "application/pdf", 200 * 1024),
    ]);

    expect(aceitos).toHaveLength(2);
    expect(erros).toHaveLength(0);
  });

  it("aceita arquivo sem mime quando a extensão é conhecida", () => {
    const { aceitos } = validarAnexos([arquivo("captura.JPG", "", 100 * 1024)]);
    expect(aceitos).toHaveLength(1);
  });

  it("recusa tipo não suportado", () => {
    const { aceitos, erros } = validarAnexos([arquivo("planilha.xlsx", "application/vnd.ms-excel", 1024)]);
    expect(aceitos).toHaveLength(0);
    expect(erros[0]).toContain("PDF");
  });

  it("recusa arquivo acima do limite individual", () => {
    const { aceitos, erros } = validarAnexos([
      arquivo("gigante.png", "image/png", ANEXO_MAX_BYTES + 1),
    ]);
    expect(aceitos).toHaveLength(0);
    expect(erros[0]).toContain("limite por arquivo");
  });

  it("recusa quando o total estoura o limite do corpo da requisição", () => {
    const metade = Math.ceil(ANEXOS_MAX_TOTAL_BYTES / 2) + 1;
    const { aceitos, erros } = validarAnexos([
      arquivo("a.png", "image/png", metade),
      arquivo("b.png", "image/png", metade),
    ]);

    expect(aceitos).toHaveLength(1);
    expect(erros[0]).toContain("total");
  });

  it("respeita o limite de quantidade contando o que já está selecionado", () => {
    const jaSelecionados = Array.from({ length: ANEXOS_MAX_ARQUIVOS }, (_, i) =>
      arquivo(`p${i}.png`, "image/png", 1024),
    );
    const { aceitos, erros } = validarAnexos([arquivo("extra.png", "image/png", 1024)], jaSelecionados);

    expect(aceitos).toHaveLength(0);
    expect(erros[0]).toContain(`${ANEXOS_MAX_ARQUIVOS} arquivos`);
  });

  it("ignora arquivo repetido", () => {
    const print = arquivo("print.png", "image/png", 2048);
    const { aceitos, erros } = validarAnexos([print], [print]);
    expect(aceitos).toHaveLength(0);
    expect(erros[0]).toContain("já foi anexado");
  });
});

describe("formatarTamanho", () => {
  it("mostra KB abaixo de 1 MB e MB acima", () => {
    expect(formatarTamanho(512 * 1024)).toBe("512 KB");
    expect(formatarTamanho(2 * 1024 * 1024)).toBe("2.0 MB");
  });
});
