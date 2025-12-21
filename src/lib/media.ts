import type { Media } from '@/payload-types'

/**
 * Client-safe helper to convert a Payload Media object (or id) into a URL string.
 * - Chooses best available size
 */
export function mediaToUrl(media: number | Media | null | undefined): string {
  if (!media || typeof media === 'number') return '/placeholder.svg'

  const url =
    media.url ??
    media.sizes?.hero?.url ??
    media.sizes?.card?.url ??
    media.sizes?.thumbnail?.url ??
    ''

  if (!url) return '/placeholder.svg'

  // Absolute URL (e.g. Vercel Blob)
  if (url.startsWith('http')) return url

  // Prefer relative URLs (e.g. /api/media/...) so next/image treats them as same-origin
  if (url.startsWith('/')) return url

  // Fallback: join with base URL if Payload ever returns a non-leading-slash path
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim().replace(/\/+$/, '')
  return baseUrl ? `${baseUrl}/${url.replace(/^\/+/, '')}` : url

  // (unreachable)
}
