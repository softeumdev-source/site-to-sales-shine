import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Reveal, RevealHeading } from "@/components/site/motion";
import { HeroScene } from "./HeroScene";

import gmail from "@/assets/brands/gmail.svg";
import outlook from "@/assets/brands/outlook.svg";
import whatsapp from "@/assets/brands/whatsapp.svg";
import { erps } from "./erps";

export const Hero = () => {
  return (
    <section id="top" className="relative -mt-[76px] overflow-hidden bg-background pt-[76px]">
      {/* fundo: pontos finos + halos de luz atrás da cena */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(hsl(220_30%_70%/0.35)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)]" />
      <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-sky)/0.45),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-[-30%] right-[20%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-pink)/0.35),transparent_65%)]" />

      <div className="container relative grid items-center gap-10 pb-10 pt-12 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pb-16">
        <div className="text-center lg:text-left">
          <Reveal from="down">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-foreground/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              Automação de pedidos com IA
            </span>
          </Reveal>

          <RevealHeading
            as="h1"
            text="Seus pedidos entram sozinhos no ERP."
            delay={0.1}
            className="mx-auto mt-5 max-w-xl text-balance font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:mx-0 lg:text-[4.2rem]"
          />

          <Reveal delay={0.45}>
            <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground lg:mx-0">
              Pedido no e-mail ou no WhatsApp, em PDF, planilha ou áudio. A Softeum lê o pedido, confere com validadores inteligentes e
              lança no seu ERP, sem ninguém digitar.
            </p>
          </Reveal>

          <Reveal delay={0.6} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <MagneticButton className="w-full sm:w-auto">
              <Button asChild variant="hero" size="xl" className="group w-full sm:w-auto">
                <a href="#demo">
                  Agendar demonstração
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.15} className="w-full sm:w-auto">
              <Button asChild variant="outline" size="xl" className="w-full bg-background/60 sm:w-auto">
                <a href="#como-funciona">Ver como funciona</a>
              </Button>
            </MagneticButton>
          </Reveal>

          <Reveal delay={0.75} className="mt-7 flex flex-col items-center gap-3 lg:items-start">
            <div className="flex items-center gap-3 rounded-full border border-border/70 bg-background/80 py-1.5 pl-4 pr-2 backdrop-blur">
              <span className="text-sm font-medium text-muted-foreground">Pedidos chegam por</span>
              <span className="flex items-center gap-1">
                {[
                  { src: gmail, alt: "Gmail" },
                  { src: outlook, alt: "Outlook" },
                  { src: whatsapp, alt: "WhatsApp" },
                ].map((l) => (
                  <span key={l.alt} title={l.alt} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card transition-transform hover:-translate-y-0.5">
                    <img src={l.src} alt={l.alt} className="h-5 w-5 object-contain" />
                  </span>
                ))}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Sem instalar nada · Funciona com o seu ERP</p>
          </Reveal>
        </div>

        <Reveal from="scale" delay={0.2} className="mx-auto w-full max-w-[600px]">
          <HeroScene />
        </Reveal>
      </div>

      {/* Faixa de ERPs */}
      <div className="relative border-t border-border/60 bg-background" id="integracoes">
        <div className="container flex flex-col items-center gap-4 py-7 md:flex-row md:gap-10">
          <p className="shrink-0 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground md:text-left">
            Integra com o ERP
            <br className="hidden md:block" /> que você já usa
          </p>
          <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14 [animation-duration:55s] group-hover:[animation-play-state:paused]">
              {[0, 1].map((k) =>
                erps.map((e) => (
                  <span
                    key={`${k}-${e.name}`}
                    aria-hidden={k === 1}
                    className="flex shrink-0 items-center gap-2 opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  >
                    <img src={e.src} alt={k === 0 ? e.name : ""} style={{ height: e.h }} className="w-auto" loading="lazy" />
                    {e.word && <span className="font-display text-xl font-extrabold tracking-[0.18em] text-[#2d2d2d]">{e.word}</span>}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
