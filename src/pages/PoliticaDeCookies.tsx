import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const LAST_UPDATE = "13 de maio de 2026";

const PoliticaDeCookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        <div className="container py-16 md:py-24">
          <p className="mb-3 inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Documento legal
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Política de <span className="text-gradient-brand">Cookies</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Este documento explica o que são cookies, como o Softeum os utiliza e quais
            são as suas opções em relação ao uso dessas tecnologias em nosso site e
            plataforma.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Última atualização: <strong className="text-foreground">{LAST_UPDATE}</strong>
          </p>
        </div>
      </section>

      <article className="container max-w-3xl py-12 md:py-16">
        <div className="space-y-10 text-[15px] leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              1. O que são cookies
            </h2>
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo
              (computador, tablet ou smartphone) quando você visita um site. Eles
              permitem que o site reconheça seu dispositivo em visitas posteriores e
              lembre preferências e configurações, tornando a experiência de navegação
              mais eficiente.
            </p>
            <p className="mt-3">
              Além de cookies, também podemos utilizar tecnologias semelhantes, como
              pixels de rastreamento e armazenamento local (<em>localStorage</em>), que
              funcionam de maneira similar para as finalidades descritas nesta Política.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              2. Como o Softeum utiliza cookies
            </h2>
            <p>Utilizamos cookies para as seguintes finalidades:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Funcionamento essencial:</strong>{" "}
                manter a sessão do usuário autenticado, garantir o funcionamento correto
                da plataforma e armazenar preferências básicas de interface.
              </li>
              <li>
                <strong className="text-foreground">Segurança:</strong> identificar e
                prevenir acessos não autorizados, fraudes e atividades suspeitas.
              </li>
              <li>
                <strong className="text-foreground">Desempenho e análise:</strong>{" "}
                coletar informações agregadas sobre como os visitantes utilizam o site
                (páginas acessadas, tempo de permanência, origem do tráfego) para
                melhorar continuamente a experiência.
              </li>
              <li>
                <strong className="text-foreground">Funcionalidades:</strong> lembrar
                preferências do usuário, como idioma e configurações de exibição, entre
                sessões.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              3. Tipos de cookies que utilizamos
            </h2>
            <div className="mt-3 space-y-6">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Cookies essenciais
                </h3>
                <p>
                  Necessários para o funcionamento básico do site e da plataforma. Sem
                  eles, serviços como autenticação e navegação segura não funcionariam.
                  Não podem ser desativados.
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Cookies de sessão (expiram ao fechar o navegador)</li>
                  <li>Tokens de autenticação e autorização OAuth</li>
                  <li>Cookies de proteção CSRF</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Cookies analíticos
                </h3>
                <p>
                  Utilizados para entender como os visitantes interagem com o site.
                  Todas as informações coletadas são agregadas e anonimizadas. Usamos o
                  Google Analytics com configuração de anonimização de IP ativada.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Cookies de preferências
                </h3>
                <p>
                  Permitem que o site lembre escolhas feitas pelo usuário (como tema
                  visual ou configurações de exibição) para oferecer uma experiência mais
                  personalizada em visitas futuras.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              4. Cookies de terceiros
            </h2>
            <p>
              Alguns cookies são definidos por serviços de terceiros que utilizamos para
              melhorar o site e a plataforma:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Google Analytics:</strong>{" "}
                estatísticas de uso do site em modo anonimizado.
              </li>
              <li>
                <strong className="text-foreground">Google OAuth:</strong> necessário
                para a autenticação e integração com o Gmail.
              </li>
              <li>
                <strong className="text-foreground">Plataformas de pagamento</strong>{" "}
                (ex.: Stripe, Asaas): utilizados durante o processo de checkout para
                garantir a segurança da transação.
              </li>
            </ul>
            <p className="mt-3">
              Esses terceiros possuem suas próprias políticas de privacidade e cookies,
              sobre as quais o Softeum não tem controle direto.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              5. Como gerenciar e desativar cookies
            </h2>
            <p>
              Você pode controlar e/ou excluir cookies a qualquer momento pelas
              configurações do seu navegador. A maioria dos navegadores permite:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Ver quais cookies estão armazenados e excluí-los individualmente;</li>
              <li>Bloquear cookies de terceiros;</li>
              <li>Bloquear todos os cookies de sites específicos;</li>
              <li>
                Bloquear todos os cookies (atenção: isso pode afetar o funcionamento de
                partes do site e da plataforma).
              </li>
            </ul>
            <p className="mt-3">
              A desativação de cookies essenciais pode impedir o acesso à plataforma
              autenticada. Cookies analíticos e de preferências podem ser desativados sem
              prejuízo das funcionalidades principais.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              6. Retenção de dados de cookies
            </h2>
            <p>
              Os cookies de sessão são excluídos automaticamente ao fechar o navegador.
              Cookies persistentes expiram conforme o prazo configurado para cada um —
              em geral, entre 30 dias e 12 meses. Dados analíticos coletados são retidos
              conforme as políticas do respectivo provedor (ex.: Google Analytics retém
              dados por até 26 meses por padrão).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              7. Atualizações desta Política
            </h2>
            <p>
              Esta Política de Cookies pode ser atualizada periodicamente para refletir
              mudanças nas tecnologias utilizadas ou na legislação aplicável. A versão
              vigente estará sempre disponível nesta página. Recomendamos revisá-la
              periodicamente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              8. Contato
            </h2>
            <p>
              Dúvidas sobre o uso de cookies pelo Softeum podem ser enviadas para{" "}
              <a
                href="mailto:comercial@softeum.com.br"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                comercial@softeum.com.br
              </a>
              . Consulte também a nossa{" "}
              <Link
                to="/privacy-policy"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                Política de Privacidade
              </Link>{" "}
              e os nossos{" "}
              <Link
                to="/termos-e-condicoes"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                Termos e Condições
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default PoliticaDeCookies;
