import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, KeyRound, Loader2, LockKeyhole, MailCheck } from "lucide-react";
import { useSupportAuth } from "@/lib/support-auth";
import { PLATFORM_URL, SUPPORT_EMAIL } from "@/lib/constants";

/**
 * Tela de entrada da área de suporte.
 *
 * O texto deixa explícito, em todo lugar visível, que este login é o ACESSO AO
 * SUPORTE e que a credencial é a mesma da plataforma de pedidos — ninguém cria
 * conta aqui e ninguém precisa lembrar de uma segunda senha.
 */
export const SupportLogin = () => {
  const { entrar, recuperarSenha, disponivel } = useSupportAuth();
  const [modo, setModo] = useState<"login" | "recuperar">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [recuperacaoEnviada, setRecuperacaoEnviada] = useState(false);

  if (!disponivel) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div>
            <h3 className="font-display text-lg font-bold">Acesso ao suporte indisponível</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Não conseguimos falar com o serviço de autenticação agora. Envie seu chamado por
              e-mail para{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="break-all font-medium text-foreground underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              informando a prioridade (P1, P2 ou P3) e o nome da empresa.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    const { erro: falha } = await entrar(email, senha);
    setEnviando(false);
    if (falha) setErro(falha);
  };

  const onRecuperar = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    await recuperarSenha(email);
    setEnviando(false);
    setRecuperacaoEnviada(true);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
      <div className="flex items-center gap-2">
        <LockKeyhole className="h-5 w-5 text-accent" />
        <h3 className="font-display text-xl font-bold">Acesso ao suporte</h3>
      </div>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        Entre com <strong className="text-foreground">o mesmo e-mail e senha que você usa na
        plataforma Softeum</strong>. Este acesso é exclusivo para abrir chamados, anexar prints e
        acompanhar o atendimento — não é um cadastro novo.
      </p>

      {modo === "login" && (
        <form onSubmit={onLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="sup-login-email">E-mail de acesso à plataforma *</Label>
            <Input
              id="sup-login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@empresa.com.br"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sup-login-senha">Senha *</Label>
            <Input
              id="sup-login-senha"
              type="password"
              required
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {erro && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm font-medium text-destructive"
            >
              {erro}
            </p>
          )}

          <Button type="submit" variant="hero" size="lg" disabled={enviando}>
            {enviando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <KeyRound className="h-4 w-4" />
                Entrar no suporte
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={() => {
              setModo("recuperar");
              setErro(null);
            }}
            className="text-center text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Esqueci minha senha
          </button>
        </form>
      )}

      {modo === "recuperar" &&
        (recuperacaoEnviada ? (
          <div className="text-center">
            <MailCheck className="mx-auto h-8 w-8 text-accent" />
            <h4 className="mt-3 font-display text-base font-bold">Verifique seu e-mail</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Se existir uma conta para <strong className="text-foreground">{email}</strong>,
              enviamos um link para redefinir a senha. Confira também a caixa de spam.
            </p>
            <Button
              variant="outline"
              className="mt-5 w-full"
              onClick={() => {
                setModo("login");
                setRecuperacaoEnviada(false);
              }}
            >
              Voltar para o acesso
            </Button>
          </div>
        ) : (
          <form onSubmit={onRecuperar} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sup-rec-email">E-mail de acesso à plataforma *</Label>
              <Input
                id="sup-rec-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com.br"
              />
              <p className="text-xs text-muted-foreground">
                A senha é a mesma da plataforma: redefinir aqui vale para os dois acessos.
              </p>
            </div>

            <Button type="submit" variant="hero" size="lg" disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar link de redefinição"}
            </Button>

            <button
              type="button"
              onClick={() => {
                setModo("login");
                setErro(null);
              }}
              className="text-center text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Voltar para o acesso
            </button>
          </form>
        ))}

      <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
        <p>
          Ainda não é cliente Softeum? Escreva para{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="break-all font-medium text-foreground underline underline-offset-4"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <p className="mt-2">
          Procurando a plataforma de pedidos?{" "}
          <a
            href={PLATFORM_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Acessar a plataforma
          </a>
          .
        </p>
      </div>
    </div>
  );
};
