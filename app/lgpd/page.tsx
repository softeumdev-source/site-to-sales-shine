import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LGPD | Softeum',
  description: 'Compromisso da Softeum com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Transparência e segurança no tratamento de dados pessoais.',
}

const sections = [
  {
    title: 'O que é a LGPD?',
    content: `A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709, de 14 de agosto de 2018, é a legislação brasileira que regula as atividades de tratamento de dados pessoais, com o objetivo de proteger os direitos fundamentais de liberdade, privacidade e o livre desenvolvimento da personalidade da pessoa natural.

A LGPD se aplica a qualquer operação de tratamento realizada por pessoa natural ou jurídica — de direito público ou privado — independentemente do meio, do país de sua sede ou do país onde estejam localizados os dados, desde que o tratamento seja realizado no território nacional ou tenha como objetivo a oferta de bens ou serviços a pessoas no Brasil.`,
  },
  {
    title: 'Compromisso da Softeum com a LGPD',
    content: `A Softeum está comprometida com a conformidade plena à LGPD. Adotamos as seguintes medidas:

• Mapeamento de dados: identificamos e documentamos todos os fluxos de dados pessoais em nossas plataformas e processos internos.
• Bases legais: todo tratamento de dados é realizado com base em hipótese legal prevista na LGPD (consentimento, execução de contrato, legítimo interesse, entre outras).
• Minimização de dados: coletamos apenas os dados estritamente necessários para as finalidades declaradas.
• Segurança da informação: adotamos medidas técnicas e administrativas para proteger os dados pessoais.
• Encarregado de Dados (DPO): designamos um responsável pelo tratamento e pela comunicação com titulares e com a Autoridade Nacional de Proteção de Dados (ANPD).`,
  },
  {
    title: 'Princípios do tratamento de dados',
    content: `O tratamento de dados pessoais pela Softeum observa os seguintes princípios estabelecidos pelo Art. 6º da LGPD:

• Finalidade: tratamento realizado para propósitos legítimos, específicos, explícitos e informados ao titular.
• Adequação: compatibilidade do tratamento com as finalidades informadas ao titular.
• Necessidade: limitação ao mínimo necessário para a realização das finalidades.
• Livre acesso: garantia ao titular de consulta facilitada e gratuita sobre a forma e a duração do tratamento.
• Qualidade dos dados: exatidão, clareza, relevância e atualização dos dados.
• Transparência: informações claras, precisas e acessíveis sobre o tratamento.
• Segurança: adoção de medidas técnicas e administrativas para proteção dos dados.
• Prevenção: adoção de medidas para prevenir a ocorrência de danos.
• Não discriminação: impossibilidade de tratamento para fins discriminatórios ilícitos ou abusivos.
• Responsabilização e prestação de contas: demonstração da adoção de medidas eficazes de conformidade.`,
  },
  {
    title: 'Direitos dos titulares de dados',
    content: `Conforme o Art. 18 da LGPD, você, como titular de dados pessoais, tem direito a:

I. Confirmação da existência de tratamento.
II. Acesso aos dados.
III. Correção de dados incompletos, inexatos ou desatualizados.
IV. Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei.
V. Portabilidade dos dados a outro fornecedor de serviço ou produto.
VI. Eliminação dos dados pessoais tratados com o consentimento do titular.
VII. Informação das entidades públicas e privadas com as quais o controlador realizou uso compartilhado de dados.
VIII. Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa.
IX. Revogação do consentimento.

Para exercer qualquer desses direitos, envie uma solicitação para: comercial@softeum.com.br`,
  },
  {
    title: 'Encarregado de Dados (DPO)',
    content: `A Softeum designou um Encarregado pelo Tratamento de Dados Pessoais (DPO — Data Protection Officer), conforme exigido pelo Art. 41 da LGPD. O DPO é o canal de comunicação entre a Softeum, os titulares de dados e a Autoridade Nacional de Proteção de Dados (ANPD).

Contato do DPO:
E-mail: comercial@softeum.com.br
WhatsApp: (47) 9 9659-2551`,
  },
  {
    title: 'Incidentes de segurança',
    content: `Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, a Softeum cumprirá os procedimentos de notificação previstos no Art. 48 da LGPD, comunicando o incidente à ANPD e, quando necessário, aos titulares afetados, dentro dos prazos legalmente estabelecidos.`,
  },
  {
    title: 'Autoridade Nacional de Proteção de Dados (ANPD)',
    content: `A ANPD é o órgão da administração pública responsável por zelar pela proteção de dados pessoais e por regular, implementar e fiscalizar o cumprimento da LGPD no Brasil.

Caso você entenda que seus direitos não foram atendidos pela Softeum, você pode apresentar reclamação à ANPD pelo site oficial: www.gov.br/anpd`,
  },
  {
    title: 'Vigência e atualizações',
    content: `Este documento pode ser atualizado periodicamente para refletir mudanças na legislação, em nossas práticas de tratamento de dados ou em orientações da ANPD. A data de última atualização está indicada abaixo. Recomendamos a consulta regular a esta página.`,
  },
]

export default function LgpdPage() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-4">
          Softeum Tecnologia
        </p>
        <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
          Conformidade com a LGPD
        </h1>
        <p className="text-white/35 text-sm mb-4">
          Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais
        </p>
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
            Dúvidas sobre privacidade ou seus direitos como titular?{' '}
            <a href="mailto:comercial@softeum.com.br" className="text-white/70 hover:text-white transition-colors underline underline-offset-2">
              comercial@softeum.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
