import { CSSProperties } from "react";
import {
  Code2,
  FileText,
  Image as ImageIcon,
  Mail,
  MessageCircle,
  Mic,
  Sheet,
  Table2,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ícones 3D feitos só com CSS (sem imagem): folha com espessura, canto dobrado
 * e selo colorido do formato saltando para frente. Ficam no mesmo estilo
 * "plástico" das ilustrações do site e reagem à inclinação do elemento pai.
 */

export type DocKind = "pdf" | "xlsx" | "xml" | "csv" | "docx" | "img" | "whatsapp" | "email" | "audio";

export const docMeta: Record<DocKind, { label: string; color: string; name: string }> = {
  pdf: { label: "PDF", color: "#F0485E", name: "PDF" },
  xlsx: { label: "XLS", color: "#1FA463", name: "Planilha" },
  xml: { label: "XML", color: "#F59E0B", name: "XML" },
  csv: { label: "CSV", color: "#14B8A6", name: "CSV" },
  docx: { label: "DOC", color: "#3B82F6", name: "Word" },
  img: { label: "JPG", color: "#8B5CF6", name: "Foto do pedido" },
  whatsapp: { label: "", color: "#25D366", name: "WhatsApp" },
  email: { label: "", color: "#4AA8FF", name: "E-mail" },
  audio: { label: "", color: "#25D366", name: "Áudio" },
};

const glyph: Partial<Record<DocKind, typeof FileText>> = {
  pdf: FileText,
  xlsx: Sheet,
  xml: Code2,
  csv: Table2,
  docx: Type,
  img: ImageIcon,
};

type Props = {
  kind: DocKind;
  /** largura em px */
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** flutua sozinho */
  float?: boolean;
  /** atraso da flutuação (s) */
  delay?: number;
};

const shade = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, v + amt));
  return `rgb(${c(n >> 16)}, ${c((n >> 8) & 255)}, ${c(n & 255)})`;
};

export const Doc3D = ({ kind, size = 120, className, style, float, delay = 0 }: Props) => {
  const m = docMeta[kind];
  const w = size;
  const h = kind === "email" ? size * 0.72 : kind === "whatsapp" || kind === "audio" ? size * 0.9 : size * 1.25;

  return (
    <div
      className={cn("relative [transform-style:preserve-3d]", float && "animate-doc-float", className)}
      style={{ width: w, height: h, animationDelay: `${delay}s`, ...style }}
      aria-hidden
    >
      {/* sombra no chão */}
      <span
        className="absolute left-1/2 top-full h-[14%] w-[80%] -translate-x-1/2 rounded-[50%] bg-[hsl(220_60%_40%/0.18)] blur-md"
        style={{ transform: "translateZ(-40px)" }}
      />
      {kind === "email" ? (
        <Envelope w={w} h={h} color={m.color} />
      ) : kind === "whatsapp" || kind === "audio" ? (
        <Bubble w={w} h={h} color={m.color} audio={kind === "audio"} />
      ) : (
        <Sheet3D w={w} h={h} color={m.color} label={m.label} Icon={glyph[kind]!} />
      )}
    </div>
  );
};

/* ------------------------------- Folha de papel ------------------------------- */

const Sheet3D = ({
  w,
  h,
  color,
  label,
  Icon,
}: {
  w: number;
  h: number;
  color: string;
  label: string;
  Icon: typeof FileText;
}) => {
  const r = w * 0.12;
  const fold = w * 0.26;
  const clip = `polygon(0 0, calc(100% - ${fold}px) 0, 100% ${fold}px, 100% 100%, 0 100%)`;
  return (
    <>
      {/* espessura */}
      {[10, 7, 4].map((z, i) => (
        <span
          key={z}
          className="absolute inset-0"
          style={{
            borderRadius: r,
            clipPath: clip,
            transform: `translateZ(-${z}px)`,
            background: i === 0 ? "#c9d6ea" : "#dbe5f3",
          }}
        />
      ))}
      {/* folha */}
      <span
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: r,
          clipPath: clip,
          background: "linear-gradient(160deg, #ffffff 0%, #f3f7fd 55%, #e6eef9 100%)",
          boxShadow: "inset 0 2px 0 #fff, inset 0 -6px 14px rgba(120,150,200,.18)",
        }}
      >
        {/* linhas de texto */}
        <span className="absolute flex flex-col" style={{ left: w * 0.16, right: w * 0.18, top: h * 0.36, gap: h * 0.06 }}>
          {[1, 0.8, 0.92, 0.6].map((f, i) => (
            <i key={i} className="block rounded-full bg-[#c7d6ec]" style={{ height: Math.max(3, w * 0.045), width: `${f * 100}%` }} />
          ))}
        </span>
        <Icon
          className="absolute"
          style={{ left: w * 0.14, top: h * 0.12, width: w * 0.26, height: w * 0.26, color }}
          strokeWidth={2.4}
        />
      </span>
      {/* canto dobrado */}
      <span
        className="absolute right-0 top-0"
        style={{
          width: fold,
          height: fold,
          borderBottomLeftRadius: fold * 0.35,
          background: "linear-gradient(225deg, #cfdcf0 0%, #eef3fb 60%)",
          transform: "translateZ(2px)",
          boxShadow: "-3px 3px 6px rgba(80,110,160,.18)",
        }}
      />
      {/* selo do formato */}
      <span
        className="absolute flex items-center justify-center font-display font-extrabold tracking-wide text-white"
        style={{
          left: -w * 0.1,
          bottom: h * 0.12,
          height: w * 0.3,
          padding: `0 ${w * 0.1}px`,
          borderRadius: w * 0.09,
          fontSize: w * 0.17,
          background: `linear-gradient(180deg, ${shade(color, 28)} 0%, ${color} 60%, ${shade(color, -22)} 100%)`,
          boxShadow: `0 ${w * 0.05}px 0 ${shade(color, -45)}, 0 ${w * 0.1}px ${w * 0.16}px ${color}55, inset 0 2px 0 rgba(255,255,255,.45)`,
          transform: "translateZ(26px)",
        }}
      >
        {label}
      </span>
    </>
  );
};

