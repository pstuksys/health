'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { CMSLink } from '../ui/cms-link'

// Extract the singleCard block type from the Page blocks union
type SingleCardBlock = Extract<NonNullable<Page['blocks']>[number], { blockType: 'singleCard' }>

export function SingleCard({
  title,
  subtitle,
  image,
  imagePosition = 'left',
  enableBackground = false,
  linkType,
  internal,
  external,
  cta,
}: Pick<
  SingleCardBlock,
  | 'title'
  | 'subtitle'
  | 'image'
  | 'imagePosition'
  | 'enableBackground'
  | 'linkType'
  | 'internal'
  | 'external'
  | 'cta'
>) {
  const imageUrl = mediaToUrl(image as any)

  let href: string | undefined
  if (linkType === 'external') href = external?.href ?? '#'
  else if (internal?.relation) {
    const rel = internal.relation
    const doc = (rel as any).value ?? rel
    const slug = doc?.slug ?? ''
    const collection = doc?.collection ?? (rel as any)?.relationTo
    if (collection === 'blogs') href = `/blogs/${slug}`
    else if (collection === 'pages') href = `/${slug}`
  }

  return (
    <section className={cn('py-12 px-4')}>
      <div className="max-w-container mx-auto">
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl p-6',
            enableBackground && 'border bg-[#f3f5f7]',
          )}
        >
          <div
            className={cn(
              'relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl',
              imagePosition === 'right' && 'md:order-2',
            )}
          >
            {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
          </div>
          <div className={cn(imagePosition === 'right' && 'md:order-1')}>
            <h3 className="text-2xl md:text-3xl font-light text-ds-dark-blue mb-4">{title}</h3>
            {subtitle && (
              <p className="text-ds-pastille-green font-light leading-relaxed mb-6">
                {subtitle as any}
              </p>
            )}
            {href && cta?.text && (
              <CMSLink href={href} variant={(cta?.variant as any) ?? 'primary'}>
                {cta.text}
              </CMSLink>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
