import test from 'node:test'
import assert from 'node:assert/strict'
import { buildGeminiPayload, extractGeminiText, normalizeChatBody } from './gemini.mjs'

test('rejeita pergunta vazia e payload inválido', () => {
  assert.equal(normalizeChatBody({ message: '   ' }), null)
  assert.equal(normalizeChatBody(null), null)
})

test('limita pergunta, nome e histórico recebido', () => {
  assert.equal(normalizeChatBody({ message: 'x'.repeat(2001) }), null)
  const value = normalizeChatBody({ message: ' Olá ', userName: ' Ana ', history: Array.from({length: 9}, (_,i) => ({role:'user',text:`m${i}`})) })
  assert.equal(value.message, 'Olá')
  assert.equal(value.userName, 'Ana')
  assert.equal(value.history.length, 6)
})

test('converte histórico para papéis aceitos pela API e inclui instrução de sistema', () => {
  const payload = buildGeminiPayload({ message: 'Como envio e-mail?', userName: 'Ana', history: [{role:'user',text:'Oi'}, {role:'assistant',text:'Olá'}] })
  assert.equal(payload.contents[0].role, 'user')
  assert.equal(payload.contents[1].role, 'model')
  assert.equal(payload.contents[2].role, 'user')
  assert.match(payload.systemInstruction.parts[0].text, /Ana/)
})

test('extrai texto e trata resposta sem conteúdo', () => {
  assert.equal(extractGeminiText({candidates:[{content:{parts:[{text:'Olá '},{text:'mundo'}]}}]}), 'Olá mundo')
  assert.equal(extractGeminiText({}), '')
})
