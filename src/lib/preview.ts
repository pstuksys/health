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

/** Admin "Preview" link: enables draft mode, then opens the page at `path`. */
export function previewUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return `${base}/preview?path=${encodeURIComponent(path)}`
}
