import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const LAST_UPDATE = "13 de maio de 2026";

const Terms = () => {
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
            Termos de <span className="text-gradient-brand">Uso</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Estes Termos regulam o uso da plataforma Softeum — sistema SaaS de gestão e
            automação de pedidos com integração ao Gmail e a ERPs. Ao contratar ou
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
                  href="https://plataforma.softeum.com.br"
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  plataforma.softeum.com.br
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
              O cadastro na Plataforma exige a aceitação destes Termos e da{" "}
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
              integralmente responsável por todas as ações praticadas a partir de sua
              conta.
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
              <li>
                Tributos aplicáveis serão destacados na nota fiscal e podem ser repassados
                ao Cliente conforme legislação vigente.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              5. Período de teste e garantia de satisfação
            </h2>
            <p>
              Eventuais períodos de teste gratuito (trial) e garantias de devolução serão
              divulgados na página de preços ou na proposta comercial. Salvo disposição
              específica, valores referentes a períodos já utilizados não são
              reembolsáveis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              6. Cancelamento e rescisão
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
                . O cancelamento produz efeitos ao final do ciclo de cobrança vigente, sem
                renovação automática para o ciclo seguinte.
              </li>
              <li>
                Em planos anuais com desconto, o cancelamento antecipado não gera direito
                a reembolso proporcional, salvo previsão contratual em contrário.
              </li>
              <li>
                O Softeum pode rescindir o contrato, suspender ou limitar o acesso em caso
                de descumprimento destes Termos, fraude, inadimplência ou uso abusivo,
                mediante comunicação prévia quando viável.
              </li>
              <li>
                Após o encerramento, o Cliente terá 30 dias para exportar seus dados.
                Findo esse prazo, os dados poderão ser eliminados em definitivo, conforme
                a Política de Privacidade.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              7. Integração com Gmail e serviços de terceiros
            </h2>
            <p>
              A integração com o Gmail é feita via Google OAuth 2.0 e está sujeita aos
              termos do Google. O Cliente reconhece que o Softeum não é responsável por
              indisponibilidades, alterações de API, suspensões ou políticas adotadas pelo
              Google ou por outros provedores integrados (ex.: ERPs, gateways de
              pagamento, serviços de mensageria).
            </p>
            <p className="mt-3">
              O Cliente autoriza expressamente o Softeum a ler, processar e transformar o
              conteúdo dos e-mails de pedidos para os fins descritos na Política de
              Privacidade.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              8. Responsabilidades do Cliente
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Garantir a precisão dos cadastros (produtos, clientes, regras fiscais)
                utilizados para validar pedidos;
              </li>
              <li>
                Conferir os pedidos extraídos antes de transmiti-los ao ERP ou ao
                faturamento;
              </li>
              <li>
                Manter atualizadas as credenciais de integrações e autorizações OAuth;
              </li>
              <li>
                Obter as bases legais necessárias junto a seus próprios clientes para o
                tratamento dos dados pessoais por eles fornecidos;
              </li>
              <li>
                Cumprir a legislação aplicável ao seu negócio (fiscal, consumerista,
                trabalhista, LGPD).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              9. Responsabilidades do Softeum e limitação
            </h2>
            <p>
              O Softeum compromete-se a envidar seus melhores esforços para manter a
              Plataforma disponível, segura e funcional, com SLA mínimo de 99,5% mensal,
              excluídos períodos de manutenção programada e eventos de força maior.
            </p>
            <p className="mt-3">
              No limite máximo permitido pela legislação, o Softeum não responde por
              lucros cessantes, perda de oportunidades comerciais, danos indiretos ou
              consequenciais. A responsabilidade total do Softeum, em qualquer hipótese,
              fica limitada ao valor efetivamente pago pelo Cliente nos 12 (doze) meses
              anteriores ao evento que originou a reclamação.
            </p>
            <p className="mt-3">
              A Plataforma é fornecida “no estado em que se encontra”. O Softeum não
              garante que a extração automática de pedidos será 100% precisa, sendo
              recomendada conferência humana antes do faturamento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              10. Propriedade intelectual
            </h2>
            <p>
              Todos os direitos sobre a Plataforma, código-fonte, marca, identidade
              visual, documentação, modelos de IA, fluxos e qualquer melhoria desenvolvida
              pelo Softeum são de sua titularidade exclusiva, protegidos pela Lei nº
              9.279/96, Lei nº 9.609/98, Lei nº 9.610/98 e demais normas aplicáveis.
            </p>
            <p className="mt-3">
              O Cliente preserva todos os direitos sobre o Conteúdo do Cliente. Para
              viabilizar a prestação do serviço, o Cliente concede ao Softeum uma licença
              limitada, não exclusiva e gratuita para hospedar, processar e exibir o
              Conteúdo do Cliente exclusivamente dentro da Plataforma e pelos prazos
              necessários à execução do serviço.
            </p>
            <p className="mt-3">
              Dados agregados e anonimizados poderão ser utilizados pelo Softeum para fins
              estatísticos, melhoria do produto e benchmarks de mercado, sem identificação
              do Cliente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              11. Confidencialidade
            </h2>
            <p>
              As partes comprometem-se a manter sigilo sobre informações confidenciais a
              que tiverem acesso em razão da relação contratual, durante toda a vigência e
              por 5 (cinco) anos após o seu encerramento, salvo informações de domínio
              público ou cuja divulgação seja exigida por lei.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              12. Alterações dos Termos
            </h2>
            <p>
              O Softeum pode atualizar estes Termos para refletir mudanças legais,
              técnicas ou comerciais. Alterações materiais serão comunicadas ao Cliente
              por e-mail e/ou pela própria Plataforma com antecedência mínima de 15 dias.
              A continuidade de uso após esse prazo implica aceitação da nova versão.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              13. Lei aplicável e foro
            </h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica
              eleito o foro da comarca da sede do Softeum para dirimir quaisquer
              controvérsias, com renúncia a qualquer outro, por mais privilegiado que
              seja.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              14. Contato
            </h2>
            <p>
              Dúvidas sobre estes Termos podem ser enviadas para{" "}
              <a
                href="mailto:juridico@softeum.com.br"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                juridico@softeum.com.br
              </a>
              . Para questões comerciais, escreva para{" "}
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

export default Terms;
