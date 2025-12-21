'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Page } from '@/payload-types'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { useSwipe } from '@/hooks/use-swipe'
import { useDoctifyWidget } from '@/hooks/use-doctify-widget'

type TestimonialsProps = Omit<
  Extract<NonNullable<Page['blocks']>[number], { blockType: 'testimonials' }>,
  'doctifyConfig'
>

type DoctifyCarouselConfig = {
  widgetId: string
  tenant: string
  language: string
  profileType: string
  layoutType: string
  slugs: string
  background: string
  itemBackground: string
  itemFrame: boolean
}

const DEFAULT_DOCTIFY_CAROUSEL_CONFIG = {
  widgetId: '0yewt1ji',
  tenant: 'athena-uk',
  language: 'en',
  profileType: 'practice',
  layoutType: 'layoutA',
  slugs: 'independent-physiological-diagnostics',
  background: 'white',
  itemBackground: 'ffffff',
  itemFrame: true,
} as const satisfies DoctifyCarouselConfig

function ensureDoctifyFontStyles(widgetId: string) {
  const styleId = `doctify-styles-${widgetId}`
  const existing = document.getElementById(styleId)
  if (existing) return

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    /* Override Doctify font loading to prevent CORS errors */
    @font-face {
      font-family: 'Poppins';
      font-display: swap;
      src: local('Poppins'), local('Poppins-Light'), local('Poppins-Regular'), local('Poppins-SemiBold');
    }
    
    /* Force all Doctify elements to use our Poppins font */
    .doctify-testimonial-wrapper * {
      font-family: var(--font-poppins), 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
  `

  document.head.appendChild(style)
}

// Doctify Widget Component with Progressive Enhancement
function DoctifyWidget({ config }: { config: DoctifyCarouselConfig }) {
  const scriptUrl = useMemo(() => {
    const params = new URLSearchParams({
      widget_container_id: config.widgetId,
      type: 'carousel-widget',
      tenant: config.tenant,
      language: config.language,
      profileType: config.profileType,
      layoutType: config.layoutType,
      slugs: config.slugs,
      background: config.background,
      itemBackground: config.itemBackground,
      itemFrame: String(config.itemFrame),
    })
    return `https://www.doctify.com/get-script?${params.toString()}`
  }, [
    config.background,
    config.itemBackground,
    config.itemFrame,
    config.language,
    config.layoutType,
    config.profileType,
    config.slugs,
    config.tenant,
    config.widgetId,
  ])

  const { isLoaded, containerRef } = useDoctifyWidget({
    widgetId: config.widgetId,
    scriptUrl,
    rootMargin: '300px',
  })

  useEffect(() => {
    ensureDoctifyFontStyles(config.widgetId)
    return () => {
      const style = document.getElementById(`doctify-styles-${config.widgetId}`)
      if (style) style.remove()
    }
  }, [config.widgetId])

  useEffect(() => {
    if (!isLoaded) return
    ensureDoctifyFontStyles(config.widgetId)
    const t1 = window.setTimeout(() => ensureDoctifyFontStyles(config.widgetId), 1000)
    const t2 = window.setTimeout(() => ensureDoctifyFontStyles(config.widgetId), 3000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [config.widgetId, isLoaded])

  return (
    <div className="doctify-testimonial-wrapper relative overflow-hidden">
      <div ref={containerRef} className="w-full min-h-[320px]">
        {!isLoaded ? (
          <div className="text-sm text-ds-pastille-green/70">Loading reviews…</div>
        ) : null}
        <div id={config.widgetId} className="w-full" suppressHydrationWarning />
      </div>
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

  // If using Doctify, render the widget with default configuration
  if (testimonialType === 'doctify') {
    const config = DEFAULT_DOCTIFY_CAROUSEL_CONFIG

    return (
      <section className="py-16 px-4 ">
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl font-heading text-ds-dark-blue text-center mb-12">{title}</h2>
          <DoctifyWidget config={config} />
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
