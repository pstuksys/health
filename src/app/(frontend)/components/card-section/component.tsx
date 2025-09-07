import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

type RawCard = {
  image?: number | Media | null | undefined
  title: string
  text?: string | null | undefined
  href?: string | null | undefined
}

type CardSectionProps = {
  cards: RawCard[]
  columns?: number | null | undefined
  className?: string
}

export function CardSection({ cards, columns = 3, className }: CardSectionProps) {
  const getGridClasses = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <section className={cn('py-6 px-4 sm:px-4 lg:px-4', className)}>
      <div className="max-w-container mx-auto">
        <div className={cn('grid gap-8', getGridClasses())}>
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href ?? '#'}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={mediaToUrl(card.image)}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-ds-dark-blue group-hover:text-ds-pastille-green transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-ds-pastille-green font-light leading-relaxed">
                  {card.text ?? ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
