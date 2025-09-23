'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

type ReportIncludesBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepApneaReportIncludes' }
>

export function SleepApneaReportIncludes({
  title,
  features,
  reviewCard,
  className,
}: ReportIncludesBlock & { className?: string }) {
  const heading = title || ''
  const items =
    features && features.length
      ? features
      : [
          { text: 'Diagnosis and severity of sleep apnoea', icon: 'list' },
          { text: 'Apnoea-Hypopnoea Index (AHI)', icon: 'star' },
          { text: 'Oxygen Desaturation Index (ODI)', icon: 'clock' },
          { text: 'Sleep time estimates', icon: 'clock2' },
          { text: 'Classification of apnoea events', icon: 'clock3' },
          { text: 'Respiratory and cardiac feature analysis', icon: 'report', wide: true },
        ]
  const review = reviewCard || {
    title: 'Expert Clinical Review',
    text: 'Every test is reviewed by IPD clinicians and signed off by a UK-based Consultant Sleep Physician to ensure accurate diagnosis and clear interpretation.',
  }

  return (
    <section className={cn('py-16 mt-16 bg-ds-light-neutral/50', className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-6 text-balance">
            {heading}
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 mb-12">
          {items.map((item, i) => (
            <div key={i} className={cn('flex items-center gap-3', item.wide && 'md:col-span-3')}>
              <div className="bg-ds-accent-yellow rounded-lg p-2 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </div>
              <span className="text-ds-dark-blue font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <Card className="bg-white shadow-md hover:shadow-lg border-0 p-6">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <div className="bg-ds-dark-blue rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-ds-dark-blue mb-3">{review.title}</h3>
                <p className="text-ds-pastille-green leading-relaxed">{review.text}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
