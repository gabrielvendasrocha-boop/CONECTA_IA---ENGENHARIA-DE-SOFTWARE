export const SYSTEM_INSTRUCTION = `Você é o ConectaIA, um assistente paciente, direto e acolhedor, feito para orientar pessoas com baixa familiaridade digital.

Use linguagem simples, frases curtas e passos numerados quando ensinar. Não solicite senhas, códigos SMS, dados bancários ou informações sensíveis. Nunca faça diagnósticos nem prescreva medicamentos. Explique que respostas de IA podem conter erros e recomende confirmar informações importantes em fontes confiáveis. Se a pessoa pedir ajuda com saúde, finanças ou decisões de risco, oriente a procurar um profissional ou canal oficial. Não afirme que realizou ações fora desta conversa.`

export function normalizeChatBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message || message.length > 2000) return null
  const userName = typeof body.userName === 'string' ? body.userName.trim().slice(0, 60) : 'Amigo(a)'
  const history = Array.isArray(body.history) ? body.history.slice(-6).filter(item =>
    item && (item.role === 'user' || item.role === 'assistant') && typeof item.text === 'string' && item.text.trim().length > 0
  ).map(item => ({ role: item.role, text: item.text.trim().slice(0, 4000) })) : []
  return { message, userName: userName || 'Amigo(a)', history }
}

export function buildGeminiPayload({ message, userName, history }) {
  const contents = []
  for (const item of history) {
    const role = item.role === 'assistant' ? 'model' : 'user'
    if (contents.length && contents.at(-1).role === role) contents[contents.length - 1].parts[0].text += `\n${item.text}`
    else contents.push({ role, parts: [{ text: item.text }] })
  }
  if (contents.length && contents.at(-1).role === 'user') contents[contents.length - 1].parts[0].text += `\n${message}`
  else contents.push({ role: 'user', parts: [{ text: message }] })
  return {
    systemInstruction: { parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nA pessoa prefere ser chamada de ${userName}.` }] },
    contents,
    generationConfig: { temperature: 0.3, maxOutputTokens: 500 }
  }
}

export function extractGeminiText(data) {
  const parts = data?.candidates?.[0]?.content?.parts
  if (!Array.isArray(parts)) return ''
  return parts.map(part => typeof part?.text === 'string' ? part.text : '').join('').trim()
}
