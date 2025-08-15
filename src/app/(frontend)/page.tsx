import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import type { Page, Media } from '@/payload-types'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import { RenderBlocks, deriveGlobalHeroProps } from '@/app/(frontend)/components/RenderBlocks'
import { getHeaderFooter } from '@/lib/cms/globals'

// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
  try {
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
  } catch (error) {
    console.error('Failed to fetch home page:', error)
    return null
  }
}

// Header/Footer are fetched in layout; keep this page focused on content  rendering

export async function generateMetadata(): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    return {
      title: 'Home',
      description: 'Welcome to our site',
    }
  }
}

export default async function HomePage() {
  try {
    const { isEnabled } = await draftMode()
    const draft = isEnabled
    const page = await getHomePage(draft)

    if (!page) {
      return (
        <main className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome</h1>
          <p className="text-gray-600 mt-2">Content is being loaded...</p>
        </main>
      )
    }

    const showGlobalHero = Boolean(page.showHero)
    const heroProps = deriveGlobalHeroProps(page)

    return (
      <main className="flex flex-col">
        {showGlobalHero && <HeroSection {...heroProps} />}
        <RenderBlocks blocks={page.blocks ?? null} />
      </main>
    )
  } catch (error) {
    console.error('Failed to render home page:', error)
    return (
      <main className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-semibold text-gray-800">Something went wrong</h1>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </main>
    )
  }
}