/* ---------------------------------- Envelope ---------------------------------- */

const Envelope = ({ w, h, color }: { w: number; h: number; color: string }) => (
  <>
    <span
      className="absolute inset-0"
      style={{ borderRadius: w * 0.12, background: shade(color, -40), transform: "translateZ(-8px)" }}
    />
    <span
      className="absolute inset-0 overflow-hidden"
      style={{
        borderRadius: w * 0.12,
        background: `linear-gradient(170deg, ${shade(color, 40)} 0%, ${color} 55%, ${shade(color, -18)} 100%)`,
        boxShadow: "inset 0 3px 0 rgba(255,255,255,.4), inset 0 -8px 16px rgba(0,40,120,.18)",
      }}
    >
      {/* aba */}
      <span
        className="absolute inset-x-0 top-0"
        style={{
          height: h * 0.62,
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          background: `linear-gradient(180deg, ${shade(color, 55)} 0%, ${shade(color, 20)} 100%)`,
          filter: "drop-shadow(0 4px 4px rgba(0,40,120,.25))",
        }}
      />
    </span>
    {/* notificação */}
    <span
      className="absolute flex items-center justify-center rounded-full font-bold text-white"
      style={{
        right: -w * 0.08,
        top: -w * 0.08,
        width: w * 0.3,
        height: w * 0.3,
        fontSize: w * 0.15,
        background: "linear-gradient(180deg,#ff8095,#F0485E)",
        boxShadow: "0 4px 0 #b42f43, 0 8px 14px rgba(240,72,94,.45), inset 0 2px 0 rgba(255,255,255,.5)",
        transform: "translateZ(24px)",
      }}
    >
      1
    </span>
    <Mail className="sr-only" />
  </>
);

/* --------------------------- Balão (WhatsApp / áudio) --------------------------- */

const Bubble = ({ w, h, color, audio }: { w: number; h: number; color: string; audio?: boolean }) => {
  const radius = `${w * 0.3}px ${w * 0.3}px ${w * 0.3}px ${w * 0.06}px`;
  return (
    <>
      <span className="absolute inset-0" style={{ borderRadius: radius, background: shade(color, -55), transform: "translateZ(-8px)" }} />
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{
          borderRadius: radius,
          background: `linear-gradient(165deg, ${shade(color, 45)} 0%, ${color} 55%, ${shade(color, -20)} 100%)`,
          boxShadow: "inset 0 3px 0 rgba(255,255,255,.45), inset 0 -8px 16px rgba(0,60,20,.2)",
        }}
      >
        {audio ? (
          <span className="flex items-center" style={{ gap: w * 0.035, transform: "translateZ(14px)" }}>
            <Mic className="text-white" style={{ width: w * 0.2, height: w * 0.2 }} strokeWidth={2.6} />
            {[0.35, 0.7, 0.5, 0.9, 0.45, 0.65].map((s, i) => (
              <i
                key={i}
                className="block origin-center animate-wave rounded-full bg-white"
                style={{ width: w * 0.045, height: h * 0.42 * s, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </span>
        ) : (
          <MessageCircle
            className="text-white drop-shadow"
            style={{ width: w * 0.46, height: w * 0.46, transform: "translateZ(14px)" }}
            strokeWidth={2.4}
          />
        )}
      </span>
    </>
  );
};
