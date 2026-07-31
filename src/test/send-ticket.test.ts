import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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
  telefone: "(11) 99999-9999",
  prioridade: "P1",
  categoria: "Pedidos não processados / não enviados ao ERP",
  assunto: "Nenhum pedido entrou hoje",
  descricao: "Desde as 9h nenhum pedido é processado.",
  referencia: "pedido 4821",
};

const EMAIL_LOGADO = "maria@alfa.com.br";
const PROTOCOLO = "SFT-260731-AB12";

/** Respostas do Supabase usadas pela função (auth, RPC e nome da empresa). */
type SupabaseFake = {
  user?: { ok: boolean; body?: unknown };
  rpc?: { ok: boolean; status?: number; body?: unknown };
  tenants?: { ok: boolean; body?: unknown };
};

let supabaseFake: SupabaseFake;

const jsonResponse = (ok: boolean, body: unknown, status = ok ? 200 : 400) =>
  ({
    ok,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  }) as unknown as Response;

const fetchMock = vi.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
  const url = String(input);
  if (url.includes("/auth/v1/user")) {
    const cfg = supabaseFake.user ?? { ok: true, body: { email: EMAIL_LOGADO } };
    return jsonResponse(cfg.ok, cfg.body ?? { email: EMAIL_LOGADO }, cfg.ok ? 200 : 401);
  }
  if (url.includes("/rest/v1/rpc/abrir_chamado")) {
    const cfg = supabaseFake.rpc ?? { ok: true, body: [{ protocolo: PROTOCOLO }] };
    return jsonResponse(cfg.ok, cfg.body ?? [{ protocolo: PROTOCOLO }], cfg.status ?? (cfg.ok ? 200 : 400));
  }
  if (url.includes("/rest/v1/tenants")) {
    const cfg = supabaseFake.tenants ?? { ok: true, body: [{ nome: "Distribuidora Alfa" }] };
    return jsonResponse(cfg.ok, cfg.body ?? []);
  }
  throw new Error(`fetch inesperado: ${url}`);
});

const call = async (body: unknown, { token = "tok_123", method = "POST" } = {}) => {
  const res = buildRes();
  const headers = token ? { authorization: `Bearer ${token}` } : {};
  await handler({ method, body, headers } as unknown as VercelRequest, res);
  return res;
};

describe("api/send-ticket", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
    fetchMock.mockClear();
    supabaseFake = {};
    vi.stubGlobal("fetch", fetchMock);
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.SUPABASE_URL = "https://projeto.supabase.co";
    process.env.SUPABASE_ANON_KEY = "anon_key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejeita métodos diferentes de POST", async () => {
    const res = await call(validTicket, { method: "GET" });
    expect(res.statusCode).toBe(405);
  });

  it("exige login: sem token não abre chamado", async () => {
    const res = await call(validTicket, { token: "" });
    expect(res.statusCode).toBe(401);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejeita token inválido ou expirado", async () => {
    supabaseFake.user = { ok: false };
    const res = await call(validTicket);
    expect(res.statusCode).toBe(401);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("exige os campos obrigatórios", async () => {
    const res = await call({ ...validTicket, assunto: "" });
    expect(res.statusCode).toBe(400);
    expect(res.payload.success).toBe(false);
  });

  it("aceita corpo enviado como string JSON", async () => {
    const res = await call(JSON.stringify(validTicket));
    expect(res.statusCode).toBe(200);
  });

  it("registra o chamado e envia e-mail interno e confirmação", async () => {
    const res = await call(validTicket);

    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
    expect(res.payload.protocolo).toBe(PROTOCOLO);
    expect(res.payload.clienteNotificado).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(2);

    const [interno, confirmacao] = sendMock.mock.calls.map((c) => c[0]);
    expect(interno.to).toBe("comercial@softeum.com.br");
    // O reply-to é o e-mail AUTENTICADO, não um campo do formulário.
    expect(interno.replyTo).toBe(EMAIL_LOGADO);
    expect(interno.subject).toContain("[P1]");
    expect(interno.subject).toContain("Distribuidora Alfa");
    expect(confirmacao.to).toBe(EMAIL_LOGADO);
    expect(confirmacao.replyTo).toBe("comercial@softeum.com.br");
    expect(confirmacao.subject).toContain(PROTOCOLO);
  });

  it("manda os anexos para o suporte e só os metadados para o banco", async () => {
    const base64 = Buffer.from("print-fake").toString("base64");
    const res = await call({
      ...validTicket,
      anexos: [{ nome: "erro.png", tipo: "image/png", base64 }],
    });

    expect(res.statusCode).toBe(200);
    const [interno] = sendMock.mock.calls.map((c) => c[0]);
    expect(interno.attachments).toEqual([{ filename: "erro.png", content: base64 }]);

    const chamadaRpc = fetchMock.mock.calls.find((c) =>
      String(c[0]).includes("abrir_chamado"),
    );
    const corpo = JSON.parse(String((chamadaRpc?.[1] as RequestInit).body));
    expect(corpo.p_anexos).toEqual([
      { nome: "erro.png", tipo: "image/png", tamanho_kb: expect.any(Number) },
    ]);
    expect(JSON.stringify(corpo)).not.toContain(base64);
  });

  it("recusa anexo de tipo não suportado", async () => {
    const res = await call({
      ...validTicket,
      anexos: [
        {
          nome: "malware.exe",
          tipo: "application/x-msdownload",
          base64: Buffer.from("x").toString("base64"),
        },
      ],
    });

    expect(res.statusCode).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("recusa anexo acima do limite de tamanho", async () => {
    const grande = "A".repeat(3 * 1024 * 1024);
    const res = await call({
      ...validTicket,
      anexos: [{ nome: "print.png", tipo: "image/png", base64: grande }],
    });

    expect(res.statusCode).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("assume prioridade P3 quando o valor é inválido", async () => {
    const res = await call({ ...validTicket, prioridade: "urgente" });
    expect(res.payload.prioridade).toBe("P3");
  });

  it("repassa o motivo quando o banco recusa (conta sem empresa vinculada)", async () => {
    supabaseFake.rpc = {
      ok: false,
      status: 400,
      body: { message: "Usuário sem empresa vinculada." },
    };

    const res = await call(validTicket);
    expect(res.statusCode).toBe(403);
    expect(res.payload.error).toContain("empresa vinculada");
    expect(sendMock).not.toHaveBeenCalled();
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

  it("não perde o chamado quando o e-mail interno falha — devolve aviso", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "domain not verified" } });

    const res = await call(validTicket);
    expect(res.statusCode).toBe(200);
    expect(res.payload.success).toBe(true);
    expect(res.payload.protocolo).toBe(PROTOCOLO);
    expect((res.payload.avisos as string[]).join(" ")).toContain("registrado");
  });

  it("retorna erro quando a chave da Resend não está configurada", async () => {
    delete process.env.RESEND_API_KEY;

    const res = await call(validTicket);
    expect(res.statusCode).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("retorna erro quando o Supabase não está configurado", async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
    delete process.env.VITE_SUPABASE_URL;
    delete process.env.VITE_SUPABASE_ANON_KEY;

    const res = await call(validTicket);
    expect(res.statusCode).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
