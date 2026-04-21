import { Star } from "lucide-react";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";

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
  return (
    <section id="depoimentos" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Nossos clientes
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Empresas que escolheram a{" "}
            <span className="text-gradient-brand">Softeum</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-3xl border border-border bg-card p-8 shadow-card"
            >
              <div className="mb-4 flex gap-0.5 text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border-2 border-secondary/30 object-cover"
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
