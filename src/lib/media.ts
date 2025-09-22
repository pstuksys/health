import type { Media } from '@/payload-types'

/**
 * Available image sizes from Payload CMS Media collection
 */
export type MediaSize = 'thumbnail' | 'card' | 'hero' | 'fullHD' | 'original'

/**
 * Get the URL for a specific size from Payload Media object
 * Falls back through size hierarchy if preferred size doesn't exist
 * Handles base URL prepending for production environments
 */
export function mediaToUrl(
  media: number | Media | null | undefined,
  preferredSize: MediaSize = 'original',
): string {
  if (!media || typeof media === 'number') {
    return '/placeholder.svg'
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  let url = ''

  if (preferredSize === 'original') {
    url = media.url ?? ''
  } else if (media.sizes && preferredSize in media.sizes) {
    url = media.sizes[preferredSize]?.url ?? ''
  }

  // Fallback hierarchy if preferred size doesn't exist
  if (!url) {
    url =
      media.url ??
      media.sizes?.hero?.url ??
      media.sizes?.card?.url ??
      media.sizes?.thumbnail?.url ??
      ''
  }

  // Add base URL if needed for production
  if (url && !url.startsWith('http') && baseUrl) {
    return `${baseUrl}${url}`
  }

  return url || '/placeholder.svg'
}

/**
 * Image use cases mapped to optimal sizes
 */
export const IMAGE_USE_CASES = {
  // Small images - navigation, icons, thumbnails
  icon: 'thumbnail' as MediaSize,
  avatar: 'thumbnail' as MediaSize,
  thumbnail: 'thumbnail' as MediaSize,

  // Medium images - cards, previews
  card: 'card' as MediaSize,
  preview: 'card' as MediaSize,

  // Large images - hero sections, full-width banners
  hero: 'hero' as MediaSize,
  banner: 'hero' as MediaSize,

  // Ultra high-res - galleries, detailed views
  gallery: 'fullHD' as MediaSize,
  detailed: 'fullHD' as MediaSize,

  // Fallback to original
  original: 'original' as MediaSize,
} as const

/**
 * Get media URL based on use case - convenience wrapper around mediaToUrl
 */
export function getMediaUrl(
  media: number | Media | null | undefined,
  useCase: keyof typeof IMAGE_USE_CASES = 'original',
): string {
  const preferredSize = IMAGE_USE_CASES[useCase]
  return mediaToUrl(media, preferredSize)
}

/**
 * Get alt text from Payload Media object with fallback
 */
export function getMediaAlt(media: Media | null | undefined, fallback: string = ''): string {
  return media?.alt ?? fallback
}

/**
 * Get media dimensions for a specific size
 */
export function getMediaDimensions(
  media: Media | null | undefined,
  size: MediaSize = 'original',
): { width: number; height: number } | null {
  if (!media) return null

  if (size === 'original') {
    return {
      width: media.width ?? 800,
      height: media.height ?? 600,
    }
  }

  const sizeData = media.sizes?.[size]
  if (sizeData?.width && sizeData?.height) {
    return {
      width: sizeData.width,
      height: sizeData.height,
    }
  }

  // Fallback to original dimensions
  return {
    width: media.width ?? 800,
    height: media.height ?? 600,
  }
}
