import { useState } from "react";
import { ArrowRight, CalendarCheck, MessageCircle, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { ClayIcon } from "./Clay";
import { Doc3D } from "./Doc3D";

const perks = [
  { icon: CalendarCheck, text: "30 minutos com pedidos reais da sua empresa", from: "#6BB8FF", to: "#2F7DE1" },
  { icon: MessageCircle, text: "IA vendedora no WhatsApp funcionando ao vivo", from: "#4BE08C", to: "#16A35A" },
  { icon: Plug, text: "Integração com o seu ERP e teste grátis de 5 dias", from: "#FF8FA0", to: "#F0485E" },
];

export const Demo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Envio igual ao formulário anterior: mesma API, mesmos campos e mesma conversão do Google Ads.
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
      if (!res.ok || !result.success) throw new Error(result.error ?? "Falha ao enviar.");
      form.reset();
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "conversion", { send_to: "AW-18102628959/zFtLCJPMpbAcEN_kgLhD" });
      toast({ title: "Pedido de demonstração enviado!", description: "Nosso time entra em contato em até 1 dia útil." });
    } catch {
      toast({
        variant: "destructive",
        title: "Não foi possível enviar",
        description: "Tente de novo ou escreva para comercial@softeum.com.br",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="relative overflow-hidden py-20 md:py-28">
      {/* fundo: halo suave */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_30%,hsl(var(--brand-sky)/0.35),transparent_70%),radial-gradient(50%_50%_at_90%_80%,hsl(var(--brand-pink)/0.3),transparent_70%)]" />

      <div className="container relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Demonstração gratuita</span>
          </Reveal>
          <RevealHeading
            text="Veja seus pedidos entrando sozinhos no ERP."
            delay={0.1}
            className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight md:text-6xl"
          />

          <Stagger as="ul" className="mt-10 space-y-5" delay={0.3} gap={0.12}>
            {perks.map((p) => (
              <RevealItem as="li" from="left" key={p.text} className="flex items-center gap-4">
                <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(12deg) rotateY(-14deg)" }}>
                  <ClayIcon icon={p.icon} from={p.from} to={p.to} size={48} />
                </div>
                <span className="text-lg font-medium">{p.text}</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <Reveal from="scale" delay={0.2} className="relative">
          {/* documentos flutuando em volta do formulário */}
          <div className="pointer-events-none absolute -left-10 -top-12 hidden [perspective:800px] sm:block">
            <Doc3D kind="pdf" size={62} float />
          </div>
          <div className="pointer-events-none absolute -right-8 top-1/3 hidden [perspective:800px] sm:block">
            <Doc3D kind="whatsapp" size={66} float delay={1} />
          </div>
          <div className="pointer-events-none absolute -bottom-10 left-10 hidden [perspective:800px] sm:block">
            <Doc3D kind="xlsx" size={56} float delay={2} />
          </div>

          <form
            onSubmit={onSubmit}
            id="contato"
            className="relative rounded-[2rem] border border-border bg-background/90 p-6 shadow-elegant backdrop-blur sm:p-8"
          >
            <p className="font-display text-2xl font-bold">Agende sua demonstração</p>
            <p className="mt-1 text-sm text-muted-foreground">Resposta em até 1 dia útil.</p>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" required placeholder="Seu nome" className="h-11 rounded-xl" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" name="company" required placeholder="Nome da empresa" className="h-11 rounded-xl" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(11) 99999-9999" className="h-11 rounded-xl" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail corporativo</Label>
                <Input id="email" name="email" type="email" required placeholder="voce@empresa.com.br" className="h-11 rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="msg">Quantos pedidos por mês e qual ERP? (opcional)</Label>
                <Textarea id="msg" name="msg" rows={2} placeholder="Ex.: 500 pedidos/mês, TOTVS Protheus" className="rounded-xl" />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={loading} className="group mt-2 h-12 rounded-xl">
                {loading ? "Enviando..." : "Agendar demonstração"}
                {!loading && <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </Button>
              <p className="text-center text-xs text-muted-foreground">Sem compromisso. Seus dados ficam só com a Softeum.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
