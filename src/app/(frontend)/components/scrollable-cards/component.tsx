'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'
import { RichText } from '../ui/rich-text'

type ScrollableCard = {
  id?: string | null
  icon?: string | null
  title: string
  content: any // Rich text content
}

type ScrollableCardsProps = {
  title?: string | null
  subtitle?: string | null
  cards: ScrollableCard[]
  className?: string
}

export function ScrollableCards({ title, subtitle, cards, className }: ScrollableCardsProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Memoize icon components to avoid repeated lookups
  const iconComponents = useMemo(() => {
    const components: Record<string, any> = {}
    cards.forEach((card) => {
      if (card.icon && !components[card.icon]) {
        components[card.icon] = (LucideIcons as any)[card.icon]
      }
    })
    return components
  }, [cards])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' },
    )

    const cardElements = containerRef.current?.querySelectorAll('[data-index]')
    cardElements?.forEach((el) => cardObserver.observe(el))
    return () => cardObserver.disconnect()
  }, [])

  return (
    <section ref={containerRef} className={cn('py-16 px-4 max-w-container mx-auto', className)}>
      {title && (
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-ds-pastille-green max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      <div
        className={`grid gap-6 md:gap-8 ${
          cards.length <= 2
            ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {(cards || []).map((card, index) => (
          <article
            key={card.id || `${card.title}-${index}`}
            data-index={index}
            className={`w-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
              visibleCards.has(index)
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {/* Mobile: Vertical layout, Desktop: Vertical layout for grid */}
            <div className="flex flex-col h-full">
              {/* Icon Section */}
              {card.icon && (
                <div className="flex items-center justify-center p-6 md:p-8">
                  {(() => {
                    const IconComponent = iconComponents[card.icon!]
                    return IconComponent ? (
                      <IconComponent className="w-16 h-16 md:w-20 md:h-20 text-ds-accent-yellow" />
                    ) : null
                  })()}
                </div>
              )}

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-center text-xl md:text-2xl text-ds-dark-blue mb-4 leading-tight font-semibold">
                  {card.title}
                </h3>

                <div className="text-ds-pastille-green leading-relaxed prose prose-sm md:prose-base max-w-none">
                  <RichText data={card.content} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export const ScrollableCardsComponent = ScrollableCards
