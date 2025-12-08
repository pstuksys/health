import { memo } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { Media, Page } from '@/payload-types'

type PartnersBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'partnersBlock' }
>
type PartnerLogoMedia = PartnersBlockType['partners'][number]['logo']
type Partner = PartnersBlockType['partners'][number]

type PartnersBlockProps = Omit<PartnersBlockType, 'blockType' | 'blockName'> & {
  className?: string
}

function isSvg(logo: PartnerLogoMedia): logo is Media {
  if (typeof logo !== 'object' || !logo?.filename) return false
  return logo.filename.toLowerCase().endsWith('.svg')
}

function getAltText(logo: PartnerLogoMedia): string {
  return (typeof logo === 'object' && logo?.alt) || 'Partner logo'
}

const PartnerLogo = memo(function PartnerLogo({ partner }: { partner: Partner }) {
  const svgLogo = isSvg(partner.logo)

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center p-2',
        svgLogo ? 'h-20 w-40' : 'h-24 w-48',
      )}
    >
      <Image
        src={mediaToUrl(partner.logo) || '/placeholder.svg'}
        alt={getAltText(partner.logo)}
        width={svgLogo ? 160 : 192}
        height={svgLogo ? 80 : 96}
        sizes="192px"
        loading="lazy"
        decoding="async"
        className={cn(
          'object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0',
          svgLogo ? 'max-h-full max-w-full' : 'h-full w-full',
        )}
        draggable={false}
      />
    </div>
  )
})

export function PartnersBlock({ id, title, partners = [], className }: PartnersBlockProps) {
  const resolvedPartners = partners.filter(Boolean)

  if (!resolvedPartners.length) {
    return null
  }

  const marqueeDuration = Math.max(20, resolvedPartners.length * 4)

  return (
    <section id={id || 'PartnersBlock'} className={cn('py-6 px-4', className)}>
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center mb-12">
          {title}
        </h2>
        {/* Marquee container with mask-based fade edges (adapts to any background) */}
        <div
          className="relative overflow-hidden"
          style={{
            contain: 'layout style paint',
            maskImage:
              'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
          }}
        >
          {/* Animated track: contains two identical content groups for seamless loop */}
          <div
            className="partners-marquee-track flex w-fit"
            style={{ animationDuration: `${marqueeDuration}s` }}
            role="list"
            aria-label="Partner logos"
          >
            {/* Render 3 identical content groups for truly seamless infinite scroll */}
            {[0, 1, 2].map((groupIndex) => (
              <div
                key={groupIndex}
                className="flex shrink-0 items-center gap-8 pr-8"
                aria-hidden={groupIndex > 0}
              >
                {resolvedPartners.map((partner, index) => (
                  <PartnerLogo
                    key={partner.id ? `${partner.id}-${groupIndex}` : `${groupIndex}-${index}`}
                    partner={partner}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
