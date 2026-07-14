import Link from 'next/link'
import { CalendarClock } from 'lucide-react'

type SleepAssessmentCtaProps = {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export function SleepAssessmentCta({
  title,
  description,
  ctaLabel,
  ctaHref,
}: SleepAssessmentCtaProps) {
  return (
    <section
      aria-labelledby="sleep-assessment-cta-heading"
      className="rounded-xl bg-ds-dark-blue/5 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <CalendarClock className="h-6 w-6 text-ds-dark-blue" aria-hidden="true" />
          </span>
          <div>
            <h2
              id="sleep-assessment-cta-heading"
              className="text-xl font-semibold text-ds-dark-blue"
            >
              {title}
            </h2>
            <p className="mt-2 max-w-2xl font-light leading-relaxed text-ds-pastille-green">
              {description}
            </p>
          </div>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-ds-dark-blue px-6 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-ds-dark-blue/90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}
