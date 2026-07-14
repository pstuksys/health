import type { ResolvedTrustPillar } from '@/lib/education-hub/resolve-settings'

type EducationHubTrustPillarsProps = {
  pillars: ResolvedTrustPillar[]
}

export function EducationHubTrustPillars({ pillars }: EducationHubTrustPillarsProps) {
  return (
    <section
      aria-label="Why our education is trusted"
      className="bg-ds-dark-blue py-12 text-white"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/80">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
