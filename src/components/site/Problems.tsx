import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import clockImg from "@/assets/problems/clock.webp";
import errorImg from "@/assets/problems/error.webp";
import inboxImg from "@/assets/problems/inbox.webp";
import growthImg from "@/assets/problems/growth.webp";
import { cn } from "@/lib/utils";

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

  // A ilustração flutua e gira levemente enquanto a linha atravessa a tela.
  const dir = i % 2 === 0 ? 1 : -1;
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10 * dir, 10 * dir]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.9]);
  // O texto nunca fica invisível: parte de 35% e acende quando chega ao centro.
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.38], [0.35, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.38], [24, 0]);

  return (
    <li
      ref={ref}
      className={cn(
        "grid items-center gap-5 border-t border-border py-8 first:border-t-0 sm:grid-cols-[10rem_1fr] sm:gap-8 md:py-10 lg:grid-cols-[12rem_1fr]",
        i % 2 === 1 && "sm:grid-cols-[1fr_10rem] lg:grid-cols-[1fr_12rem]"
      )}
    >
      <motion.img
        src={p.img}
        alt={p.alt}
        loading="lazy"
        style={reduce ? undefined : { y, rotate, scale }}
        className={cn(
          "mx-auto h-32 w-auto max-w-full object-contain drop-shadow-[0_24px_30px_hsl(var(--brand-blue)/0.25)] sm:h-36 lg:h-44",
          i % 2 === 1 && "sm:order-2"
        )}
      />
      <motion.div style={reduce ? undefined : { opacity: textOpacity, x: textX }} className="text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">{p.tag}</span>
        <h3 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
        <p className="mt-2 max-w-md text-base text-muted-foreground sm:max-w-none">{p.desc}</p>
      </motion.div>
    </li>
  );
};

export const Problems = () => {
  return (
    <section id="problemas" className="relative py-20 md:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">O problema</span>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl">
            Cada pedido digitado na mão é dinheiro saindo do caixa
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Se a sua empresa recebe pedidos por e-mail, o custo aparece todo dia em quatro lugares.
          </p>
          <a
            href="#como-funciona"
            className="mt-8 hidden items-center gap-2 text-sm font-semibold text-foreground underline decoration-secondary decoration-2 underline-offset-4 hover:decoration-accent lg:inline-flex"
          >
            Veja como a Softeum resolve
          </a>
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
