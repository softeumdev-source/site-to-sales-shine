import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Sparkles } from "lucide-react";

export const CTA = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nome: ((data.get("name") as string) ?? "").trim(),
      empresa: ((data.get("company") as string) ?? "").trim(),
      telefone: ((data.get("phone") as string) ?? "").trim(),
      email: ((data.get("email") as string) ?? "").trim(),
      pedidosMes: ((data.get("msg") as string) ?? "").trim(),
    };

    setLoading(true);
    try {
      const res = await fetch("/api/send-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) {
        throw new Error(result.error ?? "Falha ao enviar.");
      }
      form.reset();
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-18102628959/zFtLCJPMpbAcEN_kgLhD'
        });
      }
      toast({
        title: "Demo agendada com sucesso!",
        description: "Em breve entraremos em contato.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description:
          "Tente novamente ou envie um e-mail direto pra comercial@softeum.com.br",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="relative overflow-hidden py-16 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-soft" />

      <div className="container relative">
        <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-3xl border border-border bg-gradient-cta p-5 text-primary-foreground shadow-elegant sm:p-8 md:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="truncate">Demo gratuita e sem compromisso</span>
            </div>

            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Pare de perder dinheiro digitando.{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Comece a faturar mais hoje.
              </span>
            </h2>

            <p className="mt-5 text-lg text-white/80">
              Agende uma demonstração de 30 minutos. Nosso time roda a Softeum com pedidos reais da
              sua operação e mostra exatamente quanto tempo, quanto dinheiro e quantos erros você
              vai economizar todo mês.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-white/90">
              {["Demonstração com pedidos reais da sua empresa", "Cálculo de ROI personalizado para a sua operação", "Integração via API ou exportação no formato do seu ERP", "Sem compromisso, sem instalação, sem cartão de crédito"].map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            id="contato"
            className="rounded-2xl border border-white/10 bg-background p-5 text-foreground shadow-soft sm:p-6 md:p-8"
          >
            <h3 className="font-display text-xl font-bold">Agende sua demo</h3>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">Preencha e nosso time entra em contato.</p>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" required placeholder="Seu nome completo" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" name="company" required placeholder="Nome da empresa" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(11) 99999-9999" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail corporativo</Label>
                <Input id="email" name="email" type="email" required placeholder="voce@empresa.com.br" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="msg">Quantos pedidos vocês recebem por mês? (opcional)</Label>
                <Textarea id="msg" name="msg" rows={3} placeholder="Ex.: ~500 pedidos / mês, ERP Protheus..." />
              </div>

              <Button type="submit" variant="hero" size="lg" disabled={loading} className="mt-2 h-auto min-h-11 whitespace-normal px-4 text-center">
                {loading ? "Enviando..." : "Quero economizar tempo e dinheiro"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Resposta em até 1 dia útil • Seus dados estão seguros
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
