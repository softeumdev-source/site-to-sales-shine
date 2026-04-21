import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#depoimentos", label: "Clientes" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="Softeum logo" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-xl font-bold tracking-tight">Softeum</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm">
            <a href="#contato">Entrar em contato</a>
          </Button>
          <Button asChild variant="hero" size="sm">
            <a href="#demo">Agende uma demo</a>
          </Button>
        </div>

        <button
          aria-label="Abrir menu"
          className="md:hidden rounded-lg p-2 hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-4">
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
            <Button asChild variant="hero" className="mt-2">
              <a href="#demo" onClick={() => setOpen(false)}>Agende uma demo</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
