'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

type AboutHSTBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepApneaAboutHST' }
>

export function SleepApneaAboutHST({
  className,
  title,
  subtitle,
  steps,
  booking,
}: AboutHSTBlock & { className?: string }) {
  const heading = title || 'About the IPD Home Sleep Apnoea Test'
  const sub =
    subtitle ||
    'A simple, comfortable home test designed for high diagnostic quality. Every result is clinically reviewed and signed off by a UK-based Consultant Sleep Physician.'

  const processSteps =
    steps && steps.length
      ? steps
      : [
          { number: '1', text: 'Be booked, device dispatched the next working day' },
          { number: '2', text: 'Delivered directly to your door (fits through letter box)' },
          { number: '3', text: 'Simple instructions and IPD remote support' },
          { number: '4', text: 'Test takes place over two nights to gather more data' },
          { number: '5', text: 'Arrange the return of the device' },
          {
            number: '6',
            text: 'Reviewed by IPD clinician and UK based Consultant Sleep Physician – recommendations provided for next steps',
          },
        ]

  const form = booking || {
    title: 'Book your appointment',
    note: "We'll confirm availability and next steps by email or phone.",
    submitText: 'Book Appointment',
    options: [
      'Home Sleep Apnoea Test (HST)',
      'Respiratory Polygraphy (RP)',
      'Video Polysomnography (vPSG)',
    ],
  }

  const optionValues: string[] = Array.isArray((form as any).options)
    ? (form as any).options.map((opt: unknown) =>
        typeof opt === 'string'
          ? opt
          : opt && typeof opt === 'object' && 'value' in (opt as Record<string, unknown>)
            ? String((opt as Record<string, unknown>).value ?? '')
            : '',
      )
    : []

  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-6 text-balance">
            {heading}
          </h1>
          <p className="text-lg text-ds-pastille-green max-w-3xl mx-auto text-pretty">{sub}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Process Steps */}
          <div className="space-y-8">
            {processSteps.map((s, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="bg-ds-dark-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.number}
                </div>
                <p className="text-ds-dark-blue leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <Card className="bg-white shadow-sm border p-8 relative">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-ds-dark-blue mb-6">{form.title}</h3>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-ds-dark-blue mb-2">
                    Appointment type *
                  </label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent appearance-none bg-white">
                      {optionValues.map((opt: string, i: number) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ds-dark-blue mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ds-dark-blue mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="07123 456789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ds-dark-blue mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ds-dark-blue mb-2">
                      Preferred date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500">{form.note}</p>

                <button
                  type="submit"
                  className="w-full bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  {form.submitText}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
