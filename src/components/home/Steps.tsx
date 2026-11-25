import { Check, Database, Inbox, ScanText } from "lucide-react";
import { DrawLine, Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { ClayIcon } from "./Clay";
import { Doc3D } from "./Doc3D";

const steps = [
  {
    icon: Inbox,
    title: "Recebe o pedido",
    text: "Conectamos o e-mail comercial e o WhatsApp da sua empresa. Todo pedido que chega entra no fluxo automaticamente.",
    items: ["E-mail e WhatsApp", "Qualquer formato", "24 horas por dia"],
    from: "#6BB8FF",
    to: "#2F7DE1",
  },
  {
    icon: ScanText,
    title: "Lê e valida",
    text: "A IA extrai cliente, produtos, quantidades, valores e prazos. Os validadores conferem tudo com o seu cadastro.",
    items: ["Leitura com IA", "DE-PARA de códigos", "Regras de validação"],
    from: "#FF8FA0",
    to: "#F0485E",
  },
  {
    icon: Database,
    title: "Lança no ERP",
    text: "O pedido entra pronto no seu ERP, via API ou arquivo de importação. O que for diferente espera a sua aprovação.",
    items: ["Via API ou arquivo", "Aprovação inteligente", "Cliente avisado"],
    from: "#2E4A72",
    to: "#0F2240",
  },
];

export const Steps = () => (
  <section id="como-funciona" className="relative bg-muted/40 py-20 md:py-28">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Como funciona</span>
        </Reveal>
        <RevealHeading
          text="Do pedido recebido ao ERP em 3 passos."
          delay={0.1}
          className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        />
        <Reveal delay={0.3}>
          <p className="mt-4 text-lg text-muted-foreground">
            A implantação é feita com o nosso time. Depois disso, o fluxo roda sozinho.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-16">
        {/* linha entre os passos, com um pedido percorrendo */}
        <div className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-[46px] hidden md:block">
          <DrawLine className="h-1 rounded-full bg-gradient-to-r from-accent via-secondary to-primary" />
          <div className="absolute -top-[30px] h-0 w-full">
            <div className="absolute animate-[travel_7s_ease-in-out_infinite]">
              <div className="-translate-x-1/2">
                <Doc3D kind="pdf" size={34} />
              </div>
            </div>
          </div>
        </div>

        <Stagger className="grid gap-12 md:grid-cols-3 md:gap-8" gap={0.15}>
          {steps.map((s, i) => (
            <RevealItem key={s.title} className="relative flex flex-col items-center text-center">
              <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(14deg) rotateY(-12deg)" }}>
                <ClayIcon icon={s.icon} from={s.from} to={s.to} size={92} />
              </div>
              <p className="mt-7 text-xs font-bold uppercase tracking-widest text-muted-foreground">Passo {i + 1}</p>
              <h3 className="mt-1 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">{s.text}</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                    {it}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </div>
  </section>
);
