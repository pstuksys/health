import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import { CMSLink } from '@/app/(frontend)/components/ui'
import { PayloadImage } from '@/app/(frontend)/components/ui/payload-image'
import type { Media } from '@/payload-types'

type RawCard = {
  image?: number | Media | null | undefined
  title: string
  text?: string | null | undefined
  linkType?: 'internal' | 'external' | null
  internal?: {
    relation?: {
      relationTo?: 'pages' | 'blogs'
      value?: { slug?: string | null } | number
    } | null
  } | null
  external?: {
    href?: string | null
  } | null
  buttonText?: string | null | undefined
}

type CardSectionProps = {
  title?: string | null | undefined
  subtitle?: string | null | undefined
  cards: RawCard[]
  columns?: number | null | undefined
  className?: string
}

export function CardSection({ title, subtitle, cards, columns, className }: CardSectionProps) {
  const getGridClasses = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <section className={cn('py-6 px-4 sm:px-4 lg:px-4', className)}>
      <div className="max-w-container mx-auto">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg font-light leading-relaxed text-ds-pastille-green max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn('grid gap-8', getGridClasses())}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden">
                <PayloadImage
                  media={card.image}
                  variant="card"
                  alt={card.title}
                  fill
                  className="transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-light text-ds-dark-blue">{card.title}</h3>
                <p className="text-ds-pastille-green font-light leading-relaxed">
                  {card.text ?? ''}
                </p>
                {(card.linkType === 'internal' ||
                  (card.linkType === 'external' && card.external?.href)) && (
                  <div className="pt-4">
                    <CMSLink
                      href={resolveLinkHref({
                        linkType: card.linkType,
                        internal: card.internal,
                        external: card.external,
                      })}
                      variant="ghost"
                      className="!text-ds-dark-blue font-medium hover:!text-ds-accent-yellow transition-colors duration-200"
                      external={card.linkType === 'external'}
                    >
                      {card.buttonText || 'Learn More'}
                    </CMSLink>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
