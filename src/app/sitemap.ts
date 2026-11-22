import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/cms/payload-client'
import { CACHE_REVALIDATE_SECONDS, cacheTags } from '@/lib/cache-tags'
import { ALL_HUB_TOPICS } from '@/lib/education-hub/constants'

// Built per request from the cached query below, so publishing a page or
// article updates the sitemap without a redeploy.
export const dynamic = 'force-dynamic'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')

type Entry = { path: string; lastModified?: string }

/** Editors sometimes save slugs with stray spaces or slashes. */
function cleanSlug(slug: string | null | undefined): string {
  return (slug ?? '').trim().replace(/^\/+|\/+$/g, '')
}

const getEntries = unstable_cache(
  async (): Promise<Entry[]> => {
    const payload = await getPayloadClient()

    const [pages, blogs] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { _status: { equals: 'published' } },
        select: { slug: true, updatedAt: true },
        depth: 0,
        pagination: false,
      }),
      payload.find({
        collection: 'blogs',
        // External articles redirect off-site, so they don't belong in our sitemap
        where: {
          and: [{ _status: { equals: 'published' } }, { linkType: { not_equals: 'external' } }],
        },
        select: { slug: true, updatedAt: true },
        depth: 0,
        pagination: false,
      }),
    ])

    return [
      ...pages.docs.map((page) => ({
        path: '/' + cleanSlug(page.slug),
        lastModified: page.updatedAt,
      })),
      { path: '/education-hub' },
      ...ALL_HUB_TOPICS.map((topic) => ({ path: `/education-hub/topics/${topic.id}` })),
      ...blogs.docs
        .filter((blog) => cleanSlug(blog.slug))
        .map((blog) => ({
          path: `/education-hub/${cleanSlug(blog.slug)}`,
          lastModified: blog.updatedAt,
        })),
    ]
  },
  ['sitemap'],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: [cacheTags.pages, cacheTags.blogs] },
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getEntries()
  const seen = new Set<string>()

  return entries
    .filter((entry) => !seen.has(entry.path) && seen.add(entry.path))
    .map((entry) => ({
      url: `${siteUrl}${entry.path === '/' ? '' : entry.path}`,
      lastModified: entry.lastModified,
    }))
}
