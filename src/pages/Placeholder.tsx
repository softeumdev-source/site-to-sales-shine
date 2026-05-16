import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  return (
    <main className="min-h-screen bg-background font-sans">
      <ScrollProgress />
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" />
        <div className="container relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 animate-pulse-soft text-secondary" />
            <span>Em breve</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="/#demo">Agende uma demo</a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="/">Voltar para a home</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Placeholder;
