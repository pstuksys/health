import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getEducationHub } from '@/lib/cms/payload-client'
import { resolveEducationHubSettings } from '@/lib/education-hub/resolve-settings'
import { EducationHubHero } from '@/app/(frontend)/components/education-hub/hero/component'
import { TrustedEducationBanner } from '@/app/(frontend)/components/education-hub/trusted-education-banner/component'
import { EducationHubTrustPillars } from '@/app/(frontend)/components/education-hub/trust-pillars/component'

export default async function EducationHubPage() {
  const global = await getEducationHub()
  const settings = resolveEducationHubSettings(global)

  return (
    <main className="min-h-screen w-full bg-white">
      <EducationHubHero
        eyebrow={settings.hero.eyebrow}
        title={settings.hero.title}
        description={settings.hero.description}
        imageDesktop={settings.hero.imageDesktop}
        imageMobile={settings.hero.imageMobile}
        imageAlt={settings.hero.imageAlt}
        cta={{ href: settings.hero.ctaHref, label: settings.hero.ctaLabel }}
      />

      <section id="explore-topics" className="scroll-mt-20 bg-white py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-light text-ds-dark-blue md:text-3xl">
              {settings.exploreTopicsHeading}
            </h2>
            <div className="mt-3 h-1 w-16 bg-ds-accent-yellow" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {settings.exploreTopics.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={`/education-hub/topics/${section.id}`}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:ring-offset-2"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-full',
                        section.accentBg,
                      )}
                    >
                      <Icon className={cn('h-7 w-7', section.accentText)} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-ds-dark-blue text-balance">
                      {section.label}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm font-light leading-relaxed text-ds-pastille-green">
                    {section.description}
                  </p>
                  <span
                    className={cn(
                      'mt-6 inline-flex items-center gap-1 text-sm font-semibold',
                      section.accentText,
                    )}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <TrustedEducationBanner
        title={settings.trustedEducation.title}
        description={settings.trustedEducation.description}
      />
      <EducationHubTrustPillars pillars={settings.trustPillars} />
    </main>
  )
}

export async function generateMetadata() {
  const global = await getEducationHub()
  const settings = resolveEducationHubSettings(global)

  return {
    title: settings.metadata.title,
    description: settings.metadata.description,
    openGraph: {
      title: settings.metadata.title,
      description: settings.metadata.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.metadata.title,
      description: settings.metadata.description,
    },
  }
}
