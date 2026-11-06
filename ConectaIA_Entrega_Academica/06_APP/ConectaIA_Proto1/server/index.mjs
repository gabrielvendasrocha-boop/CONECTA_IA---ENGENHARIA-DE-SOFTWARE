import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { buildGeminiPayload, extractGeminiText, normalizeChatBody } from './gemini.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
try {
  const env = await readFile(resolve(projectRoot, '.env'), 'utf8')
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
  }
} catch { /* .env é opcional */ }

const PORT = Number(process.env.API_PORT || 3001)
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash'
const API_KEY = process.env.GEMINI_API_KEY || ''
const requests = new Map()
const MAX_BODY = 24_000

function allowedOrigin(origin) {
  if (!origin) return true
  try {
    const url = new URL(origin)
    return ['localhost', '127.0.0.1'].includes(url.hostname)
  } catch { return false }
}

const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Cache-Control', 'no-store')
  const origin = req.headers.origin
  if (!allowedOrigin(origin)) { res.writeHead(403).end('Origem não permitida'); return }
  if (origin) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary', 'Origin') }
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }).end(); return }
  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ status: 'ok', aiConfigured: Boolean(API_KEY) })); return
  }
  if (req.method !== 'POST' || req.url !== '/api/chat') { res.writeHead(404).end('Não encontrado'); return }
  const ip = req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const entry = requests.get(ip) || { count: 0, start: now }
  if (now - entry.start > 60_000) { entry.count = 0; entry.start = now }
  entry.count += 1; requests.set(ip, entry)
  if (entry.count > 20) { res.writeHead(429, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Muitas solicitações. Aguarde um minuto.' })); return }
  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > MAX_BODY) { res.writeHead(413).end('Requisição muito grande'); return }
  }
  let body
  try { body = JSON.parse(raw) } catch { res.writeHead(400).end('JSON inválido'); return }
  const input = normalizeChatBody(body)
  if (!input) { res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Informe uma pergunta de até 2.000 caracteres.' })); return }
  if (!API_KEY) { res.writeHead(503, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Integração de IA não configurada.' })); return }
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 18_000)
    let upstream
    let data
    try {
      upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY }, body: JSON.stringify(buildGeminiPayload(input)), signal: controller.signal
      })
      data = await upstream.json().catch(() => ({}))
    } finally {
      clearTimeout(timeout)
    }
    if (!upstream.ok) { res.writeHead(502, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'O serviço de IA não respondeu. Tente novamente mais tarde.' })); return }
    const text = extractGeminiText(data)
    if (!text) { res.writeHead(502, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'O serviço não retornou texto.' })); return }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify({ text }))
  } catch { res.writeHead(504, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Tempo de resposta excedido.' })) }
})

server.listen(PORT, '127.0.0.1', () => console.log(`ConectaIA API disponível em http://127.0.0.1:${PORT}`))
