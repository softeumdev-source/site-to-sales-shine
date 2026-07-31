import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const LAST_UPDATE = "13 de maio de 2026";

const PrivacyPolicy = () => {
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
            Política de <span className="text-gradient-brand">Privacidade</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Esta Política descreve como o Softeum coleta, utiliza, armazena e protege as
            informações dos usuários da plataforma, em conformidade com a Lei Geral de
            Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD) e com as políticas
            do Google para acesso a dados do Gmail.
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
              1. Quem somos
            </h2>
            <p>
              O Softeum é uma plataforma SaaS brasileira que automatiza o processamento de
              pedidos comerciais recebidos por e-mail, transformando arquivos (PDF, imagens
              e texto) em pedidos estruturados prontos para o ERP do cliente. Esta Política
              aplica-se ao site{" "}
              <a
                href="https://www.softeum.com.br"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                www.softeum.com.br
              </a>
              , à plataforma{" "}
              <a
                href="https://pedidos.softeum.com.br"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                pedidos.softeum.com.br
              </a>{" "}
              e a todos os serviços relacionados.
            </p>
            <p className="mt-3">
              Para fins da LGPD, o Softeum atua como <strong className="text-foreground">Controlador</strong> dos
              dados de cadastro de seus usuários e como <strong className="text-foreground">Operador</strong> dos
              dados pessoais contidos nos pedidos processados em nome do cliente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              2. Dados que coletamos
            </h2>
            <p>Coletamos apenas o estritamente necessário para a prestação do serviço:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Dados cadastrais:</strong> nome, e-mail
                corporativo, telefone, empresa, CNPJ e cargo, informados no momento do
                cadastro ou em formulários do site.
              </li>
              <li>
                <strong className="text-foreground">Dados de autenticação:</strong> credenciais
                de acesso à plataforma e tokens OAuth emitidos pelo Google quando o usuário
                conecta sua conta Gmail.
              </li>
              <li>
                <strong className="text-foreground">Dados de pedidos:</strong> conteúdo de
                e-mails, anexos (PDFs, imagens, planilhas) e metadados (remetente, assunto,
                data) necessários para extrair os itens do pedido.
              </li>
              <li>
                <strong className="text-foreground">Dados de uso:</strong> registros de
                acesso, endereço IP, tipo de navegador, páginas visitadas e ações realizadas
                na plataforma, usados para segurança e melhoria do produto.
              </li>
              <li>
                <strong className="text-foreground">Dados de pagamento:</strong> processados
                exclusivamente por gateways certificados (Stripe, Asaas ou equivalentes). O
                Softeum não armazena dados completos de cartão de crédito.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              3. Uso de dados do Gmail via OAuth Google
            </h2>
            <p>
              A funcionalidade central do Softeum depende da leitura, classificação e
              extração de conteúdo de e-mails de pedidos recebidos na caixa de entrada do
              usuário. Para isso, solicitamos autorização via{" "}
              <strong className="text-foreground">Google OAuth 2.0</strong>, com os escopos
              estritamente necessários (<code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">gmail.readonly</code>{" "}
              e/ou <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">gmail.modify</code>{" "}
              quando o usuário opta por marcar mensagens como lidas).
            </p>
            <p className="mt-3">
              <strong className="text-foreground">O uso e a transferência das informações
              recebidas das APIs do Google pelo Softeum aderem à{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground/80"
              >
                Google API Services User Data Policy
              </a>
              , incluindo os requisitos de Uso Limitado (Limited Use).</strong>
            </p>
            <p className="mt-3">Em particular, declaramos que:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Não utilizamos dados do Gmail para exibir, vender ou direcionar publicidade.
              </li>
              <li>
                Não permitimos que humanos leiam os e-mails do usuário, salvo (i) com
                consentimento explícito do usuário, (ii) para fins de segurança (ex.:
                investigação de abuso), (iii) para cumprimento de obrigação legal ou (iv)
                quando os dados estiverem agregados e anonimizados para uso interno.
              </li>
              <li>
                Não transferimos dados do Gmail a terceiros, exceto quando necessário para
                prestar o próprio serviço (ex.: provedores de infraestrutura), para cumprir
                lei aplicável ou mediante autorização expressa do usuário.
              </li>
              <li>
                Não usamos dados do Gmail para treinar modelos de IA generalistas. Modelos
                de extração utilizados internamente são aplicados <em>sobre</em> o conteúdo
                apenas para gerar o pedido estruturado solicitado pelo cliente.
              </li>
            </ul>
            <p className="mt-3">
              O usuário pode revogar o acesso a qualquer momento em{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                myaccount.google.com/permissions
              </a>{" "}
              ou diretamente na área de integrações da plataforma Softeum.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              4. Como armazenamos os dados
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Os dados são armazenados em servidores em nuvem localizados em datacenters
                com certificações ISO 27001 e SOC 2, com backups criptografados.
              </li>
              <li>
                Comunicações são protegidas por TLS 1.2 ou superior. Dados sensíveis em
                repouso são criptografados com AES-256.
              </li>
              <li>
                Tokens OAuth do Google são armazenados criptografados e nunca expostos no
                lado do cliente.
              </li>
              <li>
                Conteúdo de e-mails e anexos é retido apenas pelo período necessário para
                processar o pedido e atender exigências fiscais ou contratuais, sendo
                eliminado conforme política interna de retenção (padrão: 12 meses,
                configurável pelo cliente).
              </li>
              <li>
                O acesso aos dados é restrito por controle de identidade, registro de
                auditoria e princípio do menor privilégio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              5. Compartilhamento de dados
            </h2>
            <p>
              O Softeum não vende dados pessoais. Compartilhamos dados apenas com:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Provedores de infraestrutura</strong> (ex.:
                Vercel, AWS, Google Cloud) responsáveis por hospedagem, banco de dados e
                envio de e-mails transacionais.
              </li>
              <li>
                <strong className="text-foreground">Provedores de pagamento</strong> para
                processamento de assinaturas e emissão de notas fiscais.
              </li>
              <li>
                <strong className="text-foreground">ERPs e sistemas do próprio cliente</strong>{" "}
                conectados via API, conforme integrações configuradas pelo usuário.
              </li>
              <li>
                <strong className="text-foreground">Autoridades públicas</strong>, quando
                exigido por lei, ordem judicial ou requisição administrativa legítima.
              </li>
            </ul>
            <p className="mt-3">
              Todos os subprocessadores estão sujeitos a contratos com cláusulas de
              confidencialidade e proteção de dados compatíveis com a LGPD.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              6. Cookies e tecnologias semelhantes
            </h2>
            <p>
              Utilizamos cookies essenciais para manter a sessão do usuário e cookies
              analíticos para entender o uso do site (ex.: Google Analytics, em modo
              anonimizado). O usuário pode bloquear cookies não essenciais nas
              configurações do navegador, sem prejuízo da funcionalidade básica da
              plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              7. Seus direitos como titular (LGPD)
            </h2>
            <p>
              Em conformidade com o Capítulo III da LGPD, o titular dos dados pode, a
              qualquer momento, exercer os seguintes direitos:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos dados pessoais tratados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>
                Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou
                tratados em desconformidade com a lei;
              </li>
              <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
              <li>
                Eliminação dos dados pessoais tratados com base no consentimento, exceto
                nas hipóteses legais de guarda obrigatória;
              </li>
              <li>
                Informação sobre entidades públicas e privadas com as quais houve
                compartilhamento;
              </li>
              <li>
                Revogação do consentimento, a qualquer momento, mediante manifestação
                expressa;
              </li>
              <li>
                Oposição a tratamento realizado com fundamento em hipóteses legais distintas
                do consentimento, em caso de descumprimento da LGPD.
              </li>
            </ul>
            <p className="mt-3">
              Os pedidos podem ser feitos pelo e-mail{" "}
              <a
                href="mailto:comercial@softeum.com.br"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                comercial@softeum.com.br
              </a>
              . Responderemos em até 15 dias corridos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              8. Segurança da informação
            </h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger os dados contra
              acessos não autorizados, perda, alteração ou destruição. Em caso de incidente
              de segurança que possa acarretar risco ou dano relevante aos titulares,
              comunicaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares
              afetados, conforme o art. 48 da LGPD.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              9. Transferência internacional
            </h2>
            <p>
              Alguns provedores de infraestrutura podem processar dados em servidores
              localizados fora do Brasil. Nesses casos, garantimos que o destinatário
              oferece grau de proteção compatível com a LGPD, mediante cláusulas
              contratuais padrão ou outros mecanismos previstos no art. 33 da LGPD.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              10. Encarregado pelo Tratamento de Dados (DPO)
            </h2>
            <p>
              Em cumprimento ao art. 41 da LGPD, o Softeum mantém um Encarregado pelo
              Tratamento de Dados, que pode ser contatado pelo e-mail{" "}
              <a
                href="mailto:comercial@softeum.com.br"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                comercial@softeum.com.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              11. Alterações desta Política
            </h2>
            <p>
              Esta Política pode ser atualizada periodicamente para refletir mudanças
              legais, técnicas ou operacionais. A versão vigente estará sempre disponível
              em{" "}
              <a
                href="https://www.softeum.com.br/privacy-policy"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                www.softeum.com.br/privacy-policy
              </a>
              . Alterações materiais serão comunicadas por e-mail aos usuários ativos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
              12. Contato
            </h2>
            <p>
              Dúvidas sobre esta Política podem ser enviadas para{" "}
              <a
                href="mailto:comercial@softeum.com.br"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                comercial@softeum.com.br
              </a>
              . Consulte também os nossos{" "}
              <Link
                to="/terms"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                Termos de Uso
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

export default PrivacyPolicy;
