import logo from "@/assets/logocerta.png";
import { Reveal, RevealHeading } from "@/components/site/motion";
import { erps } from "./erps";
import { IntegrationWays } from "./IntegrationWays";

/**
 * Integrações: a Softeum no centro e os ERPs girando em órbita (CSS 3D).
 * Cada logo gira ao contrário da órbita para ficar sempre de frente.
 */

const ring1 = erps.slice(0, 6);
const ring2 = erps.slice(6);

const Orbit = ({ items, radius, duration, reverse }: { items: typeof erps; radius: number; duration: number; reverse?: boolean }) => (
  <div
    className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
    style={{ animation: `orbit ${duration}s linear infinite${reverse ? " reverse" : ""}` }}
  >
    <span
      className="absolute rounded-full border border-dashed border-border"
      style={{ width: radius * 2, height: radius * 2, left: -radius, top: -radius }}
    />
    {items.map((e, i) => {
      const a = (i / items.length) * Math.PI * 2;
      return (
        <div
          key={e.name}
          className="absolute"
          style={{ left: Math.cos(a) * radius, top: Math.sin(a) * radius }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
          <div style={{ animation: `orbit ${duration}s linear infinite${reverse ? "" : " reverse"}` }}>
            <div className="flex h-[58px] min-w-[96px] items-center justify-center gap-1.5 rounded-2xl border border-border bg-background px-3 shadow-card transition-transform hover:scale-110">
              <img src={e.src} alt={e.name} style={{ height: Math.min(e.h, 32) }} className="w-auto max-w-[110px]" loading="lazy" />
              {e.word && <span className="font-display text-sm font-extrabold tracking-[0.15em] text-[#2d2d2d]">{e.word}</span>}
            </div>
          </div>
          </div>
        </div>
      );
    })}
  </div>
);

export const Integrations = () => (
  <section id="integracoes-erp" className="relative overflow-hidden py-20 md:py-28">
    <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Integrações</span>
        </Reveal>
        <RevealHeading
          text="Conecta com os principais ERPs do mercado."
          delay={0.1}
          className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
        />
        <Reveal delay={0.35}>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">Sem trocar de sistema. O seu ERP recebe o pedido do jeito que for mais simples para a sua TI.</p>
        </Reveal>

        <Reveal delay={0.4}>
          <IntegrationWays />
        </Reveal>
      </div>

      <Reveal from="scale" className="relative mx-auto aspect-square w-full max-w-[560px]">
        <div className="absolute inset-0 origin-center scale-[0.62] sm:scale-[0.85] lg:scale-100">
          <Orbit items={ring1} radius={150} duration={50} />
          <Orbit items={ring2} radius={250} duration={70} reverse />
          {/* núcleo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 animate-ping-soft rounded-[30px] bg-secondary/25" />
            <div
              className="relative flex h-28 w-28 flex-col items-center justify-center rounded-[30px] text-white"
              style={{
                background: "linear-gradient(160deg,#1d3557 0%,#0f2240 60%,#0a1830 100%)",
                boxShadow: "inset 0 2px 0 rgba(255,255,255,.18), 0 30px 50px -10px rgba(15,34,64,.5)",
              }}
            >
              <img src={logo} alt="Softeum" className="h-12 w-12" />
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/70">Softeum</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
