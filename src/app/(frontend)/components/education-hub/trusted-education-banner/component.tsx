import { Lightbulb } from 'lucide-react'

type TrustedEducationBannerProps = {
  title: string
  description: string
}

export function TrustedEducationBanner({ title, description }: TrustedEducationBannerProps) {
  return (
    <section
      aria-labelledby="trusted-education-heading"
      className="bg-ds-dark-blue/5 py-12"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <Lightbulb className="h-6 w-6 text-ds-dark-blue" aria-hidden="true" />
          </span>
          <div>
            <h2
              id="trusted-education-heading"
              className="text-2xl font-light text-ds-dark-blue"
            >
              {title}
            </h2>
            <p className="mt-3 max-w-3xl font-light leading-relaxed text-ds-pastille-green">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
