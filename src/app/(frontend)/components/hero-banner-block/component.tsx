'use client'

import Image from 'next/image'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { cn } from '@/lib/utils'

type HeroBannerBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'heroBannerBlock' }
> & {
  className?: string
}

export default function HeroBannerBlock(props: HeroBannerBlockProps) {
  const { className } = props
  const title = props.title ?? ''
  const paragraphs = Array.isArray(props.paragraphs) ? props.paragraphs : []
  const image = props.image

  return (
    <section className={cn('relative overflow-hidden py-20 lg:py-32 bg-white', className)}>
      <div className="max-w-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-light mb-6 text-ds-dark-blue text-pretty">
              {title}
            </h1>
            <div className="text-lg leading-relaxed space-y-4 text-ds-pastille-green">
              {paragraphs.map((p, index) => (
                <p key={index}>{p?.text ?? ''}</p>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src={mediaToUrl(image) || '/placeholder.svg'}
                  alt={title || 'Hero image'}
                  fill
                  sizes="(max-width: 1024px) 20rem, 24rem"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 bg-ds-accent-yellow" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full opacity-30 bg-ds-dark-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
