import { ArrowUpRight, BellRing, Database, FolderInput, RefreshCw } from "lucide-react";
import logo from "@/assets/logocerta.png";
import { RevealItem, Stagger } from "@/components/site/motion";
import { ClayIcon, ClayLogo } from "./Clay";

/**
 * Os 3 jeitos de o ERP receber o pedido (docs.softeum.com.br), num visual claro:
 * Softeum e ERP em 3D ligados por 3 caminhos coloridos, com o pedido andando.
 */

const DOCS_URL = "https://docs.softeum.com.br/";

const ways = [
  {
    icon: RefreshCw,
    label: "API",
    title: "O ERP busca",
    text: "O ERP consulta a API da Softeum e pega os pedidos prontos.",
    from: "#6BB8FF",
    to: "#2F7DE1",
    path: "M 0 90 C 90 10, 230 10, 320 90",
    dur: "2.6s",
  },
  {
    icon: BellRing,
    label: "Aviso",
    title: "A Softeum avisa",
    text: "Assim que o pedido fica pronto, a Softeum envia para o ERP.",
    from: "#FF8FA0",
    to: "#F0485E",
    path: "M 0 90 L 320 90",
    dur: "2s",
  },
  {
    icon: FolderInput,
    label: "Arquivo",
    title: "Arquivo na pasta",
    text: "O pedido vira um arquivo no layout que o ERP já importa.",
    from: "#4BE08C",
    to: "#16A35A",
    path: "M 0 90 C 90 170, 230 170, 320 90",
    dur: "3s",
  },
];

const syncs = ["Produtos", "Compradores", "Vendedores", "Tabelas de preço"];

export const IntegrationWays = () => (
  <div className="mt-8">
    {/* cena: Softeum ⇄ ERP */}
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e8f2ff] via-white to-[#ffecef] px-4 py-6 sm:px-6">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <div className="flex flex-col items-center gap-2 [perspective:600px]">
          <div className="animate-[bob_5s_ease-in-out_infinite] [transform-style:preserve-3d]" style={{ transform: "rotateY(14deg)" }}>
            <ClayLogo src={logo} alt="Softeum" size={64} dark />
          </div>
          <span className="text-xs font-semibold">Softeum</span>
        </div>

        <svg viewBox="0 0 320 180" className="h-auto w-full overflow-visible" aria-hidden>
          {ways.map((w, i) => (
            <g key={w.label}>
              <path id={`way-${i}`} d={w.path} fill="none" stroke={w.to} strokeOpacity=".35" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
              <circle r="7" fill={w.to}>
                <animateMotion dur={w.dur} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                  <mpath href={`#way-${i}`} />
                </animateMotion>
              </circle>
              <circle r="12" fill={w.to} opacity=".18">
                <animateMotion dur={w.dur} repeatCount="indefinite">
                  <mpath href={`#way-${i}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
          {/* rótulos no meio de cada caminho */}
          {ways.map((w, i) => (
            <foreignObject key={w.label} x="120" y={[18, 76, 134][i]} width="80" height="28">
              <div className="flex h-full items-center justify-center">
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold shadow-card" style={{ color: w.to }}>
                  {w.label}
                </span>
              </div>
            </foreignObject>
          ))}
        </svg>

        <div className="flex flex-col items-center gap-2 [perspective:600px]">
          <div className="animate-[bob_5s_ease-in-out_infinite] [animation-delay:1.2s] [transform-style:preserve-3d]" style={{ transform: "rotateY(-14deg)" }}>
            <ClayIcon icon={Database} from="#2E4A72" to="#0F2240" size={64} />
          </div>
          <span className="text-xs font-semibold">Seu ERP</span>
        </div>
      </div>
    </div>

    {/* as 3 formas */}
    <Stagger className="mt-6 grid gap-5 sm:grid-cols-3" gap={0.1}>
      {ways.map((w) => (
        <RevealItem key={w.title}>
          <div className="[perspective:400px]">
            <div className="w-fit [transform-style:preserve-3d]" style={{ transform: "rotateX(12deg) rotateY(-14deg)" }}>
              <ClayIcon icon={w.icon} from={w.from} to={w.to} size={42} />
            </div>
          </div>
          <p className="mt-3 font-display font-bold">{w.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
        </RevealItem>
      ))}
    </Stagger>

    <div className="mt-7 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        O ERP também envia os cadastros: <span className="font-medium text-foreground">{syncs.join(", ").toLowerCase()}</span>.
      </p>
      <a
        href={DOCS_URL}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4"
      >
        Documentação para a TI
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  </div>
);
