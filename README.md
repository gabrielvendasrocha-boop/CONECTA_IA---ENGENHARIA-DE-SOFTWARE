# ConectaIA

**ConectaIA: Guia Digital Inclusivo para o Uso Seguro e Consciente da Inteligência Artificial** é um protótipo acadêmico de aplicação web desenvolvido para aproximar a tecnologia do cotidiano de pessoas idosas e de quem deseja ganhar mais confiança no ambiente digital. A interface reúne explicações em linguagem simples, uma área de conversa, trilhas educativas e controles de acessibilidade.

## Objetivo

O projeto busca facilitar o primeiro contato com a inteligência artificial, apresentar exemplos de uso no dia a dia e incentivar hábitos de navegação mais seguros.

## Funcionalidades

### Conversa com a IA

A área de conversa permite enviar perguntas por texto e consultar respostas por meio de uma integração com a API do Google Gemini. O serviço tenta receber as respostas progressivamente e utiliza um conjunto de respostas locais como contingência quando as tentativas de comunicação com a API não retornam uma resposta válida.

As respostas locais são pré-programadas e escolhidas por palavras-chave. Elas não são geradas pelo Gemini. Entre os assuntos previstos estão cumprimentos, uso do celular, e-mail, inteligência artificial, prevenção de golpes e orientações gerais sobre saúde.

