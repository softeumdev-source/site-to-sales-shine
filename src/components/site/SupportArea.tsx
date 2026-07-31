import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, UserRound } from "lucide-react";
import { useSupportAuth } from "@/lib/support-auth";
import { SupportLogin } from "./SupportLogin";
import { SupportTicketForm } from "./SupportTicketForm";
import { SupportTicketList } from "./SupportTicketList";

/**
 * Área logada do suporte: login → abrir chamado (com prints) → acompanhar.
 * Fica tudo na mesma aba do site, com o acesso da própria plataforma.
 */
export const SupportArea = () => {
  const { session, usuario, carregando, sair } = useSupportAuth();
  // Muda a cada chamado aberto para a lista buscar de novo.
  const [versao, setVersao] = useState(0);

  if (carregando) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-10 text-sm text-muted-foreground shadow-card">
        <Loader2 className="h-4 w-4 animate-spin" />
        Verificando seu acesso...
      </div>
    );
  }

  if (!session) return <SupportLogin />;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
            <UserRound className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {usuario?.empresa ?? (usuario?.superadmin ? "Equipe Softeum" : "Acesso ao suporte")}
            </p>
            <p className="truncate text-xs text-muted-foreground">{usuario?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => void sair()}>
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>

      <SupportTicketForm onAberto={() => setVersao((v) => v + 1)} />
      <SupportTicketList recarregar={versao} />
    </div>
  );
};
