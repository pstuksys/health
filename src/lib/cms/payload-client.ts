import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import type { Payload, Where } from 'payload'
import type { Blog, Page, Header, Footer } from '@/payload-types'

/**
 * Single source of truth for Payload CMS client
 * This ensures we reuse the same instance across the application
 */
let payloadInstance: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (!payloadInstance) {
    const config = (await import('@/payload.config')).default
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}

/**
 * Base function to fetch pages with proper error handling
 */
async function fetchPage(slug: string, draft?: boolean, depth = 2): Promise<Page | null> {
  try {
    const payload = await getPayloadClient()
    const where = slug
      ? { slug: { equals: slug } }
      : {
          or: [
            { slug: { equals: '' } },
            { slug: { exists: false } },
            { slug: { equals: null as unknown as string } },
          ],
        }

    const { docs } = await payload.find({
      collection: 'pages',
      where: where as unknown as Where,
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
 * Base function to fetch blogs with proper error handling
 */
async function fetchBlogs(draft?: boolean, limit = 50): Promise<Blog[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'blogs',
      draft,
      sort: '-publishedAt',
      limit,
      pagination: false,
    })

    return JSON.parse(JSON.stringify(docs)) as Blog[]
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

/**
 * Base function to fetch a single blog by slug
 */
async function fetchBlogBySlug(slug: string, draft?: boolean, depth = 2): Promise<Blog | null> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'blogs',
      where: { slug: { equals: slug } },
      draft,
      limit: 1,
      pagination: false,
      depth,
    })

    const doc = (docs?.[0] as Blog | undefined) ?? null
    return doc ? JSON.parse(JSON.stringify(doc)) : null
  } catch (error) {
    console.error(`Failed to fetch blog with slug "${slug}":`, error)
    return null
  }
}

/**
 * Base function to fetch header and footer globals
 */
async function fetchHeaderFooter(): Promise<{ header: Header | null; footer: Footer | null }> {
  try {
    const payload = await getPayloadClient()
    const [header, footer] = await Promise.all([
      payload.findGlobal({ slug: 'header', depth: 2 }) as Promise<Header>,
      payload.findGlobal({ slug: 'footer', depth: 2 }) as Promise<Footer>,
    ])

    // Strip any circular refs coming from the local API internals
    const safe = JSON.parse(JSON.stringify({ header, footer }))
    return { header: safe.header ?? null, footer: safe.footer ?? null }
  } catch (error) {
    console.error('Failed to fetch header/footer:', error)
    return { header: null, footer: null }
  }
}

/**
 * Cached functions with proper tags for revalidation
 */

// Pages cache functions
export const getCachedPage = (slug: string, depth = 2) => {
  return unstable_cache(
    async () => {
      const { isEnabled } = await draftMode()
      return fetchPage(slug, isEnabled, depth)
    },
    [`page:${slug}`, 'depth', depth.toString()],
    {
      tags: ['pages', `page:${slug}`],
      // No revalidate time - only invalidate when content changes
    },
  )()
}

export const getCachedHomePage = (depth = 2) => {
  return unstable_cache(
    async () => {
      const { isEnabled } = await draftMode()
      return fetchPage('', isEnabled, depth)
    },
    ['page:home', 'depth', depth.toString()],
    {
      tags: ['pages', 'page:home', 'page:'],
      // No revalidate time - only invalidate when content changes
    },
  )()
}

// Blogs cache functions
export const getCachedBlogs = (limit = 50) => {
  return unstable_cache(
    async () => {
      const { isEnabled } = await draftMode()
      return fetchBlogs(isEnabled, limit)
    },
    ['blogs-list', 'limit', limit.toString()],
    {
      tags: ['blogs', 'blog-list', 'blog-posts', 'blogs-page'],
      // No revalidate time - only invalidate when content changes
    },
  )()
}

export const getCachedBlogBySlug = (slug: string, depth = 2) => {
  return unstable_cache(
    async () => {
      const { isEnabled } = await draftMode()
      return fetchBlogBySlug(slug, isEnabled, depth)
    },
    [`blog:${slug}`, 'depth', depth.toString()],
    {
      tags: ['blogs', `blog:${slug}`, 'blog-detail'],
      // No revalidate time - only invalidate when content changes
    },
  )()
}

// Globals cache functions
export const getCachedHeaderFooter = () => {
  return unstable_cache(fetchHeaderFooter, ['globals:header-footer'], {
    tags: ['global:header', 'global:footer'],
    // No revalidate time - only invalidate when content changes
  })()
}

/**
 * Generic cached query function for advanced use cases
 */
export const createCachedQuery = <T>(
  queryFn: () => Promise<T>,
  cacheKey: string[],
  tags: string[],
  revalidate?: number,
) => {
  const options: { tags: string[]; revalidate?: number } = { tags }
  if (revalidate !== undefined) {
    options.revalidate = revalidate
  }
  return unstable_cache(queryFn, cacheKey, options)
}

/**
 * Utility to get collection-specific cache tags
 */
export const getCollectionCacheTags = (collection: string, slug?: string): string[] => {
  const baseTags = [collection]

  switch (collection) {
    case 'pages':
      baseTags.push('pages')
      if (slug) baseTags.push(`page:${slug}`)
      break
    case 'blogs':
      baseTags.push('blog-list', 'blog-posts', 'blogs-page')
      if (slug) baseTags.push(`blog:${slug}`, 'blog-detail')
      break
    case 'header':
      baseTags.push('global:header')
      break
    case 'footer':
      baseTags.push('global:footer')
      break
    default:
      if (slug) baseTags.push(`${collection}:${slug}`)
  }

  return baseTags
}
