import type { Metadata } from 'next'
import { HeroSection } from '@/app/(frontend)/components/hero-section/component'
import { RenderBlocks, deriveGlobalHeroProps } from '@/app/(frontend)/components/RenderBlocks'
import { getHomePage, generatePageMetadata, isDraftModeEnabled } from '@/lib/page-utils'

// Force dynamic rendering to prevent build-time database queries that cause PostgreSQL parsing errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Header/Footer are fetched in layout; keep this page focused on content rendering

export async function generateMetadata(): Promise<Metadata> {
  try {
    const isDraft = await isDraftModeEnabled()
    const page = await getHomePage(isDraft)
    return generatePageMetadata(page, {
      title: 'Home',
      description: 'Welcome to our site',
    })
  } catch (error) {
    console.error('Failed to generate home page metadata:', error)
    return {
      title: 'Home',
      description: 'Welcome to our site',
    }
  }
}

export default async function HomePage() {
  try {
    const draft = await isDraftModeEnabled()
    const page = await getHomePage(draft)

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

    // Ensure consistent rendering - avoid hydration mismatches
    return (
      <main className="flex flex-col">
        {showGlobalHero && <HeroSection {...heroProps} />}
        <RenderBlocks blocks={page.blocks ?? null} />
      </main>
    )
  } catch (error) {
    console.error('Failed to render home page:', error)
    // Log additional details for debugging in production
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })
    return (
      <main className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-semibold text-gray-800">Something went wrong</h1>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </main>
    )
  }
}
