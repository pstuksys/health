import React, { JSX } from 'react'
import type { Page, Media } from '@/payload-types'
import { ContentBlock } from './content-block/component'
import { CardSection } from './card-section/component'
import { MediaBlock } from './media-block/component'
import { CTABlock } from './cta-block/component'
import { AboutUsSection } from './about-us-section/component'
import { PartnersBlock } from './partners-block/component'
import { BlogPostCards } from './blog-post-cards/component'
import { Carousel } from './carousel/component'
import { HeroSection } from './hero-section/component'

type PageBlock = NonNullable<Page['blocks']>[number]

function mediaToUrl(media: number | Media | null | undefined): string {
  if (!media || typeof media === 'number') return ''
  if (media.sizes?.hero?.url) return media.sizes.hero.url ?? ''
  if (media.sizes?.card?.url) return media.sizes.card.url ?? ''
  if (media.sizes?.thumbnail?.url) return media.sizes.thumbnail.url ?? ''
  return media.url ?? ''
}

function lexicalToHtml(value: unknown): string {
  if (!value || typeof value !== 'object' || !('root' in (value as Record<string, unknown>)))
    return ''
  const root = (value as { root?: unknown }).root as any
  if (!root || typeof root !== 'object' || !Array.isArray(root.children)) return ''

  const serializeNode = (node: any): string => {
    if (!node) return ''
    switch (node.type) {
      case 'paragraph': {
        const children = Array.isArray(node.children)
          ? node.children.map(serializeNode).join('')
          : ''
        return children ? `<p>${children}</p>` : '<p />'
      }
      case 'heading': {
        const level = typeof node.tag === 'string' && /^h[1-6]$/.test(node.tag) ? node.tag : 'h2'
        const children = Array.isArray(node.children)
          ? node.children.map(serializeNode).join('')
          : ''
        return `<${level}>${children}</${level}>`
      }
      case 'text': {
        let text: string = node.text ?? ''
        if (node.format) {
          const isBold = (node.format & 1) === 1
          const isItalic = (node.format & 2) === 2
          const isUnderline = (node.format & 4) === 4
          if (isBold) text = `<strong>${text}</strong>`
          if (isItalic) text = `<em>${text}</em>`
          if (isUnderline) text = `<u>${text}</u>`
        }
        return text
      }
      case 'link': {
        const children = Array.isArray(node.children)
          ? node.children.map(serializeNode).join('')
          : ''
        const href = typeof node.url === 'string' ? node.url : '#'
        const rel = node.rel ? ` rel="${node.rel}"` : ''
        const target = node.target ? ` target="${node.target}"` : ''
        return `<a href="${href}"${rel}${target}>${children}</a>`
      }
      case 'list': {
        const tag = node.listType === 'number' || node.listType === 'ordered' ? 'ol' : 'ul'
        const children = Array.isArray(node.children)
          ? node.children.map(serializeNode).join('')
          : ''
        return `<${tag}>${children}</${tag}>`
      }
      case 'listitem': {
        const children = Array.isArray(node.children)
          ? node.children.map(serializeNode).join('')
          : ''
        return `<li>${children}</li>`
      }
      case 'linebreak':
        return '<br />'
      default: {
        const children = Array.isArray(node.children)
          ? node.children.map(serializeNode).join('')
          : ''
        return children
      }
    }
  }

  return root.children.map(serializeNode).join('')
}

