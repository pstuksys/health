import { memo } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { Media, Page } from '@/payload-types'

type TrustBadgesBlockType = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'trustBadgesBlock' }
>
type Badge = TrustBadgesBlockType['badges'][number]

type TrustBadgesBlockProps = Omit<TrustBadgesBlockType, 'blockType' | 'blockName'> & {
  className?: string
}

const TARGET_HEIGHT = 80

function getLogoUrl(logo: Badge['logo']): string {
  return mediaToUrl(logo) || '/placeholder.svg'
}

function getAltText(logo: Badge['logo']): string {
  return (typeof logo === 'object' && (logo as Media)?.alt) || 'Trust badge'
}

function getDimensions(logo: Badge['logo']): { width: number; height: number } {
  const media = typeof logo === 'object' ? (logo as Media) : null
  const naturalW = media?.width ?? null
  const naturalH = media?.height ?? null
  if (naturalW && naturalH) {
    const ratio = naturalW / naturalH
    return { width: Math.round(TARGET_HEIGHT * ratio), height: TARGET_HEIGHT }
  }
  return { width: 160, height: TARGET_HEIGHT }
}

const BadgeItem = memo(function BadgeItem({ badge }: { badge: Badge }) {
  const { width, height } = getDimensions(badge.logo)

  return (
    <Image
      src={getLogoUrl(badge.logo)}
      alt={getAltText(badge.logo)}
      width={width}
      height={height}
      sizes={`${width}px`}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 select-none"
    />
  )
})

export function TrustBadgesBlock({ badges = [], className }: TrustBadgesBlockProps) {
  const resolvedBadges = badges.filter(Boolean)

  if (!resolvedBadges.length) return null

  const marqueeDuration = Math.max(8, resolvedBadges.length * 2)

  return (
    <section
      aria-label="Trust and compliance badges"
      className={cn('relative overflow-hidden bg-white', className)}
    >

      {/* ── Desktop: static spread ───────────────────────────── */}
      <div
        className="relative z-10 hidden lg:flex max-w-container mx-auto items-center justify-between px-16 py-[120px]"
        role="list"
        aria-label="Compliance certifications"
      >
        {resolvedBadges.map((badge, index) => (
          <div key={badge.id ?? index} role="listitem">
            <BadgeItem badge={badge} />
          </div>
        ))}
      </div>

      {/* ── Tablet / Mobile: seamless marquee ────────────────── */}
      <div className="relative z-10 lg:hidden py-[120px]">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
          }}
        >
          {/* 2 identical groups — animation translates -50% of total = exactly one group width */}
          <div
            className="trust-badges-track flex w-max"
            style={{ '--trust-badges-duration': `${marqueeDuration}s` } as React.CSSProperties}
            role="list"
            aria-label="Compliance certifications"
          >
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                className="flex shrink-0 items-center gap-12 px-6"
                aria-hidden={groupIndex > 0}
              >
                {resolvedBadges.map((badge, index) => (
                  <div
                    key={badge.id ? `${badge.id}-${groupIndex}` : `${groupIndex}-${index}`}
                    role="listitem"
                  >
                    <BadgeItem badge={badge} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
