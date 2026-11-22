import type { Metadata } from 'next'
import type { Page } from '@/payload-types'
import { mediaToUrl } from './media'
import { getPage } from './cms/payload-client'
import { draftMode } from 'next/headers'
import { canonicalPath, openGraphDefaults } from './metadata'

// Re-export the functions from payload-client for backward compatibility
export { getPage, getHomePage } from './cms/payload-client'

/**
 * Generate metadata for a page
 */
export async function generatePageMetadata(
  page: Page | null,
  path: string,
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
  const imageUrl = mediaToUrl(page.meta?.image)
  const url = canonicalPath(path)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...openGraphDefaults,
      url,
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
  // Draft mode is handled in getPage. CMS errors propagate so a wrong title
  // is never cached alongside the page.
  const page = await getPage(slug, 2) // depth = 2 for metadata
  return generatePageMetadata(page, slug, fallback)
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
