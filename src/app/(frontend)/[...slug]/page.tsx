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

export async function generateMetadata(props: any): Promise<Metadata> {
  try {
    const maybeParams = props?.params
    const params = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams
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

export default async function DynamicPage(props: any) {
  try {
    const maybeParams = props?.params
    const params = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams
    const slug = params?.slug?.join('/') ?? ''
    const draft = await isDraftModeEnabled()
    const page = await getPage(slug, draft)

    if (!page) return notFound()

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
    return notFound()
  }
}
