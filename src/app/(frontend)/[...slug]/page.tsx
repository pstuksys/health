import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import {
  RenderBlocks,
  hasHeroBlock,
  deriveGlobalHeroProps,
} from '@/app/(frontend)/components/RenderBlocks'
import { getPage, generateMetadataBySlug } from '@/lib/page-utils'

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
  try {
    const params = await props.params
    const slug = params?.slug?.join('/') ?? ''

    return await generateMetadataBySlug(slug, {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    })
  } catch (error) {
    console.error('Failed to generate metadata for dynamic page:', error)
    return {
      title: 'Error',
      description: 'An error occurred while loading the page.',
    }
  }
}

export default async function DynamicPage(props: { params: Promise<{ slug: string[] }> }) {
  try {
    const params = await props.params
    const slug = params?.slug?.join('/') ?? ''

    // Filter out system requests that should not be handled by this route
    if (isSystemRequest(slug)) {
      // Silently return notFound() for system requests to avoid console spam
      notFound()
    }

    const page = await getPage(slug, 2) // depth = 2 for full page data

    if (!page) {
      // Only log warnings for actual page requests, not system files
      if (!slug.includes('.') && !slug.startsWith('_')) {
        console.warn(`Page not found for slug: ${slug}`)
      }
      return notFound()
    }

    const renderHeroFromBlocks = hasHeroBlock(page.blocks)
    const heroProps = deriveGlobalHeroProps(page)
    const showGlobalHero = Boolean(page.showHero)

    return (
      <main className="flex flex-col">
        {!renderHeroFromBlocks && showGlobalHero && <HeroSection {...heroProps} />}
        <RenderBlocks blocks={page.blocks ?? null} />
      </main>
    )
  } catch (error) {
    // Don't log detailed errors for system requests or filtered requests
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    if (errorMessage.includes('NEXT_HTTP_ERROR_FALLBACK')) {
      // This is a normal 404, don't spam the console
      return notFound()
    }

    console.error('Failed to render dynamic page:', error)
    try {
      const params = await props.params
      const slug = params?.slug?.join('/') ?? ''

      // Only log detailed errors for actual page requests, not system files
      if (!isSystemRequest(slug)) {
        console.error('Error details:', {
          message: errorMessage,
          stack: error instanceof Error ? error.stack : undefined,
          slug: params?.slug,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (_paramError) {
      console.error('Error details (params failed):', {
        message: errorMessage,
        timestamp: new Date().toISOString(),
      })
    }
    return notFound()
  }
}
