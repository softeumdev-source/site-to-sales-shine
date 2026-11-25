import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Peças de animação de entrada: os elementos surgem quando entram na tela.
 * `once: true` faz cada um animar uma vez só, na primeira vez que aparece.
 */

const ease = [0.22, 1, 0.36, 1] as const;
export const viewport = { once: true, amount: 0.25 } as const;

type From = "up" | "down" | "left" | "right" | "scale" | "pop";

const offsets: Record<From, Record<string, number>> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.88, y: 24 },
  pop: { scale: 0.4, rotate: -14, y: 40 },
};

export const revealVariants = (from: From = "up", delay = 0): Variants => ({
  hidden: { opacity: 0, filter: "blur(8px)", ...offsets[from] },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition:
      from === "pop"
        ? { type: "spring", stiffness: 160, damping: 14, delay }
        : { duration: 0.8, ease, delay },
  },
});

/** Um bloco que surge sozinho ao entrar na tela. */
export const Reveal = ({
  children,
  from = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  from?: From;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "p";
}) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={revealVariants(from, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Tag>
  );
};

/** Grupo cujos filhos <RevealItem> surgem um depois do outro. */
export const Stagger = ({
  children,
  className,
  gap = 0.12,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
};

export const RevealItem = ({
  children,
  from = "up",
  className,
  as = "div",
}: {
  children: ReactNode;
  from?: From;
  className?: string;
  as?: "div" | "li" | "span" | "p";
}) => {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={revealVariants(from)}>
      {children}
    </Tag>
  );
};

/** Título que sobe palavra por palavra, saindo de trás de uma máscara. */
export const RevealHeading = ({
  text,
  className,
  as = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) => {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.75, ease } },
            }}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/** Linha que se desenha da esquerda para a direita. */
export const DrawLine = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    aria-hidden
    className={cn("h-px origin-left bg-border", className)}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={viewport}
    transition={{ duration: 1, ease, delay }}
  />
);
