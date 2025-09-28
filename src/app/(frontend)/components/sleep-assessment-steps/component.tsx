import { Card } from '@/components/ui/card'
import { FileText, ArrowRight } from 'lucide-react'
import { iconMap, type IconKey } from '@/lib/icons/icon-map'
import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'

type SleepAssessmentStepsProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepAssessmentSteps' }
>

export function SleepAssessmentSteps({
  title,
  subtitle,
  steps,
  mainButtonText,
  mainButtonLinkType,
  mainButtonInternal,
  mainButtonExternal,
}: SleepAssessmentStepsProps) {
  const stepsToRender = steps && steps.length > 0 ? steps : []

  // Resolve main button href using utility function
  const mainButtonHref = resolveLinkHref({
    linkType: mainButtonLinkType,
    internal: mainButtonInternal
      ? {
          relation: {
            relationTo: 'pages',
            value: mainButtonInternal,
          },
        }
      : null,
    external: mainButtonExternal
      ? {
          href: mainButtonExternal,
        }
      : null,
  })

  const mainButtonIsExternal = mainButtonLinkType === 'external'
  const hasValidMainButton = mainButtonText && mainButtonHref

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ds-dark-blue mb-4 text-balance">
          {title || 'Your Path to Better Sleep'}
        </h1>
        <p className="text-lg text-ds-pastille-green max-w-2xl mx-auto text-pretty">
          {subtitle ||
            'Follow these simple steps to understand your sleep health and get the support you need.'}
        </p>
      </div>

      <div className="relative mb-12">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {stepsToRender.map((step) => {
            // Use the utility function to resolve the href
            const href = resolveLinkHref({
              linkType: (step as any).linkType,
              internal: (step as any).internal
                ? {
                    relation: {
                      relationTo: 'pages',
                      value: (step as any).internal,
                    },
                  }
                : null,
              external: (step as any).external
                ? {
                    href: (step as any).external,
                  }
                : null,
            })

            const iconKey = (step as any)?.icon as IconKey
            const Icon = iconMap[iconKey] || FileText

            const isExternal = (step as any).linkType === 'external'
            const buttonText = (step as any).buttonText
            const hasValidButton = buttonText && href

            return (
              <Card
                key={`${step.number}-${step.title}`}
                className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow h-full"
              >
                <div className="flex items-start gap-4 h-full">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-ds-accent-yellow text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1 grid grid-rows-[auto,1fr,auto] h-full min-h-0">
                    <div>
                      <h3 className="text-xl font-semibold text-ds-dark-blue mb-2">{step.title}</h3>
                      <Icon className="w-5 h-5 text-gray-400 mb-3" />
                    </div>

                    <p className="text-ds-pastille-green mb-4 leading-relaxed min-h-0">
                      {step.description}
                    </p>

                    {hasValidButton && (
                      <div>
                        <CMSLink
                          variant="default"
                          className="border border-1 border-ds-dark-blue text-ds-dark-blue bg-gray-50 hover:bg-transparent hover:text-ds-accent-yellow hover:border-ds-accent-yellow"
                          href={href}
                          external={isExternal}
                        >
                          {buttonText}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </CMSLink>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <ArrowRight className="w-6 h-6 text-ds-accent-yellow" />
        </div>

        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 hidden md:block">
          <ArrowRight className="w-6 h-6 text-ds-accent-yellow" />
        </div>
      </div>

      {hasValidMainButton && (
        <div className="text-center">
          <CMSLink
            size="sm"
            className="bg-ds-accent-yellow hover:bg-ds-accent-yellow text-white px-8 py-3 text-lg font-medium"
            href={mainButtonHref}
            external={mainButtonIsExternal}
          >
            {mainButtonText}
          </CMSLink>
        </div>
      )}
    </div>
  )
}
