import type { ReactNode } from "react";
import { Factory, Store, Truck } from "lucide-react";
import gmail from "@/assets/brands/gmail.svg";
import outlook from "@/assets/brands/outlook.svg";
import whatsapp from "@/assets/brands/whatsapp.svg";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { ClayIcon } from "./Clay";
import { Doc3D } from "./Doc3D";

/**
 * Para quem é: cada segmento é uma "ilha" 3D (plataforma colorida em perspectiva)
 * com o ícone flutuando e os canais/documentos girando em volta.
 */

const Brand = ({ src }: { src: string }) => (
  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_12px_20px_-8px_rgba(30,60,110,.4)]">
    <img src={src} alt="" className="h-7 w-7 object-contain" />
  </span>
);

const segments: {
  icon: typeof Factory;
  title: string;
  lead: string;
  items: string[];
  orbit: ReactNode[];
  from: string;
  to: string;
  ground: [string, string];
}[] = [
  {
    icon: Factory,
    title: "Indústria",
    lead: "Pedidos de representantes e distribuidores entram no ERP sem redigitar.",
    items: ["Representantes", "Distribuidores", "Planilhas de pedido"],
    orbit: [<Doc3D kind="pdf" size={42} />, <Brand src={outlook} />, <Doc3D kind="xlsx" size={42} />, <Brand src={gmail} />],
    from: "#6BB8FF",
    to: "#2F7DE1",
    ground: ["#cfe4ff", "#9cc8ff"],
  },
  {
    icon: Truck,
    title: "Distribuição e atacado",
    lead: "Muitos clientes, cada um com o seu jeito de pedir, todos os dias.",
    items: ["Alto volume", "Layouts diferentes", "DE-PARA por cliente"],
    orbit: [<Brand src={whatsapp} />, <Doc3D kind="pdf" size={42} />, <Brand src={gmail} />, <Doc3D kind="csv" size={42} />],
    from: "#FF8FA0",
    to: "#F0485E",
    ground: ["#ffd6dc", "#ffaab6"],
  },
  {
    icon: Store,
    title: "Varejo",
    lead: "Lojas e redes mandando reposição por mensagem, foto ou planilha.",
    items: ["Reposição de lojas", "Pedido pelo WhatsApp", "Várias unidades"],
    orbit: [<Brand src={whatsapp} />, <Doc3D kind="img" size={42} />, <Doc3D kind="audio" size={48} />, <Brand src={outlook} />],
    from: "#4BE08C",
    to: "#16A35A",
    ground: ["#ccf3dd", "#94e3b6"],
  },
];

const Island = ({ s, i }: { s: (typeof segments)[number]; i: number }) => {
  const R = 118; // raio da órbita (antes do achatamento)
  const dur = `${20 + i * 3}s`;

  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative h-[270px] w-full max-w-[320px] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {/* plataforma em perspectiva */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center [perspective:700px]">
          <div className="relative h-[140px] w-[250px] [transform-style:preserve-3d]" style={{ transform: "rotateX(66deg)" }}>
            <span className="absolute inset-0 rounded-[50%]" style={{ background: s.ground[1], filter: "brightness(.92)", transform: "translateZ(-18px)" }} />
            <span className="absolute inset-0 rounded-[50%]" style={{ background: s.ground[1], transform: "translateZ(-9px)" }} />
            <span
              className="absolute inset-0 rounded-[50%]"
              style={{ background: `radial-gradient(circle at 40% 35%, #ffffff 0%, ${s.ground[0]} 45%, ${s.ground[1]} 100%)` }}
            />
            <span className="absolute inset-[22%] rounded-[50%] border-2 border-dashed border-white/80" />
          </div>
        </div>

        {/* sombra do ícone na plataforma */}
        <span className="absolute bottom-[78px] left-1/2 h-5 w-24 -translate-x-1/2 animate-[shadow-bob_4.5s_ease-in-out_infinite] rounded-[50%] bg-black/15 blur-md" style={{ animationDelay: `${i * 0.7}s` }} />

        {/* canais e documentos girando em elipse em volta do ícone */}
        <div className="absolute left-1/2 top-[118px] z-0" style={{ transform: "scaleY(.42)" }}>
          <div style={{ animation: `orbit ${dur} linear infinite` }}>
            {s.orbit.map((node, k) => {
              const a = (k / s.orbit.length) * Math.PI * 2;
              return (
                <div key={k} className="absolute" style={{ left: Math.cos(a) * R, top: Math.sin(a) * R }}>
                  <div style={{ animation: `orbit ${dur} linear infinite reverse` }}>
                    <div style={{ transform: "translate(-50%, -50%) scaleY(2.381)" }}>{node}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ícone flutuando */}
        <div className="absolute left-1/2 top-[52px] z-10 -translate-x-1/2 [perspective:600px]">
          <div className="animate-[bob_4.5s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.7}s` }}>
            <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(10deg) rotateY(-16deg)" }}>
              <ClayIcon icon={s.icon} from={s.from} to={s.to} size={92} />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
      <p className="mt-2 max-w-xs text-muted-foreground">{s.lead}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {s.items.map((it) => (
          <span key={it} className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: s.to }}>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Segments = () => (
  <section id="segmentos" className="relative overflow-hidden py-20 md:py-28">
    <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[420px] bg-[radial-gradient(60%_60%_at_50%_50%,hsl(var(--brand-sky)/0.25),transparent_70%)]" />
    <div className="container relative">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">Para quem é</span>
        </Reveal>
        <RevealHeading
          text="Feito para empresas que recebem muitos pedidos."
          delay={0.1}
          className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        />
        <Reveal delay={0.3}>
          <p className="mt-4 text-lg text-muted-foreground">
            Se a sua equipe passa parte do dia digitando pedidos que chegam por e-mail ou WhatsApp, a Softeum foi feita
            para você.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6" gap={0.12}>
        {segments.map((s, i) => (
          <RevealItem key={s.title} from="pop">
            <Island s={s} i={i} />
          </RevealItem>
        ))}
      </Stagger>
    </div>
  </section>
);
