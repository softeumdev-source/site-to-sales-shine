import { useEffect, useState } from "react";

/** Altura visível da janela, atualizada ao girar o aparelho ou redimensionar. */
export function useViewportHeight() {
  const [h, setH] = useState(() => (typeof window === "undefined" ? 900 : window.innerHeight));
  useEffect(() => {
    const on = () => setH(window.innerHeight);
    window.addEventListener("resize", on);
    window.addEventListener("orientationchange", on);
    return () => {
      window.removeEventListener("resize", on);
      window.removeEventListener("orientationchange", on);
    };
  }, []);
  return h;
}
