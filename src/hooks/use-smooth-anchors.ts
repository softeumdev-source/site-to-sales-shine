import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rolagem suave para links de âncora (#secao) feita em JS.
 *
 * A rolagem suave nativa do navegador (scroll-behavior: smooth) é interrompida
 * quando o caminho passa por seções que mudam enquanto a página rola (as
 * demonstrações fixas na tela), e o link "para no meio". Aqui o destino é
 * recalculado a cada quadro, então sempre chega na seção certa.
 */

let raf = 0;

const cancel = () => cancelAnimationFrame(raf);

function scrollToElement(el: HTMLElement, instant = false) {
  cancel();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targetY = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY);
  const start = window.scrollY;
  const distance = Math.abs(targetY() - start);
  const duration = instant || reduce ? 0 : Math.min(1200, 450 + distance * 0.06);
  const t0 = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (now: number) => {
    const t = duration ? Math.min(1, (now - t0) / duration) : 1;
    const y = start + (targetY() - start) * ease(t);
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

export function useSmoothAnchors() {
  const location = useLocation();

  // cliques em links de âncora da mesma página
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      if (window.location.hash !== url.hash) window.history.pushState(null, "", url.hash);
      scrollToElement(el);
    };
    // a pessoa rolando por conta própria cancela a animação
    const stop = () => cancel();
    document.addEventListener("click", onClick);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, []);

  // ao chegar de outra página com #secao (ex.: /suporte → /#demo)
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    // a seção pode ainda estar carregando: tenta por até ~4 s
    let tries = 0;
    const t = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 40) {
        window.clearInterval(t);
        if (el) window.setTimeout(() => scrollToElement(el, true), 80);
      }
    }, 100);
    return () => window.clearInterval(t);
  }, [location.pathname, location.hash]);
}

/** Componente que só liga o comportamento (fica dentro do Router). */
export const SmoothAnchors = () => {
  useSmoothAnchors();
  return null;
};
