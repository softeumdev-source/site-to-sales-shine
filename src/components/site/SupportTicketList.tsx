import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Inbox, Loader2, Paperclip, RefreshCw } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { CHAMADO_STATUS, PRIORITIES, type Chamado } from "@/lib/support";

const formatarData = (iso: string): string =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));

/**
 * "Meus chamados": histórico da empresa do usuário logado. O RLS do banco já
 * limita ao tenant dele — a tela não filtra nada por conta própria.
 */
export const SupportTicketList = ({ recarregar = 0 }: { recarregar?: number }) => {
  const [chamados, setChamados] = useState<Chamado[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  const buscar = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setErro("Histórico indisponível no momento.");
      setCarregando(false);
      return;
    }

    setCarregando(true);
    const { data, error } = await supabase
      .from("chamados")
      .select(
        "id, protocolo, assunto, descricao, categoria, prioridade, status, resposta, nome, email, anexos, criado_em, atualizado_em",
      )
      .order("criado_em", { ascending: false })
      .limit(20);

    if (error) {
      setErro("Não foi possível carregar seus chamados agora.");
      setChamados(null);
    } else {
      setErro(null);
      setChamados((data ?? []) as Chamado[]);
    }
    setCarregando(false);
  }, []);

  useEffect(() => {
    void buscar();
  }, [buscar, recarregar]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-accent" />
          <h3 className="font-display text-xl font-bold">Meus chamados</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => void buscar()} disabled={carregando}>
          {carregando ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Atualizar
        </Button>
      </div>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        Últimos 20 chamados da sua empresa, com o status atual do atendimento.
      </p>

      {erro && (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {erro}
        </p>
      )}

      {!erro && carregando && chamados === null && (
        <p className="text-sm text-muted-foreground">Carregando chamados...</p>
      )}

      {!erro && chamados !== null && chamados.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
          Nenhum chamado aberto ainda. Quando você abrir o primeiro, ele aparece aqui com o
          protocolo e o status.
        </p>
      )}

      {!erro && chamados !== null && chamados.length > 0 && (
        <ul className="grid gap-3">
          {chamados.map((c) => {
            const status = CHAMADO_STATUS[c.status] ?? CHAMADO_STATUS.aberto;
            const prioridade = PRIORITIES.find((p) => p.id === c.prioridade);
            const anexos = Array.isArray(c.anexos) ? c.anexos : [];

            return (
              <li key={c.id} className="rounded-2xl border border-border bg-background p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-sm font-bold">{c.protocolo}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${status.classe}`}
                  >
                    {status.label}
                  </span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    {prioridade?.short ?? c.prioridade}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {formatarData(c.criado_em)}
                  </span>
                </div>

                <p className="mt-2 font-semibold">{c.assunto}</p>
                <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
                  {c.descricao}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>{c.categoria}</span>
                  <span>· aberto por {c.nome}</span>
                  {anexos.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Paperclip className="h-3 w-3" />
                      {anexos.length} {anexos.length === 1 ? "anexo" : "anexos"}
                    </span>
                  )}
                </div>

                {c.resposta && (
                  <div className="mt-3 rounded-xl border border-accent/30 bg-accent/5 p-3 text-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      Resposta do suporte
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{c.resposta}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
