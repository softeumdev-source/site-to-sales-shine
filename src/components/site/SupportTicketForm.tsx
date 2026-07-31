import { useState } from "react";
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
import { CheckCircle2, LifeBuoy, Send } from "lucide-react";
import { PRIORITIES, SUPPORT_CATEGORIES, type PriorityId } from "@/lib/support";
import { SUPPORT_EMAIL } from "@/lib/constants";

type Sent = {
  protocolo: string;
  prioridade: PriorityId;
  email: string;
};

export const SupportTicketForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [prioridade, setPrioridade] = useState<PriorityId>("P3");
  const [categoria, setCategoria] = useState<string>(SUPPORT_CATEGORIES[0]);
  const [sent, setSent] = useState<Sent | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nome: ((data.get("nome") as string) ?? "").trim(),
      empresa: ((data.get("empresa") as string) ?? "").trim(),
      email: ((data.get("email") as string) ?? "").trim(),
      telefone: ((data.get("telefone") as string) ?? "").trim(),
      prioridade,
      categoria,
      assunto: ((data.get("assunto") as string) ?? "").trim(),
      descricao: ((data.get("descricao") as string) ?? "").trim(),
      referencia: ((data.get("referencia") as string) ?? "").trim(),
    };

    setLoading(true);
    try {
      const res = await fetch("/api/send-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) {
        throw new Error(result.error ?? "Falha ao abrir o chamado.");
      }

      form.reset();
      setSent({ protocolo: result.protocolo, prioridade, email: payload.email });
      setPrioridade("P3");
      setCategoria(SUPPORT_CATEGORIES[0]);

      toast({
        title: `Chamado ${result.protocolo} aberto`,
        description: `Enviamos a confirmação para ${payload.email}.`,
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
            Para complementar informações, basta responder o e-mail de confirmação mantendo o
            número do protocolo no assunto.
          </li>
        </ul>

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

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="sup-nome">Nome *</Label>
            <Input id="sup-nome" name="nome" required placeholder="Seu nome completo" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sup-empresa">Empresa *</Label>
            <Input id="sup-empresa" name="empresa" required placeholder="Nome da empresa" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="sup-email">E-mail *</Label>
            <Input
              id="sup-email"
              name="email"
              type="email"
              required
              placeholder="voce@empresa.com.br"
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

        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={loading}
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
