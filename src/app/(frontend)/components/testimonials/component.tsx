'use client'

import { useState, useEffect } from 'react'
import type { Page } from '@/payload-types'
import { useIsMobile } from '@/hooks/use-is-mobile'

type TestimonialsProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'testimonials' }>

export function Testimonials({
  title = '',
  testimonials = [],
  autoplayInterval = 4000,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!Array.isArray(testimonials) || testimonials.length <= 1) return
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, autoplayInterval ?? 4000)
    return () => clearInterval(id)
  }, [testimonials, autoplayInterval])

  const visibleCount = isMobile ? 1 : Math.min((testimonials || []).length, 3)

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-ds-light-neutral/30 to-ds-pastille-green/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading text-ds-dark-blue text-center mb-12">{title}</h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${currentIndex * (100 / (visibleCount || 1))}%)` }}
          >
            {(testimonials || []).map((t, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4 lg:w-1/3 lg:px-2">
                <div className="bg-white border border-ds-pastille-green/20 rounded-md p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                  <blockquote className="text-base lg:text-lg text-ds-dark-blue/80 font-light leading-relaxed mb-4 lg:mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <cite className="text-sm lg:text-base text-ds-pastille-green font-medium not-italic">
                    — {t.author}, {t?.role || ''}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>

        {Array.isArray(testimonials) && testimonials.length > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? 'bg-ds-dark-blue'
                    : 'bg-ds-pastille-green/30 hover:bg-ds-pastille-green/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
