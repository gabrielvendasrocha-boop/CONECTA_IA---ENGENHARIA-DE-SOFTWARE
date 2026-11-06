# ConectaIA — protótipo acadêmico revisado

Aplicação web educativa para apoiar pessoas idosas e iniciantes digitais. A versão mantém a interface React/TypeScript, as trilhas, recursos de acessibilidade, voz do navegador e respostas locais de contingência. A integração Gemini, quando configurada, passa por um servidor Node separado: a chave **não é enviada ao navegador**.

## Requisitos
- Node.js 20 ou superior (recomendado LTS).
- npm.
- Navegador atualizado.
- Para respostas generativas: chave Gemini válida e acesso à internet. Sem chave, o chat permanece em modo de contingência local.

## Instalação no Windows (PowerShell)
Na pasta `06_APP/ConectaIA_Proto1`:

```powershell
npm.cmd ci
Copy-Item .env.example .env
notepad .env
```

Preencha `GEMINI_API_KEY` no `.env` local. Não use `VITE_` no nome da variável e não envie o `.env` ao Git. O modelo padrão é `gemini-3.8-flash`, conferido na documentação oficial do Google em 06/11/2026; pode ser alterado em `GEMINI_MODEL` conforme disponibilidade da conta/API.

## Executar (duas janelas do terminal)
Terminal 1 — servidor de API:
```powershell
npm.cmd run api
```

Terminal 2 — interface web:
```powershell
npm.cmd run dev
```

Abra a URL informada pelo Vite (normalmente `http://localhost:5173`). O Vite encaminha `/api` para `http://127.0.0.1:3001`. O servidor Node escuta somente no loopback para uso local.

## Verificações
```powershell
npm.cmd test
npm.cmd run build
```
`npm test` executa testes unitários nativos do Node para validação de payload, limite de entrada, transformação do histórico e extração da resposta Gemini. `npm run build` verifica TypeScript e gera `dist/`.

## Segurança e limites
- A chave fica em `GEMINI_API_KEY` no servidor, nunca em variável `VITE_`; a requisição ao Google envia a credencial no cabeçalho `x-goog-api-key`, não na URL.
- O `.env` é ignorado pelo Git; `.env.example` contém somente valores fictícios.
- O servidor valida entradas, limita o corpo, limita solicitações por IP e aplica timeout.
- A limitação por IP é adequada apenas ao protótipo local; não substitui autenticação, proteção antiabuso, gestão de segredos e monitoramento para publicação pública.
- Se a chave não estiver configurada ou o serviço falhar, a interface usa respostas locais. Elas não são respostas geradas por IA e devem ser apresentadas como contingência.
- Não há login, banco de dados, persistência de histórico nem sincronização entre dispositivos.
- Reconhecimento e síntese de voz dependem do navegador, permissões, sistema operacional e, em alguns contextos, HTTPS.
- Não inserir senhas, códigos de autenticação, dados bancários ou outras informações sensíveis. O protótipo não é ferramenta médica, financeira ou de emergência.

## Estrutura relevante
```text
ConectaIA_Proto1/
├── server/
│   ├── index.mjs          # API local e proxy Gemini
│   ├── gemini.mjs         # validação e construção de payload
│   └── gemini.test.mjs    # testes automatizados
├── src/
│   ├── App.tsx
│   ├── services/gemini.ts # cliente /api/chat + fallback local
│   └── styles.css
├── .env.example
├── package.json
└── vite.config.ts
```

## Estado de validação desta entrega
- Testes automatizados do módulo de servidor: **7 aprovados** (`node --test server/*.test.mjs`).
- Endpoint de saúde local: **200 OK**, sem chave configurada (estado `aiConfigured: false`).
- Build React/TypeScript e testes em navegador: **não executados nesta estação**, porque a instalação limpa de dependências npm expirou por indisponibilidade/tempo de resposta do registry. Executar `npm.cmd ci` e `npm.cmd run build` no ambiente de entrega.
- Integração real com Gemini: **não testada**; depende de chave válida, acesso externo e limites da conta.
- Testes com participantes, WCAG formal, histórico Git/PRs e retrospectiva: **não são criados artificialmente**; anexar evidências reais da equipe.


## Evidências desta cópia auditada (06/11/2026)

- `npm test`: 7 testes do servidor aprovados nesta estação.
- `tsc -b`: passou quando executado com as dependências presentes no pacote antigo, antes da etapa Vite.
- `vite build`: não concluído nesta estação; o pacote antigo não continha o binário nativo Linux do Rollup (`@rollup/rollup-linux-x64-gnu`) e a instalação limpa (`npm ci`) excedeu o tempo limite de rede. Isso é uma limitação do ambiente de verificação, não evidência de defeito no código.
- Integração real Gemini, testes em navegador/dispositivos, acessibilidade formal e validação com participantes permanecem pendentes.
- A chave Gemini deve ser criada/rotacionada pelo responsável e configurada apenas no `.env` local.
