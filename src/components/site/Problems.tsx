import { useEffect, useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealHeading } from "./motion";

const problems = [
  {
    video: "/videos/problems/clock.mp4",
    poster: "/videos/problems/clock.webp",
    alt: "Relógio despertador tocando, com folhas voando em volta",
    title: "Horas perdidas todo dia digitando",
    desc: "Seu time passa a manhã copiando pedido do e-mail para o ERP. É tempo que deveria estar em vendas.",
    tag: "Tempo",
    tint: "from-[hsl(var(--brand-sky)/0.35)]",
  },
  {
    video: "/videos/problems/error.mp4",
    poster: "/videos/problems/error.webp",
    alt: "Pedido de compra com um alerta de erro piscando",
    title: "Erros que custam caro",
    desc: "Um código trocado ou uma quantidade errada vira devolução, retrabalho e cliente insatisfeito.",
    tag: "Retrabalho",
    tint: "from-[hsl(var(--brand-pink)/0.3)]",
  },
  {
    video: "/videos/problems/inbox.mp4",
    poster: "/videos/problems/inbox.webp",
    alt: "Pilha de e-mails balançando, prestes a cair",
    title: "Pedidos esquecidos no inbox",
    desc: "O e-mail que ninguém abriu vira pedido não faturado, prazo perdido e venda que escapa.",
    tag: "Receita",
    tint: "from-[hsl(var(--brand-sky)/0.35)]",
  },
  {
    video: "/videos/problems/growth.mp4",
    poster: "/videos/problems/growth.webp",
    alt: "Gráfico crescendo até bater numa barreira",
    title: "Crescimento travado pela operação",
    desc: "Cada cliente novo exige mais gente digitando. A empresa cresce em custo, não em capacidade.",
    tag: "Escala",
    tint: "from-[hsl(var(--brand-pink)/0.3)]",
  },
];

/** Vídeo em loop que só roda enquanto está visível na tela. */
const LoopVideo = ({ src, poster, alt }: { src: string; poster: string; alt: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.2 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      // multiply faz o fundo branco do vídeo sumir no fundo colorido do card
      className="relative aspect-square w-full object-contain mix-blend-multiply"
    />
  );
};

const ProblemCard = ({ p, i }: { p: (typeof problems)[number]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Inclinação 3D seguindo o mouse
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${y * -10}deg`);
    el.style.setProperty("--ry", `${x * 12}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal from="up" delay={i * 0.1} className="[perspective:1000px]">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:shadow-elegant"
      >
        {/* brilho que acompanha o mouse */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), hsl(0 0% 100% / 0.35), transparent 45%)" }}
        />
        <div className={cn("relative bg-gradient-to-b to-white px-2 pt-2 sm:px-6 sm:pt-4", p.tint)} style={{ transform: "translateZ(40px)" }}>
          <LoopVideo src={p.video} poster={p.poster} alt={p.alt} />
        </div>
        <div className="relative p-3 pt-1 sm:p-6 sm:pt-2" style={{ transform: "translateZ(24px)" }}>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary sm:text-xs">{p.tag}</span>
          <h3 className="mt-1 text-balance font-display text-base font-bold leading-snug tracking-tight sm:text-xl">{p.title}</h3>
          <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{p.desc}</p>
        </div>
      </div>
    </Reveal>
  );
};

export const Problems = () => {
  return (
    <section id="problemas" className="relative py-20 md:py-28">
      <div className="container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Reveal from="left">
              <span className="text-sm font-semibold uppercase tracking-widest text-secondary">O problema</span>
            </Reveal>
            <RevealHeading
              text="Cada pedido digitado na mão é dinheiro saindo do caixa"
              delay={0.1}
              className="mt-3 max-w-3xl text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
            />
          </div>
          <Reveal delay={0.4}>
            <p className="max-w-md text-lg text-muted-foreground lg:ml-auto">
              Se a sua empresa recebe pedidos por e-mail, o custo aparece todo dia em quatro lugares.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {problems.map((p, i) => (
            <ProblemCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
