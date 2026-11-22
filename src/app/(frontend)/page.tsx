import type { Metadata } from 'next'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import { RenderBlocks, deriveGlobalHeroProps } from '@/app/(frontend)/components/RenderBlocks'
import { getHomePage, generatePageMetadata } from '@/lib/page-utils'

export const revalidate = 86400

// Header/Footer are fetched in layout; keep this page focused on content rendering

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  return generatePageMetadata(page, {
    title: 'Home',
    description: 'Welcome to our site',
  })
}

// CMS errors are not caught here: rendering a fallback would be ISR-cached for
// a day, while a thrown error goes to error.tsx and the next request retries.
export default async function HomePage() {
  const page = await getHomePage()

  if (!page) {
    console.warn('Home page not found in CMS')
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
}
