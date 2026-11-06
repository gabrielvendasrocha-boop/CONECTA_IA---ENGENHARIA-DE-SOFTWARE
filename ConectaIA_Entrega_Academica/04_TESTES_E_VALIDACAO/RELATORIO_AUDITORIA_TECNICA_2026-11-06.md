# Relatório de auditoria técnica — CONECTA.IA

**Data da verificação:** 06/11/2026  
**Escopo:** pacote `ConectaIA_Entrega_Final_Auditada.zip`, código-fonte, documentação, testes e segurança de credenciais.

## 1. Resultado executivo

A entrega contém uma aplicação React/TypeScript com servidor Node local, documentação de requisitos/modelagem, relatório acadêmico, plano de testes e roteiro para nova validação com usuários. Foram executados os testes automatizados do servidor: **7 aprovados, 0 falhas**. O servidor usa a chave no lado servidor e a chamada ao Google foi ajustada para enviar a chave no cabeçalho `x-goog-api-key`, evitando incluí-la na URL.

**Não é correto declarar o projeto 100% validado:** o build Vite completo, integração real Gemini, testes em navegador/dispositivos e sessões reais com participantes não foram concluídos nesta auditoria.

## 2. Evidências executadas

| Verificação | Resultado | Evidência/limite |
|---|---|---|
| `node --test server/*.test.mjs` | Aprovado | 7/7 testes; execução local em Node 22.16.0 |
| Verificação TypeScript (`tsc -b`) | Aprovada nesta tentativa | Executada com dependências recuperadas do pacote original; sem erros TypeScript antes da etapa Vite |
| Build Vite | Não concluído | Falta o binário nativo Linux do Rollup no `node_modules` recuperado; instalação limpa excedeu o tempo limite de rede |
| Endpoint de saúde | Coberto por teste | Retorna estado sem expor chave |
| Integração Gemini real | Pendente | Requer chave válida, quota e acesso externo; nenhuma chave foi fornecida à auditoria |
| Validação com usuários | Pendente | Roteiro e planilha disponibilizados; não foram inventadas sessões ou resultados |
| Git/PR/Code Review da equipe | Não comprovado | Exige histórico real do repositório e participação da equipe |

## 3. Correções aplicadas nesta cópia

1. Mantida a credencial Gemini no servidor, sem variável `VITE_`.
2. Alterada a autenticação da chamada REST para o cabeçalho `x-goog-api-key` em vez de parâmetro na URL.
3. Mantido `.env.example` com valor fictício e `.gitignore` excluindo `.env`, dependências e artefatos de build.
4. Incluído roteiro de validação com participantes, consentimento, minimização de dados e campos para resultados reais.
5. Atualizada a documentação do servidor, execução e limites de validação.

## 4. Segurança e privacidade

O pacote original continha um arquivo `.env` com uma credencial preenchida. Por precaução, tratar essa credencial como exposta e revogá-la no Google AI Studio/Google Cloud. A nova credencial deve ser criada pelo responsável e armazenada apenas no `.env` local, nunca compartilhada em chat, documentos, prints ou repositório.

O protótipo é local e acadêmico. O controle de frequência em memória e a validação de origem não equivalem a uma arquitetura pronta para produção pública. Antes de publicar, será necessário revisar autenticação, limitação distribuída, gestão de segredos, logs, política de privacidade, proteção contra abuso e hospedagem HTTPS.

## 5. Pendências objetivas para fechar a validação

- [ ] Revogar chave anterior que constava no pacote original.
- [ ] Criar chave nova e configurar `.env` local.
- [ ] Executar `npm ci` em rede funcional e `npm run build` sem erros.
- [ ] Iniciar API e frontend; testar `/api/health` e uma conversa real com Gemini.
- [ ] Testar respostas de contingência sem chave e quando a API estiver indisponível.
- [ ] Testar Chrome/Edge e pelo menos um dispositivo móvel.
- [ ] Verificar navegação por teclado, foco visível, contraste, zoom, leitores de tela e alternativas de voz; registrar resultados.
- [ ] Realizar sessões com usuários voluntários usando o roteiro; anexar dados anonimizados e consentimentos.
- [ ] Registrar issues, correções e retestes; obter commits, branches, PRs e revisão real da equipe.
- [ ] Fazer retrospectiva com data, participantes, pontos positivos, problemas e ações acordadas.
- [ ] Conferir dados de capa, identificação acadêmica, enunciado oficial e eventuais exercícios oficiais antes da submissão.

## 6. Fontes técnicas externas consultadas

- Google AI for Developers, documentação de modelos Gemini: https://ai.google.dev/gemini-api/docs/models (consulta em 06/11/2026).
- Google AI for Developers, documentação da API e migração: https://ai.google.dev/gemini-api/docs/migrate-to-cloud (consulta em 06/11/2026).

## 7. Declaração de integridade

Este relatório registra somente verificações executadas e pendências identificadas. Não declara aprovação acadêmica, acessibilidade certificada, integração externa funcional, teste com usuários realizado ou colaboração Git comprovada quando tais evidências não estão disponíveis.
