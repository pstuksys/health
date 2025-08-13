"use client"

import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type CarouselItem = { image: string; title?: string; description?: string; href?: string }

type CarouselProps = {
  items: CarouselItem[]
  slidesToShow?: number
  autoplay?: boolean
  autoplayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  className?: string
}

export function Carousel({ items, slidesToShow = 3, autoplay = false, autoplayInterval = 5000, showArrows = true, showDots = true, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const totalSlides = Math.ceil(items.length / slidesToShow)

  useEffect(() => {
    if (!autoplay || isHovered) return
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % totalSlides), autoplayInterval)
    return () => clearInterval(interval)
  }, [autoplay, autoplayInterval, totalSlides, isHovered])

  const goToSlide = (index: number) => setCurrentIndex(index)
  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % totalSlides)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) goToNext()
    else if (distance < -50) goToPrevious()
  }

  return (
    <div className={cn('relative w-full', className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className={cn('grid gap-6', `grid-cols-${Math.min(slidesToShow, items.length)}`)}>
                {items.slice(slideIndex * slidesToShow, (slideIndex + 1) * slidesToShow).map((item, itemIndex) => (
                  <div key={itemIndex} className="group">
                    {item.href ? (
                      <Link href={item.href} className="block">
                        <CarouselCard item={item} />
                      </Link>
                    ) : (
                      <CarouselCard item={item} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showArrows && totalSlides > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-ds-dark-blue rounded-full p-2 shadow-lg transition-all duration-200 z-10" aria-label="Previous slide">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-ds-dark-blue rounded-full p-2 shadow-lg transition-all duration-200 z-10" aria-label="Next slide">
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} className={cn('w-3 h-3 rounded-full transition-all duration-200', currentIndex === index ? 'bg-ds-accent-yellow' : 'bg-gray-300 hover:bg-gray-400')} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  )
}

function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <Image src={item.image || '/placeholder.svg'} alt={item.title || 'Carousel item'} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      {(item.title || item.description) && (
        <div className="p-4 space-y-2">
          {item.title && <h3 className="text-lg font-semibold text-ds-dark-blue group-hover:text-ds-pastille-green transition-colors duration-200">{item.title}</h3>}
          {item.description && <p className="text-ds-pastille-green font-light text-sm">{item.description}</p>}
        </div>
      )}
    </div>
  )
}


