import logo from "@/assets/logocerta.png";
import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PLATFORM_URL } from "@/lib/constants";

type NavItem = { label: string; href?: string; to?: string };

const links: NavItem[] = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#email", label: "E-mail" },
  { href: "/#whatsapp", label: "WhatsApp" },
  { href: "/#recursos", label: "Recursos" },
  { href: "/#integracoes-erp", label: "Integrações" },
  { href: "/#faq", label: "Dúvidas" },
];

/** Menu flutuante em formato de pílula, com vidro fosco; encolhe ao rolar. */
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground";

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full px-3 pt-3">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex items-center justify-between rounded-full border transition-all duration-300",
          scrolled
            ? "h-14 max-w-[70rem] border-border/70 bg-background/80 pl-4 pr-2 shadow-elegant backdrop-blur-xl"
            : "h-16 max-w-6xl border-transparent bg-background/40 pl-5 pr-2 backdrop-blur-md"
        )}
      >
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Softeum" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg font-bold tracking-tight">Softeum</span>
        </NavLink>

        <nav className="hidden items-center lg:flex">
          {links.map((l) =>
            l.to ? (
              <Link key={l.to} to={l.to} className={item}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={item}>
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <a href={PLATFORM_URL} target="_blank" rel="noreferrer" className={item}>
            Entrar
          </a>
          <a
            href="/#demo"
            className="group inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Agendar demonstração
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-foreground/5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-6xl animate-fade-in rounded-3xl border border-border bg-background/95 p-3 shadow-elegant backdrop-blur-xl lg:hidden">
          <div className="flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto">
            {links.map((l) =>
              l.to ? (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-medium hover:bg-muted">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-medium hover:bg-muted">
                  {l.label}
                </a>
              )
            )}
            <a
              href={PLATFORM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-3 font-medium"
            >
              Entrar na plataforma <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="/#demo"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
            >
              Agendar demonstração <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
