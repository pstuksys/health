import NextImage, { ImageProps as NextImageProps } from 'next/image'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/utils'
import { mediaToUrl, getMediaAlt } from '@/lib/media'

type PayloadImageSize = 'thumbnail' | 'card' | 'hero' | 'fullHD' | 'original'
type ImageVariant = 'hero' | 'card' | 'thumbnail' | 'gallery' | 'avatar' | 'default'

interface PayloadImageProps extends Omit<NextImageProps, 'src' | 'alt'> {
  /**
   * Payload Media object or ID
   */
  media: number | Media | null | undefined

  /**
   * Alt text override - falls back to media.alt
   */
  alt?: string

  /**
   * Which Payload size to use - maps directly to your collection config
   */
  size?: PayloadImageSize

  /**
   * Pre-defined styling variants for common use cases
   */
  variant?: ImageVariant
}

// Variant-specific styles and sizes
const variantConfig: Record<
  ImageVariant,
  {
    defaultSize: PayloadImageSize
    className: string
    sizes: string
  }
> = {
  hero: {
    defaultSize: 'hero',
    className: 'object-cover object-center',
    sizes: '100vw',
  },
  card: {
    defaultSize: 'card',
    className: 'object-cover object-center rounded-lg',
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  thumbnail: {
    defaultSize: 'thumbnail',
    className: 'object-cover object-center rounded',
    sizes: '(max-width: 768px) 100px, 200px',
  },
  gallery: {
    defaultSize: 'fullHD',
    className: 'object-cover object-center rounded-lg',
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px',
  },
  avatar: {
    defaultSize: 'thumbnail',
    className: 'object-cover object-center rounded-full',
    sizes: '(max-width: 768px) 80px, 120px',
  },
  default: {
    defaultSize: 'original',
    className: 'object-cover object-center',
    sizes: '100vw',
  },
}

/**
 * Simple, direct Payload CMS image component
 *
 * Maps directly to your Payload imageSizes without unnecessary abstraction
 */
export function PayloadImage({
  media,
  alt: altOverride,
  size,
  variant = 'default',
  className,
  sizes,
  ...props
}: PayloadImageProps) {
  // Handle missing media
  if (!media || typeof media === 'number') {
    return <NextImage src="/placeholder.svg" alt={altOverride || ''} {...props} />
  }

  const config = variantConfig[variant]
  const finalSize = size || config.defaultSize
  const finalSizes = sizes || config.sizes
  const finalClassName = cn(config.className, className)

  // Get the URL using the proper mediaToUrl function (handles base URL and fallbacks)
  const src = mediaToUrl(media, finalSize)

  // Get alt text using the proper getMediaAlt function
  const alt = getMediaAlt(media, altOverride || '')

  return <NextImage src={src} alt={alt} sizes={finalSizes} className={finalClassName} {...props} />
}
