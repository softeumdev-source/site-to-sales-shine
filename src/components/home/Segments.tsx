import { useRef, type MouseEvent } from "react";
import { Factory, Store, Truck } from "lucide-react";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";

const segments = [
  {
    icon: Factory,
    title: "Indústria",
    desc: "Pedidos de representantes e distribuidores entram no ERP sem redigitar.",
    from: "#4AA8FF",
    to: "#2F7DE1",
  },
  {
    icon: Truck,
    title: "Distribuição e atacado",
    desc: "Alto volume de pedidos por e-mail e WhatsApp, todos os dias.",
    from: "#FF7A8E",
    to: "#F0485E",
  },
  {
    icon: Store,
    title: "Varejo",
    desc: "Lojas e redes enviando reposição em PDF, planilha ou mensagem.",
    from: "#34D27B",
    to: "#16A35A",
  },
];

/** Ícone "de plástico" em 3D: bloco com espessura, brilho e sombra. */
const ClayIcon = ({ icon: Icon, from, to }: { icon: typeof Factory; from: string; to: string }) => (
  <div className="relative h-24 w-24 [transform-style:preserve-3d]">
    <span className="absolute inset-0 rounded-[28px]" style={{ background: to, filter: "brightness(.7)", transform: "translateZ(-14px)" }} />
    <span className="absolute inset-0 rounded-[28px]" style={{ background: to, filter: "brightness(.85)", transform: "translateZ(-7px)" }} />
    <div
      className="relative flex h-full w-full items-center justify-center rounded-[28px] text-white"
      style={{
        background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
        boxShadow: `inset 0 3px 0 rgba(255,255,255,.4), inset 0 -8px 16px rgba(0,0,0,.15), 0 30px 40px -14px ${to}aa`,
      }}
    >
      <Icon className="h-11 w-11 drop-shadow" strokeWidth={2.2} style={{ transform: "translateZ(20px)" }} />
    </div>
  </div>
);

const SegmentItem = ({ s }: { s: (typeof segments)[number] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -24}deg`);
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 30}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "10deg");
    ref.current?.style.setProperty("--ry", "-16deg");
  };
  return (
    <div className="group flex flex-col items-center text-center [perspective:800px]" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={ref}
        className="transition-transform duration-300 ease-out [transform-style:preserve-3d] group-hover:scale-110"
        style={{ transform: "rotateX(var(--rx,10deg)) rotateY(var(--ry,-16deg))" }}
      >
        <div className="animate-[bob_5s_ease-in-out_infinite] [transform-style:preserve-3d]">
          <ClayIcon {...s} />
        </div>
      </div>
      <h3 className="mt-8 font-display text-xl font-bold">{s.title}</h3>
      <p className="mt-2 max-w-xs text-muted-foreground">{s.desc}</p>
    </div>
  );
};

export const Segments = () => (
  <section id="segmentos" className="relative py-20 md:py-28">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Para quem é</span>
        </Reveal>
        <RevealHeading
          text="Feito para quem recebe muitos pedidos."
          delay={0.1}
          className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        />
      </div>
      <Stagger className="mt-16 grid gap-14 sm:grid-cols-3" gap={0.12}>
        {segments.map((s) => (
          <RevealItem key={s.title} from="pop">
            <SegmentItem s={s} />
          </RevealItem>
        ))}
      </Stagger>
    </div>
  </section>
);
