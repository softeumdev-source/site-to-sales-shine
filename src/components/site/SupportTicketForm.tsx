import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ImagePlus, LifeBuoy, Paperclip, Send, ShieldCheck, X } from "lucide-react";
import { PRIORITIES, SUPPORT_CATEGORIES, type PriorityId } from "@/lib/support";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { useSupportAuth } from "@/lib/support-auth";
import {
  ACCEPT_ANEXOS,
  ANEXOS_MAX_ARQUIVOS,
  ANEXOS_MAX_TOTAL_BYTES,
  ANEXO_MAX_BYTES,
  formatarTamanho,
  prepararAnexo,
  validarAnexos,
} from "@/lib/anexos";

type Sent = {
  protocolo: string;
  prioridade: PriorityId;
  email: string;
  avisos: string[];
};

/**
 * Abertura de chamado — só aparece para quem já entrou com o acesso da
 * plataforma. Nome da empresa e e-mail não são digitados: vêm da conta.
 */
export const SupportTicketForm = ({ onAberto }: { onAberto?: () => void }) => {
  const { toast } = useToast();
  const { session, usuario } = useSupportAuth();
  const [loading, setLoading] = useState(false);
  const [prioridade, setPrioridade] = useState<PriorityId>("P3");
  const [categoria, setCategoria] = useState<string>(SUPPORT_CATEGORIES[0]);
  const [nome, setNome] = useState(() => usuario?.email.split("@")[0] ?? "");
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [sent, setSent] = useState<Sent | null>(null);
  const inputArquivos = useRef<HTMLInputElement>(null);

  const semEmpresa = !usuario?.tenantId;

  const adicionarArquivos = (lista: FileList | null) => {
    if (!lista || lista.length === 0) return;
    const { aceitos, erros } = validarAnexos(Array.from(lista), arquivos);
    if (aceitos.length > 0) setArquivos((atual) => [...atual, ...aceitos]);
    if (erros.length > 0) {
      toast({
        variant: "destructive",
        title: "Alguns arquivos não foram anexados",
        description: erros.join(" "),
      });
    }
    if (inputArquivos.current) inputArquivos.current.value = "";
  };

  const removerArquivo = (indice: number) =>
    setArquivos((atual) => atual.filter((_, i) => i !== indice));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setLoading(true);
    try {
      const anexos = await Promise.all(arquivos.map(prepararAnexo));

      const res = await fetch("/api/send-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: ((data.get("telefone") as string) ?? "").trim(),
          prioridade,
          categoria,
          assunto: ((data.get("assunto") as string) ?? "").trim(),
          descricao: ((data.get("descricao") as string) ?? "").trim(),
          referencia: ((data.get("referencia") as string) ?? "").trim(),
          anexos: anexos.map((a) => ({ nome: a.nome, tipo: a.tipo, base64: a.base64 })),
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) {
        throw new Error(result.error ?? "Falha ao abrir o chamado.");
      }

      form.reset();
      setArquivos([]);
      setSent({
        protocolo: result.protocolo,
        prioridade,
        email: result.email ?? usuario?.email ?? "",
        avisos: Array.isArray(result.avisos) ? result.avisos : [],
      });
      setPrioridade("P3");
      setCategoria(SUPPORT_CATEGORIES[0]);
      onAberto?.();

      toast({
        title: `Chamado ${result.protocolo} aberto`,
        description: `Enviamos a confirmação para ${result.email ?? usuario?.email ?? "o seu e-mail"}.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Não foi possível abrir o chamado",
        description:
          err instanceof Error && err.message
            ? `${err.message} Se persistir, envie um e-mail para ${SUPPORT_EMAIL}.`
            : `Tente novamente ou envie um e-mail para ${SUPPORT_EMAIL}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    const sla = PRIORITIES.find((p) => p.id === sent.prioridade);

    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
          <div>
            <h3 className="font-display text-xl font-bold">Chamado aberto com sucesso</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Guarde o número do protocolo para acompanhar o atendimento.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-accent/50 bg-accent/5 p-5 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Protocolo
          </span>
          <p className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
            {sent.protocolo}
          </p>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          <li>
            Enviamos uma cópia do chamado para{" "}
            <strong className="text-foreground">{sent.email}</strong>.
          </li>
          {sla && (
            <li>
              Prioridade <strong className="text-foreground">{sla.name}</strong>: primeiro retorno{" "}
              <strong className="text-foreground">{sla.firstResponse}</strong> e resolução{" "}
              <strong className="text-foreground">{sla.resolution}</strong>.
            </li>
          )}
          <li>
            O andamento fica logo abaixo, em <strong className="text-foreground">Meus chamados</strong>
            . Para complementar informações, responda o e-mail de confirmação mantendo o protocolo no
            assunto.
          </li>
        </ul>

        {sent.avisos.length > 0 && (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {sent.avisos.join(" ")}
          </p>
        )}

        <Button variant="outline" className="mt-6 w-full" onClick={() => setSent(null)}>
          Abrir outro chamado
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
    >
      <div className="flex items-center gap-2">
        <LifeBuoy className="h-5 w-5 text-accent" />
        <h3 className="font-display text-xl font-bold">Abrir chamado de suporte</h3>
      </div>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        O chamado é registrado na nossa fila e você recebe a confirmação com o número do protocolo
        por e-mail.
      </p>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div className="text-sm">
          <p className="font-semibold">Chamado identificado pela sua conta</p>
          <p className="text-muted-foreground">
            {usuario?.empresa ? `${usuario.empresa} · ` : ""}
            {usuario?.email}
          </p>
        </div>
      </div>

      {semEmpresa && (
        <p className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Esta conta não está vinculada a nenhuma empresa na plataforma, então não é possível abrir
          chamado por aqui. Escreva para {SUPPORT_EMAIL}.
        </p>
      )}

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="sup-nome">Seu nome *</Label>
            <Input
              id="sup-nome"
              name="nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sup-telefone">Telefone (opcional)</Label>
            <Input id="sup-telefone" name="telefone" type="tel" placeholder="(11) 99999-9999" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="sup-prioridade">Prioridade *</Label>
            <Select value={prioridade} onValueChange={(v) => setPrioridade(v as PriorityId)}>
              <SelectTrigger id="sup-prioridade">
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.selectLabel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sup-categoria">Categoria *</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger id="sup-categoria">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORT_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sup-assunto">Assunto *</Label>
          <Input
            id="sup-assunto"
            name="assunto"
            required
            maxLength={120}
            placeholder="Resuma o problema em uma linha"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sup-descricao">Descrição *</Label>
          <Textarea
            id="sup-descricao"
            name="descricao"
            required
            rows={6}
            placeholder={
              "O que aconteceu, desde quando, quantos pedidos foram afetados e o que já foi tentado.\nEx.: desde hoje às 9h nenhum pedido do cliente X entra no ERP; a plataforma mostra o pedido como pendente."
            }
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="sup-referencia">Número do pedido ou referência (opcional)</Label>
          <Input
            id="sup-referencia"
            name="referencia"
            placeholder="Ex.: pedido 4821, e-mail recebido em 12/05 às 14h"
          />
        </div>

        {/* Prints e PDFs */}
        <div className="grid gap-2">
          <Label htmlFor="sup-anexos">Prints e arquivos (opcional)</Label>
          <input
            ref={inputArquivos}
            id="sup-anexos"
            name="anexos"
            type="file"
            multiple
            accept={ACCEPT_ANEXOS}
            className="sr-only"
            onChange={(e) => adicionarArquivos(e.target.files)}
          />
          <Button
            type="button"
            variant="outline"
            className="h-auto min-h-11 justify-start whitespace-normal text-left"
            onClick={() => inputArquivos.current?.click()}
            disabled={arquivos.length >= ANEXOS_MAX_ARQUIVOS}
          >
            <ImagePlus className="h-4 w-4" />
            {arquivos.length >= ANEXOS_MAX_ARQUIVOS
              ? `Limite de ${ANEXOS_MAX_ARQUIVOS} arquivos atingido`
              : "Anexar print da tela ou PDF"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Até {ANEXOS_MAX_ARQUIVOS} arquivos, {formatarTamanho(ANEXO_MAX_BYTES)} cada e{" "}
            {formatarTamanho(ANEXOS_MAX_TOTAL_BYTES)} no total. PNG, JPG, WEBP, GIF ou PDF. Um print
            da tela de erro costuma resolver o chamado bem mais rápido.
          </p>

          {arquivos.length > 0 && (
            <ul className="mt-1 grid gap-2">
              {arquivos.map((arquivo, i) => (
                <li
                  key={`${arquivo.name}-${arquivo.size}-${i}`}
                  className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm"
                >
                  <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate">{arquivo.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatarTamanho(arquivo.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removerArquivo(i)}
                    aria-label={`Remover ${arquivo.name}`}
                    className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={loading || semEmpresa}
          className="mt-2 h-auto min-h-11 whitespace-normal px-4 text-center"
        >
          {loading ? (
            "Abrindo chamado..."
          ) : (
            <>
              <Send className="h-4 w-4" />
              Abrir chamado
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Chamados abertos fora do horário de atendimento começam a contar no próximo dia útil.
        </p>
      </div>
    </form>
  );
};
