import { ArrowLeftRight, BarChart3, BellRing, CopyX, Lock, ThumbsUp } from "lucide-react";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";

const features = [
  {
    icon: ArrowLeftRight,
    title: "DE-PARA automático",
    text: "A Softeum aprende os códigos que cada cliente usa e converte para os códigos do seu ERP.",
    example: "CAB-2.5 → 100234",
    color: "#2F7DE1",
  },
  {
    icon: ThumbsUp,
    title: "Aprovação inteligente",
    text: "O que é confiável segue direto. O que precisa de atenção espera a sua aprovação, manual ou automática.",
    example: "3 aprovados · 1 para revisar",
    color: "#16A35A",
  },
  {
    icon: CopyX,
    title: "Controle de duplicidade",
    text: "Pedido enviado duas vezes não é lançado duas vezes. Evita prejuízo e retrabalho.",
    example: "Pedido 4521 já recebido",
    color: "#F0485E",
  },
  {
    icon: BellRing,
    title: "Comunicação automática",
    text: "O cliente é avisado quando o pedido é recebido, aprovado ou quando falta alguma informação.",
    example: "“Recebemos seu pedido 4521”",
    color: "#F59E0B",
  },
  {
    icon: BarChart3,
    title: "Painel e relatórios",
    text: "Acompanhe volume, valores, aprovações, produtos mais vendidos e ranking de clientes.",
    example: "1.284 pedidos em novembro",
    color: "#8B5CF6",
  },
  {
    icon: Lock,
    title: "Segurança e equipe",
    text: "Dados isolados por empresa, níveis de acesso por usuário e controle de quem aprova pedidos.",
    example: "Administrador · Membro",
    color: "#0F2240",
  },
];

export const Features = () => (
  <section id="recursos" className="relative bg-muted/40 py-20 md:py-28">
    <div className="container">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Recursos</span>
          </Reveal>
          <RevealHeading
            text="Tudo o que sua operação precisa para não digitar mais."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
          />
        </div>
        <Reveal delay={0.3}>
          <p className="text-lg text-muted-foreground lg:pb-2">
            Mais do que ler pedidos: a Softeum cuida das regras, das conferências e da comunicação, para o fluxo funcionar
            sozinho todos os dias.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
        {features.map((f) => (
          <RevealItem key={f.title} className="group flex flex-col gap-4 bg-background p-7 transition-colors hover:bg-[#fbfcfe]">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-soft transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-6deg]"
              style={{ background: `linear-gradient(160deg, ${f.color}cc, ${f.color})` }}
            >
              <f.icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
            <span className="mt-auto w-fit rounded-lg bg-muted px-2.5 py-1 font-mono text-xs text-foreground/70">{f.example}</span>
          </RevealItem>
        ))}
      </Stagger>
    </div>
  </section>
);
