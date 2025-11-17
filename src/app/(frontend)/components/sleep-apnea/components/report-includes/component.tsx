'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'
import { Check } from 'lucide-react'

type ReportIncludesBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepApneaReportIncludes' }
>

export function SleepApneaReportIncludes({
  title,
  features,
  reviewCard,
  disableReviewCard,
  className,
}: ReportIncludesBlock & { className?: string }) {
  return (
    <section className={cn('py-16 mt-16 bg-ds-light-neutral/50', className)}>
      <div className="max-w-container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-ds-dark-blue mb-6 text-balance">
            {title}
          </h1>
        </div>

        <ul
          className={cn('grid md:grid-cols-3 gap-x-8 gap-y-6', !disableReviewCard && 'mb-12')}
          role="list"
        >
          {features?.map((item, i) => (
            <li
              key={`${item.text}-${i}`}
              className={cn('flex items-center gap-3', item.wide && 'md:col-span-3')}
            >
              <div
                className="bg-ds-accent-yellow rounded-full p-2 flex-shrink-0"
                aria-hidden="true"
              >
                <Check className="w-5 h-5 text-white" />
              </div>
              <span className="text-ds-dark-blue font-medium">{item.text}</span>
            </li>
          ))}
        </ul>

        {!disableReviewCard && (
          <Card className="bg-white shadow-md hover:shadow-lg border-0 p-6">
            <CardContent className="p-0">
              <div className="flex items-start gap-4">
                <div className="bg-ds-dark-blue rounded-full p-3 flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ds-dark-blue mb-3">
                    {reviewCard?.title}
                  </h3>
                  <p className="text-ds-pastille-green leading-relaxed">{reviewCard?.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
