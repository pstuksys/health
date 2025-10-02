'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/ui/cms-link'
import { resolveLinkHref } from '@/lib/navigation'
import { ArrowRight } from 'lucide-react'
import type { Page } from '@/payload-types'

type GridCardsProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'gridCards' }>

export function GridCards({
  title,
  subtitle,
  cards,
  gridColumns,
  backgroundColor,
}: GridCardsProps) {
  const bgColor = backgroundColor || 'white'

  // Map grid columns to Tailwind classes
  const gridClass = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }[gridColumns || '3']

  return (
    <section
      className={`py-16 px-4 ${bgColor === 'ds-light-neutral' ? 'bg-ds-light-neutral' : `bg-${bgColor}`}`}
    >
      <div className="max-w-container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-ds-dark-blue font-semibold">{title || 'Our Services'}</h2>
          {subtitle && <p className="text-ds-pastille-green font-light mt-4 text-lg">{subtitle}</p>}
        </div>
        <div className={`grid gap-6 ${gridClass}`}>
          {(cards || []).map((card, index) => {
            const buttonHref = card.linkType
              ? resolveLinkHref({
                  linkType: card.linkType,
                  internal: card.internalLink
                    ? {
                        relation: {
                          relationTo: 'pages',
                          value: card.internalLink,
                        },
                      }
                    : null,
                  external: card.externalLink
                    ? {
                        href: card.externalLink,
                      }
                    : null,
                })
              : '#'

            return (
              <Card
                key={card.id || index}
                className="h-full hover:shadow-lg transition-shadow border-0 shadow-md flex flex-col"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-end">
                    {card.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-ds-accent-yellow text-white border-0 hover:bg-ds-accent-yellow/90"
                      >
                        {card.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight text-ds-dark-blue font-semibold">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <CardDescription className="text-sm leading-relaxed text-ds-pastille-green font-light">
                    {card.description}
                  </CardDescription>
                  {card.bestFor && (
                    <div className="space-y-2 flex-1">
                      <p className="text-sm font-semibold text-ds-dark-blue">Best for:</p>
                      <p className="text-sm text-ds-pastille-green leading-relaxed font-light">
                        {card.bestFor}
                      </p>
                    </div>
                  )}
                  {card.buttonText && card.buttonText.trim() !== '' && (
                    <CMSLink
                      href={buttonHref}
                      size="sm"
                      className="w-full group bg-ds-dark-blue hover:bg-ds-dark-blue/90 text-white font-semibold transition-colors mt-auto"
                      external={card.linkType === 'external'}
                    >
                      {card.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </CMSLink>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
