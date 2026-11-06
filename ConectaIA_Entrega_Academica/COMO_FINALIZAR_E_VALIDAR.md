# Como finalizar a validação no computador da equipe

## Preparação
1. Extraia a pasta `ConectaIA_Entrega_Academica` do ZIP.
2. Abra PowerShell dentro de `06_APP/ConectaIA_Proto1`.
3. Confira Node e npm: `node --version` e `npm.cmd --version`.
4. Execute `npm.cmd ci`. Se falhar por rede, tente outra conexão e repita; não apague o `package-lock.json`.
5. Copie `.env.example` para `.env` e preencha `GEMINI_API_KEY` localmente. Não compartilhe esse arquivo.

## Testes
Terminal 1: `npm.cmd run api`  
Terminal 2: `npm.cmd run dev`  
Abra a URL local informada pelo Vite. Em outro terminal, execute `npm.cmd test` e `npm.cmd run build`.

Teste com chave: envie uma pergunta simples e confirme que a resposta veio do serviço Gemini. Teste sem chave: pare o servidor ou remova a variável local e confirme que a interface mostra resposta de contingência, sem travar.

## Entrega das evidências
Preencha `04_TESTES_E_VALIDACAO/Registro_Execucao_Tecnica.xlsx`, execute o roteiro `03_USUARIO/ROTEIRO_NOVA_VALIDACAO.md` e atualize a planilha `03_USUARIO/TESTES_USUARIOS.xlsx` apenas com dados coletados. Anexe capturas sem credenciais ou dados pessoais.
