import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import type { Page, Media } from '@/payload-types'

/**
 * Convert media object to URL string, handling different sizes
 */
export function mediaToUrl(media: number | Media | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return (
    media.url ??
    media.sizes?.hero?.url ??
    media.sizes?.card?.url ??
    media.sizes?.thumbnail?.url ??
    ''
  )
}

/**
 * Fetch a page by slug with proper error handling
 */
export async function getPage(slug: string, draft?: boolean, depth = 2): Promise<Page | null> {
  try {
    const payload = await getPayload({ config: (await import('@/payload.config')).default })
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      draft,
      limit: 1,
      pagination: false,
      depth,
    })
    const doc = (docs?.[0] as Page | undefined) ?? null
    return doc ? JSON.parse(JSON.stringify(doc)) : null
  } catch (error) {
    console.error(`Failed to fetch page with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch the home page (slug: '')
 */
export async function getHomePage(draft?: boolean): Promise<Page | null> {
  return getPage('', draft)
}

/**
 * Generate metadata for a page
 */
export async function generatePageMetadata(
  page: Page | null,
  fallback?: { title?: string; description?: string },
): Promise<Metadata> {
  if (!page) {
    return {
      title: fallback?.title ?? 'Page Not Found',
      description: fallback?.description ?? 'The requested page could not be found.',
    }
  }

  const title = page.meta?.title ?? page.title
  const description = page.meta?.description ?? undefined
  const imageUrl = mediaToUrl(page.meta?.image as any)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

/**
 * Generate metadata for a page by slug
 */
export async function generateMetadataBySlug(
  slug: string,
  fallback?: { title?: string; description?: string },
): Promise<Metadata> {
  try {
    // Use draft mode if enabled
    const { isEnabled } = await draftMode()
    const page = await getPage(slug, isEnabled)
    return generatePageMetadata(page, fallback)
  } catch (error) {
    console.error(`Failed to generate metadata for slug "${slug}":`, error)
    return {
      title: fallback?.title ?? 'Error',
      description: fallback?.description ?? 'An error occurred while loading the page.',
    }
  }
}

/**
 * Check if draft mode is enabled with error handling
 */
export async function isDraftModeEnabled(): Promise<boolean> {
  try {
    const { isEnabled } = await draftMode()
    return isEnabled
  } catch (error) {
    console.error('Failed to check draft mode:', error)
    return false
  }
}
