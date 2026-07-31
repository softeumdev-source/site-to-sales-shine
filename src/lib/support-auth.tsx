import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigurado } from "./supabase";

export type SupportUser = {
  email: string;
  /** Nome da empresa (tenant) do usuário — vem do banco, não do formulário. */
  empresa: string | null;
  tenantId: string | null;
  /** Time Softeum: entra na aba, mas não abre chamado em nome de cliente. */
  superadmin: boolean;
};

type SupportAuthState = {
  /** null = deslogado. */
  session: Session | null;
  usuario: SupportUser | null;
  carregando: boolean;
  /** false quando as variáveis do Supabase não foram configuradas no deploy. */
  disponivel: boolean;
  entrar: (email: string, senha: string) => Promise<{ erro: string | null }>;
  sair: () => Promise<void>;
  recuperarSenha: (email: string) => Promise<void>;
};

const SupportAuthContext = createContext<SupportAuthState | undefined>(undefined);

/**
 * Carrega quem é o usuário DEPOIS do login, sempre pelo banco:
 * `current_tenant_id()` e `is_superadmin()` são as mesmas funções que a
 * plataforma usa. Assim o nome da empresa que aparece no chamado não é digitado
 * por ninguém — é o cadastro.
 */
async function carregarUsuario(session: Session): Promise<SupportUser> {
  const supabase = getSupabase();
  const email = session.user.email ?? "";
  if (!supabase) return { email, empresa: null, tenantId: null, superadmin: false };

  const [{ data: tenantId }, { data: superadmin }] = await Promise.all([
    supabase.rpc("current_tenant_id"),
    supabase.rpc("is_superadmin"),
  ]);

  let empresa: string | null = null;
  if (tenantId) {
    const { data } = await supabase
      .from("tenants")
      .select("nome")
      .eq("id", tenantId as string)
      .maybeSingle();
    empresa = (data as { nome?: string } | null)?.nome ?? null;
  }

  return {
    email,
    empresa,
    tenantId: (tenantId as string) ?? null,
    superadmin: superadmin === true,
  };
}

export const SupportAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessaoPronta, setSessaoPronta] = useState(false);
  const [usuario, setUsuario] = useState<SupportUser | null>(null);
  const [carregando, setCarregando] = useState(supabaseConfigurado);

  // 1) Sessão. O callback do onAuthStateChange roda segurando o lock interno do
  //    auth: qualquer chamada ao Supabase aguardada aqui dentro trava o login
  //    (mesmo bug já corrigido na plataforma). Aqui só guardamos a sessão.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setSessaoPronta(true);
      setCarregando(false);
      return;
    }

    let ativo = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return;
      setSession(data.session);
      setSessaoPronta(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evento, proxima) => {
      if (!ativo) return;
      setSession(proxima);
      setSessaoPronta(true);
    });

    return () => {
      ativo = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // 2) Identidade (empresa/papel) — recarrega quando o usuário muda.
  const userId = session?.user?.id ?? null;
  useEffect(() => {
    if (!sessaoPronta) return;
    let ativo = true;

    if (!session || !userId) {
      setUsuario(null);
      setCarregando(false);
      return;
    }

    setCarregando(true);
    carregarUsuario(session)
      .then((u) => ativo && setUsuario(u))
      .catch(() => ativo && setUsuario({ email: session.user.email ?? "", empresa: null, tenantId: null, superadmin: false }))
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
    // `session` muda de referência a cada refresh de token; o gatilho é o id.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, sessaoPronta]);

  const entrar = useCallback(async (email: string, senha: string) => {
    const supabase = getSupabase();
    if (!supabase) return { erro: "Área de suporte indisponível no momento." };

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    if (!error) return { erro: null };

    // Mensagem genérica de propósito: não confirmamos se o e-mail existe.
    const invalido = /invalid login credentials/i.test(error.message);
    return {
      erro: invalido
        ? "E-mail ou senha inválidos. Use o mesmo acesso da plataforma Softeum."
        : "Não foi possível entrar agora. Tente novamente em instantes.",
    };
  }, []);

  const sair = useCallback(async () => {
    await getSupabase()?.auth.signOut();
    setUsuario(null);
  }, []);

  const recuperarSenha = useCallback(async (email: string) => {
    // A Edge Function responde sempre genérico (não revela se o e-mail existe).
    await getSupabase()
      ?.functions.invoke("recuperar-senha", { body: { email: email.trim() } })
      .catch(() => null);
  }, []);

  const valor = useMemo<SupportAuthState>(
    () => ({
      session,
      usuario,
      carregando,
      disponivel: supabaseConfigurado,
      entrar,
      sair,
      recuperarSenha,
    }),
    [session, usuario, carregando, entrar, sair, recuperarSenha],
  );

  return <SupportAuthContext.Provider value={valor}>{children}</SupportAuthContext.Provider>;
};

export const useSupportAuth = (): SupportAuthState => {
  const ctx = useContext(SupportAuthContext);
  if (!ctx) throw new Error("useSupportAuth precisa estar dentro de <SupportAuthProvider>");
  return ctx;
};
