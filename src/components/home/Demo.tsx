import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";

const agenda = [
  { title: "Seus pedidos reais", text: "Mandamos alguns pedidos da sua empresa e você vê a Softeum lendo e validando cada um." },
  { title: "Integração com o seu ERP", text: "Mostramos como o pedido entra no seu sistema, via API ou arquivo de importação." },
  { title: "IA vendedora no WhatsApp", text: "Você conversa com a IA como se fosse um cliente e vê o pedido sendo fechado." },
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
            text="Veja a Softeum funcionando com os seus pedidos."
            delay={0.1}
            className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight md:text-6xl"
          />

          <Reveal delay={0.3}>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Uma conversa de 30 minutos com o nosso time, com os pedidos da sua própria empresa.
            </p>
          </Reveal>

          <p className="mt-10 text-xs font-bold uppercase tracking-widest text-muted-foreground">Na demonstração você vê</p>
          <Stagger as="ol" className="mt-4 space-y-5" delay={0.35} gap={0.1}>
            {agenda.map((a, i) => (
              <RevealItem as="li" from="left" key={a.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary font-display text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-bold">{a.title}</p>
                  <p className="text-muted-foreground">{a.text}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>

          <p className="mt-10 text-sm text-muted-foreground">
            Prefere e-mail? Escreva para{" "}
            <a href="mailto:comercial@softeum.com.br" className="font-semibold text-foreground underline underline-offset-4">
              comercial@softeum.com.br
            </a>
          </p>
        </div>

        <Reveal from="scale" delay={0.2} className="relative">
          <form
            onSubmit={onSubmit}
            id="contato"
            className="relative rounded-[2rem] border border-border bg-background/90 p-6 shadow-elegant backdrop-blur sm:p-8"
          >
            <p className="font-display text-2xl font-bold">Agende sua demonstração</p>
            <p className="mt-1 text-sm text-muted-foreground">Preencha e escolhemos juntos o melhor horário.</p>

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
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {["Sem compromisso", "Resposta em até 1 dia útil", "Sem instalar nada"].map((t) => (
                  <span key={t} className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
