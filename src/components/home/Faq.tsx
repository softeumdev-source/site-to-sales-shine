import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import gmail from "@/assets/brands/gmail.svg";
import outlook from "@/assets/brands/outlook.svg";
import whatsappLogo from "@/assets/brands/whatsapp.svg";
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
    a: "Sim. O seu ERP recebe o pedido de um de três jeitos: busca pela nossa API, aviso automático no endereço do ERP ou arquivo gravado na pasta que ele já importa (XML, CSV, TXT, SAP IDoc ou Protheus), sem a TI programar. Funciona com SAP, TOTVS, Sankhya, Senior, Omie, Bling, Tiny, Microsoft Dynamics, Oracle NetSuite, Odoo e ERPs próprios. A documentação completa para a TI está em docs.softeum.com.br.",
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
            <p className="mt-4 max-w-sm text-lg text-muted-foreground">O que as empresas mais perguntam antes de começar.</p>
          </Reveal>

          {/* painel de contato com os canais flutuando */}
          <Reveal delay={0.4} className="mt-8">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#e8f2ff] via-white to-[#ffecef] p-6">
              <div className="relative h-36 [perspective:800px]">
                <img src={gmail} alt="Gmail" className="absolute left-[4%] top-[18%] h-10 w-auto animate-[bob_5s_ease-in-out_infinite] drop-shadow-[0_10px_14px_rgba(234,67,53,.25)]" />
                <img src={outlook} alt="Outlook" className="absolute left-[30%] top-[52%] h-12 w-auto animate-[bob_6s_ease-in-out_infinite] drop-shadow-[0_10px_14px_rgba(0,120,212,.3)] [animation-delay:1s]" />
                <img src={whatsappLogo} alt="WhatsApp" className="absolute left-[50%] top-[4%] h-12 w-12 animate-[bob_5.5s_ease-in-out_infinite] drop-shadow-[0_10px_14px_rgba(37,211,102,.35)] [animation-delay:.5s]" />
                <div className="absolute right-[18%] top-[44%]">
                  <Doc3D kind="pdf" size={40} float />
                </div>
                <div className="absolute right-[2%] top-[6%]">
                  <Doc3D kind="xlsx" size={36} float delay={1.4} />
                </div>
              </div>
              <p className="mt-4 font-display text-xl font-bold">Ainda com dúvida?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Fale com um especialista e veja a Softeum com os pedidos da sua empresa.
              </p>
              <a
                href="#demo"
                className="group mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Falar com um especialista
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
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
