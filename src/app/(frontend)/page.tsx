import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import type { Page, Media } from '@/payload-types'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import { RenderBlocks, deriveGlobalHeroProps } from '@/app/(frontend)/components/RenderBlocks'
import { getHeaderFooter } from '@/lib/cms/globals'

function mediaToUrl(media: number | Media | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  return (
    media.url ??
    media.sizes?.hero?.url ??
    media.sizes?.card?.url ??
    media.sizes?.thumbnail?.url ??
    ''
  )
}

async function getHomePage(draft = false): Promise<Page | null> {
  const payload = await getPayload({ config: (await import('@/payload.config')).default })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: '' } },
    draft,
    limit: 1,
    pagination: false,
    depth: 2,
  })
  const doc = (docs?.[0] as Page | undefined) ?? null
  return JSON.parse(JSON.stringify(doc))
}

// Header/Footer are fetched in layout; keep this page focused on content  rendering

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage(false)
  if (!page) return {}
  const title = page.meta?.title ?? page.title
  const description = page.meta?.description ?? undefined
  const imageUrl = mediaToUrl(page.meta?.image as any)
  return {
    title,
    description,
    openGraph: { title, description, images: imageUrl ? [{ url: imageUrl }] : undefined },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function HomePage() {
  const { isEnabled } = await draftMode()
  const draft = isEnabled
  const page = await getHomePage(draft)

  if (!page) return null

  const showGlobalHero = Boolean(page.showHero)
  const heroProps = deriveGlobalHeroProps(page)

  return (
    <main className="flex flex-col">
      {showGlobalHero && <HeroSection {...heroProps} />}
      <RenderBlocks blocks={page.blocks ?? null} />
    </main>
  )
}
