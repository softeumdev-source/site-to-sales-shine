import { useRef, type MouseEvent } from "react";
import { Check, Factory, Store, Truck } from "lucide-react";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { ClayIcon } from "./Clay";
import { Doc3D, type DocKind } from "./Doc3D";

const segments: {
  icon: typeof Factory;
  title: string;
  lead: string;
  items: string[];
  docs: DocKind[];
  from: string;
  to: string;
  tint: string;
}[] = [
  {
    icon: Factory,
    title: "Indústria",
    lead: "Pedidos de representantes e distribuidores entram no ERP sem redigitar.",
    items: ["Pedidos de representantes comerciais", "Planilhas de distribuidores", "Integração com o ERP da fábrica"],
    docs: ["pdf", "xlsx", "email"],
    from: "#6BB8FF",
    to: "#2F7DE1",
    tint: "from-[#e8f2ff] to-[#f6faff]",
  },
  {
    icon: Truck,
    title: "Distribuição e atacado",
    lead: "Alto volume de pedidos todos os dias, de muitos clientes diferentes.",
    items: ["Centenas de pedidos por dia", "Cada cliente com o seu layout", "DE-PARA dos códigos de cada cliente"],
    docs: ["pdf", "whatsapp", "csv"],
    from: "#FF8FA0",
    to: "#F0485E",
    tint: "from-[#ffecef] to-[#fff7f8]",
  },
  {
    icon: Store,
    title: "Varejo",
    lead: "Lojas e redes mandando reposição em PDF, planilha ou mensagem.",
    items: ["Pedidos de reposição das lojas", "Pedidos pelo WhatsApp", "Redes com várias unidades"],
    docs: ["whatsapp", "img", "xlsx"],
    from: "#4BE08C",
    to: "#16A35A",
    tint: "from-[#e6f8ee] to-[#f5fcf8]",
  },
];

const SegmentCard = ({ s }: { s: (typeof segments)[number] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="h-full [perspective:1200px]" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={ref}
        className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-gradient-to-b ${s.tint} p-7 transition-transform duration-300 ease-out`}
        style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
      >
        <div className="flex items-center gap-4">
          <div className="shrink-0 [transform-style:preserve-3d]" style={{ transform: "rotateX(12deg) rotateY(-14deg)" }}>
            <ClayIcon icon={s.icon} from={s.from} to={s.to} size={60} />
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight">{s.title}</h3>
        </div>
        <p className="mt-5 text-[15px] text-muted-foreground">{s.lead}</p>

        <ul className="mt-5 space-y-2.5">
          {s.items.map((it) => (
            <li key={it} className="flex items-start gap-2.5 text-[15px]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: s.to }}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {it}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Pedidos que chegam</p>
          <div className="flex items-end gap-3 [perspective:600px]">
            {s.docs.map((d, i) => (
              <Doc3D key={d} kind={d} size={d === "whatsapp" || d === "email" ? 38 : 32} float delay={i * 0.6} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Segments = () => (
  <section id="segmentos" className="relative py-20 md:py-28">
    <div className="container">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Para quem é</span>
          </Reveal>
          <RevealHeading
            text="Feito para empresas que recebem muitos pedidos."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
          />
        </div>
        <Reveal delay={0.3}>
          <p className="text-lg text-muted-foreground lg:pb-2">
            Se a sua equipe passa parte do dia digitando pedidos que chegam por e-mail ou WhatsApp, a Softeum foi feita para
            você.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3" gap={0.12}>
        {segments.map((s) => (
          <RevealItem key={s.title} className="h-full">
            <SegmentCard s={s} />
          </RevealItem>
        ))}
      </Stagger>
    </div>
  </section>
);
