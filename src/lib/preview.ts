/**
 * A path on our own site to redirect to after toggling draft mode. Anything
 * that could point at another host ("//evil.com", "/\evil.com", full URLs)
 * falls back to the homepage.
 */
export function safeRedirectPath(path: string | null | undefined): string {
  if (!path || !path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return '/'

  try {
    const url = new URL(path, 'http://localhost')
    if (url.host !== 'localhost') return '/'
    return `${url.pathname}${url.search}`
  } catch {
    return '/'
  }
}

/**
 * Redirect with a relative Location (`/faqs`, no host). The browser stays on
 * the host it's on, which is also the host the draft-mode cookie was set for,
 * whatever proxy or deployment URL is in front.
 */
export function relativeRedirect(path: string): Response {
  return new Response(null, { status: 307, headers: { Location: safeRedirectPath(path) } })
}

/**
 * The same-site page the request came from (Referer), so "Exit preview" can
 * return the editor to the page they were on. Falls back to the homepage.
 */
export function refererPath(headers: Headers): string {
  const referer = headers.get('referer')
  const host = headers.get('x-forwarded-host') ?? headers.get('host')
  if (!referer || !host) return '/'

  try {
    const url = new URL(referer)
    if (url.host !== host) return '/'
    return safeRedirectPath(`${url.pathname}${url.search}`)
  } catch {
    return '/'
  }
}

/**
 * Admin "Preview" link: enables draft mode, then opens the page at `path`.
 * Relative on purpose: the admin and the site are the same app, so the link
 * stays on the host the editor is logged in on (localhost, a Vercel preview
 * deployment or production) and the login cookie comes along.
 */
export function previewUrl(path: string): string {
  return `/preview?path=${encodeURIComponent(path)}`
}
