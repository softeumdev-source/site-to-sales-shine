import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logocerta.png";
import { PLATFORM_URL, SUPPORT_EMAIL } from "@/lib/constants";

const cols = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "/#como-funciona" },
      { label: "Pedidos por e-mail", href: "/#email" },
      { label: "IA no WhatsApp", href: "/#whatsapp" },
      { label: "Recursos", href: "/#recursos" },
      { label: "Integrações", href: "/#integracoes-erp" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Agendar demonstração", href: "/#demo" },
      { label: "Entrar na plataforma", href: PLATFORM_URL, external: true },
      { label: "Dúvidas frequentes", href: "/#faq" },
      { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
    ],
  },
] as const;

export const Footer = () => (
  <footer className="relative overflow-hidden bg-[#0b1626] text-white">
    <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[hsl(var(--brand-blue)/0.25)] blur-3xl" />

    <div className="container relative pt-16">
      {/* chamada final */}
      <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-12 md:flex-row md:items-center">
        <p className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Chega de digitar pedido. Deixe a Softeum fazer isso.
        </p>
        <a
          href="/#demo"
          className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-semibold text-[#0b1626] transition-transform hover:scale-[1.03]"
        >
          Agendar demonstração
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <a href="/#top" className="flex items-center gap-2">
            <img src={logo} alt="Softeum" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-lg font-bold">Softeum</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-white/60">Automação de pedidos com IA para e-mail e WhatsApp, integrada ao seu ERP.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{c.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.label} className="break-words">
                  {"to" in l ? (
                    <Link to={l.to} className="text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      {...("external" in l ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="text-white/75 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 md:flex-row">
        <p>© {new Date().getFullYear()} Softeum. Todos os direitos reservados.</p>
        <nav className="flex gap-5">
          <Link to="/privacy-policy" className="hover:text-white">
            Política de Privacidade
          </Link>
          <Link to="/terms" className="hover:text-white">
            Termos de Uso
          </Link>
        </nav>
      </div>
    </div>

    {/* marca grande no fundo */}
    <p
      aria-hidden
      className="pointer-events-none select-none text-center font-display text-[22vw] font-extrabold leading-[0.75] tracking-tighter text-white/[0.04]"
    >
      Softeum
    </p>
  </footer>
);
