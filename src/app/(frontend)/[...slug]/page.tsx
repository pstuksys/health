import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import type { Page, Media } from '@/payload-types'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import {
  RenderBlocks,
  hasHeroBlock,
  deriveGlobalHeroProps,
} from '@/app/(frontend)/components/RenderBlocks'

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

export async function generateMetadata(props: any): Promise<Metadata> {
  const maybeParams = props?.params
  const params = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams
  const slug = params?.slug?.join('/') ?? ''
  const payload = await getPayload({ config: (await import('@/payload.config')).default })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const page = docs[0] as Page | undefined
  if (!page) return {}

  const title = page.meta?.title ?? page.title
  const description = page.meta?.description ?? undefined
  const imageUrl = mediaToUrl(page.meta?.image as any)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function DynamicPage(props: any) {
  const maybeParams = props?.params
  const params = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams
  const slug = params?.slug?.join('/') ?? ''
  const { isEnabled } = await draftMode()
  const draft = isEnabled
  const payload = await getPayload({ config: (await import('@/payload.config')).default })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
    depth: 2,
  })

  const page = JSON?.parse(JSON?.stringify(docs[0] as Page | undefined)) as Page | undefined
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
}
