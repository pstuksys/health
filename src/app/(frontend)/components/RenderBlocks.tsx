import React, { JSX } from 'react'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { ContentBlock } from './content-block/component'
import { CardSection } from './card-section/component'
import { MediaBlock } from './media-block/component'
import { CTABlock } from './cta-block/component'
import { AboutUsSection } from './about-us-section/component'
import { PartnersBlock } from './partners-block/component'
import { PartnersTextBlock } from './partners-text-block/component'
import { ExpandableTable } from './expandable-table/component'
import { Testimonials } from './testimonials/component'
import { BlogPostCards } from './blog-post-cards/component'
import { Carousel } from './carousel/component'
import { ScrollPostCards } from './scroll-post-cards/component'
import { ScrollableCards } from './scrollable-cards/component'
import { TwoCardBlock } from './two-card-block'
import { TeamCards } from './team-cards/component'
import { FullWidthBanner } from './full-width-banner/component'
import { ParallaxHero } from './parallax-hero/component'
import { SingleCard } from './single-card/component'

type PageBlock = NonNullable<Page['blocks']>[number]

export const blockComponents: Record<string, (block: unknown) => JSX.Element> = {
  contentBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'contentBlock' }>
    return <ContentBlock {...b} />
  },
  cardSection: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'cardSection' }>
    return <CardSection {...b} />
  },
  mediaBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'mediaBlock' }>
    return <MediaBlock {...b} />
  },
  ctaBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'ctaBlock' }>
    return <CTABlock {...b} />
  },
  aboutUsSection: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'aboutUsSection' }>
    return <AboutUsSection {...b} />
  },
  partnersBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'partnersBlock' }>
    return <PartnersBlock {...b} />
  },
  partnersTextBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'partnersTextBlock' }>
    return <PartnersTextBlock {...b} />
  },
  expandableTable: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'expandableTable' }>
    return <ExpandableTable {...b} />
  },
  testimonials: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'testimonials' }>
    return <Testimonials {...b} />
  },
  teamCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'teamCards' }>
    return <TeamCards {...b} />
  },
  blogPostCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'blogPostCards' }>
    return <BlogPostCards {...(b as any)} />
  },
  scrollPostCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'scrollPostCards' }>
    return <ScrollPostCards {...b} />
  },
  carousel: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'carousel' }>
    return <Carousel {...b} />
  },
  scrollableCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'scrollableCards' }>
    return <ScrollableCards {...b} />
  },
  singleCard: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'singleCard' }>
    return <SingleCard {...b} />
  },
  fullWidthBanner: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'fullWidthBanner' }>
    return <FullWidthBanner {...b} />
  },
  parallaxHero: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'parallaxHero' }>
    return <ParallaxHero {...b} />
  },
  twoCardBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'twoCardBlock' }>
    return <TwoCardBlock {...b} />
  },
}

export function RenderBlocks({ blocks }: { blocks: Page['blocks'] | null | undefined }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer
          key={(block as { id?: string }).id ?? `${block.blockType}-${index}`}
          block={block}
        />
      ))}
    </>
  )
}

function BlockRenderer({ block }: { block: PageBlock }) {
  const renderer = blockComponents[block.blockType]
  if (renderer) return renderer(block)

  // Basic recursion support: if a custom block contains nested `blocks`, render them
  if (
    'blocks' in (block as Record<string, unknown>) &&
    Array.isArray((block as { blocks?: Page['blocks'] }).blocks)
  ) {
    return (
      <div>
        <RenderBlocks blocks={(block as { blocks?: Page['blocks'] }).blocks} />
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ border: '1px dashed #ccc', padding: '1rem', borderRadius: 8 }}>
        Unknown block type: <code>{(block as any).blockType}</code>
      </div>
    </div>
  )
}

export function hasHeroBlock(blocks: Page['blocks'] | null | undefined): boolean {
  return (
    Array.isArray(blocks) &&
    blocks.some((b) => (b as { blockType: string }).blockType === 'heroSection')
  )
}

export function deriveGlobalHeroProps(page: Page) {
  // Ensure consistent rendering between server and client
  const titleHtml = page?.title ? String(page.title).trim() : ''
  // Prefer raw Lexical content for RichText; fallback to plain description string
  const subtitleRaw: Page['content'] | string =
    page?.content ?? (page?.meta?.description ?? '').trim()
  const bg = mediaToUrl((page as any)?.heroBackground ?? (page?.meta?.image as any))

  // Extract hero configuration from Pages collection fields with proper type narrowing
  const rawTextColor = (page as any)?.heroTextColor
  const heroTextColor: 'auto' | 'light' | 'dark' =
    rawTextColor === 'auto' || rawTextColor === 'light' || rawTextColor === 'dark'
      ? rawTextColor
      : 'auto'

  const heroGradientOverlay = Boolean((page as any)?.heroGradientOverlay)

  // Extract CTA button data
  const heroCTAButton = (page as any)?.heroCTAButton
  const heroSecondaryCTA = (page as any)?.heroSecondaryCTA

  // Extract CTA alignment
  const rawCTAAlignment = (page as any)?.heroCTAAlignment
  const heroCTAAlignment: 'left' | 'center' | 'right' =
    rawCTAAlignment === 'left' || rawCTAAlignment === 'center' || rawCTAAlignment === 'right'
      ? rawCTAAlignment
      : 'left'

  // Helper function to resolve internal/external links
  const resolveLink = (buttonData: any): { label: string; href: string } => {
    if (!buttonData) return { label: '', href: '#' }

    const label = buttonData.label || ''

    if (buttonData.linkType === 'external') {
      return { label, href: buttonData.external?.href || '#' }
    }

    // Internal link - resolve to proper URL
    if (buttonData.linkType === 'internal' && buttonData.internal?.relation) {
      const relation = buttonData.internal.relation
      let href = '#'

      if (relation && typeof relation === 'object') {
        const collection = relation.relationTo || relation.collection
        const slug = relation.slug || relation.value?.slug || ''

        if (collection === 'blogs') {
          href = `/blogs/${slug}`
        } else if (collection === 'pages') {
          href = `/${slug}`
        }
      }

      return { label, href }
    }

    return { label, href: '#' }
  }

  const ctaButton = heroCTAButton
    ? {
        label: resolveLink(heroCTAButton).label,
        href: resolveLink(heroCTAButton).href,
        variant: heroCTAButton.variant || 'primary',
      }
    : undefined

  const secondaryCTA = heroSecondaryCTA
    ? {
        label: resolveLink(heroSecondaryCTA).label,
        href: resolveLink(heroSecondaryCTA).href,
      }
    : undefined

  return {
    title: titleHtml,
    subtitle: subtitleRaw,
    backgroundImage: bg,
    ctaButton,
    secondaryCTA,
    gradientOverlay: heroGradientOverlay,
    textColor: heroTextColor,
    ctaAlignment: heroCTAAlignment,
  }
}
