'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { CarouselField, CarouselItem } from '../../../../types/carousel'

type MedicalCarouselProps = CarouselField & { className?: string }

function chunkItems(items: CarouselItem[], chunkSize: number): CarouselItem[][] {
  if (chunkSize <= 1) return items.map((i) => [i])
  const pages: CarouselItem[][] = []
  for (let i = 0; i < items.length; i += chunkSize) {
    pages.push(items.slice(i, i + chunkSize))
  }
  return pages
}

function CarouselCard({ item }: { item: CarouselItem }) {
  const card = (
    <div className="group cursor-pointer transition-all duration-300 hover:shadow-xl bg-white border border-ds-pastille-green/20 overflow-hidden rounded-[5px]">
      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className="flex flex-col md:flex-row h-auto md:h-96">
        {/* Image Section */}
        <div className="w-full md:w-1/2 overflow-hidden relative h-48 md:h-full">
          <Image
            src={item.image || '/placeholder.svg'}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Text Content Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div className="text-center w-full">
            <h3 className="text-xl md:text-2xl font-semibold text-ds-dark-blue mb-3 md:mb-4 group-hover:text-ds-pastille-green transition-colors duration-300">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-gray-600 font-light leading-relaxed mb-4 md:mb-6 line-clamp-3 text-sm md:text-base">
                {item.description}
              </p>
            )}
            {item.href && (
              <Button
                className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-white font-semibold px-4 md:px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-md text-sm md:text-base"
                asChild
              >
                <Link href={item.href}>Explore {item.title}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  return card
}

export function MedicalCarousel({
  title,
  subtitle,
  items,
  slidesToShow = 1,
  autoplay = false,
  autoplayInterval = 5000,
  showArrows = true,
  showDots = true,
  className,
}: MedicalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const pages = useMemo(() => chunkItems(items, Math.max(1, slidesToShow)), [items, slidesToShow])
  const totalSlides = pages.length

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    if (!autoplay || isHovered || totalSlides <= 1) return
    const interval = setInterval(nextSlide, autoplayInterval)
    return () => clearInterval(interval)
  }, [autoplay, autoplayInterval, isHovered, nextSlide, totalSlides])

  return (
    <div
      className={cn('w-full max-w-7xl mx-auto px-4 md:px-4 py-8 md:py-12', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        {title && (
          <h2 className="text-2xl md:text-4xl font-light text-ds-dark-blue mb-3 md:mb-4 tracking-wide">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-base md:text-lg text-ds-pastille-green font-light max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        {showArrows && totalSlides > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-ds-pastille-green/20 hover:border-ds-pastille-green/40 transition-all duration-300 flex items-center justify-center"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-ds-dark-blue" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-ds-pastille-green/20 hover:border-ds-pastille-green/40 transition-all duration-300 flex items-center justify-center"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-ds-dark-blue" />
            </Button>
          </>
        )}

        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {pages.map((page, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {/* Mobile: Grid layout, Desktop: Horizontal layout */}
                <div className="block md:hidden">
                  <div className="grid grid-cols-1 gap-4 px-2">
                    {page.map((item, itemIdx) => (
                      <div key={itemIdx}>
                        <CarouselCard item={item} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Horizontal layout */}
                <div className="hidden md:flex -mx-2">
                  {page.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="px-2"
                      style={{ flex: `0 0 ${100 / Math.max(1, slidesToShow)}%` }}
                    >
                      <CarouselCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        {showDots && totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  'w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300',
                  currentIndex === index
                    ? 'bg-ds-dark-blue scale-110'
                    : 'bg-ds-pastille-green/30 hover:bg-ds-pastille-green/50',
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const Carousel = MedicalCarousel
