import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { cn } from "@/lib/utils";
import { Doc3D } from "./Doc3D";

const faqs = [
  {
    q: "Preciso instalar algo?",
    a: "Não. A Softeum funciona no navegador. Você acessa de qualquer computador, sem instalação e sem manutenção.",
  },
  {
    q: "Funciona com o meu ERP?",
    a: "Sim. Integramos via API (o pedido entra direto no ERP) ou geramos o arquivo de importação (CSV, XML, JSON ou XLSX) no layout exato que o seu ERP aceita. Atendemos os principais ERPs de mercado e também sistemas próprios.",
  },
  {
    q: "Que tipos de pedido a Softeum lê?",
    a: "PDF, planilha, XML, CSV, Word, foto ou print do pedido, mensagem de texto e áudio de WhatsApp. O seu cliente não precisa usar nenhum modelo específico.",
  },
  {
    q: "Como funciona a IA vendedora no WhatsApp?",
    a: "Ela conversa com o seu cliente como um vendedor: entende texto e áudio, explica os produtos do seu catálogo, monta o pedido, confirma com o cliente e envia para o ERP. Atende 24 horas por dia.",
  },
  {
    q: "E se a IA errar algum dado?",
    a: "Todo pedido passa pelos validadores antes de ir para o ERP. Se algo estiver diferente do esperado, o pedido fica aguardando a sua revisão. Você sempre tem a palavra final.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Os dados de cada empresa ficam isolados, com controle de acesso por usuário e conexão ao e-mail feita por protocolos seguros e padrão de mercado.",
  },
  {
    q: "Posso testar antes de contratar?",
    a: "Sim. Você testa grátis por 5 dias úteis, com acesso completo. Agende uma demonstração e a gente configura junto com você.",
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Dúvidas</span>
          </Reveal>
          <RevealHeading
            text="Perguntas frequentes"
            delay={0.1}
            className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-sm text-lg text-muted-foreground">
              Não achou sua resposta?{" "}
              <a href="#demo" className="font-semibold text-foreground underline decoration-secondary decoration-2 underline-offset-4">
                Fale com a gente
              </a>
              .
            </p>
          </Reveal>
          <div className="mt-10 hidden gap-6 [perspective:800px] lg:flex">
            <Doc3D kind="pdf" size={64} float />
            <Doc3D kind="whatsapp" size={70} float delay={1.2} />
            <Doc3D kind="xlsx" size={64} float delay={2.1} />
          </div>
        </div>

        <Stagger className="divide-y divide-border border-y border-border" gap={0.06}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <RevealItem key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold md:text-xl">{f.q}</span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300",
                      isOpen && "rotate-45 border-primary bg-primary text-primary-foreground"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-muted-foreground">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};
