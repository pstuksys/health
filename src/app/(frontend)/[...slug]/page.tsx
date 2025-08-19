import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Page } from '@/payload-types'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import {
  RenderBlocks,
  hasHeroBlock,
  deriveGlobalHeroProps,
} from '@/app/(frontend)/components/RenderBlocks'
import { getPage, generateMetadataBySlug, isDraftModeEnabled } from '@/lib/page-utils'

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

    // Filter out Chrome DevTools and browser requests to reduce noise
    if (
      slug.includes('.well-known') ||
      slug.includes('devtools') ||
      slug.includes('chrome-extension')
    ) {
      return notFound()
    }

    const draft = await isDraftModeEnabled()
    const page = await getPage(slug, draft)

    if (!page) {
      console.warn(`Page not found for slug: ${slug}`)
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
    console.error('Failed to render dynamic page:', error)
    try {
      const params = await props.params
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        slug: params?.slug,
        timestamp: new Date().toISOString(),
      })
    } catch (paramError) {
      console.error('Error details (params failed):', {
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      })
    }
    return notFound()
  }
}
