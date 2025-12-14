'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Home, Activity, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'

type TestOptionsBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepApneaTestOptions' }
>

type TestOptionsProps = TestOptionsBlock & { className?: string }

export function SleepApneaTestOptions({ className, title, items }: TestOptionsProps) {
  const header = title || 'Step 2: Understand Your Sleep Test Options'
  const cards: NonNullable<TestOptionsBlock['items']> =
    items && items.length
      ? items
      : [
          {
            key: 'hst',
            icon: 'home',
            title: 'Home Sleep Apnoea Testing (HST)',
            badges: [
              { text: 'Recommended', tone: 'filled' },
              { text: 'Sensors: 2', tone: 'subtle' },
              { text: 'Diagnostic yield: Moderate', tone: 'neutral' },
              { text: 'Inconclusive risk: Low', tone: 'neutral' },
            ],
            description:
              'Our compact, two-sensor sleep test offers a more convenient solution for suspected obstructive sleep apnoea, ideal for many adults with classic symptoms. It allows you to sleep in your own bed and routine while still getting a detailed diagnostic report.',
            primaryText: 'Book for £300',
            linkTypePrimary: 'external',
            primaryExternal: { href: '#' },
          },
          {
            key: 'rp',
            icon: 'activity',
            title: 'Respiratory Polygraphy (RP)',
            badges: [
              { text: 'Sensors: 6-8', tone: 'neutral' },
              { text: 'Diagnostic yield: High', tone: 'neutral' },
              { text: 'Inconclusive risk: Very low', tone: 'neutral' },
            ],
            description:
              'Multi-channel home study monitoring airflow, respiratory effort, oxygen levels, body position and more. Higher diagnostic confidence than basic HST.',
            secondaryText: 'Learn more',
            linkTypeSecondary: 'external',
            secondaryExternal: { href: '#' },
            primaryText: 'Enquire',
            linkTypePrimary: 'external',
            primaryExternal: { href: '#' },
          },
          {
            key: 'vpsg',
            icon: 'monitor',
            title: 'Comprehensive Sleep Testing (vPSG)',
            badges: [
              { text: 'Sensors: 20+ + video', tone: 'neutral' },
              { text: 'Diagnostic yield: Highest', tone: 'neutral' },
              { text: 'Inconclusive risk: Minimal', tone: 'neutral' },
            ],
            description:
              'Video Polysomnography (vPSG) is the most comprehensive test available, used for complex or neurological sleep conditions. It involves an overnight clinic stay and full physiological monitoring including video and full sleep staging — diagnosing more than sleep apnoea.',
            secondaryText: 'Learn more',
            linkTypeSecondary: 'external',
            secondaryExternal: { href: '#' },
            primaryText: 'Enquire',
            linkTypePrimary: 'external',
            primaryExternal: { href: '#' },
          },
        ]

  const iconMap = { home: Home, activity: Activity, monitor: Monitor } as const

  return (
    <section className={cn('w-full py-8 md:py-16 px-4', className)}>
      <div className="max-w-container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-4">{header}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mx-auto">
          {cards.map((card, idx) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] || Home
            const isHome = card.icon === 'home'
            const cardBg = isHome ? 'bg-ds-accent-yellow/30' : 'bg-white'
            const iconBg = isHome ? 'bg-ds-accent-yellow' : 'bg-gray-100'
            return (
              <Card
                key={idx}
                className={cn(
                  cardBg,
                  'shadow-md hover:shadow-lg border-0 p-8 transition-transform duration-200 hover:scale-105',
                )}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className={cn(iconBg, 'rounded-lg p-3 w-fit mb-6')}>
                    <Icon
                      className={cn(
                        'w-8 h-8',
                        card.icon === 'home' ? 'text-white' : 'text-ds-dark-blue',
                      )}
                    />
                  </div>

                  <h2 className="text-xl font-semibold text-ds-dark-blue mb-2">{card.title}</h2>

                  <div className="flex flex-wrap gap-1 mb-4 text-sm">
                    {card.badges?.map((b, i) => (
                      <span
                        key={i}
                        className={cn(
                          'px-3 py-1 rounded-full',
                          b.tone === 'filled'
                            ? 'bg-ds-accent-yellow text-white text-xs font-medium'
                            : b.tone === 'subtle'
                              ? 'bg-ds-accent-yellow/20 text-ds-accent-yellow'
                              : 'bg-gray-100 text-ds-dark-blue',
                        )}
                      >
                        {b.text}
                      </span>
                    ))}
                  </div>

                  <p className="text-ds-dark-blue mb-6 leading-relaxed flex-grow font-light">
                    {card.description}
                  </p>

                  <div className="space-y-2 mb-2">
                    {(() => {
                      const href = resolveLinkHref({
                        linkType: card.linkTypeSecondary,
                        internal: card.secondaryInternal,
                        external: card.secondaryExternal,
                      })
                      const text = card.secondaryText
                      return text ? (
                        <a
                          href={href || '#'}
                          className="block w-full border border-ds-dark-blue text-ds-dark-blue hover:bg-ds-dark-blue hover:text-white hover:scale-105 px-4 py-3 rounded-md font-medium bg-transparent transition-all duration-200 text-center cursor-pointer"
                        >
                          {text}
                        </a>
                      ) : null
                    })()}
                    {(() => {
                      const href = resolveLinkHref({
                        linkType: card.linkTypePrimary,
                        internal: card.primaryInternal,
                        external: card.primaryExternal,
                      })
                      const text = card.primaryText
                      return text ? (
                        <a
                          href={href || '#'}
                          className="block w-full bg-ds-dark-blue hover:bg-[#2d3154] hover:scale-105 text-white px-4 py-3 rounded-md font-medium transition-all duration-200 text-center cursor-pointer"
                        >
                          {text}
                        </a>
                      ) : null
                    })()}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
