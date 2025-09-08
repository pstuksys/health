import {
  Clock,
  Shield,
  CheckCircle,
  Users,
  FileText,
  PhoneCall,
  Beaker,
  SquareActivity,
} from 'lucide-react'
import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'

type SleepAssessmentFeaturesProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepAssessmentFeatures' }
>

// Icon mapping
const iconMap = {
  Clock,
  Shield,
  CheckCircle,
  Users,
  FileText,
  PhoneCall,
  Beaker,
  SquareActivity,
}

type IconKey = keyof typeof iconMap

export function SleepAssessmentFeatures({
  title,
  subtitle,
  features,
  ctaButtonText,
  ctaButtonLinkType,
  ctaButtonInternal,
  ctaButtonExternal,
  ctaButtonOpenInNewTab,
  bottomText,
}: SleepAssessmentFeaturesProps) {
  // Default features as fallback
  const defaultFeatures = [
    {
      title: 'Quick & Easy',
      description:
        'Complete the assessment in just 5 minutes with targeted questions about your sleep patterns.',
      icon: 'Clock' as IconKey,
    },
    {
      title: 'Free & Confidential',
      description:
        'Your privacy is protected. No personal information required to start the assessment.',
      icon: 'Shield' as IconKey,
    },
    {
      title: 'Personalized Report',
      description: 'Receive a detailed analysis of your sleep disorder risk with clear next steps.',
      icon: 'CheckCircle' as IconKey,
    },
    {
      title: 'Expert Support',
      description: 'Connect with our sleep specialists to discuss your results and next steps.',
      icon: 'Users' as IconKey,
    },
  ]

  const featuresToRender = features && features.length > 0 ? features : defaultFeatures

  // Resolve CTA button href using utility function
  const ctaButtonHref = resolveLinkHref({
    linkType: ctaButtonLinkType,
    internal: ctaButtonInternal
      ? {
          relation: {
            relationTo: 'pages',
            value: ctaButtonInternal,
          },
        }
      : null,
    external: ctaButtonExternal
      ? {
          href: ctaButtonExternal,
        }
      : null,
  })

  const ctaButtonIsExternal = ctaButtonLinkType === 'external'
  const ctaButtonNewTab = ctaButtonIsExternal && ctaButtonOpenInNewTab

  return (
    <div className="max-w-container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue mb-4">
          {title || 'Free Online Sleep Assessment'}
        </h1>
        <p className="text-lg font-light leading-relaxed text-ds-pastille-green max-w-3xl mx-auto">
          {subtitle ||
            'IPDiagnostics offers a free online sleep assessment that helps you discover whether a sleep disorder is disturbing your rest. The assessment asks targeted questions about your bedtime habits, daytime energy, and medical history.'}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {featuresToRender.map((feature, index) => {
          const Icon = iconMap[(feature as any).icon as IconKey] || Clock
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-ds-accent-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-ds-dark-blue mb-3">{feature.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <CMSLink
          size="sm"
          className="bg-ds-accent-yellow hover:bg-ds-accent-yellow text-white px-8 py-3 text-base font-medium mb-4"
          href={ctaButtonHref}
          external={ctaButtonIsExternal}
          target={ctaButtonNewTab ? '_blank' : '_self'}
        >
          {ctaButtonText || 'Start Your Free Sleep Assessment'}
        </CMSLink>
        <p className="text-sm text-ds-pastille-green">
          {bottomText ||
            'We analyse your answers and calculate your risk for obstructive sleep apnoea or insomnia.'}
        </p>
      </div>
    </div>
  )
}
