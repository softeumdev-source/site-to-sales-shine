# Site institucional Softeum

Site em React + Vite (deploy na Vercel) com as funções serverless em `api/`.

## Variáveis de ambiente

Configure todas em **Vercel > Settings > Environment Variables** (Production,
Preview e Development) e refaça o deploy. Localmente, crie um `.env` a partir do
`.env.example`.

| Variável | Onde é usada | Para quê |
|---|---|---|
| `RESEND_API_KEY` | `api/send-demo.ts`, `api/send-ticket.ts` | Envio dos e-mails (demo e chamados). |
| `VITE_SUPABASE_URL` | navegador (aba de suporte) | Login do suporte com a conta da plataforma. |
| `VITE_SUPABASE_ANON_KEY` | navegador (aba de suporte) | Chave pública do projeto Supabase (a mesma da plataforma). |
| `SUPABASE_URL` | `api/send-ticket.ts`, `api/health.ts` | Validação do token e registro do chamado no banco. |
| `SUPABASE_ANON_KEY` | `api/send-ticket.ts`, `api/health.ts` | Idem — a função usa a chave pública + o token do usuário (o RLS é quem manda). |

As variáveis do Supabase apontam para o **mesmo projeto da plataforma de
pedidos**: é isso que faz o cliente entrar na aba de suporte com o e-mail e a
senha que ele já usa. As `SUPABASE_*` (sem prefixo) podem ser omitidas — as
funções caem para as `VITE_*` —, mas o ideal é configurar as duas formas.

Nada de `service_role` aqui: o site só usa a chave anônima; quem limita o acesso
é o RLS do banco.

## Aba de suporte (`/suporte`)

1. O cliente entra com o login da plataforma (Supabase Auth).
2. Abre o chamado, com até 3 prints/PDFs anexados.
3. `api/send-ticket` valida o token, registra o chamado pela RPC
   `abrir_chamado` (tabela `chamados`, repositório `softeum-orders`) e envia o
   e-mail para o suporte com os anexos + a confirmação com o protocolo para quem
   abriu.
4. O histórico da empresa aparece em "Meus chamados", lido direto da tabela com
   RLS por tenant.

Sem login não há chamado pelo site: é assim que sabemos de qual empresa e de
qual responsável veio cada pedido de ajuda. Quem ainda não é cliente é
direcionado para `comercial@softeum.com.br`.

## Diagnóstico

`GET /api/health` responde o estado da chave da Resend, do domínio remetente e
da configuração do Supabase — sem devolver nenhuma chave.

## Scripts

```sh
npm install
npm run dev      # ambiente local
npm run lint
npm run test     # vitest
npm run build
```
