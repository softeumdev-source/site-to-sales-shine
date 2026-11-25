import { Check, Factory, Store, Truck } from "lucide-react";
import gmail from "@/assets/brands/gmail.svg";
import outlook from "@/assets/brands/outlook.svg";
import whatsapp from "@/assets/brands/whatsapp.svg";
import { Reveal, RevealHeading, RevealItem, Stagger } from "@/components/site/motion";
import { ClayTile } from "./Clay";

/** Para quem é: três colunas sóbrias, separadas por linhas finas. */

const segments = [
  {
    icon: Factory,
    color: "#2F7DE1",
    title: "Indústria",
    lead: "Pedidos de representantes e distribuidores entram no ERP sem redigitar.",
    items: ["Pedidos de representantes", "Planilhas de distribuidores", "Integração com o ERP da fábrica"],
    channels: [gmail, outlook],
  },
  {
    icon: Truck,
    color: "#F0485E",
    title: "Distribuição e atacado",
    lead: "Muitos clientes, cada um com o seu jeito de pedir, todos os dias.",
    items: ["Alto volume de pedidos", "Layouts diferentes por cliente", "DE-PARA de códigos"],
    channels: [gmail, outlook, whatsapp],
  },
  {
    icon: Store,
    color: "#16A35A",
    title: "Varejo",
    lead: "Lojas e redes mandando reposição por mensagem, foto ou planilha.",
    items: ["Reposição de lojas", "Pedidos pelo WhatsApp", "Redes com várias unidades"],
    channels: [whatsapp, gmail],
  },
];

export const Segments = () => (
  <section id="segmentos" className="relative py-20 md:py-28">
    <div className="container">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Para quem é</span>
          </Reveal>
          <RevealHeading
            text="Feito para empresas que recebem muitos pedidos."
            delay={0.1}
            className="mt-3 text-balance font-display text-3xl font-bold tracking-tight md:text-5xl"
          />
        </div>
        <Reveal delay={0.3}>
          <p className="text-lg text-muted-foreground lg:pb-2">
            Se a sua equipe passa parte do dia digitando pedidos que chegam por e-mail ou WhatsApp, a Softeum foi feita
            para você.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border" gap={0.1}>
        {segments.map((s, i) => (
          <RevealItem
            key={s.title}
            className="group flex flex-col border-b border-border py-10 last:border-b-0 md:border-b-0 md:px-10 md:first:pl-0 md:last:pr-0"
          >
            <div className="[perspective:500px]">
              <div
                className="w-fit animate-[bob_5s_ease-in-out_infinite] transition-transform duration-500 [transform-style:preserve-3d] group-hover:scale-110"
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <div className="[transform-style:preserve-3d]" style={{ transform: "rotateX(12deg) rotateY(-16deg)" }}>
                  <ClayTile icon={s.icon} size={56} color={s.color} />
                </div>
              </div>
            </div>

            <h3 className="mt-7 font-display text-2xl font-bold">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.lead}</p>

            <ul className="mt-6 space-y-2.5">
              {s.items.map((it) => (
                <li key={it} className="flex items-center gap-2.5 text-[15px]">
                  <Check className="h-4 w-4 shrink-0" style={{ color: s.color }} strokeWidth={2.5} />
                  {it}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-2 pt-8 text-xs text-muted-foreground">
              <span>Pedidos chegam por</span>
              {s.channels.map((c) => (
                <img
                  key={c}
                  src={c}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
              ))}
            </div>
          </RevealItem>
        ))}
      </Stagger>
    </div>
  </section>
);
