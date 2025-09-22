'use client'

import { CheckCircle, Users, Shield, TrendingUp, Clock } from 'lucide-react'
import type { Page } from '@/payload-types'
import { resolveLinkHref } from '@/lib/navigation'
import { Button } from '../ui/button'
import { CMSLink } from '../ui'
import { PayloadImage } from '../ui/payload-image'

type CorporateHealthProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'corporateHealth' }
>

export function CorporateHealth({
  heroSection,
  whyFocusSection,
  servicesSection,
}: CorporateHealthProps) {
  return (
    <div className="min-h-screen bg-ds-light-neutral">
      {/* Hero Section */}
      <section className="max-w-container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <PayloadImage
                media={heroSection?.image}
                variant="hero"
                alt={heroSection?.imageAlt || 'Professional workplace wellness and sleep health'}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-ds-dark-blue leading-tight">
              {heroSection?.title || 'Corporate Sleep Health Solutions'}
            </h1>
            <div className="bg-ds-pastille-green/10 border-l-4 border-ds-accent-yellow p-4 rounded-r-lg">
              <p className="text-xl font-semibold text-ds-dark-blue italic">
                {heroSection?.quote ||
                  '"Help Your Team Sleep Better, Live Better, and Work Smarter"'}
              </p>
            </div>
            <p className="text-lg text-ds-pastille-green leading-relaxed font-light">
              {heroSection?.description ||
                'Independent Physiological Diagnostics (IPD) works with companies of all sizes to address the root causes of fatigue, boost performance, and support mental and physical health across your workforce. As a leading provider of workplace sleep diagnostics, IPD partners with corporate entities to transform employee wellbeing through expert-led sleep health solutions.'}
            </p>
            {heroSection?.ctaButton && (
              <CMSLink
                href={
                  heroSection.ctaButton.linkType === 'external'
                    ? (heroSection.ctaButton as any).external || '#'
                    : (heroSection.ctaButton as any).internal
                      ? `/pages/${(heroSection.ctaButton as any).internal.slug || (heroSection.ctaButton as any).internal}`
                      : '#'
                }
                variant="primary"
                size="lg"
                className="px-8 py-3 text-lg"
                external={heroSection.ctaButton.linkType === 'external'}
              >
                {heroSection.ctaButton.text || 'Enquire with us'}
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
              <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
                {whyFocusSection?.title || 'Why Focus on Corporate Sleep Health?'}
              </h2>
              <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
                {whyFocusSection?.description ||
                  'Quality sleep is the foundation of a healthy, high-performing workforce. Yet, sleep disorders such as insomnia and obstructive sleep apnoea, go undetected in corporate settings, impacting productivity, safety, and overall employee wellbeing.'}
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {(
                whyFocusSection?.statistics || [
                  {
                    value: '£568',
                    description: 'Lost per employee annually due to illness-related absence',
                    color: 'red',
                  },
                  {
                    value: '£40B',
                    description: 'Annual cost of fatigue to the UK economy',
                    color: 'red',
                  },
                  {
                    value: '1 in 3',
                    description: 'People suffer from poor sleep',
                    color: 'orange',
                  },
                  {
                    value: '17%',
                    description: 'Productivity boost from sleep improvement programmes',
                    color: 'green',
                  },
                ]
              ).map((stat, index) => (
                <div
                  key={index}
                  className="bg-ds-light-neutral p-6 rounded-lg shadow-sm border border-ds-pastille-green/20 text-center"
                >
                  <div
                    className={`text-3xl font-semibold mb-2 ${
                      stat.color === 'red'
                        ? 'text-red-600'
                        : stat.color === 'orange'
                          ? 'text-ds-accent-yellow'
                          : stat.color === 'green'
                            ? 'text-ds-pastille-green'
                            : 'text-ds-dark-blue'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <p className="text-sm text-ds-pastille-green font-light">{stat.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-ds-pastille-green/10 p-6 rounded-lg border-l-4 border-ds-pastille-green">
              <p className="text-ds-pastille-green leading-relaxed font-light">
                <strong className="text-ds-dark-blue font-semibold">
                  {whyFocusSection?.highlightText ||
                    'Poor sleep is linked to depression, anxiety, burnout, and cardiovascular disease.'}
                </strong>{' '}
                {whyFocusSection?.additionalText ||
                  'Sleep-improvement programmes can lead to a 17% boost in productivity and up to 30% fewer days lost to absence. By proactively addressing sleep health, you improve wellbeing, reduce errors, and build a healthier, more focused workforce.'}
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
              <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
                {servicesSection?.title || 'Why Partner with IPD for Corporate Sleep Health?'}
              </h2>
              <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
                {servicesSection?.description ||
                  'IPD designs flexible, scalable, and fully confidential sleep health solutions for organisations of all sizes. Our corporate sleep health services include:'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {(
                  servicesSection?.leftServices || [
                    {
                      icon: 'users',
                      title: 'Onsite and Remote Sleep Wellbeing Days',
                      description:
                        'IPD delivers interactive sleep talks and wellbeing events within your organisation to educate and engage employees.',
                    },
                    {
                      icon: 'trending-up',
                      title: 'Organisation-Wide Digital Sleep Screening',
                      description:
                        'We provide comprehensive risk assessments, available both onsite and remotely, to identify employees who may benefit from further support.',
                    },
                    {
                      icon: 'shield',
                      title: 'Home-Based Diagnostic Testing',
                      description:
                        "High-risk individuals are referred for confidential sleep studies at home, all coordinated and interpreted by IPD's network of GP and consultant sleep physicians.",
                    },
                    {
                      icon: 'check-circle',
                      title: 'Private, Evidence-Based Treatment',
                      description:
                        'Employees have access to tailored therapies, including CPAP, CBT-I, and Mandibular Advancement Devices, delivered with clinical oversight.',
                    },
                  ]
                ).map((service, index) => {
                  const IconComponent =
                    service.icon === 'users'
                      ? Users
                      : service.icon === 'trending-up'
                        ? TrendingUp
                        : service.icon === 'shield'
                          ? Shield
                          : service.icon === 'check-circle'
                            ? CheckCircle
                            : service.icon === 'clock'
                              ? Clock
                              : Users

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg border border-ds-pastille-green/20 shadow-sm"
                    >
                      <IconComponent className="h-6 w-6 text-ds-pastille-green mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-ds-dark-blue mb-2">{service.title}</h3>
                        <p className="text-ds-pastille-green text-sm font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-6">
                {(
                  servicesSection?.rightServices || [
                    {
                      icon: 'trending-up',
                      title: 'Integrated Corporate Wellbeing Programmes',
                      description:
                        'IPD embeds sleep health solutions seamlessly into your existing wellbeing initiatives for maximum impact.',
                    },
                    {
                      icon: 'clock',
                      title: 'Workforce-Level Reporting',
                      description:
                        'We supply anonymised, aggregated data on sleep health trends within your workforce, supporting strategic health planning and ROI measurement.',
                    },
                    {
                      icon: 'users',
                      title: 'Dedicated Account Management',
                      description:
                        'Each client benefits from a dedicated IPD account manager and ongoing clinical support to ensure programme success.',
                    },
                  ]
                ).map((service, index) => {
                  const IconComponent =
                    service.icon === 'users'
                      ? Users
                      : service.icon === 'trending-up'
                        ? TrendingUp
                        : service.icon === 'shield'
                          ? Shield
                          : service.icon === 'check-circle'
                            ? CheckCircle
                            : service.icon === 'clock'
                              ? Clock
                              : Users

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg border border-ds-pastille-green/20 shadow-sm"
                    >
                      <IconComponent className="h-6 w-6 text-ds-pastille-green mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-ds-dark-blue mb-2">{service.title}</h3>
                        <p className="text-ds-pastille-green text-sm font-light">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  )
                })}

                <div className="bg-ds-pastille-green/10 p-4 rounded-lg border-l-4 border-ds-pastille-green">
                  <p className="text-sm text-ds-pastille-green font-light">
                    <strong className="text-ds-pastille-green font-semibold">
                      Complete Privacy Guaranteed:
                    </strong>{' '}
                    IPD guarantees complete privacy for all employees. Employers receive only
                    anonymised, actionable insights, never individual health data. Helping you
                    measure the impact on wellbeing and organisational performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-ds-pastille-green mb-6 font-light">
                {servicesSection?.ctaText ||
                  'To learn more about our corporate sleep health packages, enquire with us'}
              </p>
              {servicesSection?.ctaButton && (
                <CMSLink
                  href={
                    servicesSection.ctaButton.linkType === 'external'
                      ? (servicesSection.ctaButton as any).external || '#'
                      : (servicesSection.ctaButton as any).internal
                        ? `/pages/${(servicesSection.ctaButton as any).internal.slug || (servicesSection.ctaButton as any).internal}`
                        : '#'
                  }
                  variant="primary"
                  size="lg"
                  className="px-8 py-3 text-lg"
                  external={servicesSection.ctaButton.linkType === 'external'}
                >
                  {servicesSection.ctaButton.text || 'Get Started Today'}
                </CMSLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
