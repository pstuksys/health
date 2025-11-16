'use client'

import {
  Users,
  Shield,
  TrendingUp,
  Clock,
  FileText,
  Stethoscope,
  HeartHandshake,
} from 'lucide-react'
import Image from 'next/image'
import type { Page } from '@/payload-types'
import { Button } from '../ui/button'
import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'

type OccupationalHealthProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'occupationalHealth' }
>

export function OccupationalHealth({
  heroSection,
  journeySection,
  pathwaySection,
  servicesSection,
  ctaSection,
}: OccupationalHealthProps) {
  return (
    <div className="min-h-screen bg-ds-light-neutral">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
                {heroSection?.title}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-ds-accent-yellow">
                {heroSection?.subtitle}
              </h2>
              <p className="text-lg leading-relaxed opacity-90 font-light">
                {heroSection?.description1}
              </p>
              <p className="text-lg leading-relaxed opacity-90 font-light">
                {heroSection?.description2 ? (
                  <>
                    At IPD, our rapid access pathways for assessing and managing sleep disorders
                    such as{' '}
                    {heroSection?.osaLink ? (
                      <CMSLink
                        href={resolveLinkHref({
                          linkType: heroSection.osaLink.linkType,
                          internal: heroSection.osaLink.internal
                            ? {
                                relation: {
                                  relationTo: 'pages',
                                  value: heroSection.osaLink.internal.relation ?? undefined,
                                },
                              }
                            : undefined,
                          external: heroSection.osaLink.external,
                        })}
                        className="text-ds-accent-yellow hover:text-ds-accent-yellow/80 font-medium"
                        external={heroSection.osaLink.linkType === 'external'}
                        variant="ghost"
                      >
                        {heroSection.osaLink.text}
                      </CMSLink>
                    ) : (
                      'Obstructive Sleep Apnoea'
                    )}{' '}
                    help ensure employees receive swift, accurate diagnoses and timely treatment.
                    This reduces fatigue-related risks in the workplace and supports a faster, safer
                    return to work.
                  </>
                ) : null}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroSection?.primaryCta && (
                  <CMSLink
                    href={resolveLinkHref({
                      linkType: heroSection.primaryCta.linkType,
                      internal: heroSection.primaryCta.internal
                        ? {
                            relation: {
                              relationTo: 'pages',
                              value: heroSection.primaryCta.internal.relation ?? undefined,
                            },
                          }
                        : undefined,
                      external: heroSection.primaryCta.external,
                    })}
                    variant="primary"
                    size="lg"
                    className="px-8 py-3 text-lg"
                    external={heroSection.primaryCta.linkType === 'external'}
                  >
                    {heroSection.primaryCta.text}
                  </CMSLink>
                )}
                {heroSection?.secondaryCta && (
                  <CMSLink
                    href={resolveLinkHref({
                      linkType: heroSection.secondaryCta.linkType,
                      internal: heroSection.secondaryCta.internal
                        ? {
                            relation: {
                              relationTo: 'pages',
                              value: heroSection.secondaryCta.internal.relation ?? undefined,
                            },
                          }
                        : undefined,
                      external: heroSection.secondaryCta.external,
                    })}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-ds-dark-blue px-8 py-3 text-lg bg-transparent"
                    external={heroSection.secondaryCta.linkType === 'external'}
                  >
                    {heroSection.secondaryCta.text}
                  </CMSLink>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {(heroSection?.statistics ?? []).map((stat, index) => {
                const IconComponent =
                  stat.icon === 'shield'
                    ? Shield
                    : stat.icon === 'clock'
                      ? Clock
                      : stat.icon === 'users'
                        ? Users
                        : stat.icon === 'trending-up'
                          ? TrendingUp
                          : Shield

                return (
                  <div
                    key={index}
                    className="bg-ds-dark-blue/80 backdrop-blur-sm p-6 rounded-lg text-center border border-white/30"
                  >
                    <IconComponent className="h-8 w-8 text-ds-accent-yellow mx-auto mb-2" />
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <p className="text-sm text-white/90 font-light">{stat.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Patient Journey Section */}
      {!journeySection?.disableView && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
                {journeySection?.title}
              </h2>
              <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
                {journeySection?.description}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center">
                <Image
                  src="/ipd-diagram.avif"
                  alt="Patient Journey Diagram"
                  width={800}
                  height={400}
                  className="max-w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Occupational Health Pathway Section */}
      <section className="py-16 lg:py-24 bg-ds-light-neutral">
        <div className="max-w-container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
              {pathwaySection?.title}
            </h2>
            <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
              {pathwaySection?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-4 max-w-6xl mx-auto">
            {(pathwaySection?.steps ?? []).map((pathwayStep, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg border border-ds-pastille-green/20 shadow-sm flex flex-col lg:min-h-[260px] ${pathwayStep.step === 5 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-ds-accent-yellow text-ds-dark-blue rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {pathwayStep.step}
                  </div>
                  <h3 className="text-xl font-semibold text-ds-dark-blue">{pathwayStep.title}</h3>
                </div>
                <p className="text-ds-pastille-green mb-4 font-light flex-grow">
                  {pathwayStep.description}
                </p>
                {pathwayStep.link ? (
                  <CMSLink
                    href={resolveLinkHref({
                      linkType: pathwayStep.link.linkType,
                      internal: pathwayStep.link.internal
                        ? {
                            relation: {
                              relationTo: 'pages',
                              value: pathwayStep.link.internal.relation ?? undefined,
                            },
                          }
                        : undefined,
                      external: pathwayStep.link.external,
                    })}
                    variant="outline"
                    size="sm"
                    className="w-full bg-ds-accent-yellow border-ds-accent-yellow text-white hover:ds-accent-yellow hover:text-white mt-auto"
                    external={pathwayStep.link.linkType === 'external'}
                  >
                    {pathwayStep.link.text || pathwayStep.buttonText}
                  </CMSLink>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-ds-pastille-green text-ds-pastille-green hover:bg-ds-pastille-green hover:text-white mt-auto"
                  >
                    {pathwayStep.buttonText}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {!servicesSection?.disableView && (
        <section className="bg-white py-16">
          <div className="max-w-container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
                {servicesSection?.title}
              </h2>
              <p className="text-lg text-ds-pastille-green font-light">
                {servicesSection?.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {(servicesSection?.services ?? []).map((service, index) => {
                const IconComponent =
                  service.icon === 'stethoscope'
                    ? Stethoscope
                    : service.icon === 'file-text'
                      ? FileText
                      : service.icon === 'heart-handshake'
                        ? HeartHandshake
                        : Stethoscope

                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-ds-pastille-green/20 shadow-sm text-center flex flex-col"
                  >
                    <IconComponent className="h-12 w-12 text-ds-dark-blue mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-ds-dark-blue mb-2">
                      {service.title}
                    </h3>
                    <p className="text-ds-pastille-green mb-4 font-light flex-grow">
                      {service.description}
                    </p>
                    {service.cta ? (
                      <CMSLink
                        href={resolveLinkHref({
                          linkType: service.cta.linkType,
                          internal: service.cta.internal
                            ? {
                                relation: {
                                  relationTo: 'pages',
                                  value: service.cta.internal.relation ?? undefined,
                                },
                              }
                            : undefined,
                          external: service.cta.external,
                        })}
                        variant="outline"
                        className="text-white bg-ds-accent-yellow hover:text-white mt-auto"
                        external={service.cta.linkType === 'external'}
                      >
                        {service.cta.text} →
                      </CMSLink>
                    ) : (
                      <Button
                        variant="outline"
                        className="text-ds-dark-blue bg-transparent border-0 mt-auto"
                      >
                        Learn More →
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      {!ctaSection?.disableView && (
        <section className="bg-ds-light-neutral py-16">
          <div className="max-w-container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
                {ctaSection?.title}
              </h2>
              <p className="text-lg text-ds-pastille-green leading-relaxed font-light">
                {ctaSection?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {ctaSection?.primaryCta && (
                  <CMSLink
                    href={resolveLinkHref({
                      linkType: ctaSection.primaryCta.linkType,
                      internal: ctaSection.primaryCta.internal
                        ? {
                            relation: {
                              relationTo: 'pages',
                              value: ctaSection.primaryCta.internal ?? undefined,
                            },
                          }
                        : undefined,
                      external: ctaSection.primaryCta.external
                        ? { href: ctaSection.primaryCta.external }
                        : undefined,
                    })}
                    variant="primary"
                    size="lg"
                    className="px-8 py-3 text-lg"
                    external={ctaSection.primaryCta.linkType === 'external'}
                  >
                    {ctaSection.primaryCta.text}
                  </CMSLink>
                )}
                {ctaSection?.secondaryCta && (
                  <CMSLink
                    href={resolveLinkHref({
                      linkType: ctaSection.secondaryCta.linkType,
                      internal: ctaSection.secondaryCta.internal
                        ? {
                            relation: {
                              relationTo: 'pages',
                              value: ctaSection.secondaryCta.internal ?? undefined,
                            },
                          }
                        : undefined,
                      external: ctaSection.secondaryCta.external
                        ? { href: ctaSection.secondaryCta.external }
                        : undefined,
                    })}
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 text-lg bg-transparent border-ds-pastille-green text-ds-pastille-green hover:bg-ds-pastille-green hover:text-white"
                    external={ctaSection.secondaryCta.linkType === 'external'}
                  >
                    {ctaSection.secondaryCta.text}
                  </CMSLink>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
