import { describe, it, expect, vi, beforeEach } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../../api/send-ticket";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const buildRes = () => {
  const res = {
    statusCode: 0,
    payload: undefined as unknown,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(body: unknown) {
      res.payload = body;
      return res;
    },
  };
  return res as unknown as VercelResponse & {
    statusCode: number;
    payload: Record<string, unknown>;
  };
};

const validTicket = {
  nome: "Maria Souza",
  empresa: "Distribuidora Alfa",
  email: "maria@alfa.com.br",
  telefone: "(11) 99999-9999",
  prioridade: "P1",
  categoria: "Pedidos não processados / não enviados ao ERP",
  assunto: "Nenhum pedido entrou hoje",
  descricao: "Desde as 9h nenhum pedido é processado.",
  referencia: "pedido 4821",
};

const call = async (body: unknown, method = "POST") => {
  const res = buildRes();
  await handler({ method, body, headers: {} } as unknown as VercelRequest, res);
  return res;
};

describe("api/send-ticket", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
    process.env.RESEND_API_KEY = "re_test_key";
  });

  it("rejeita métodos diferentes de POST", async () => {
    const res = await call(validTicket, "GET");
    expect(res.statusCode).toBe(405);
  });

  it("exige os campos obrigatórios", async () => {
    const res = await call({ ...validTicket, assunto: "" });
    expect(res.statusCode).toBe(400);
    expect(res.payload.success).toBe(false);
  });

  it("valida o formato do e-mail", async () => {
    const res = await call({ ...validTicket, email: "maria(at)alfa" });
    expect(res.statusCode).toBe(400);
  });

  it("aceita corpo enviado como string JSON", async () => {
    const res = await call(JSON.stringify(validTicket));
    expect(res.statusCode).toBe(200);
  });

  it("gera protocolo e envia um e-mail interno e outro de confirmação", async () => {
    const res = await call(validTicket);

    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
    expect(res.payload.protocolo).toMatch(/^SFT-\d{6}-[A-Z0-9]{4}$/);
    expect(res.payload.clienteNotificado).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(2);

    const [interno, confirmacao] = sendMock.mock.calls.map((c) => c[0]);
    expect(interno.to).toBe("comercial@softeum.com.br");
    expect(interno.replyTo).toBe(validTicket.email);
    expect(interno.subject).toContain("[P1]");
    expect(confirmacao.to).toBe(validTicket.email);
    expect(confirmacao.replyTo).toBe("comercial@softeum.com.br");
    expect(confirmacao.subject).toContain(res.payload.protocolo);
  });

  it("assume prioridade P3 quando o valor é inválido", async () => {
    const res = await call({ ...validTicket, prioridade: "urgente" });
    expect(res.payload.prioridade).toBe("P3");
  });

  it("mantém o chamado aberto mesmo se a confirmação ao cliente falhar", async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: "interno" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "bounce" } });

    const res = await call(validTicket);
    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
    expect(res.payload.clienteNotificado).toBe(false);
  });

  it("retorna erro quando o e-mail interno falha", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "domain not verified" } });

    const res = await call(validTicket);
    expect(res.statusCode).toBe(500);
    expect(res.payload.error).toBe("domain not verified");
  });

  it("retorna erro quando a chave da Resend não está configurada", async () => {
    delete process.env.RESEND_API_KEY;

    const res = await call(validTicket);
    expect(res.statusCode).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
