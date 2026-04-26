import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const FloatingCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#demo"
      aria-label="Agende uma demo"
      className={cn(
        "fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3.5 text-sm font-bold text-white shadow-elegant transition-all duration-500 hover:scale-105 hover:shadow-glow sm:bottom-6 sm:left-auto sm:right-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      Agende sua demo grátis
      <MessageCircle className="h-4 w-4" />
    </a>
  );
};
