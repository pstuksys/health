'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/ui/cms-link'
import { ExpandableTable } from '@/components/expandable-table/component'
import { resolveLinkHref } from '@/lib/navigation'
import * as LucideIcons from 'lucide-react'
import type { Page } from '@/payload-types'

type PatientsSleepProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'patientsSleep' }
>

// Icon mapping for different sleep tests
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: LucideIcons.Brain,
  heart: LucideIcons.Heart,
  lungs: LucideIcons.BriefcaseMedical,
  moon: LucideIcons.Moon,
  activity: LucideIcons.Activity,
  stethoscope: LucideIcons.Stethoscope,
  baby: LucideIcons.Baby,
}

export function PatientsSleep({
  backgroundColor,
  aboutSection,
  sleepTests,
  pediatricSection,
  ctaSection,
  faqSection,
}: PatientsSleepProps) {
  const bgColor = backgroundColor || 'white'

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80 // Approximate height of the sticky navigation
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className={`min-h-screen ${bgColor === 'ds-light-neutral' ? 'bg-ds-light-neutral' : `bg-${bgColor}`}`}
    >
      {/* Navigation Buttons */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-container mx-auto px-4 py-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => scrollToSection('about')}
              className="px-6 py-2 text-sm font-semibold text-ds-dark-blue hover:text-ds-accent-yellow transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-6 py-2 text-sm font-semibold text-ds-dark-blue hover:text-ds-accent-yellow transition-colors duration-200"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 text-sm font-semibold text-ds-dark-blue hover:text-ds-accent-yellow transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-container mx-auto px-4 py-12 space-y-16">
        {/* About Section */}
        {aboutSection?.enabled && (
          <section id="about" className="space-y-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-light text-ds-dark-blue mb-6">
                {aboutSection.title || 'About Our sleep services'}
              </h2>
            </div>
            <div className="w-full">
              <p className="text-ds-pastille-green font-light leading-relaxed text-lg text-left">
                {aboutSection.description ||
                  'A sleep test is a medical assessment conducted overnight to measure brain activity, breathing patterns, oxygen level, heart rhythm and body movements to diagnose potential sleep disorders. At Independent Physiological Diagnostics (IPD) we assess and manage a wide variety of sleep disorders, such as obstructive sleep apnoea (OSA), insomnia, parasomnias, restless leg syndrome, snoring, and other complex sleep-related conditions. Every patient receives personalised care, with results analysed and reported by our national consultant network to ensure clinical accuracy.'}
              </p>
            </div>
          </section>
        )}

        {/* Sleep Tests Grid */}
        <section id="services" className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-light text-ds-dark-blue">Our Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(sleepTests || []).map((test, index) => {
              const IconComponent = iconMap[test.icon || 'brain'] || LucideIcons.Brain
              const buttonHref = test.linkType
                ? resolveLinkHref({
                    linkType: test.linkType,
                    internal: test.internalLink
                      ? {
                          relation: {
                            relationTo: 'pages',
                            value: test.internalLink,
                          },
                        }
                      : null,
                    external: test.externalLink
                      ? {
                          href: test.externalLink,
                        }
                      : null,
                  })
                : '#'

              return (
                <Card
                  key={test.id || index}
                  className="h-full hover:shadow-lg transition-shadow border-0 shadow-md flex flex-col"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <IconComponent className="h-8 w-8 text-ds-dark-blue flex-shrink-0" />
                      <Badge
                        variant="secondary"
                        className="text-xs bg-ds-accent-yellow text-white border-0 hover:bg-ds-accent-yellow/90"
                      >
                        {test.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight text-ds-dark-blue font-semibold">
                      {test.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <CardDescription className="text-sm leading-relaxed text-ds-pastille-green font-light">
                      {test.description}
                    </CardDescription>
                    <div className="space-y-2 flex-1">
                      <p className="text-sm font-semibold text-ds-dark-blue">Best for:</p>
                      <p className="text-sm text-ds-pastille-green leading-relaxed font-light">
                        {test.bestFor}
                      </p>
                    </div>
                    <CMSLink
                      href={buttonHref}
                      size="sm"
                      className="w-full group bg-ds-dark-blue hover:bg-ds-dark-blue/90 text-white font-semibold transition-colors mt-auto"
                      external={test.linkType === 'external'}
                    >
                      {test.buttonText || 'Learn more'}
                      <LucideIcons.ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </CMSLink>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Pediatric Section */}
        {pediatricSection?.enabled && (
          <section className="bg-gradient-to-r from-ds-dark-blue/5 to-ds-pastille-green/5 rounded-lg p-8">
            <div className="flex items-start gap-6">
              <LucideIcons.Baby className="h-12 w-12 text-ds-dark-blue flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h2 className="text-2xl font-light text-ds-dark-blue">
                  {pediatricSection.title || 'Paediatric Sleep Testing'}
                </h2>
                <p className="text-ds-pastille-green leading-relaxed font-light">
                  {pediatricSection.description ||
                    'IPD provides gentle, home-based sleep studies for children of all ages. Our experienced team helps families prepare, ensures a comfortable experience, and delivers reliable results.'}
                </p>
                <p className="text-sm text-ds-pastille-green font-light">
                  {pediatricSection.additionalText ||
                    "Our paediatric team is here to help if you have questions about your child's sleep test or want advice on which service is best."}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {ctaSection?.enabled && (
          <section
            id="contact"
            className="text-center space-y-6 bg-gradient-to-r from-ds-dark-blue/10 to-ds-pastille-green/10 rounded-lg p-8"
          >
            <h2 className="text-2xl font-light text-ds-dark-blue">
              {ctaSection.title || 'Ready to Book Your Sleep Study?'}
            </h2>
            <p className="text-ds-pastille-green font-light">
              {ctaSection.description ||
                'Get the answers you need for better sleep and improved health.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CMSLink
                href={
                  ctaSection.ctaLinkType
                    ? resolveLinkHref({
                        linkType: ctaSection.ctaLinkType,
                        internal: ctaSection.ctaInternalLink
                          ? {
                              relation: {
                                relationTo: 'pages',
                                value: ctaSection.ctaInternalLink,
                              },
                            }
                          : null,
                        external: ctaSection.ctaExternalLink
                          ? {
                              href: ctaSection.ctaExternalLink,
                            }
                          : null,
                      })
                    : '#'
                }
                size="lg"
                className="min-w-48 bg-ds-dark-blue hover:bg-ds-dark-blue/90 text-white font-semibold"
                external={ctaSection.ctaLinkType === 'external'}
              >
                {ctaSection.buttonText || 'Contact us to book your sleep study'}
              </CMSLink>
              <div className="flex items-center gap-2 text-sm text-ds-pastille-green font-light">
                <LucideIcons.Phone className="h-4 w-4" />
                <span>{ctaSection.phoneText || 'Or call our friendly team for advice'}</span>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqSection?.enabled && (
          <ExpandableTable
            blockType="expandableTable"
            title={faqSection.title || 'Frequently Asked Questions'}
            subtitle={faqSection.subtitle || ''}
            description=""
            enableSearch={true}
            searchPlaceholder="Search FAQs..."
            items={(faqSection.faqs || []).map((faq, index) => ({
              id: faq.id || `faq-${index}`,
              title: faq.question,
              content: faq.answer,
              // details removed - not needed since content already shows the answer
            }))}
          />
        )}
      </main>
    </div>
  )
}
