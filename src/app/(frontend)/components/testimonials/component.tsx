'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Page } from '@/payload-types'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { useSwipe } from '@/lib/hooks/use-swipe'

type TestimonialsProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'testimonials' }>

// Doctify Widget Component with Progressive Enhancement
function DoctifyWidget({ config }: { config: any }) {
  useEffect(() => {
    const container = document.getElementById(config.widgetId)
    if (!container) return

    // Clear any existing content
    container.innerHTML = ''

    // Create and load the script
    const script = document.createElement('script')
    script.src = `https://www.doctify.com/get-script?widget_container_id=${config.widgetId}&type=carousel-widget&tenant=${config.tenant}&language=${config.language}&profileType=${config.profileType}&layoutType=${config.layoutType}&slugs=${config.slugs}&background=${config.background}&itemBackground=${config.itemBackground}&itemFrame=${config.itemFrame}`
    script.async = true

    // Targeted CSS styling based on actual Doctify widget structure
    const addCustomStyles = () => {
      const styleId = `doctify-styles-${config.widgetId}`

      // Remove existing styles if any
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }

      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        /* Hide Doctify branding and source text */
        .doctify-testimonial-wrapper .doctify_carousel_widget_slug_hidden_8a03f2b1,
        .doctify-testimonial-wrapper .doctify_carousel_widget_source_by_doctify_8a03f2b1,
        .doctify-testimonial-wrapper .doctify_carousel_widget_date_by_doctify_8a03f2b1 {
          display: none !important;
        }

        /* Style the main container to match our design */
        .doctify-testimonial-wrapper .doctify_carousel_widget_main_container_8a03f2b1 {
          background: transparent !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Hide the left side rating section */
        .doctify-testimonial-wrapper .doctify_carousel_widget_left_container_8a03f2b1 {
          display: none !important;
        }

        /* Style the right container (testimonials) */
        .doctify-testimonial-wrapper .doctify_carousel_widget_right_container_8a03f2b1 {
          width: 100% !important;
          height: auto !important;
        }

        /* Style the slideshow container */
        .doctify-testimonial-wrapper .doctify_carousel_widget_slideshow-container_8a03f2b1 {
          position: relative !important;
          margin: 0 !important;
          display: flex !important;
          flex-direction: row !important;
          width: 100% !important;
          height: auto !important;
          align-items: stretch !important;
          padding: 0 60px !important;
        }

        /* Style individual testimonial cards */
        .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_wrapper_8a03f2b1 {
          flex: 1 1 33% !important;
          display: flex !important;
          flex-direction: row !important;
          padding: 8px !important;
        }

        .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_content_8a03f2b1 {
          width: 100% !important;
          height: 100% !important;
          background: white !important;
          border: 1px solid rgba(84, 123, 130, 0.2) !important;
          border-radius: 6px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          transition: box-shadow 0.2s ease !important;
        }

        .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_content_8a03f2b1:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        }

        /* Style the content padding */
        .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_content_padding_8a03f2b1 {
          height: 100% !important;
          padding: 24px 32px !important;
          font-size: 16px !important;
        }

        /* Style the review wrapper */
        .doctify-testimonial-wrapper .doctify_carousel_widget_review_item_wrapper_8a03f2b1 {
          margin: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          color: rgba(61, 66, 106, 0.8) !important;
          font-size: 16px !important;
          font-family: 'Poppins', sans-serif !important;
          font-weight: 300 !important;
          line-height: 1.6 !important;
        }

        /* Style the review text */
        .doctify-testimonial-wrapper .doctify_carousel_widget_review_item_review_text_8a03f2b1 {
          margin-bottom: 16px !important;
          overflow: visible !important;
          height: auto !important;
          text-align: left !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
          color: rgba(61, 66, 106, 0.8) !important;
          font-weight: 300 !important;
        }

        /* Style the review info section */
        .doctify-testimonial-wrapper .doctify_carousel_widget_review_item_review_info_8a03f2b1 {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          text-align: center !important;
          margin-top: auto !important;
        }

        /* Style the star rating */
        .doctify-testimonial-wrapper .doctify_carousel_widget_review_item_star_rating_8a03f2b1 {
          margin-bottom: 16px !important;
          display: flex !important;
          flex-direction: row !important;
        }

        /* Style navigation arrows to match our design */
        .doctify-testimonial-wrapper .doctify_carousel_widget_prev_8a03f2b1,
        .doctify-testimonial-wrapper .doctify_carousel_widget_next_8a03f2b1 {
          cursor: pointer !important;
          width: 40px !important;
          height: 40px !important;
          padding: 8px !important;
          font-weight: bold !important;
          font-size: 18px !important;
          transition: 0.3s ease !important;
          border-radius: 50% !important;
          user-select: none !important;
          color: #547b82 !important;
          background: white !important;
          border: 1px solid rgba(84, 123, 130, 0.2) !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: absolute !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          z-index: 10 !important;
        }

        .doctify-testimonial-wrapper .doctify_carousel_widget_prev_8a03f2b1 {
          left: 10px !important;
          transform: translateY(-50%) rotate(180deg) !important;
        }

        .doctify-testimonial-wrapper .doctify_carousel_widget_next_8a03f2b1 {
          right: 10px !important;
          transform: translateY(-50%) !important;
        }

        .doctify-testimonial-wrapper .doctify_carousel_widget_prev_8a03f2b1:hover,
        .doctify-testimonial-wrapper .doctify_carousel_widget_next_8a03f2b1:hover {
          color: #3d426a !important;
          background: #f8f9fa !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
        }

        /* Keep carousel behavior but style it properly */
        .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_8a03f2b1 {
          display: none !important;
          width: 100% !important;
          height: auto !important;
        }

        .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_8a03f2b1[style*="display: block"] {
          display: block !important;
        }

        /* Style the slide item container for carousel */
        .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_container_8a03f2b1 {
          width: 100% !important;
          height: auto !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: stretch !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .doctify-testimonial-wrapper .doctify_carousel_widget_slideshow-container_8a03f2b1 {
            padding: 0 20px !important;
          }
          
          .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_wrapper_8a03f2b1 {
            flex: 1 1 100% !important;
            margin-bottom: 16px !important;
            padding: 4px !important;
          }
          
          .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_content_padding_8a03f2b1 {
            padding: 20px 24px !important;
          }
          
          .doctify-testimonial-wrapper .doctify_carousel_widget_prev_8a03f2b1,
          .doctify-testimonial-wrapper .doctify_carousel_widget_next_8a03f2b1 {
            width: 36px !important;
            height: 36px !important;
            padding: 6px !important;
          }
          
          .doctify-testimonial-wrapper .doctify_carousel_widget_prev_8a03f2b1 svg,
          .doctify-testimonial-wrapper .doctify_carousel_widget_next_8a03f2b1 svg {
            width: 10px !important;
            height: 15px !important;
          }
          
          .doctify-testimonial-wrapper .doctify_carousel_widget_prev_8a03f2b1 {
            left: 5px !important;
            transform: translateY(-50%) rotate(180deg) !important;
          }
          
          .doctify-testimonial-wrapper .doctify_carousel_widget_next_8a03f2b1 {
            right: 5px !important;
            transform: translateY(-50%) !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .doctify-testimonial-wrapper .doctify_carousel_widget_slide_item_wrapper_8a03f2b1 {
            flex: 1 1 50% !important;
          }
        }
      `

      document.head.appendChild(style)
    }

    // Apply styles immediately and after script loads
    addCustomStyles()

    script.onload = () => {
      // Apply styles again after widget loads
      setTimeout(addCustomStyles, 1000)
      // Also try after a longer delay in case widget loads slowly
      setTimeout(addCustomStyles, 3000)
    }

    container.appendChild(script)

    // Cleanup function
    return () => {
      const style = document.getElementById(`doctify-styles-${config.widgetId}`)
      if (style) {
        style.remove()
      }
      if (container && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [config])

  return (
    <div className="doctify-testimonial-wrapper relative overflow-hidden">
      <div id={config.widgetId} className="w-full" />
    </div>
  )
}

export function Testimonials({
  title = '',
  testimonialType = 'custom',
  testimonials = [],
  doctifyConfig,
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

  // If using Doctify, render the widget
  if (testimonialType === 'doctify' && doctifyConfig) {
    return (
      <section className="py-16 px-4 ">
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl font-heading text-ds-dark-blue text-center mb-12">{title}</h2>
          <DoctifyWidget config={doctifyConfig} />
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