export const blockComponents: Record<string, (block: unknown) => JSX.Element> = {
  contentBlock: (block) => (
    <ContentBlock
      title={(block as Extract<PageBlock, { blockType: 'contentBlock' }>).title}
      content={lexicalToHtml((block as Extract<PageBlock, { blockType: 'contentBlock' }>).content)}
      layout={(block as Extract<PageBlock, { blockType: 'contentBlock' }>).layout ?? 'full'}
      image={mediaToUrl(
        (block as Extract<PageBlock, { blockType: 'contentBlock' }>).image as unknown as Media,
      )}
      imagePosition={
        (block as Extract<PageBlock, { blockType: 'contentBlock' }>).imagePosition ?? 'right'
      }
    />
  ),
  cardSection: (block) => (
    <CardSection
      columns={(block as Extract<PageBlock, { blockType: 'cardSection' }>).columns ?? 3}
      cards={((block as Extract<PageBlock, { blockType: 'cardSection' }>).cards ?? []).map(
        (card) => ({
          image: mediaToUrl(card.image as unknown as Media),
          title: card.title,
          text: card.text ?? '',
          href: card.href ?? '#',
        }),
      )}
    />
  ),
  mediaBlock: (block) => (
    <MediaBlock
      image={mediaToUrl(
        (block as Extract<PageBlock, { blockType: 'mediaBlock' }>).image as unknown as Media,
      )}
      imagePosition={
        (block as Extract<PageBlock, { blockType: 'mediaBlock' }>).imagePosition ?? 'left'
      }
      title={(block as Extract<PageBlock, { blockType: 'mediaBlock' }>).title}
      content={lexicalToHtml((block as Extract<PageBlock, { blockType: 'mediaBlock' }>).content)}
      ctaButton={
        (block as Extract<PageBlock, { blockType: 'mediaBlock' }>).ctaButton
          ? {
              label:
                (block as Extract<PageBlock, { blockType: 'mediaBlock' }>).ctaButton?.label ?? '',
              href:
                (block as Extract<PageBlock, { blockType: 'mediaBlock' }>).ctaButton?.href ?? '#',
            }
          : undefined
      }
      backgroundColor={
        (block as Extract<PageBlock, { blockType: 'mediaBlock' }>).backgroundColor ?? 'default'
      }
    />
  ),
  ctaBlock: (block) => (
    <CTABlock
      title={lexicalToHtml((block as Extract<PageBlock, { blockType: 'ctaBlock' }>).title)}
      description={lexicalToHtml(
        (block as Extract<PageBlock, { blockType: 'ctaBlock' }>).description,
      )}
      ctaButton={{
        label: (block as Extract<PageBlock, { blockType: 'ctaBlock' }>).ctaButton.label,
        href: (block as Extract<PageBlock, { blockType: 'ctaBlock' }>).ctaButton.href,
      }}
      align={(block as Extract<PageBlock, { blockType: 'ctaBlock' }>).align ?? 'center'}
      variant={(block as Extract<PageBlock, { blockType: 'ctaBlock' }>).variant ?? 'default'}
    />
  ),
  aboutUsSection: (block) => (
    <AboutUsSection
      title={(block as Extract<PageBlock, { blockType: 'aboutUsSection' }>).title}
      content={lexicalToHtml(
        (block as Extract<PageBlock, { blockType: 'aboutUsSection' }>).content,
      )}
      image={mediaToUrl(
        (block as Extract<PageBlock, { blockType: 'aboutUsSection' }>).image as unknown as Media,
      )}
      ctaButton={
        (block as Extract<PageBlock, { blockType: 'aboutUsSection' }>).ctaButton
          ? {
              label:
                (block as Extract<PageBlock, { blockType: 'aboutUsSection' }>).ctaButton?.label ??
                '',
              href:
                (block as Extract<PageBlock, { blockType: 'aboutUsSection' }>).ctaButton?.href ??
                '#',
            }
          : undefined
      }
    />
  ),
  partnersBlock: (block) => (
    <PartnersBlock
      layout={(block as Extract<PageBlock, { blockType: 'partnersBlock' }>).layout ?? 'grid'}
      partners={((block as Extract<PageBlock, { blockType: 'partnersBlock' }>).partners ?? []).map(
        (p) => ({
          logo: mediaToUrl(p.logo as unknown as Media),
          name: p.name,
          href: p.href ?? undefined,
        }),
      )}
    />
  ),
  blogPostCards: (block) => (
    <BlogPostCards
      posts={((block as Extract<PageBlock, { blockType: 'blogPostCards' }>).posts ?? []).map(
        (p) => ({
          image: mediaToUrl(p.image as unknown as Media),
          title: p.title,
          excerpt: p.excerpt ?? '',
          href: p.href,
          date: p.date ?? undefined,
          author: p.author ?? undefined,
        }),
      )}
    />
  ),
  carousel: (block) => (
    <Carousel
      items={((block as Extract<PageBlock, { blockType: 'carousel' }>).items ?? []).map((i) => ({
        image: mediaToUrl(i.image as unknown as Media),
        title: i.title ?? undefined,
        description: i.description ?? undefined,
        href: i.href ?? undefined,
      }))}
      slidesToShow={(block as Extract<PageBlock, { blockType: 'carousel' }>).slidesToShow ?? 3}
      autoplay={(block as Extract<PageBlock, { blockType: 'carousel' }>).autoplay ?? false}
      autoplayInterval={
        (block as Extract<PageBlock, { blockType: 'carousel' }>).autoplayInterval ?? 5000
      }
      showArrows={(block as Extract<PageBlock, { blockType: 'carousel' }>).showArrows ?? true}
      showDots={(block as Extract<PageBlock, { blockType: 'carousel' }>).showDots ?? true}
    />
  ),
  heroSection: (block) => {
    const b = block as {
      backgroundImage?: Media | number | null
      title?: unknown
      subtitle?: unknown
      align?: 'left' | 'center' | 'right'
      ctaButton?: { label?: string; href?: string; variant?: 'primary' | 'secondary' } | null
      secondaryCTA?: { label?: string; href?: string } | null
      gradientOverlay?: boolean
    }
    const bgUrl = mediaToUrl(b.backgroundImage as unknown as Media)
    const cta = b.ctaButton ?? undefined
    const secondary = b.secondaryCTA ?? undefined
    return (
      <HeroSection
        title={lexicalToHtml(b.title)}
        subtitle={lexicalToHtml(b.subtitle)}
        align={b.align ?? 'center'}
        backgroundImage={bgUrl}
        ctaButton={
          cta
            ? { label: cta.label ?? '', href: cta.href ?? '#', variant: cta.variant ?? 'primary' }
            : undefined
        }
        secondaryCTA={
          secondary
            ? { label: secondary.label ?? '', href: secondary.href ?? '#', variant: 'secondary' }
            : undefined
        }
        gradientOverlay={b.gradientOverlay ?? false}
      />
    )
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
  return Array.isArray(blocks) && blocks.some((b) => b.blockType === 'heroSection')
}

export function deriveGlobalHeroProps(page: Page) {
  const titleHtml = page.title ? String(page.title) : ''
  const subtitleHtml = page.content ? lexicalToHtml(page.content) : (page.meta?.description ?? '')
  const bg = mediaToUrl(page.meta?.image as any)
  return {
    title: titleHtml,
    subtitle: subtitleHtml,
    backgroundImage: bg,
    align: 'center' as const,
    gradientOverlay: true,
  }
}
