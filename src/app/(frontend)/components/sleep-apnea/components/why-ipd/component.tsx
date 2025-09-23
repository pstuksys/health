'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

type WhyIPDBlock = Extract<NonNullable<Page['blocks']>[number], { blockType: 'sleepApneaWhyIPD' }>

export function SleepApneaWhyIPD({
  className,
  title,
  subtitle,
  items,
}: WhyIPDBlock & { className?: string }) {
  const heading = title || 'Why Choose IPD?'
  const sub =
    subtitle ||
    'Experience the difference that expertise and personalized care can make in your sleep health journey'
  const cards =
    items && items.length
      ? items
      : [
          {
            icon: 'user',
            title: 'Led by experienced sleep professionals',
            text: 'Expert clinicians with specialized training',
          },
          {
            icon: 'clock',
            title: 'Fast access and responsive care',
            text: 'Quick assessment and immediate support',
          },
          {
            icon: 'check',
            title: 'Clinically backed, medication-free treatment',
            text: 'Evidence-based approach without side effects',
          },
          {
            icon: 'shield',
            title: 'Emphasis on long-term sleep health',
            text: 'Sustainable improvements that last',
          },
          {
            icon: 'badge',
            title: 'Trusted by NHS and private referrers nationwide',
            text: 'Recognized quality and reliability',
            wide: true,
          },
        ]

  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-6 text-balance">
            {heading}
          </h1>
          <p className="text-lg text-ds-pastille-green max-w-3xl mx-auto text-pretty">{sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((c, i) => (
            <Card
              key={i}
              className={cn(
                'bg-white shadow-sm border border-gray-100 p-6 text-center',
                c.wide && 'md:col-span-2',
              )}
            >
              <CardContent className="p-0">
                <div className="bg-ds-accent-yellow rounded-lg p-3 w-fit mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-ds-dark-blue mb-3">{c.title}</h3>
                <p className="text-ds-pastille-green text-sm leading-relaxed">{c.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
