'use client'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/app/(frontend)/components/ui/cms-link'
import { resolveLinkHref } from '@/lib/navigation'
import Image from 'next/image'
import { mediaToUrl } from '@/lib/media'
import { cn } from '@/lib/utils'

type HighlightSectionBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'highlightSectionBlock' }
> & { className?: string }

export default function HighlightSectionBlock(props: HighlightSectionBlockProps) {
  const { className } = props
  const title = props.title ?? ''
  const description = props.description ?? ''
  const cta = props.cta
  const image = props.image
  const overlay = props.overlayText

  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="max-w-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-light mb-6 text-ds-dark-blue">{title}</h2>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-ds-pastille-green">
              {description}
            </p>
            {cta?.label && (
              <CMSLink
                href={resolveLinkHref({
                  linkType: (cta as any)?.linkType,
                  internal: (cta as any)?.internal,
                  external: (cta as any)?.external,
                })}
                variant="primary"
                size="lg"
                className="text-lg font-semibold px-8 py-4 w-full sm:w-auto"
                external={(cta as any)?.linkType === 'external'}
              >
                {cta.label}
              </CMSLink>
            )}
          </div>

          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border border-ds-accent-yellow">
                <Image
                  src={mediaToUrl(image) || '/placeholder.svg'}
                  alt={title || 'Highlight image'}
                  fill
                  sizes="(max-width: 1024px) 24rem, 28rem"
                  className="object-cover"
                />
                {overlay && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-6">
                    <div className="text-white text-center">
                      <div className="text-xl md:text-2xl font-semibold">{overlay.main}</div>
                      {overlay.subtitle && (
                        <div className="text-xs md:text-sm opacity-90">{overlay.subtitle}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
