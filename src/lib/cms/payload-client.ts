import { getPayload } from 'payload'
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
 * Fetch a page by slug with proper error handling
 */
export async function getPage(slug: string, depth = 2): Promise<Page | null> {
  try {
    const payload = await getPayloadClient()
    const { isEnabled } = await draftMode()

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
      draft: isEnabled,
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
export async function getHomePage(depth = 2): Promise<Page | null> {
  return getPage('', depth)
}

/**
 * Fetch blogs with proper error handling
 */
export async function getBlogs(limit = 50): Promise<Blog[]> {
  try {
    const payload = await getPayloadClient()
    const { isEnabled } = await draftMode()

    const { docs } = await payload.find({
      collection: 'blogs',
      draft: isEnabled,
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
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug: string, depth = 2): Promise<Blog | null> {
  try {
    const payload = await getPayloadClient()
    const { isEnabled } = await draftMode()

    const { docs } = await payload.find({
      collection: 'blogs',
      where: { slug: { equals: slug } },
      draft: isEnabled,
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
 * Fetch header global
 */
export async function getHeader(): Promise<Header | null> {
  try {
    const payload = await getPayloadClient()
    const header = (await payload.findGlobal({ slug: 'header', depth: 2 })) as Header

    // Strip any circular refs coming from the local API internals
    const safe = JSON.parse(JSON.stringify(header))
    return safe ?? null
  } catch (error) {
    console.error('Failed to fetch header:', error)
    return null
  }
}

/**
 * Fetch footer global
 */
export async function getFooter(): Promise<Footer | null> {
  try {
    const payload = await getPayloadClient()
    const footer = (await payload.findGlobal({ slug: 'footer', depth: 2 })) as Footer

    // Strip any circular refs coming from the local API internals
    const safe = JSON.parse(JSON.stringify(footer))
    return safe ?? null
  } catch (error) {
    console.error('Failed to fetch footer:', error)
    return null
  }
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
