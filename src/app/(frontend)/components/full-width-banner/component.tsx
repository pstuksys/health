'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { Page, Media } from '@/payload-types'
import { CMSLink } from '../ui'

type FullWidthBannerProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'fullWidthBanner' }
>

export function FullWidthBanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
  backgroundImage,
}: FullWidthBannerProps) {
  const bgUrl = mediaToUrl(backgroundImage)

  return (
    <section className={cn('relative w-full h-64 lg:h-72 overflow-hidden')}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgUrl})` }}
      >
        <div className="absolute inset-0 bg-ds-dark-blue/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h2 className="text-2xl lg:text-4xl font-light mb-2 max-w-4xl">{title || ''}</h2>
        {subtitle && (
          <p className="text-base lg:text-lg font-light mb-6 max-w-2xl opacity-90">{subtitle}</p>
        )}
        <CMSLink variant="primary" href={buttonHref ?? '#'}>
          {buttonText || ''}
        </CMSLink>
      </div>
    </section>
  )
}
