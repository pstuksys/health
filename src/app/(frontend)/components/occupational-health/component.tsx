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

type OccupationalHealthProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'occupationalHealth' }
>

// Simple helper to resolve link hrefs for this component
const resolveHref = (linkData: any): string => {
  if (linkData?.linkType === 'external') {
    return linkData.external || '#'
  }

  if (linkData?.linkType === 'internal' && linkData.internal) {
    // Handle direct relationship field
    if (typeof linkData.internal === 'object' && linkData.internal.slug) {
      return `/${linkData.internal.slug}`
    }
  }

  return '#'
}

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
                {heroSection?.title || 'Supporting Workforce Health'}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-ds-accent-yellow">
                {heroSection?.subtitle || 'Through Expert Sleep Diagnostics'}
              </h2>
              <p className="text-lg leading-relaxed opacity-90 font-light">
                {heroSection?.description1 ||
                  'Occupational health is the medical specialty dedicated to promoting employee wellbeing and managing work-related illnesses. By working closely with occupational health professionals, IPD provides the specialist sleep diagnostics and treatment services that enable organisations to maintain a healthy, safe, and productive workforce.'}
              </p>
              <p className="text-lg leading-relaxed opacity-90 font-light">
                {heroSection?.description2 ? (
                  <>
                    At IPD, our rapid access pathways for assessing and managing sleep disorders
                    such as{' '}
                    {heroSection?.osaLink ? (
                      <CMSLink
                        href={resolveHref(heroSection.osaLink)}
                        className="text-ds-accent-yellow hover:text-ds-accent-yellow/80 font-medium"
                        external={heroSection.osaLink.linkType === 'external'}
                        variant="ghost"
                      >
                        {heroSection.osaLink.text || 'Obstructive Sleep Apnoea'}
                      </CMSLink>
                    ) : (
                      'Obstructive Sleep Apnoea'
                    )}{' '}
                    help ensure employees receive swift, accurate diagnoses and timely treatment.
                    This reduces fatigue-related risks in the workplace and supports a faster, safer
                    return to work.
                  </>
                ) : (
                  'At IPD, our rapid access pathways for assessing and managing sleep disorders such as Obstructive Sleep Apnoea help ensure employees receive swift, accurate diagnoses and timely treatment. This reduces fatigue-related risks in the workplace and supports a faster, safer return to work.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroSection?.primaryCta && (
                  <CMSLink
                    href={resolveHref(heroSection.primaryCta)}
                    variant="primary"
                    size="lg"
                    className="px-8 py-3 text-lg"
                    external={heroSection.primaryCta.linkType === 'external'}
                  >
                    {heroSection.primaryCta.text || 'Make Referral'}
                  </CMSLink>
                )}
                {heroSection?.secondaryCta && (
                  <CMSLink
                    href={resolveHref(heroSection.secondaryCta)}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-ds-dark-blue px-8 py-3 text-lg bg-transparent"
                    external={heroSection.secondaryCta.linkType === 'external'}
                  >
                    {heroSection.secondaryCta.text || 'Download OH Guide'}
                  </CMSLink>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {(
                heroSection?.statistics || [
                  { icon: 'shield', value: '95%', description: 'Risk Reduction' },
                  { icon: 'clock', value: '48h', description: 'Fast Track Results' },
                  { icon: 'users', value: '1000+', description: 'Employee Studies' },
                  { icon: 'trending-up', value: '30%', description: 'Productivity Increase' },
                ]
              ).map((stat, index) => {
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
                {journeySection?.title || 'Patient Journey'}
              </h2>
              <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
                {journeySection?.description ||
                  'Our comprehensive patient pathway ensures thorough assessment and appropriate treatment options for sleep disorders.'}
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
              {pathwaySection?.title || 'Occupational Health Pathway'}
            </h2>
            <p className="text-lg text-ds-pastille-green leading-relaxed max-w-3xl mx-auto font-light">
              {pathwaySection?.description ||
                'Our streamlined pathway is designed specifically for occupational health professionals, ensuring swift assessment and management of sleep-related workplace risks.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(
              pathwaySection?.steps || [
                {
                  step: 1,
                  title: 'Initial Assessment',
                  description:
                    'Have you identified an individual? Use our IPD assessment designed for GPs that includes validated sleep screening tools.',
                  buttonText: 'Complete Assessment',
                },
                {
                  step: 2,
                  title: 'Sleep Study',
                  description:
                    'Patient undertakes a sleep study based on their symptoms - comprehensive diagnostic testing.',
                  buttonText: 'Find Out More',
                },
                {
                  step: 3,
                  title: 'Expert Reporting',
                  description:
                    'You will receive a report scored by Clinical Sleep Physiologist and reported by a Consultant Sleep Physician.',
                  buttonText: 'View Sample Report',
                },
                {
                  step: 4,
                  title: 'Patient Follow-up',
                  description:
                    'Arrange follow up with your patient to discuss results and next steps.',
                  buttonText: 'Schedule Follow-up',
                },
                {
                  step: 5,
                  title: 'Ongoing Support',
                  description:
                    'If needed, IPD can support in arranging therapy and appointments with our nationwide network of consultant physicians.',
                  buttonText: 'Access Support',
                },
              ]
            ).map((pathwayStep, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg border border-ds-pastille-green/20 shadow-sm flex flex-col ${pathwayStep.step === 5 ? 'md:col-span-2 lg:col-span-1' : ''}`}
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
                    href={resolveHref(pathwayStep.link)}
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
      <section className="bg-white py-16">
        <div className="max-w-container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
              {servicesSection?.title || 'Related Pages'}
            </h2>
            <p className="text-lg text-ds-pastille-green font-light">
              {servicesSection?.description ||
                'Explore our comprehensive range of sleep diagnostic services'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(
              servicesSection?.services || [
                {
                  icon: 'stethoscope',
                  title: 'MWT',
                  description: 'Maintenance of Wakefulness Testing',
                },
                { icon: 'file-text', title: 'PSG', description: 'Polysomnography Sleep Studies' },
                { icon: 'heart-handshake', title: 'CPAP', description: 'CPAP Therapy Services' },
              ]
            ).map((service, index) => {
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
                  <h3 className="text-xl font-semibold text-ds-dark-blue mb-2">{service.title}</h3>
                  <p className="text-ds-pastille-green mb-4 font-light flex-grow">
                    {service.description}
                  </p>
                  {service.cta ? (
                    <CMSLink
                      href={resolveHref(service.cta)}
                      variant="outline"
                      className="text-white bg-ds-accent-yellow hover:text-white mt-auto"
                      external={service.cta.linkType === 'external'}
                    >
                      {service.cta.text || 'Learn More'} →
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

      {/* Call to Action Section */}
      <section className="bg-ds-light-neutral py-16">
        <div className="max-w-container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue">
              {ctaSection?.title || 'Ready to Improve Workplace Safety?'}
            </h2>
            <p className="text-lg text-ds-pastille-green leading-relaxed font-light">
              {ctaSection?.description ||
                'Start referring employees for comprehensive sleep assessments and help reduce fatigue-related workplace incidents while improving overall productivity.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaSection?.primaryCta && (
                <CMSLink
                  href={resolveHref(ctaSection.primaryCta)}
                  variant="primary"
                  size="lg"
                  className="px-8 py-3 text-lg"
                  external={ctaSection.primaryCta.linkType === 'external'}
                >
                  {ctaSection.primaryCta.text || 'Make a Referral'}
                </CMSLink>
              )}
              {ctaSection?.secondaryCta && (
                <CMSLink
                  href={resolveHref(ctaSection.secondaryCta)}
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg bg-transparent border-ds-pastille-green text-ds-pastille-green hover:bg-ds-pastille-green hover:text-white"
                  external={ctaSection.secondaryCta.linkType === 'external'}
                >
                  {ctaSection.secondaryCta.text || 'Download OH Toolkit'}
                </CMSLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
