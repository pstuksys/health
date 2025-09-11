import type {
  Payload,
  CollectionAfterChangeHook,
  GlobalAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'
import { revalidateTag } from 'next/cache'
import { getCollectionCacheTags } from '@/lib/cms/payload-client'

/**
 * Server-side revalidation using revalidateTag directly
 * This is more efficient than making HTTP requests
 */
export const revalidateCacheTags = (tags: string[]): void => {
  console.log(`🔄 Revalidating cache tags:`, tags)
  tags.forEach((tag) => {
    try {
      revalidateTag(tag)
    } catch (error) {
      console.error(`Failed to revalidate tag "${tag}":`, error)
    }
  })
}

/**
 * Fallback HTTP revalidation for cases where direct revalidateTag doesn't work
 */
async function notifyRevalidateViaHTTP(tags: string[]): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/revalidate?secret=${process.env.REVALIDATION_SECRET ?? ''}`
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ tags }),
    })
    console.log(`🌐 HTTP revalidation successful for tags:`, tags)
  } catch (error) {
    console.error('HTTP revalidation failed:', error)
  }
}

/**
 * Universal revalidation hook for collections (afterChange)
 */
export const createCollectionRevalidateHook = (
  collectionSlug: string,
): CollectionAfterChangeHook => {
  return async ({ doc, operation, previousDoc }) => {
    const docData = doc as { slug?: string; _status?: 'draft' | 'published' }
    const prevData = previousDoc as { slug?: string; _status?: 'draft' | 'published' } | undefined

    // Get base tags for this collection
    const tags = getCollectionCacheTags(collectionSlug, docData.slug)

    // Add operation-specific tags
    if (operation === 'create') {
      tags.push(`${collectionSlug}-created`)
    } else if (operation === 'update') {
      tags.push(`${collectionSlug}-updated`)

      // If slug changed, invalidate old slug cache too
      if (prevData?.slug && prevData.slug !== docData.slug) {
        tags.push(...getCollectionCacheTags(collectionSlug, prevData.slug))
      }
    }

    // Collection-specific logic
    if (collectionSlug === 'pages') {
      // Always invalidate pages list
      tags.push('pages-list')

      // If it's the home page, add special tags
      if (!docData.slug || docData.slug === '') {
        tags.push('page:home', 'page:')
      }
    } else if (collectionSlug === 'blogs') {
      // Always invalidate blog lists and related pages
      tags.push('blog-list', 'blog-posts', 'blogs-page', 'blog-detail')
    }

    // Revalidate using both methods for reliability
    revalidateCacheTags(tags)

    // Use HTTP fallback in development or when direct revalidation might not work
    if (process.env.NODE_ENV === 'development') {
      await notifyRevalidateViaHTTP(tags)
    }
  }
}

/**
 * Universal revalidation hook for collections (afterDelete)
 */
export const createCollectionDeleteHook = (collectionSlug: string): CollectionAfterDeleteHook => {
  return async ({ doc }) => {
    const docData = doc as { slug?: string; _status?: 'draft' | 'published' }

    // Get base tags for this collection
    const tags = getCollectionCacheTags(collectionSlug, docData.slug)

    // Add delete-specific tag
    tags.push(`${collectionSlug}-deleted`)

    // Collection-specific logic
    if (collectionSlug === 'pages') {
      // Always invalidate pages list
      tags.push('pages-list')

      // If it's the home page, add special tags
      if (!docData.slug || docData.slug === '') {
        tags.push('page:home', 'page:')
      }
    } else if (collectionSlug === 'blogs') {
      // Always invalidate blog lists and related pages
      tags.push('blog-list', 'blog-posts', 'blogs-page', 'blog-detail')
    }

    // Revalidate using both methods for reliability
    revalidateCacheTags(tags)

    // Use HTTP fallback in development or when direct revalidation might not work
    if (process.env.NODE_ENV === 'development') {
      await notifyRevalidateViaHTTP(tags)
    }
  }
}

/**
 * Universal revalidation hook for globals
 */
export const createGlobalRevalidateHook = (globalSlug: string): GlobalAfterChangeHook => {
  return async ({ doc: _doc }) => {
    const tags = [`global:${globalSlug}`]

    // Global-specific logic
    if (globalSlug === 'header' || globalSlug === 'footer') {
      tags.push('globals:header-footer')
    }

    // Revalidate using both methods for reliability
    revalidateCacheTags(tags)

    // Use HTTP fallback in development or when direct revalidation might not work
    if (process.env.NODE_ENV === 'development') {
      await notifyRevalidateViaHTTP(tags)
    }
  }
}

/**
 * Specific hooks for each collection/global
 */
export const revalidatePagesOnChange = createCollectionRevalidateHook('pages')
export const revalidatePagesOnDelete = createCollectionDeleteHook('pages')
export const revalidateBlogsOnChange = createCollectionRevalidateHook('blogs')
export const revalidateBlogsOnDelete = createCollectionDeleteHook('blogs')
export const revalidateHeaderOnChange = createGlobalRevalidateHook('header')
export const revalidateFooterOnChange = createGlobalRevalidateHook('footer')

/**
 * Legacy hooks for backward compatibility
 */
export const revalidateOnChange =
  (_payload: Payload) =>
  ({ doc, collection }: { doc: unknown; collection: { slug: string } }) => {
    const docData = doc as { slug?: string }
    const tags = getCollectionCacheTags(collection.slug, docData.slug)
    revalidateCacheTags(tags)
  }
