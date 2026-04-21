import { Quote, Star } from "lucide-react";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Antes era tudo manual. Hoje os pedidos entram sozinhos no ERP. Cortamos 3 funções de digitação e a equipe foi realocada para vendas.",
    name: "Samuel Luiz Antonio",
    role: "Líder de geração de demanda",
    img: t1,
  },
  {
    quote: "Em 15 dias de piloto a Softeum já tinha pago o ano inteiro. A redução de erros nos pedidos foi o que mais impressionou nossa diretoria.",
    name: "Carolina Mendes",
    role: "Gerente de Operações",
    img: t2,
  },
];

export const Testimonials = () => {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="depoimentos" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Nossos clientes
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Empresas que escolheram a{" "}
            <span className="text-gradient-animated">Softeum</span>
          </h2>
        </div>

        <div ref={ref} className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
              }}
              className={cn(
                "spotlight group relative rounded-3xl border border-border bg-card p-8 shadow-card transition-all duration-700 hover:-translate-y-2 hover:border-secondary/40 hover:shadow-elegant",
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-secondary/15 transition-all group-hover:scale-110 group-hover:text-secondary/30" />
              <div className="mb-4 flex gap-0.5 text-secondary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="relative text-lg leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border-2 border-secondary/30 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:border-secondary"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
