import { useEffect, useRef, useState } from "react";

/**
 * Mede a largura do container e devolve a escala para encaixar uma cena
 * desenhada com largura fixa (`designWidth`). Nunca passa de 1.
 */
export function useFitScale<T extends HTMLElement = HTMLDivElement>(designWidth: number) {
  const ref = useRef<T>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / designWidth));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return { ref, scale };
}
