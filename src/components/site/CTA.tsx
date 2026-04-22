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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast({
        title: "Demo agendada com sucesso!",
        description: "Nossa equipe entra em contato em até 1 dia útil para confirmar.",
      });
    }, 800);
  };

  return (
    <section id="demo" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-soft" />

      <div className="container relative">
        <div className="mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-3xl border border-border bg-gradient-cta p-8 text-primary-foreground shadow-elegant md:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Sistema rodando em até 48 horas
            </div>

            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Veja a Softeum funcionando com{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                seus próprios pedidos
              </span>
            </h2>

            <p className="mt-5 text-lg text-white/80">
              Agende uma demo de 30 minutos. Nossa equipe mostra a plataforma rodando
              com pedidos reais e desenha um plano para a sua operação.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-white/90">
              {["Demo personalizada com seus pedidos", "Análise de ROI para sua operação", "Sistema rodando em até 48 horas"].map((b) => (
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
            className="rounded-2xl border border-white/10 bg-background p-6 text-foreground shadow-soft md:p-8"
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

              <Button type="submit" variant="hero" size="lg" disabled={loading} className="mt-2">
                {loading ? "Enviando..." : "Quero agendar minha demo"}
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
