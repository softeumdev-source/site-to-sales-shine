import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";
import { ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        scrolled
          ? "border-border/60 bg-background/90 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-background/40 backdrop-blur-md"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2">
          <img
            src={logo}
            alt="Softeum logo"
            width={36}
            height={36}
            className="h-9 w-9 transition-transform group-hover:rotate-6 group-hover:scale-110"
          />
          <span className="font-display text-xl font-bold leading-none tracking-tight">Softeum</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-brand after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm">
            <a href="https://softeum-flow.vercel.app/login" target="_blank" rel="noreferrer">
              Acessar a plataforma
            </a>
          </Button>
          <Button asChild variant="hero" size="sm">
            <a href="#demo">Agende uma demo</a>
          </Button>
        </div>

        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          className="rounded-lg p-2 hover:bg-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-border/40 bg-background/95 shadow-soft backdrop-blur-xl md:hidden">
          <div className="container flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button asChild variant="outline" className="mt-3 w-full justify-center">
              <a
                href="https://softeum-flow.vercel.app/login"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                Acessar a plataforma
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="hero" className="mt-2">
              <a href="#demo" onClick={() => setOpen(false)}>Agende uma demo</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
