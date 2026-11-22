import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_cache } from 'next/cache'
import type { Payload, Where } from 'payload'
import type { Blog, Page, Header, Footer, EducationHub } from '@/payload-types'
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

const RETRY_DELAY_MS = 300

/**
 * Run a CMS query, retrying once on failure. Errors are rethrown rather than
 * turned into null/[] so unstable_cache never stores a transient DB failure
 * as "not found" (which used to 404 pages until they were re-saved).
 */
async function queryWithRetry<T>(label: string, query: () => Promise<T>): Promise<T> {
  try {
    return await query()
  } catch (firstError) {
    console.warn(`${label} failed, retrying once:`, firstError)
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
    try {
      return await query()
    } catch (error) {
      console.error(`${label} failed after retry:`, error)
      throw error
    }
  }
}

/**
 * Fetch a page by slug. Returns null only when no page matches.
 */
async function fetchPage(slug: string, depth = 2, draft = false): Promise<Page | null> {
  return queryWithRetry(`Fetch page with slug "${slug}"`, async () => {
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
  })
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

async function fetchBlogsByCategories(
  categories: string[],
  limit = 12,
  draft = false,
): Promise<Blog[]> {
  return queryWithRetry(`Fetch blogs for categories "${categories.join(', ')}"`, async () => {
    const payload = await getPayloadClient()

    const { docs } = await payload.find({
      collection: 'blogs',
      where: { category: { in: categories } },
      draft,
      sort: '-publishedAt',
      limit,
      pagination: false,
    })

    return JSON.parse(JSON.stringify(docs)) as Blog[]
  })
}

export async function getBlogsByCategories(categories: string[], limit = 12): Promise<Blog[]> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchBlogsByCategories(categories, limit, true)

  const cacheKey = ['payload:getBlogsByCategories', categories.join(','), limit.toString()]
  const cached = unstable_cache(() => fetchBlogsByCategories(categories, limit, false), cacheKey, {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.blogs, ...categories.map((category) => cacheTags.blogCategory(category))],
  })

  return cached()
}

/**
 * Fetch a single blog by slug. Returns null only when no blog matches.
 */
async function fetchBlogBySlug(slug: string, depth = 2, draft = false): Promise<Blog | null> {
  return queryWithRetry(`Fetch blog with slug "${slug}"`, async () => {
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
  })
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
  return queryWithRetry('Fetch header', async () => {
    const payload = await getPayloadClient()
    const header = (await payload.findGlobal({
      slug: 'header',
      depth: 2,
      draft,
    })) as Header

    return JSON.parse(JSON.stringify(header)) ?? null
  })
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
  return queryWithRetry('Fetch footer', async () => {
    const payload = await getPayloadClient()
    const footer = (await payload.findGlobal({
      slug: 'footer',
      depth: 2,
      draft,
    })) as Footer

    return JSON.parse(JSON.stringify(footer)) ?? null
  })
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
 * Fetch education hub global
 */
async function fetchEducationHub(draft = false): Promise<EducationHub | null> {
  return queryWithRetry('Fetch education hub', async () => {
    const payload = await getPayloadClient()
    const educationHub = (await payload.findGlobal({
      slug: 'education-hub',
      depth: 2,
      draft,
    })) as EducationHub

    return JSON.parse(JSON.stringify(educationHub)) ?? null
  })
}

export async function getEducationHub(): Promise<EducationHub | null> {
  const { isEnabled } = await draftMode()
  if (isEnabled) return fetchEducationHub(true)

  const cached = unstable_cache(() => fetchEducationHub(false), ['payload:getEducationHub'], {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [cacheTags.educationHub],
  })

  return cached()
}
