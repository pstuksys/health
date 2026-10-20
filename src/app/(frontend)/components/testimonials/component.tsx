'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Page } from '@/payload-types'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { useSwipe } from '@/hooks/use-swipe'
import { useDoctifyWidget, DOCTIFY_PRACTICE_URL } from '@/hooks/use-doctify-widget'

type TestimonialsProps = Omit<
  Extract<NonNullable<Page['blocks']>[number], { blockType: 'testimonials' }>,
  'doctifyConfig'
>

const DOCTIFY_CAROUSEL_WIDGET_ID = '0yewt1ji'

const DOCTIFY_CAROUSEL_SCRIPT_URL = `https://www.doctify.com/get-script?${new URLSearchParams({
  widget_container_id: DOCTIFY_CAROUSEL_WIDGET_ID,
  type: 'carousel-widget',
  tenant: 'athena-uk',
  language: 'en',
  profileType: 'practice',
  layoutType: 'layoutA',
  slugs: 'independent-physiological-diagnostics',
  background: 'white',
  itemBackground: 'ffffff',
  itemFrame: 'true',
}).toString()}`

function DoctifyCarousel() {
  const { status, containerRef } = useDoctifyWidget({
    widgetId: DOCTIFY_CAROUSEL_WIDGET_ID,
    scriptUrl: DOCTIFY_CAROUSEL_SCRIPT_URL,
    rootMargin: '300px',
  })

  return (
    <div ref={containerRef} className="doctify-widget relative w-full min-h-[320px] overflow-hidden">
      {status === 'idle' || status === 'loading' ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-ds-pastille-green/70 animate-pulse">
          Loading reviews…
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <a
            href={DOCTIFY_PRACTICE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ds-dark-blue underline underline-offset-4 hover:text-ds-accent-yellow"
          >
            Read our patient reviews on Doctify
          </a>
        </div>
      ) : null}
      <div id={DOCTIFY_CAROUSEL_WIDGET_ID} className="w-full" suppressHydrationWarning />
    </div>
  )
}

export function Testimonials({
  title = '',
  testimonialType = 'custom',
  testimonials = [],
  autoplayInterval = 4000,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useIsMobile()

  const nextTestimonial = useCallback(() => {
    if (Array.isArray(testimonials) && testimonials.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }
  }, [testimonials])

  const prevTestimonial = useCallback(() => {
    if (Array.isArray(testimonials) && testimonials.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }, [testimonials])

  // Use the swipe hook for touch navigation
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    minSwipeDistance: 50,
    onSwipeLeft: nextTestimonial,
    onSwipeRight: prevTestimonial,
  })

  useEffect(() => {
    if (!Array.isArray(testimonials) || testimonials.length <= 1) return
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, autoplayInterval ?? 4000)
    return () => clearInterval(id)
  }, [testimonials, autoplayInterval])

  if (testimonialType === 'doctify') {
    return (
      <section className="py-16 px-4 ">
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl font-heading text-ds-dark-blue text-center mb-12">{title}</h2>
          <DoctifyCarousel />
        </div>
      </section>
    )
  }

  // Custom testimonials logic
  const visibleCount = isMobile ? 1 : Math.min((testimonials || []).length, 3)

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading text-ds-dark-blue text-center mb-12">{title}</h2>

        <div
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
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
