import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SupportTicketForm } from "@/components/site/SupportTicketForm";
import { Button } from "@/components/ui/button";
import {
  AlarmClock,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  Mail,
  MessageSquareText,
  Moon,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { PRIORITIES, BUSINESS_HOURS } from "@/lib/support";
import { PLATFORM_URL, SUPPORT_EMAIL } from "@/lib/constants";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Descreva o problema",
    text: "Preencha o formulário com o que aconteceu, desde quando e quais pedidos foram afetados. Quanto mais contexto, mais rápido resolvemos.",
  },
  {
    icon: Ticket,
    title: "2. Receba o protocolo",
    text: "O chamado é registrado na nossa fila e você recebe por e-mail o número do protocolo com o prazo de retorno da prioridade escolhida.",
  },
  {
    icon: MessageSquareText,
    title: "3. Acompanhe por e-mail",
    text: "Todo o atendimento acontece na mesma thread. Basta responder o e-mail de confirmação para complementar informações.",
  },
];

const checklist = [
  "Nome da empresa e e-mail conectado à plataforma",
  "Número do pedido, cliente ou data e hora do e-mail afetado",
  "Desde quando o problema acontece e se ele é recorrente",
  "Quantos pedidos ou usuários estão sendo impactados",
  "Mensagem de erro exibida na tela ou no retorno da integração",
  "O que já foi tentado antes de abrir o chamado",
];

const priorityAccent: Record<string, string> = {
  P1: "border-destructive/40 bg-destructive/5",
  P2: "border-accent/40 bg-accent/5",
  P3: "border-border bg-muted/30",
};

const Suporte = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Suporte Softeum | Central de atendimento e abertura de chamados";
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        <div className="container py-16 md:py-20">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Central de suporte
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Suporte <span className="text-gradient-brand">Softeum</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
            Aqui você abre um chamado técnico, entende exatamente em quanto tempo vamos responder e
            acompanha tudo por e-mail. Todo chamado gera um número de protocolo, é enviado para o
            nosso time e uma cópia vai automaticamente para o seu e-mail.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold">Atendimento padrão</p>
                <p className="text-xs text-muted-foreground">
                  {BUSINESS_HOURS.days}, {BUSINESS_HOURS.hours}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
              <AlarmClock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold">Primeiro retorno em até 1h útil</p>
                <p className="text-xs text-muted-foreground">Para chamados críticos (P1)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold">Canal oficial</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="break-all text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <a href="#abrir-chamado">
                Abrir chamado agora
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={PLATFORM_URL} target="_blank" rel="noreferrer">
                Acessar a plataforma de pedidos
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Como abrir */}
      <section className="container py-14 md:py-20">
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Como funciona a abertura de chamado
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Três passos, sem cadastro e sem instalar nada.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prioridades */}
      <section id="prioridades" className="bg-muted/40 py-14 md:py-20">
        <div className="container">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">SLA</span>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Níveis de prioridade e prazos
          </h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            A prioridade é escolhida por você na abertura do chamado e pode ser reclassificada pelo
            nosso time conforme o impacto real na operação — sempre com aviso por e-mail. Os prazos
            abaixo são contados em horário comercial.
          </p>

          {/* Tabela (desktop) */}
          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-card md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Prioridade</th>
                  <th className="px-5 py-4 font-semibold">Exemplo</th>
                  <th className="px-5 py-4 font-semibold">Primeiro retorno</th>
                  <th className="px-5 py-4 font-semibold">Resolução</th>
                </tr>
              </thead>
              <tbody>
                {PRIORITIES.map((p) => (
                  <tr key={p.id} className="border-t border-border align-top">
                    <td className="px-5 py-4 font-display font-bold">{p.name}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.example}</td>
                    <td className="px-5 py-4 font-semibold">{p.firstResponse}</td>
                    <td className="px-5 py-4 font-semibold">{p.resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="mt-8 grid gap-4 md:hidden">
            {PRIORITIES.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl border p-5 shadow-card ${priorityAccent[p.id]}`}
              >
                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.example}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Primeiro retorno</dt>
                    <dd className="text-right font-semibold">{p.firstResponse}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Resolução</dt>
                    <dd className="text-right font-semibold">{p.resolution}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            “Resolução conforme planejamento” significa que ajustes e melhorias entram na fila de
            desenvolvimento e você recebe uma previsão de entrega no primeiro retorno.
          </p>
        </div>
      </section>

      {/* Horário */}
      <section id="horario" className="container py-14 md:py-20">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">
          Atendimento
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Horário de atendimento
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-bold">Suporte padrão</h3>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {BUSINESS_HOURS.days}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {BUSINESS_HOURS.hours}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {BUSINESS_HOURS.exception}
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Incluído em todos os planos. Chamados podem ser abertos 24h por dia pelo formulário —
              a contagem do prazo começa no próximo horário útil.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-accent/40 bg-gradient-to-br from-accent/5 to-secondary/5 p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-accent" />
              <h3 className="font-display text-lg font-bold">Suporte Premium 24x7</h3>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Sob consulta
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Para operações que faturam fora do horário comercial, em fins de semana ou feriados,
              oferecemos plantão 24x7 com prazos reduzidos e canal direto com o time técnico.
            </p>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link to="/#demo">Falar sobre o plano Premium</Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-6">
          <h3 className="font-display text-base font-bold">Como contamos “horas úteis”</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Só contam as horas dentro do horário de atendimento. Um chamado P1 aberto às 17h30 de
            uma sexta-feira tem o primeiro retorno até às 09h da segunda-feira seguinte (1 hora
            útil). Um chamado P2 aberto às 16h de uma quarta tem retorno até às 10h de quinta (4
            horas úteis).
          </p>
        </div>
      </section>

      {/* Checklist + formulário */}
      <section id="abrir-chamado" className="bg-muted/40 py-14 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Abertura de chamado
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              O que informar para acelerar a resolução
            </h2>
            <p className="mt-2 text-muted-foreground">
              Chamados completos costumam ser resolvidos na metade do tempo, porque evitam idas e
              vindas de e-mail só para entender o problema.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              {checklist.map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-base font-bold">Prefere e-mail?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Você também pode escrever direto para{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="break-all font-medium text-foreground underline underline-offset-4"
                >
                  {SUPPORT_EMAIL}
                </a>
                . Nesse caso, informe no assunto a prioridade (P1, P2 ou P3) e o nome da empresa —
                o chamado entra na mesma fila.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Em caso de urgência crítica (P1), use o formulário: ele marca o chamado como
                crítico e dispara o alerta para o time técnico.
              </p>
            </div>
          </div>

          <SupportTicketForm />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Suporte;
