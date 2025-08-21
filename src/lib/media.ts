import type { Media } from '@/payload-types'

/**
 * Client-safe helper to convert a Payload Media object (or id) into a URL string.
 * - Chooses best available size
 * - Prepends NEXT_PUBLIC_SITE_URL when needed for absolute URLs in production
 */
export function mediaToUrl(media: number | Media | null | undefined): string {
  if (!media || typeof media === 'number') return ''

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  const url =
    media.url ??
    media.sizes?.hero?.url ??
    media.sizes?.card?.url ??
    media.sizes?.thumbnail?.url ??
    ''

  if (url && !url.startsWith('http') && baseUrl) {
    return `${baseUrl}${url}`
  }

  return url
}
