import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import {
  RenderBlocks,
  hasHeroBlock,
  deriveGlobalHeroProps,
} from '@/app/(frontend)/components/RenderBlocks'
import { getPage, generateMetadataBySlug } from '@/lib/page-utils'
import type { Page } from '@/payload-types'

/**
 * Check if a slug should be handled by the dynamic page route
 * Returns true if it's a system/asset request that should be filtered out
 */
function isSystemRequest(slug: string): boolean {
  const systemPatterns = [
    // Browser/DevTools requests
    '.well-known',
    'devtools',
    'chrome-extension',

    // Next.js internal
    '_next/',

    // Static assets
    '.js.map',
    '.css.map',
    '.js',
    '.css',

    // Images
    '.ico',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',

    // Fonts
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',

    // Common files
    'favicon',
    'robots.txt',
    'sitemap.xml',
    'manifest.json',
  ]

  return systemPatterns.some((pattern) =>
    pattern.startsWith('.') && pattern.includes('/')
      ? slug.startsWith(pattern.slice(1)) // Remove dot for startsWith check
      : pattern.startsWith('.')
        ? slug.endsWith(pattern)
        : slug.includes(pattern),
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const slug = params?.slug?.join('/') ?? ''

  return generateMetadataBySlug(slug, {
    title: 'Page Not Found',
    description: 'The requested page could not be found.',
  })
}

export default async function DynamicPage(props: { params: Promise<{ slug: string[] }> }) {
  const page = await loadPage(props)
  const renderHeroFromBlocks = hasHeroBlock(page.blocks)
  const heroProps = deriveGlobalHeroProps(page)
  const showGlobalHero = Boolean(page.showHero)

  return (
    <main className="flex flex-col">
      {!renderHeroFromBlocks && showGlobalHero && <HeroSection {...heroProps} />}
      <RenderBlocks blocks={page.blocks ?? null} />
    </main>
  )
}

/**
 * Only a missing page is a 404. CMS/DB errors propagate to error.tsx so a
 * transient failure isn't cached as "not found".
 */
async function loadPage(props: { params: Promise<{ slug: string[] }> }): Promise<Page> {
  const params = await props.params
  const slug = params?.slug?.join('/') ?? ''

  // Filter out system requests that should not be handled by this route
  if (isSystemRequest(slug)) {
    notFound()
  }

  const page = await getPage(slug, 2) // depth = 2 for full page data

  if (!page) {
    // Only log warnings for actual page requests, not system files
    if (!slug.includes('.') && !slug.startsWith('_')) {
      console.warn(`Page not found for slug: ${slug}`)
    }
    notFound()
  }

  return page
}
