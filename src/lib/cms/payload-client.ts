import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import type { Payload, Where } from 'payload'
import type { Blog, Page, Header, Footer } from '@/payload-types'
import { CACHE_REVALIDATE_SECONDS, cacheTags } from '@/lib/cache-tags'

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
 * Fetch a page by slug with proper error handling
 */
async function fetchPage(slug: string, depth = 2, draft = false): Promise<Page | null> {
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

export async function getPage(slug: string, depth = 2): Promise<Page | null> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchPage(slug, depth, true)

  const cacheKey = ['payload:getPage', slug || 'home', depth.toString()]
  const cached = unstable_cache(() => fetchPage(slug, depth, false), cacheKey, {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.pages, cacheTags.page(slug)],
  })

  return cached()
}

/**
 * Fetch the home page (slug: '')
 */
export async function getHomePage(depth = 2): Promise<Page | null> {
  return getPage('', depth)
}

/**
 * Fetch blogs with proper error handling
 */
async function fetchBlogs(limit = 50, draft = false): Promise<Blog[]> {
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

export async function getBlogs(limit = 50): Promise<Blog[]> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchBlogs(limit, true)

  const cacheKey = ['payload:getBlogs', limit.toString()]
  const cached = unstable_cache(() => fetchBlogs(limit, false), cacheKey, {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.blogs],
  })

  return cached()
}

async function fetchBlogsByCategory(category: string, limit = 12, draft = false): Promise<Blog[]> {
  try {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'blogs',
      where: { category: { equals: category } },
      draft,
      sort: '-publishedAt',
      limit,
      pagination: false,
    })

    return JSON.parse(JSON.stringify(docs)) as Blog[]
  } catch (error) {
    console.error(`Failed to fetch blogs for category "${category}":`, error)
    return []
  }
}

export async function getBlogsByCategory(category: string, limit = 12): Promise<Blog[]> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchBlogsByCategory(category, limit, true)

  const cacheKey = ['payload:getBlogsByCategory', category, limit.toString()]
  const cached = unstable_cache(() => fetchBlogsByCategory(category, limit, false), cacheKey, {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.blogs, cacheTags.blogCategory(category)],
  })

  return cached()
}

/**
 * Fetch a single blog by slug
 */
async function fetchBlogBySlug(slug: string, depth = 2, draft = false): Promise<Blog | null> {
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

export async function getBlogBySlug(slug: string, depth = 2): Promise<Blog | null> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchBlogBySlug(slug, depth, true)

  const cacheKey = ['payload:getBlogBySlug', slug, depth.toString()]
  const cached = unstable_cache(() => fetchBlogBySlug(slug, depth, false), cacheKey, {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.blogs, cacheTags.blog(slug)],
  })

  return cached()
}

/**
 * Fetch header global
 */
async function fetchHeader(draft = false): Promise<Header | null> {
  try {
    const payload = await getPayloadClient()
    const header = (await payload.findGlobal({
      slug: 'header',
      depth: 2,
      draft,
    })) as Header

    const safe = JSON.parse(JSON.stringify(header))
    return safe ?? null
  } catch (error) {
    console.error('Failed to fetch header:', error)
    return null
  }
}

export async function getHeader(): Promise<Header | null> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchHeader(true)

  const cached = unstable_cache(() => fetchHeader(false), ['payload:getHeader'], {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.header],
  })

  return cached()
}

/**
 * Fetch footer global
 */
async function fetchFooter(draft = false): Promise<Footer | null> {
  try {
    const payload = await getPayloadClient()
    const footer = (await payload.findGlobal({
      slug: 'footer',
      depth: 2,
      draft,
    })) as Footer

    const safe = JSON.parse(JSON.stringify(footer))
    return safe ?? null
  } catch (error) {
    console.error('Failed to fetch footer:', error)
    return null
  }
}

export async function getFooter(): Promise<Footer | null> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchFooter(true)

  const cached = unstable_cache(() => fetchFooter(false), ['payload:getFooter'], {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.footer],
  })

  return cached()
}

/**
 * Fetch both header and footer globals
 */
export async function getHeaderFooter(): Promise<{ header: Header | null; footer: Footer | null }> {
  try {
    const [header, footer] = await Promise.all([getHeader(), getFooter()])

    return { header, footer }
  } catch (error) {
    console.error('Failed to fetch header/footer:', error)
    return { header: null, footer: null }
  }
}
