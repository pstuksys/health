'use client'

import { Card, CardContent } from '@/components/ui/card'
import { resolveLinkHref } from '@/lib/navigation'
import { ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

type IntroStepsBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepApneaIntroSteps' }
>

export function SleepApneaIntroSteps({
  title,
  subtitle,
  items,
  className,
}: IntroStepsBlock & { className?: string }) {
  const heading = title || 'Step 1: Getting Started – How to Get Tested for Sleep Apnoea'
  const sub =
    subtitle ||
    'Do you snore, struggle with unrefreshing sleep, or suspect sleep apnoea? Take these two simple steps to begin your journey to better sleep:'

  const steps = items || []

  return (
    <section className={cn('w-full py-12 md:py-16 px-4', className)}>
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-6 text-balance">
            {heading}
          </h1>
          <p className="text-lg text-ds-pastille-green/90 max-w-3xl mx-auto text-pretty">{sub}</p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = ClipboardList
            return (
              <Card
                key={idx}
                className="bg-white shadow-md hover:shadow-lg border-0 p-8 transition-transform duration-200 hover:scale-105"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-ds-dark-blue text-white rounded-lg w-16 h-16 flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <div className="bg-ds-accent-yellow/20 rounded-lg p-3">
                      <Icon className="w-6 h-6 text-ds-accent-yellow" />
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-ds-dark-blue mb-4">{step.title}</h2>
                  <p className="text-ds-dark-blue mb-6 leading-relaxed flex-grow font-light">
                    {step.description}
                  </p>
                  <div className="mt-auto">
                    {(() => {
                      const href = resolveLinkHref({
                        linkType: (step as any)?.linkType,
                        internal: (step as any)?.internal,
                        external: (step as any)?.external,
                      })
                      const text =
                        (step as any)?.buttonText ||
                        (idx === 0 ? 'Take sleep assessment' : 'Book a free 10-min call')
                      return (
                        <a
                          href={href}
                          className={cn(
                            'block w-full px-6 py-3 rounded-md font-medium transition-all duration-200 text-center cursor-pointer',
                            idx === 0
                              ? 'bg-ds-dark-blue hover:bg-[#2d3154] hover:scale-105 text-white'
                              : 'border border-ds-dark-blue text-ds-dark-blue hover:bg-ds-dark-blue hover:text-white hover:scale-105 bg-transparent',
                          )}
                        >
                          {text}
                        </a>
                      )
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
