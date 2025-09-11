import type { Metadata } from 'next'
import type { Page } from '@/payload-types'
import { mediaToUrl } from './media'
import { getCachedPage, getCachedHomePage } from './cms/payload-client'
import { draftMode } from 'next/headers'

/**
 * Fetch a page by slug with proper error handling
 * Now uses cached version from payload-client
 */
export async function getPage(slug: string, depth = 2): Promise<Page | null> {
  return getCachedPage(slug, depth)
}

/**
 * Fetch the home page (slug: '')
 * Now uses cached version from payload-client
 */
export async function getHomePage(depth = 2): Promise<Page | null> {
  return getCachedHomePage(depth)
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
  const imageUrl = mediaToUrl(page.meta?.image)

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
    // Draft mode is automatically handled in getCachedPage
    const page = await getPage(slug, 2) // depth = 2 for metadata
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
