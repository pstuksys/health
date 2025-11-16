'use client'

import { memo, useMemo } from 'react'
import { CheckCircle, Users, Shield, TrendingUp, Clock } from 'lucide-react'
import Image from 'next/image'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { resolveLinkHref } from '@/lib/navigation'
import { CMSLink } from '../ui'
import { AnimatedCounter } from '../ui/animated-counter'

// Icon mapping for better performance
const iconMap = {
  users: Users,
  'trending-up': TrendingUp,
  shield: Shield,
  'check-circle': CheckCircle,
  clock: Clock,
} as const

type IconKey = keyof typeof iconMap

type CorporateHealthProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'corporateHealth' }
>

export const CorporateHealth = memo(function CorporateHealth({
  heroSection,
  whyFocusSection,
  servicesSection,
}: CorporateHealthProps) {
  const heroImageUrl = mediaToUrl(heroSection?.image)

  // Memoize resolved links for performance
  const heroCtaHref = useMemo(() => {
    if (!heroSection?.ctaButton) return '#'
    return resolveLinkHref({
      linkType: heroSection.ctaButton.linkType,
      internal: heroSection.ctaButton.internal
        ? {
            relation: {
              relationTo: 'pages',
              value: heroSection.ctaButton.internal,
            },
          }
        : undefined,
      external: heroSection.ctaButton.external
        ? {
            href: heroSection.ctaButton.external,
          }
        : undefined,
    })
  }, [heroSection?.ctaButton])

  const servicesCtaHref = useMemo(() => {
    if (!servicesSection?.ctaButton) return '#'
    return resolveLinkHref({
      linkType: servicesSection.ctaButton.linkType,
      internal: servicesSection.ctaButton.internal
        ? {
            relation: {
              relationTo: 'pages',
              value: servicesSection.ctaButton.internal,
            },
          }
        : undefined,
      external: servicesSection.ctaButton.external
        ? {
            href: servicesSection.ctaButton.external,
          }
        : undefined,
    })
  }, [servicesSection?.ctaButton])

  const leftServices = servicesSection?.leftServices || []
  const rightServices = servicesSection?.rightServices || []
  const servicesRowCount = Math.max(leftServices.length, rightServices.length)

  return (
    <div className="min-h-screen bg-ds-light-neutral">
      {/* Hero Section */}
      <section className="max-w-container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={heroImageUrl || '/placeholder.svg'}
                alt={heroSection?.imageAlt || 'Professional workplace wellness and sleep health'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-ds-dark-blue leading-tight">
              {heroSection?.title}
            </h1>
            <div className="bg-ds-pastille-green/10 border-l-4 border-ds-accent-yellow p-4 rounded-r-lg">
              <p className="text-xl font-semibold text-ds-dark-blue italic">{heroSection?.quote}</p>
            </div>
            <p className="text-lg text-ds-pastille-green leading-relaxed font-light">
              {heroSection?.description}
            </p>
            {heroSection?.ctaButton && (
              <CMSLink
                href={heroCtaHref}
                variant="primary"
                size="lg"
                className="px-8 py-3 text-lg"
                external={heroSection.ctaButton.linkType === 'external'}
              >
                {heroSection.ctaButton.text}
              </CMSLink>
            )}
          </div>
        </div>
      </section>

      {/* Why Focus on Corporate Sleep Health Section */}
      <section className="bg-white py-16">
        <div className="max-w-container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl text-ds-dark-blue font-semibold">
                {whyFocusSection?.title}
              </h2>
              <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
                {whyFocusSection?.description}
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {(whyFocusSection?.statistics || []).map((stat, index) => (
                <div
                  key={index}
                  className="bg-ds-light-neutral p-6 rounded-lg shadow-sm border border-ds-pastille-green/20 text-center"
                >
                  <AnimatedCounter
                    value={stat.value}
                    duration={2000}
                    className={`text-3xl font-semibold mb-2 ${
                      stat.color === 'red'
                        ? 'text-red-600'
                        : stat.color === 'orange'
                          ? 'text-ds-accent-yellow'
                          : stat.color === 'green'
                            ? 'text-ds-pastille-green'
                            : 'text-ds-dark-blue'
                    }`}
                  />
                  <p className="text-sm text-ds-pastille-green font-light">{stat.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-ds-pastille-green/10 p-6 rounded-lg border-l-4 border-ds-accent-yellow">
              <p className="text-ds-pastille-green leading-relaxed font-light">
                <strong className="text-ds-dark-blue font-semibold">
                  {whyFocusSection?.highlightText}
                </strong>{' '}
                {whyFocusSection?.additionalText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IPD Services Section */}
      <section className="py-16 bg-ds-light-neutral">
        <div className="max-w-container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-ds-dark-blue">
                {servicesSection?.title}
              </h2>
              <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
                {servicesSection?.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
              {Array.from({ length: servicesRowCount }).flatMap((_, idx) => {
                const left = leftServices[idx]
                const right = rightServices[idx]
                return [
                  left ? (
                    <div
                      key={`left-${idx}`}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg border border-ds-pastille-green/20 shadow-sm h-full"
                    >
                      {(() => {
                        const IconComponent = iconMap[left.icon as IconKey] || Users
                        return (
                          <IconComponent className="h-6 w-6 text-ds-accent-yellow mt-1 flex-shrink-0" />
                        )
                      })()}
                      <div>
                        <h3 className="font-semibold text-ds-dark-blue mb-2">{left.title}</h3>
                        <p className="text-ds-pastille-green text-sm font-light">
                          {left.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div key={`left-empty-${idx}`} className="hidden md:block" />
                  ),
                  right ? (
                    <div
                      key={`right-${idx}`}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg border border-ds-pastille-green/20 shadow-sm h-full"
                    >
                      {(() => {
                        const IconComponent = iconMap[right.icon as IconKey] || Users
                        return (
                          <IconComponent className="h-6 w-6 text-ds-accent-yellow mt-1 flex-shrink-0" />
                        )
                      })()}
                      <div>
                        <h3 className="font-semibold text-ds-dark-blue mb-2">{right.title}</h3>
                        <p className="text-ds-pastille-green text-sm font-light">
                          {right.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div key={`right-empty-${idx}`} className="hidden md:block" />
                  ),
                ]
              })}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-ds-pastille-green mb-6 font-light">
                {servicesSection?.ctaText}
              </p>
              {servicesSection?.ctaButton && (
                <CMSLink
                  href={servicesCtaHref}
                  variant="primary"
                  size="lg"
                  className="px-8 py-3 text-lg"
                  external={servicesSection.ctaButton.linkType === 'external'}
                >
                  {servicesSection.ctaButton.text}
                </CMSLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})
