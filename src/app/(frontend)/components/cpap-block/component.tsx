'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/app/(frontend)/components/ui'
import { resolveLinkHref } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { Page } from '@/payload-types'

type CPAPBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'cpapBlock' }>

// Reusable Checkmark Icon Component
function CheckmarkIcon({ className }: { className?: string }) {
  return <Check className={cn('h-4 w-4 text-ds-accent-yellow', className)} />
}

// Reusable Feature Item Component
function FeatureItem({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="border-ds-accent-yellow border-2 p-2 rounded-full flex-shrink-0 mt-0.5">
        <CheckmarkIcon />
      </div>
      <span className="text-sm text-ds-pastille-green leading-relaxed font-light">{text}</span>
    </div>
  )
}

// Reusable Trust Indicator Item Component
function TrustIndicatorItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-ds-accent-yellow/20 p-2 rounded-full flex-shrink-0 mt-1">
        <CheckmarkIcon />
      </div>
      <p className="text-sm text-ds-dark-blue leading-relaxed font-light">{text}</p>
    </div>
  )
}

function CPAPServiceCard({
  title,
  description,
  badge,
  features,
  borderColor,
  ctaButtonText,
  ctaButtonHref,
  ctaButtonIsExternal,
  className,
}: {
  title: string
  description: string
  badge?: { text: string; variant: 'default' | 'secondary' | 'outline' }
  features: Array<{ icon: React.ComponentType<{ className?: string }>; text: string }>
  borderColor: string
  ctaButtonText?: string | null
  ctaButtonHref?: string
  ctaButtonIsExternal?: boolean
  className?: string
}) {
  const shouldShowButton = ctaButtonText && ctaButtonText.trim() !== ''

  return (
    <Card
      className={cn(
        'relative border-2 bg-card hover:shadow-lg transition-shadow flex flex-col',
        borderColor,
        className,
      )}
    >
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-light text-ds-dark-blue pt-6">{title}</CardTitle>
        <CardDescription className="text-ds-pastille-green/80 font-light">
          {description}
        </CardDescription>
        {badge && (
          <Badge
            variant={badge.variant}
            className="w-fit mx-auto mt-4 bg-ds-accent-yellow text-white border-0 hover:bg-ds-accent-yellow/90 text-base font-semibold px-4 py-1.5"
          >
            {badge.text}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4 flex-grow flex flex-col">
        <div className="space-y-3 flex-grow">
          {features.map((feature) => (
            <FeatureItem key={feature.text} text={feature.text} />
          ))}
        </div>
        {shouldShowButton && (
          <div className="mt-6 pt-4">
            <CMSLink
              size="lg"
              className="w-full bg-ds-dark-blue hover:bg-ds-dark-blue/90 text-white px-6 py-3 text-base font-medium rounded-md transition-colors"
              href={ctaButtonHref || '#'}
              external={ctaButtonIsExternal || false}
            >
              {ctaButtonText}
            </CMSLink>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function CPAPBlock({
  title,
  subtitle,
  serviceCards,
  trustIndicators,
  className,
}: CPAPBlockProps & { className?: string }) {
  return (
    <>
      <section className={cn('w-full py-8 md:py-16 px-4', className)}>
        <div className="max-w-container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-ds-dark-blue mb-4 text-balance">{title}</h1>
            <p className="text-xl text-ds-pastille-green/80 max-w-2xl mx-auto text-pretty font-light">
              {subtitle}
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {serviceCards?.map((card) => {
              const badge =
                card.badge?.text && card.badge?.variant
                  ? { text: card.badge.text, variant: card.badge.variant }
                  : undefined

              const features =
                card.features?.map((feature) => ({ icon: Check, text: feature.text })) || []

              // Check if button should be displayed for this card
              const shouldShowButton = card.ctaButtonText && card.ctaButtonText.trim() !== ''

              // Resolve button href for this card
              const buttonHref = shouldShowButton
                ? resolveLinkHref({
                    linkType: card.ctaButtonLinkType || undefined,
                    internal: card.ctaButtonInternal
                      ? {
                          relation: {
                            relationTo: 'pages',
                            value: card.ctaButtonInternal,
                          },
                        }
                      : null,
                    external: card.ctaButtonExternal
                      ? {
                          href: card.ctaButtonExternal,
                        }
                      : null,
                  })
                : ''

              const buttonIsExternal =
                (shouldShowButton && card.ctaButtonLinkType === 'external') || false

              return (
                <CPAPServiceCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  badge={badge}
                  features={features}
                  borderColor={card.borderColor || 'border-ds-dark-blue/20'}
                  ctaButtonText={card.ctaButtonText}
                  ctaButtonHref={buttonHref}
                  ctaButtonIsExternal={buttonIsExternal}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust Indicators - Full Width Background Section */}
      <section className="bg-ds-light-neutral/50 py-16">
        <div className="max-w-container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-light text-ds-dark-blue mb-4">{trustIndicators?.title}</h3>
            <p className="text-lg text-ds-pastille-green/80 max-w-3xl mx-auto font-light">
              {trustIndicators?.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {trustIndicators?.items?.map((indicator) => (
              <TrustIndicatorItem key={indicator.text} text={indicator.text} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
