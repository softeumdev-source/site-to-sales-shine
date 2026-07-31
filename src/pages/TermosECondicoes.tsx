import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const LAST_UPDATE = "13 de maio de 2026";

const TermosECondicoes = () => {
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
            Termos e <span className="text-gradient-brand">Condições</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Estes Termos e Condições regulam o uso da plataforma Softeum — sistema SaaS
            de automação de pedidos com integração ao Gmail e a ERPs. Ao contratar ou
            utilizar o serviço, o usuário declara ter lido, compreendido e aceitado
            integralmente as condições abaixo.
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
              1. Definições
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Softeum:</strong> plataforma SaaS de
                automação de pedidos comerciais recebidos por e-mail, disponibilizada por
                meio do site{" "}
                <a
                  href="https://www.softeum.com.br"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  www.softeum.com.br
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Usuário / Cliente:</strong> pessoa
                jurídica que contrata o serviço e os usuários por ela autorizados.
              </li>
              <li>
                <strong className="text-foreground">Plataforma:</strong> ambiente acessível
                em{" "}
                <a
                  href="https://pedidos.softeum.com.br"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  pedidos.softeum.com.br
                </a>{" "}
                e respectivas APIs.
              </li>
              <li>
                <strong className="text-foreground">Conteúdo do Cliente:</strong> dados,
                e-mails, anexos e pedidos enviados ou processados por meio da Plataforma.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              2. Aceitação e cadastro
            </h2>
            <p>
              O cadastro na Plataforma exige a aceitação destes Termos e Condições e da{" "}
              <Link
                to="/privacy-policy"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                Política de Privacidade
              </Link>
              . O usuário declara ter capacidade legal para contratar em nome da pessoa
              jurídica representada e responsabiliza-se pela veracidade das informações
              fornecidas.
            </p>
            <p className="mt-3">
              É proibido criar contas com dados falsos, compartilhar credenciais ou
              permitir o uso da conta por terceiros não autorizados. O Cliente é
              integralmente responsável por todas as ações praticadas a partir de sua conta.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              3. Uso da plataforma
            </h2>
            <p>
              O Softeum concede ao Cliente uma licença não exclusiva, intransferível e
              revogável de uso da Plataforma, limitada ao período da assinatura ativa e
              aos limites do plano contratado.
            </p>
            <p className="mt-3">É vedado ao usuário:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Utilizar a Plataforma para fins ilícitos, fraudulentos ou em violação a
                direitos de terceiros;
              </li>
              <li>
                Tentar acessar áreas restritas, contornar mecanismos de segurança ou
                realizar engenharia reversa do software;
              </li>
              <li>
                Sobrecarregar deliberadamente a infraestrutura (testes de carga não
                autorizados, scraping automatizado fora dos limites de API etc.);
              </li>
              <li>
                Revender, sublicenciar ou disponibilizar a Plataforma a terceiros sem
                autorização expressa por escrito do Softeum;
              </li>
              <li>
                Enviar conteúdo malicioso, malware, vírus ou qualquer rotina destinada a
                comprometer sistemas.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              4. Planos, pagamento e faturamento
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Os planos vigentes, preços e limites de uso são apresentados no site e
                podem variar conforme volume de pedidos processados, integrações ativas e
                número de usuários.
              </li>
              <li>
                A cobrança é recorrente (mensal ou anual) e processada via cartão de
                crédito, boleto ou Pix, conforme opção do Cliente.
              </li>
              <li>
                Os valores são em reais (R$) e podem sofrer reajuste anual com base no
                IPCA acumulado ou em índice equivalente, mediante comunicação prévia de 30
                dias.
              </li>
              <li>
                O não pagamento implica suspensão do acesso após 5 dias de atraso e
                cancelamento automático após 30 dias, sem prejuízo da cobrança dos valores
                em aberto.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              5. Cancelamento e rescisão
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                O Cliente pode cancelar sua assinatura a qualquer momento pela própria
                Plataforma ou pelo e-mail{" "}
                <a
                  href="mailto:comercial@softeum.com.br"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  comercial@softeum.com.br
                </a>
                . O cancelamento produz efeitos ao final do ciclo de cobrança vigente.
              </li>
              <li>
                Em planos anuais com desconto, o cancelamento antecipado não gera direito
                a reembolso proporcional, salvo previsão contratual em contrário.
              </li>
              <li>
                Após o encerramento, o Cliente terá 30 dias para exportar seus dados.
                Findo esse prazo, os dados poderão ser eliminados em definitivo, conforme
                a{" "}
                <Link
                  to="/privacy-policy"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  Política de Privacidade
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              6. Responsabilidades e limitação de responsabilidade
            </h2>
            <p>
              O Softeum compromete-se a envidar seus melhores esforços para manter a
              Plataforma disponível, segura e funcional, com SLA mínimo de 99,5% mensal,
              excluídos períodos de manutenção programada e eventos de força maior.
            </p>
            <p className="mt-3">
              No limite máximo permitido pela legislação, o Softeum não responde por
              lucros cessantes, perda de oportunidades comerciais, danos indiretos ou
              consequenciais. A responsabilidade total do Softeum fica limitada ao valor
              efetivamente pago pelo Cliente nos 12 meses anteriores ao evento que
              originou a reclamação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              7. Propriedade intelectual
            </h2>
            <p>
              Todos os direitos sobre a Plataforma, código-fonte, marca, identidade
              visual, documentação e modelos de IA são de titularidade exclusiva do
              Softeum, protegidos pela legislação brasileira de propriedade intelectual.
            </p>
            <p className="mt-3">
              O Cliente preserva todos os direitos sobre o Conteúdo do Cliente e concede
              ao Softeum licença limitada e não exclusiva para processar esse conteúdo
              exclusivamente para fins de prestação do serviço.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              8. Alterações dos Termos
            </h2>
            <p>
              O Softeum pode atualizar estes Termos e Condições para refletir mudanças
              legais, técnicas ou comerciais. Alterações materiais serão comunicadas ao
              Cliente por e-mail com antecedência mínima de 15 dias. A continuidade de
              uso após esse prazo implica aceitação da nova versão.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              9. Lei aplicável e foro
            </h2>
            <p>
              Estes Termos e Condições são regidos pelas leis da República Federativa do
              Brasil. Fica eleito o foro da comarca da sede do Softeum para dirimir
              quaisquer controvérsias, com renúncia a qualquer outro foro.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              10. Contato
            </h2>
            <p>
              Dúvidas sobre estes Termos e Condições podem ser enviadas para{" "}
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
              e a{" "}
              <Link
                to="/politica-de-cookies"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                Política de Cookies
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

export default TermosECondicoes;
