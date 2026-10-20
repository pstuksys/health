const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const MAX_TOKEN_LENGTH = 2048

type SiteverifyResponse = {
  success?: boolean
  'error-codes'?: string[]
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  // Fail closed in production; allow local development without Turnstile keys
  if (!secret) return process.env.NODE_ENV !== 'production'
  if (typeof token !== 'string' || !token || token.length > MAX_TOKEN_LENGTH) return false

  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) return false

    const result = (await response.json()) as SiteverifyResponse
    if (!result.success) console.warn('Turnstile verification failed:', result['error-codes'])
    return result.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}
