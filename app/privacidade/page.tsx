import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Softeum',
  description: 'Política de Privacidade da Softeum Tecnologia. Saiba como coletamos, usamos e protegemos seus dados pessoais.',
}

const sections = [
  {
    title: '1. Quem somos',
    content: `A Softeum Tecnologia é uma empresa de software de gestão empresarial, com sede no Brasil. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos as informações pessoais dos usuários de nossos produtos e do nosso site.

Para dúvidas sobre esta política, entre em contato pelo e-mail: comercial@softeum.com.br`,
  },
  {
    title: '2. Dados que coletamos',
    content: `Podemos coletar as seguintes categorias de dados pessoais:

• Dados de identificação: nome, cargo e empresa.
• Dados de contato: e-mail, telefone e endereço.
• Dados de uso: informações sobre como você utiliza nossas plataformas, como páginas acessadas, funcionalidades utilizadas e horários de acesso.
• Dados técnicos: endereço IP, tipo de navegador, sistema operacional e identificadores de dispositivo.
• Dados fornecidos voluntariamente: mensagens enviadas por formulários de contato, solicitações de demonstração e comunicações por e-mail ou WhatsApp.`,
  },
  {
    title: '3. Como usamos seus dados',
    content: `Utilizamos os dados pessoais coletados para as seguintes finalidades:

• Prestar e aprimorar nossos produtos e serviços.
• Responder a solicitações, dúvidas e pedidos de suporte.
• Enviar comunicações relevantes sobre produtos, atualizações e eventos, desde que você tenha consentido.
• Cumprir obrigações legais e regulatórias.
• Proteger a segurança de nossas plataformas e dos dados dos usuários.
• Realizar análises internas para melhorar a experiência do usuário.`,
  },
  {
    title: '4. Base legal para o tratamento',
    content: `O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses previstas na Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018):

• Consentimento: quando você aceita expressamente o uso dos seus dados.
• Execução de contrato: quando o tratamento é necessário para a prestação dos serviços contratados.
• Legítimo interesse: para melhorias internas, segurança e prevenção a fraudes.
• Cumprimento de obrigação legal: quando exigido por legislação aplicável.`,
  },
  {
    title: '5. Compartilhamento de dados',
    content: `Não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações com:

• Prestadores de serviços contratados para operação das plataformas (ex: hospedagem em nuvem, ferramentas de e-mail), que atuam sob acordo de confidencialidade e conforme a LGPD.
• Autoridades públicas, quando exigido por lei ou ordem judicial.
• Parceiros de negócios, somente com seu consentimento prévio e expresso.`,
  },
  {
    title: '6. Armazenamento e segurança',
    content: `Seus dados são armazenados em servidores seguros, com controles de acesso, criptografia e monitoramento contínuo. Adotamos medidas técnicas e organizacionais adequadas para proteger as informações contra acesso não autorizado, perda, alteração ou divulgação indevida.

Os dados são mantidos pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei.`,
  },
  {
    title: '7. Seus direitos como titular',
    content: `Nos termos da LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:

• Confirmação e acesso: saber se tratamos seus dados e ter acesso a eles.
• Correção: solicitar a correção de dados incompletos, inexatos ou desatualizados.
• Anonimização, bloqueio ou eliminação: solicitar a anonimização, bloqueio ou exclusão de dados desnecessários ou tratados em desconformidade com a lei.
• Portabilidade: solicitar a portabilidade dos seus dados a outro fornecedor de serviço.
• Revogação do consentimento: retirar seu consentimento a qualquer momento.
• Informação sobre compartilhamento: saber com quais entidades seus dados foram compartilhados.

Para exercer qualquer desses direitos, envie uma solicitação para: comercial@softeum.com.br`,
  },
  {
    title: '8. Cookies e tecnologias semelhantes',
    content: `Utilizamos cookies e tecnologias similares para melhorar a experiência de navegação, analisar o tráfego e personalizar conteúdo. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade de algumas páginas.`,
  },
  {
    title: '9. Transferência internacional de dados',
    content: `Caso seus dados sejam transferidos para outros países, garantimos que a transferência ocorra em conformidade com a LGPD, adotando cláusulas contratuais padrão ou outras salvaguardas adequadas.`,
  },
  {
    title: '10. Alterações nesta política',
    content: `Esta Política de Privacidade pode ser atualizada periodicamente. Comunicaremos alterações relevantes por meio dos nossos canais de contato ou pelo site. A data da última atualização está indicada no rodapé desta página.`,
  },
  {
    title: '11. Contato e Encarregado (DPO)',
    content: `Em caso de dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados pessoais, entre em contato com nosso Encarregado de Dados (DPO):

E-mail: comercial@softeum.com.br
WhatsApp: (47) 9 9659-2551`,
  },
]

export default function PrivacidadePage() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">
          Softeum Tecnologia
        </p>
        <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
          Política de Privacidade
        </h1>
        <p className="text-white/35 text-sm mb-12">
          Última atualização: junho de 2025
        </p>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-white/[0.06] pt-8">
              <h2 className="text-lg font-bold text-white mb-4 tracking-tight">{s.title}</h2>
              <div className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
                {s.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center">
          <p className="text-white/40 text-sm">
            Dúvidas sobre esta política? Entre em contato:{' '}
            <a href="mailto:comercial@softeum.com.br" className="text-white/70 hover:text-white transition-colors underline underline-offset-2">
              comercial@softeum.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
