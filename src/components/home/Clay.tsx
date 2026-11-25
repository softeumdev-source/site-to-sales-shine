import type { LucideIcon } from "lucide-react";

/** Ícone "de plástico" em 3D: bloco com espessura, brilho e sombra. */
export const ClayIcon = ({ icon: Icon, from, to, size = 96 }: { icon: LucideIcon; from: string; to: string; size?: number }) => (
  <div className="relative [transform-style:preserve-3d]" style={{ width: size, height: size }}>
    <span className="absolute inset-0 rounded-[29%]" style={{ background: to, filter: "brightness(.7)", transform: "translateZ(-14px)" }} />
    <span className="absolute inset-0 rounded-[29%]" style={{ background: to, filter: "brightness(.85)", transform: "translateZ(-7px)" }} />
    <div
      className="relative flex h-full w-full items-center justify-center rounded-[29%] text-white"
      style={{
        background: `linear-gradient(160deg, ${from} 0%, ${to} 100%)`,
        boxShadow: `inset 0 3px 0 rgba(255,255,255,.4), inset 0 -8px 16px rgba(0,0,0,.15), 0 30px 40px -14px ${to}aa`,
      }}
    >
      <Icon className="drop-shadow" strokeWidth={2.2} style={{ width: size * 0.46, height: size * 0.46, transform: "translateZ(20px)" }} />
    </div>
  </div>
);