Na versão revisada, o modelo configurável padrão é `gemini-3.8-flash`, executado exclusivamente pelo servidor Node. A disponibilidade do modelo e o funcionamento da API dependem da conta e da chave configurada. Consulte a [documentação oficial de modelos](https://ai.google.dev/gemini-api/docs/models) antes de alterar o identificador.

### Trilhas de Sucesso

A área educativa reúne quatro temas:

- **Uso do celular:** orientações para conhecer recursos e configurações do aparelho.
- **Assistentes digitais:** introdução à interação com assistentes e ferramentas de inteligência artificial.
- **Mensagens e chamadas:** dicas para se comunicar com familiares e outras pessoas.
- **Segurança na internet:** recomendações para reconhecer situações suspeitas e adotar hábitos digitais mais seguros.

### Sobre a IA

Apresenta explicações introdutórias sobre inteligência artificial e exemplos de tarefas cotidianas em que ferramentas digitais podem ajudar.

### Acessibilidade

A interface oferece controles de escala visual entre 90% e 130%, em incrementos de 10%, ativação de alto contraste e opções de velocidade para leitura em voz alta. Também há uma opção para restaurar os controles aos valores padrão. A escala visual afeta a página como um todo, e não apenas o tamanho das letras.

### Recursos de voz

Em navegadores compatíveis, o reconhecimento de fala permite preencher a pergunta por voz. A leitura em voz alta usa a síntese de fala do navegador. Estão previstos os modos de velocidade lenta, normal e rápida. Os recursos dependem do navegador, das permissões concedidas e dos recursos de áudio do dispositivo; a digitação continua disponível como alternativa.

### Ajuda e orientação

A área de ajuda apresenta orientações para encontrar os principais recursos, iniciar uma conversa, acessar as trilhas e ajustar a acessibilidade. Ela não aciona serviços de emergência nem envia mensagens a terceiros.

## Tecnologias utilizadas

As dependências declaradas no `package.json` incluem:

- **React** (`^18.3.1`) e **React DOM** (`^18.3.1`) para a interface.
- **TypeScript** (`^5.7.2`) para tipagem e organização do código.
- **Vite** (`^6.0.5`) para desenvolvimento e compilação.
- **Lucide React** (`^0.468.0`) para os ícones.
- **Google Gemini API**, acessada por requisições HTTP no serviço `src/services/gemini.ts`.
- **Web Speech API** para reconhecimento de fala nos navegadores compatíveis.
- **SpeechSynthesis API** para leitura de texto em voz alta.
- **HTML e CSS** para estrutura e apresentação visual.

## Organização do repositório

```text
ConectaIA_Entrega_Academica/
├── README.md
├── 01_RELATORIO/
├── 02_MODELAGEM/
│   ├── README.md
│   ├── Arquitetura_e_Diagrama.md
│   ├── Casos_de_Uso_e_Fluxos.md
│   ├── Fluxos_e_Diagramas.md
│   └── Requisitos_e_Rastreabilidade.md
├── 03_USUARIO/
│   └── TESTES_USUARIOS.xlsx
├── 04_TESTES_E_VALIDACAO/
│   └── Plano_de_Testes.xlsx
├── 05_APRESENTACAO/
├── 06_APP/
│   └── ConectaIA_Proto1/
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       ├── vite.config.ts
│       └── src/
│           ├── App.tsx
│           ├── main.tsx
│           ├── styles.css
│           └── services/
│               └── gemini.ts
└── 07_FLUXOGRAMA/
    ├── Arquitetura do Projeto Conecta.IA.png
    └── mermaid-diagram.png
```

Arquivos gerados durante a instalação ou compilação, como `node_modules/`, `dist/` e `*.tsbuildinfo`, não fazem parte dos arquivos-fonte necessários para compreender o projeto. Arquivos com credenciais, como `.env`, não devem ser compartilhados.

## Diagrama da arquitetura

A imagem abaixo apresenta a visão geral da arquitetura documentada do projeto.

![Arquitetura do ConectaIA](<07_FLUXOGRAMA/Arquitetura do Projeto Conecta.IA.png>)

## Requisitos para execução

- **Node.js:** recomenda-se a versão **24 LTS** para preparar um ambiente atualizado e reproduzível. O pacote não registra a versão exata de Node.js usada originalmente pela equipe.
- **npm:** instalado junto com o Node.js; a versão disponível pode ser conferida no terminal.
- **Navegador atualizado:** necessário para abrir a aplicação.
- **Conexão à internet:** necessária para instalar dependências e utilizar o Gemini. O modo local de contingência continua disponível sem a integração externa.
- **Microfone e permissão do navegador:** necessários para testar o reconhecimento de fala.

Para conferir as versões instaladas, abra o PowerShell e execute:

```powershell
node --version
npm.cmd --version
```

Consulte também a [página oficial de versões do Node.js](https://nodejs.org/pt/about/previous-releases) para verificar o estado de suporte das versões LTS.

## Como obter o projeto

1. Baixe o arquivo ZIP disponibilizado pela equipe.
2. Extraia o ZIP por completo para uma pasta do computador.
3. Abra a pasta `ConectaIA_Entrega_Academica`, que contém a pasta `06_APP` e este README.
4. Se o ZIP tiver uma pasta externa chamada `ENTREGA`, entre nela para encontrar `ConectaIA_Entrega_Academica`.

## Como executar no Windows

Abra o PowerShell na pasta `ConectaIA_Entrega_Academica` e entre na pasta da aplicação:

```powershell
cd .\06_APP\ConectaIA_Proto1
```

Instale as dependências:

```powershell
npm.cmd install
```

Inicie o servidor de desenvolvimento:

```powershell
npm.cmd run dev
```

O Vite exibirá no terminal o endereço local para abrir a aplicação no navegador. Normalmente, o endereço é `http://localhost:5173/`. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

O comando `npm.cmd` também é útil no PowerShell quando a política de execução bloqueia o script `npm.ps1`.

## Configuração e segurança da integração com o Gemini

A integração com o Gemini é mediada por `server/index.mjs`. O cliente `src/services/gemini.ts` chama apenas o endpoint local `/api/chat`; o servidor lê `GEMINI_API_KEY` do arquivo `.env` local e faz a requisição externa. Em ausência de chave ou falha, o cliente usa respostas locais de contingência.

**Atenção à segurança:** a versão revisada remove o uso de `VITE_GEMINI_API_KEY` e não inclui credencial no código cliente. Configure `GEMINI_API_KEY` somente no `.env` local, que está no `.gitignore`. Se uma chave real foi anteriormente publicada, revogue-a no painel do provedor e gere outra. O servidor incluído é destinado à demonstração local e não substitui controles de produção.

A pasta entregue também contém arquivos de ambiente e artefatos de compilação. Antes de compartilhar uma versão limpa, remova credenciais e exclua do pacote `node_modules/`, `dist/` e arquivos temporários de compilação. Um `.gitignore` básico pode conter:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
*.tsbuildinfo
```

O arquivo `.env.example`, caso seja utilizado, deve conter apenas nomes de variáveis e valores fictícios, nunca credenciais válidas. O comando de execução local, por si só, não confirma que a integração com o Gemini esteja configurada ou funcionando.

## Como utilizar

1. Inicie a aplicação e abra no navegador o endereço exibido pelo Vite.
2. Entre em **Conversa com a IA**, digite uma pergunta simples, como “O que é inteligência artificial?”, e envie a mensagem.
3. Se o navegador oferecer reconhecimento de fala, use o controle de microfone e conceda a permissão solicitada.
4. Quando houver uma resposta, experimente o recurso de leitura em voz alta.
5. Acesse **Trilhas de Sucesso** e escolha um dos quatro temas educativos.
6. Consulte **Sobre a IA** para ler as explicações introdutórias.
7. Abra as configurações de acessibilidade para alterar a escala visual, ativar o alto contraste ou ajustar a velocidade de leitura.
8. Consulte **Ajuda** quando precisar de orientação sobre a interface.

## Compilação de produção

Na pasta `06_APP\ConectaIA_Proto1`, execute:

```powershell
npm.cmd run build
```

O script definido no `package.json` executa a verificação de tipos do TypeScript e, em seguida, gera a compilação de produção com o Vite. Para visualizar localmente o resultado compilado, execute:

```powershell
npm.cmd run preview
```

A compilação deve ser executada no ambiente de entrega para confirmar que as dependências podem ser instaladas e que o projeto compila. A existência dos comandos no `package.json` não significa que a compilação tenha sido validada em todos os computadores.

## Documentação e materiais de referência

- [README da modelagem](02_MODELAGEM/README.md)
- [Arquitetura e diagrama](02_MODELAGEM/Arquitetura_e_Diagrama.md)
- [Casos de uso e fluxos](02_MODELAGEM/Casos_de_Uso_e_Fluxos.md)
- [Fluxos e diagramas](02_MODELAGEM/Fluxos_e_Diagramas.md)
- [Requisitos e rastreabilidade](02_MODELAGEM/Requisitos_e_Rastreabilidade.md)
- [Material de avaliação com usuários](03_USUARIO/TESTES_USUARIOS.xlsx)
- [Plano de testes](04_TESTES_E_VALIDACAO/Plano_de_Testes.xlsx)
- [Diagramas do projeto](07_FLUXOGRAMA/)

## Testes e validação

A planilha `04_TESTES_E_VALIDACAO/Plano_de_Testes.xlsx` reúne os cenários que orientam a verificação do sistema. Os requisitos e casos de uso servem como referência para comparar o comportamento esperado com o comportamento observado.

Durante a validação, recomenda-se registrar a versão avaliada, o sistema operacional e navegador utilizados, os casos executados, os resultados observados, as falhas encontradas e as evidências correspondentes. Um plano de testes representa o planejamento da avaliação; um caso só deve ser considerado aprovado depois de ser executado e ter seu resultado registrado.

Os principais cenários a verificar são:

- navegação entre as seções e acesso às quatro trilhas;
- envio de mensagens, resposta do Gemini e uso das respostas locais de contingência;
- tratamento de falhas de conexão e de respostas inválidas;
- entrada por voz e alternativa de digitação;
- leitura em voz alta e ajuste de velocidade;
- escala visual, alto contraste, navegação por teclado e foco visível;
- apresentação em telas menores;
- execução de `npm.cmd run build` em um ambiente limpo.

## Limitações e uso responsável

- A resposta gerada pelo Gemini depende da disponibilidade do serviço externo, da conexão e da configuração da integração.
- As respostas locais são predefinidas e não devem ser confundidas com respostas geradas pela IA.
- O reconhecimento de fala e a leitura em voz alta dependem do navegador, das permissões e dos recursos do dispositivo.
- A versão revisada inclui um servidor Node local para mediação Gemini, mas não possui banco de dados, login ou persistência. A integração real requer chave válida no servidor.
- Perguntas e parte do histórico da conversa são enviados ao provedor externo para gerar respostas. Evite compartilhar senhas, códigos de autenticação, dados bancários ou informações pessoais sensíveis.
- Respostas de IA podem conter erros. Confira informações importantes em fontes confiáveis; o sistema não substitui orientação profissional médica, financeira ou atendimento de emergência.
- A presença de controles de acessibilidade não comprova, por si só, conformidade com todas as diretrizes de acessibilidade.

## Equipe e contexto acadêmico

- **Instituição:** Faculdade de Educação Superior do Paraná (FESPPR), mantida pela Fundação de Estudos Sociais do Paraná.
- **Curso:** Bacharelado em Sistemas de Informação.
- **Disciplina:** Engenharia de Software.
- **Professor:** André Roberto Guerra.
- **Período:** 2º período.

| Integrante |
| Danilo Depetris Soares |
| Luís Gustavo Bueno Taquete | 
| Gabriel Weber da Rocha |
| Júlia Barbosa de Almeida | 
| Nityananda Portellada |
| Ana Carolina de Proença | 

As contribuições devem refletir as atividades efetivamente realizadas pelo grupo. O nome oficial da instituição pode ser conferido no [site da FESP](https://fesppr.edu.br/).


## Atualização da revisão técnica

A versão entregue inclui `server/` com mediação segura mínima da API Gemini, testes unitários nativos do Node e instruções atualizadas em `06_APP/ConectaIA_Proto1/README.md`. Consulte `04_TESTES_E_VALIDACAO/Registro_Execucao_Tecnica.xlsx` e `ADENDO_TECNICO_PROJETO4.docx` para distinguir testes executados nesta revisão de validações que dependem do ambiente, da equipe e de participantes.
