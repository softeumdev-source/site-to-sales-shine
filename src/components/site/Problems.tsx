import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import clockImg from "@/assets/problems/clock.webp";
import errorImg from "@/assets/problems/error.webp";
import inboxImg from "@/assets/problems/inbox.webp";
import growthImg from "@/assets/problems/growth.webp";
import { cn } from "@/lib/utils";
import { DrawLine, Reveal, RevealHeading, RevealItem, Stagger, viewport } from "./motion";

const problems = [
  {
    img: clockImg,
    alt: "Relógio despertador cercado de folhas soltas",
    title: "Horas perdidas todo dia digitando",
    desc: "Seu time passa a manhã copiando pedido do e-mail para o ERP. É tempo que deveria estar em vendas.",
    tag: "Tempo",
  },
  {
    img: errorImg,
    alt: "Pedido de compra com um alerta de erro",
    title: "Erros que custam caro",
    desc: "Um código trocado ou uma quantidade errada vira devolução, retrabalho e cliente insatisfeito.",
    tag: "Retrabalho",
  },
  {
    img: inboxImg,
    alt: "Pilha de e-mails acumulados com um PDF de pedido",
    title: "Pedidos esquecidos no inbox",
    desc: "O e-mail que ninguém abriu vira pedido não faturado, prazo perdido e venda que escapa.",
    tag: "Receita",
  },
  {
    img: growthImg,
    alt: "Gráfico de crescimento que bate numa barreira",
    title: "Crescimento travado pela operação",
    desc: "Cada cliente novo exige mais gente digitando. A empresa cresce em custo, não em capacidade.",
    tag: "Escala",
  },
];

const ProblemRow = ({ p, i }: { p: (typeof problems)[number]; i: number }) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const odd = i % 2 === 1;

  // Depois de surgir, a ilustração continua flutuando levemente com a rolagem.
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], odd ? [6, -6] : [-6, 6]);

  return (
    <li ref={ref} className="relative">
      {i > 0 && <DrawLine />}
      <div
        className={cn(
          "grid items-center gap-5 py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 md:py-10 lg:grid-cols-[12rem_1fr]",
          odd && "sm:grid-cols-[1fr_10rem] lg:grid-cols-[1fr_12rem]"
        )}
      >
        <Reveal from="pop" delay={0.1} className={cn("relative mx-auto", odd && "sm:order-2")}>
          {/* brilho que acende atrás da ilustração */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 1, delay: 0.25 }}
            className={cn(
              "absolute inset-4 rounded-full blur-2xl",
              odd ? "bg-secondary/25" : "bg-accent/25"
            )}
          />
          <motion.img
            src={p.img}
            alt={p.alt}
            loading="lazy"
            style={reduce ? undefined : { y, rotate }}
            className="relative h-32 w-auto max-w-full object-contain drop-shadow-[0_24px_30px_hsl(var(--brand-blue)/0.25)] sm:h-36 lg:h-44"
          />
        </Reveal>

        <Stagger className="text-center sm:text-left" gap={0.1} delay={0.15}>
          <RevealItem from={odd ? "left" : "right"}>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">{p.tag}</span>
          </RevealItem>
          <RevealItem from={odd ? "left" : "right"}>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
          </RevealItem>
          <RevealItem from={odd ? "left" : "right"}>
            <p className="mt-2 max-w-md text-base text-muted-foreground sm:max-w-none">{p.desc}</p>
          </RevealItem>
        </Stagger>
      </div>
    </li>
  );
};

export const Problems = () => {
  return (
    <section id="problemas" className="relative py-20 md:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal from="left">
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary">O problema</span>
          </Reveal>
          <RevealHeading
            text="Cada pedido digitado na mão é dinheiro saindo do caixa"
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
          />
          <Reveal delay={0.5}>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Se a sua empresa recebe pedidos por e-mail, o custo aparece todo dia em quatro lugares.
            </p>
          </Reveal>
          <Reveal delay={0.7} className="hidden lg:block">
            <a
              href="#como-funciona"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-secondary decoration-2 underline-offset-4 hover:decoration-accent"
            >
              Veja como a Softeum resolve
            </a>
          </Reveal>
        </div>

        <ul>
          {problems.map((p, i) => (
            <ProblemRow key={p.title} p={p} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};
