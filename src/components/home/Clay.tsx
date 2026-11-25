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


/** Bloco 3D branco "de plástico" com um logo (Gmail, Outlook, WhatsApp, Softeum...). */
export const ClayLogo = ({ src, alt = "", size = 72, dark }: { src: string; alt?: string; size?: number; dark?: boolean }) => (
  <div className="relative [transform-style:preserve-3d]" style={{ width: size, height: size }}>
    <span
      className="absolute inset-0 rounded-[30%]"
      style={{ background: dark ? "#07111f" : "#c9d5e6", transform: "translateZ(-12px)" }}
    />
    <span
      className="absolute inset-0 rounded-[30%]"
      style={{ background: dark ? "#0c1a2e" : "#dfe7f2", transform: "translateZ(-6px)" }}
    />
    <div
      className="relative flex h-full w-full items-center justify-center rounded-[30%]"
      style={{
        background: dark ? "linear-gradient(160deg,#1d3557 0%,#0f2240 60%,#0a1830 100%)" : "linear-gradient(160deg,#ffffff 0%,#f3f7fc 60%,#e8eef7 100%)",
        boxShadow: dark
          ? "inset 0 2px 0 rgba(255,255,255,.18), 0 24px 34px -14px rgba(15,34,64,.6)"
          : "inset 0 2px 0 #fff, inset 0 -6px 12px rgba(120,150,200,.18), 0 24px 34px -14px rgba(40,70,120,.35)",
      }}
    >
      <img src={src} alt={alt} className="object-contain" style={{ width: size * 0.56, height: size * 0.56, transform: "translateZ(14px)" }} />
    </div>
  </div>
);

/** Bloco 3D branco e discreto com um ícone escuro (para seções mais sóbrias). */
export const ClayTile = ({ icon: Icon, size = 56, color }: { icon: LucideIcon; size?: number; color?: string }) => (
  <div className="relative [transform-style:preserve-3d]" style={{ width: size, height: size }}>
    <span className="absolute inset-0 rounded-[30%] bg-[#d5dce7]" style={{ transform: "translateZ(-8px)" }} />
    <div
      className="relative flex h-full w-full items-center justify-center rounded-[30%] text-foreground"
      style={{
        background: "linear-gradient(160deg,#ffffff 0%,#f4f6fa 100%)",
        boxShadow: "inset 0 2px 0 #fff, 0 18px 28px -14px rgba(20,40,80,.3), 0 0 0 1px rgba(20,40,80,.06)",
      }}
    >
      <Icon style={{ width: size * 0.44, height: size * 0.44, transform: "translateZ(10px)", color }} strokeWidth={2} />
    </div>
  </div>
);
