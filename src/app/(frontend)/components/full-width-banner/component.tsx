'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import { resolveLinkHref } from '@/lib/navigation'
import { useSwipe } from '@/hooks/use-swipe'
import type { Page } from '@/payload-types'
import { CMSLink } from '../ui'
import { Button } from '../ui/button'

type FullWidthBannerProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'fullWidthBanner' }
>

type CarouselItem = {
  title: string
  subtitle?: string
  buttonText?: string
  href: string
  openInNewTab?: boolean
}

export function FullWidthBanner({
  enableCarousel,
  enableQuotes,
  carouselItems,
  title,
  subtitle,
  buttonText,
  linkType,
  internal,
  external,
  openInNewTab,
  backgroundImage,
}: FullWidthBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFading, setIsFading] = useState(false)

  const bgUrl = mediaToUrl(backgroundImage)

  // Resolve carousel items with proper hrefs
  const resolvedCarouselItems = useMemo<CarouselItem[]>(() => {
    if (!enableCarousel || !carouselItems) return []

    return carouselItems.map((item) => ({
      title: item.title || '',
      subtitle: item.subtitle || undefined,
      buttonText: item.buttonText || undefined,
      href: resolveLinkHref({
        linkType: item.linkType,
        internal: item.internal,
        external: item.external,
      }),
      openInNewTab: item.openInNewTab || undefined,
    }))
  }, [enableCarousel, carouselItems])

  // Resolve single item href (when carousel is disabled)
  const resolvedHref = resolveLinkHref({
    linkType,
    internal,
    external,
  })

  const totalSlides = resolvedCarouselItems.length

  const nextSlide = useCallback(() => {
    if (isFading || totalSlides === 0) return
    setIsFading(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
      setIsFading(false)
    }, 300)
  }, [isFading, totalSlides])

  const prevSlide = useCallback(() => {
    if (isFading || totalSlides === 0) return
    setIsFading(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
      setIsFading(false)
    }, 300)
  }, [isFading, totalSlides])

  // Use the swipe hook for touch navigation
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    minSwipeDistance: 50,
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  })

  // Auto-advance carousel every 5 seconds when not hovered
  useEffect(() => {
    if (!enableCarousel || totalSlides <= 1 || isHovered) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [enableCarousel, totalSlides, isHovered, nextSlide])

  // Get current content to display
  const currentContent =
    enableCarousel && resolvedCarouselItems.length > 0
      ? resolvedCarouselItems[currentIndex]
      : {
          title: title || '',
          subtitle,
          buttonText: buttonText || undefined,
          href: resolvedHref,
          openInNewTab,
        }

  return (
    <section
      className="relative w-full overflow-hidden h-64 sm:h-72 md:h-80 lg:h-96 xl:h-96"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Image using Next.js Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={bgUrl}
          alt="Banner background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center 25%',
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-ds-dark-blue/60 z-10 pointer-events-none" />

      {/* Navigation Arrows - only show when carousel is enabled and has multiple items */}
      {enableCarousel && totalSlides > 1 && (
        <div className="hidden md:block z-30">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white border-ds-pastille-green/20 hover:border-ds-pastille-green/40 transition-all duration-300 items-center justify-center rounded-full shadow"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-ds-dark-blue" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white border-ds-pastille-green/20 hover:border-ds-pastille-green/40 transition-all duration-300 items-center justify-center rounded-full shadow"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-ds-dark-blue" />
          </Button>
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 py-6 sm:py-8 md:py-12 lg:py-14 text-center text-white">
        <div
          className={cn(
            'flex flex-col items-center justify-center max-w-5xl w-full space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 transition-opacity duration-300',
            isFading ? 'opacity-0' : 'opacity-100',
          )}
        >
          <h2
            className={cn(
              'font-light max-w-4xl transition-opacity duration-300 leading-tight',
              enableCarousel
                ? 'text-lg sm:text-xl lg:text-2xl xl:text-3xl'
                : 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
            )}
          >
            {enableQuotes ? (
              <>
                <span
                  className={cn(
                    'opacity-80',
                    enableCarousel
                      ? 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
                      : 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
                  )}
                >
                  &ldquo;
                </span>
                {currentContent.title}
                <span
                  className={cn(
                    'opacity-80',
                    enableCarousel
                      ? 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl'
                      : 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
                  )}
                >
                  &rdquo;
                </span>
              </>
            ) : (
              currentContent.title
            )}
          </h2>
          {currentContent.subtitle && (
            <p
              className={cn(
                'font-light max-w-3xl opacity-90 transition-opacity duration-300 leading-relaxed',
                enableCarousel
                  ? 'text-xs sm:text-sm lg:text-base min-h-16'
                  : 'text-sm sm:text-base lg:text-lg',
              )}
            >
              {currentContent.subtitle}
            </p>
          )}
          {currentContent.buttonText && (
            <div className="pt-2 sm:pt-3 md:pt-4">
              <CMSLink
                variant="primary"
                href={currentContent.href}
                className="transition-opacity duration-300"
                size="md"
              >
                {currentContent.buttonText}
              </CMSLink>
            </div>
          )}
        </div>
      </div>

      {/* Dots Navigation - only show when carousel is enabled and has multiple items */}
      {enableCarousel && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex justify-center gap-2 md:hidden">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300',
                currentIndex === index ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60',
              )}
              onClick={() => {
                if (isFading || totalSlides === 0 || currentIndex === index) return
                setIsFading(true)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsFading(false)
                }, 300)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
