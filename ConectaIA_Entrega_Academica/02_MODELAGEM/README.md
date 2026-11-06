# Modelagem do sistema — ConectaIA

## 1. Finalidade deste diretório

Esta pasta descreve o escopo funcional e a arquitetura do protótipo ConectaIA. Seu propósito é tornar explícitas as decisões de projeto, os comportamentos esperados, os limites técnicos e a relação entre requisitos e testes.

A modelagem não deve ser interpretada como prova de funcionalidades executadas ou de validação com usuários. Ela precisa ser comparada ao código e atualizada quando houver divergência.

## 2. Documentos

| Arquivo | Conteúdo |
|---|---|
| `Arquitetura_e_Diagrama.md` | componentes, fronteiras do sistema, tecnologias e diagrama arquitetural |
| `Casos_de_Uso_e_Fluxos.md` | atores, pré-condições, fluxos principais, alternativos e pós-condições |
| `Requisitos_e_Rastreabilidade.md` | requisitos funcionais/não funcionais, critérios de aceite e relação com testes |
| `Fluxos_e_Diagramas.md` | diagramas Mermaid de navegação, interação e estados |

## 3. Contexto e definição do problema

**Questão de projeto:** como apresentar uma experiência inicial de exploração de recursos de IA com navegação clara, linguagem compreensível e recursos de acessibilidade para pessoas idosas, sem presumir que todas as pessoas desse público tenham as mesmas necessidades?

A questão é uma hipótese de design. Não se afirma que entrevistas ou pesquisas com usuários tenham confirmado as necessidades. Para fundamentar conclusões sobre usuários reais, é necessário planejar e realizar pesquisa adequada.

## 4. Escopo atual documentado

### Dentro do escopo do protótipo
- tela de boas-vindas;
- painel de navegação;
- conversa demonstrativa com respostas predefinidas;
- estados visuais de interação;
- conteúdo “Sobre a IA”;
- “Trilhas de Sucesso”;
- controles de acessibilidade presentes na interface;
- área de ajuda;
- leitura em voz alta por recurso do navegador, quando suportado.

### Fora do escopo confirmado
- chamada a modelo de IA externo;
- servidor/backend próprio;
- banco de dados;
- conta de usuário e autenticação;
- persistência de preferências ou histórico, salvo se comprovada no código;
- reconhecimento de voz real;
- contato com emergência ou suporte externo;
- validação empírica concluída com pessoas idosas;
- certificação formal de acessibilidade.

## 5. Princípios de modelagem

1. **Rastreabilidade:** cada requisito deve apontar para um ou mais testes.
2. **Verificabilidade:** requisitos devem descrever comportamentos observáveis.
3. **Transparência:** funcionalidades simuladas precisam ser identificadas como simulações.
4. **Separação entre fato e proposta:** arquitetura observada, comportamento esperado e melhoria futura não devem ser misturados.
5. **Acessibilidade desde o projeto:** considerar alternativas à voz, linguagem clara, foco e legibilidade.
6. **Privacidade por padrão:** não solicitar nem registrar dados sensíveis sem necessidade e justificativa.

## 6. Como manter a modelagem

Quando o código mudar:
1. identificar o requisito afetado;
2. atualizar o fluxo ou caso de uso;
3. atualizar os critérios de aceite;
4. atualizar os casos de teste;
5. executar os testes;
6. registrar o resultado real e a evidência;
7. revisar o relatório e os slides para manter consistência.

## 7. Convenções

- `RF`: requisito funcional.
- `RNF`: requisito não funcional.
- `UC`: caso de uso.
- `T`: caso de teste.
- “Pendente”: ainda não executado ou sem evidência.
- “A verificar”: comportamento descrito, mas não confirmado nesta versão.
- “Simulado”: comportamento demonstrativo sem integração real.

## 8. Critério de aceite da documentação

A modelagem pode ser considerada revisada quando:
- todos os requisitos tiverem descrição clara;
- os limites e dependências estiverem explícitos;
- os fluxos corresponderem à versão real;
- os requisitos prioritários estiverem ligados a testes;
- os resultados forem registrados sem suposições;
- a documentação e o código não se contradisserem.
