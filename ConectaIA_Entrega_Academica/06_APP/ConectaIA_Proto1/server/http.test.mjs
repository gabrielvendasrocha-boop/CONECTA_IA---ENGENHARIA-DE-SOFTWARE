import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

let child
let baseUrl
let port

before(async () => {
  const probe = createServer()
  await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve))
  port = probe.address().port
  await new Promise(resolve => probe.close(resolve))
  child = spawn(process.execPath, ['server/index.mjs'], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, API_PORT: String(port), GEMINI_API_KEY: '' },
    stdio: 'ignore'
  })
  baseUrl = `http://127.0.0.1:${port}`
  let ready = false
  for (let attempt = 0; attempt < 40; attempt++) {
    try { const response = await fetch(`${baseUrl}/api/health`); if (response.ok) { ready = true; break } } catch {}
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  assert.equal(ready, true, 'servidor HTTP deveria iniciar')
})

after(() => { child?.kill('SIGTERM') })

test('GET /api/health informa estado sem expor segredo', async () => {
  const response = await fetch(`${baseUrl}/api/health`)
  const data = await response.json()
  assert.equal(response.status, 200)
  assert.equal(data.status, 'ok')
  assert.equal(data.aiConfigured, false)
})

test('POST /api/chat rejeita pergunta vazia', async () => {
  const response = await fetch(`${baseUrl}/api/chat`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({message:' '}) })
  assert.equal(response.status, 400)
})

test('POST /api/chat sem chave retorna indisponibilidade controlada', async () => {
  const response = await fetch(`${baseUrl}/api/chat`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({message:'Olá'}) })
  assert.equal(response.status, 503)
})
