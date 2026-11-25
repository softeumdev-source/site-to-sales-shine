import { useRef, type MouseEvent } from "react";
import { Check } from "lucide-react";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { Doc3D, docMeta, type DocKind } from "./Doc3D";

const items: { kind: DocKind; read: string }[] = [
  { kind: "pdf", read: "Pedido em PDF" },
  { kind: "xlsx", read: "Planilha Excel" },
  { kind: "whatsapp", read: "Mensagem de texto" },
  { kind: "audio", read: "Áudio do cliente" },
  { kind: "img", read: "Foto ou print" },
  { kind: "xml", read: "Arquivo do sistema do cliente" },
  { kind: "csv", read: "Exportação de planilha" },
  { kind: "docx", read: "Pedido em documento" },
];

const FormatItem = ({ kind, read, i }: { kind: DocKind; read: string; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${y * -30}deg`);
    el.style.setProperty("--ry", `${x * 36}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group flex flex-col items-center [perspective:800px]"
    >
      <div className="relative flex h-28 w-full items-center justify-center">
        <div
          className="transition-transform duration-300 ease-out [transform-style:preserve-3d] group-hover:scale-110"
          style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
        >
          <Doc3D kind={kind} size={kind === "whatsapp" || kind === "audio" ? 64 : 56} float delay={(i * 0.37) % 3} />
        </div>
        {/* feixe de leitura */}
        <span className="pointer-events-none absolute inset-x-6 top-2 h-0.5 rounded-full bg-accent opacity-0 shadow-[0_0_16px_hsl(var(--accent))] group-hover:animate-[scan_1.1s_ease-in-out_infinite] group-hover:opacity-100" />
      </div>
      <p className="mt-1 font-display text-sm font-bold">{docMeta[kind].name}</p>
      <p className="relative h-5 text-xs text-muted-foreground">
        <span className="transition-opacity duration-200 group-hover:opacity-0">{read}</span>
        <span className="absolute inset-0 flex items-center justify-center gap-1 whitespace-nowrap font-semibold text-emerald-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Check className="h-3.5 w-3.5" strokeWidth={3} /> lido e validado
        </span>
      </p>
    </div>
  );
};

const points = [
  "Sem modelo padrão: cada cliente manda do seu jeito",
  "Pedidos com muitos itens, várias páginas e tabelas",
  "Pedido escrito no corpo do e-mail ou na mensagem",
  "Foto ou print de pedido feito no papel",
];

export const Formats = () => (
  <section id="formatos" className="relative py-20 md:py-28">
    <div className="container grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Qualquer formato</span>
        </Reveal>
        <RevealHeading
          text="Do jeito que o cliente mandar, a Softeum lê."
          delay={0.1}
          className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        />
        <Reveal delay={0.3}>
          <p className="mt-5 text-lg text-muted-foreground">
            Você não precisa pedir para o cliente mudar nada. A IA entende o pedido em qualquer formato e transforma tudo
            no mesmo padrão que o seu ERP aceita.
          </p>
        </Reveal>
        <Stagger as="ul" className="mt-7 space-y-3" delay={0.35} gap={0.08}>
          {points.map((pt) => (
            <RevealItem as="li" key={pt} from="left" className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-[15px]">{pt}</span>
            </RevealItem>
          ))}
        </Stagger>
      </div>

      <div className="relative rounded-[2rem] bg-gradient-to-br from-[hsl(var(--brand-sky)/0.25)] via-background to-[hsl(var(--brand-pink)/0.2)] p-6 sm:p-10">
        <Stagger className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-4" gap={0.06}>
          {items.map((it, i) => (
            <RevealItem key={it.kind} from="pop">
              <FormatItem {...it} i={i} />
            </RevealItem>
          ))}
        </Stagger>
        <p className="mt-6 text-center text-xs text-muted-foreground">Passe o mouse sobre um formato</p>
      </div>
    </div>
  </section>
);
