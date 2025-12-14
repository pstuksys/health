'use client'

import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { CMSLink } from '@/app/(frontend)/components/ui/cms-link'
import {
  getHeroTextColorClass,
  getHeroAlignmentClasses,
  getHeroOverlayClass,
  type HeroTextColor,
  type HeroAlignment,
  type HeroOverlayDarkness,
} from '@/lib/hero-config'
import { cn } from '@/lib/utils'
import { ConsistentHTML } from '../safe-html/component'
import { RichText, isLexicalEditorState } from '@/app/(frontend)/components/ui/rich-text'
import { SleepDisorderStatsCard } from '../sleep-disorder-stats-card/component'
import type { Page } from '@/payload-types'
type CTAButton = { label: string; href: string; variant?: 'primary' | 'secondary' }

type HeroSectionProps = {
  subtitle?: Page['content'] | string
  backgroundImage?: string
  ctaButton?: CTAButton
  secondaryCTA?: CTAButton
  gradientOverlay?: boolean
  overlayDarkness?: HeroOverlayDarkness
  textColor?: HeroTextColor
  ctaAlignment?: HeroAlignment
  fullHeight?: boolean
  showStatsCard?: boolean
  statsCard?: Page['heroStatsCard']
  className?: string
}

export function HeroSection({
  subtitle,
  backgroundImage,
  ctaButton,
  secondaryCTA,
  gradientOverlay = false,
  overlayDarkness = 'none',
  textColor = 'auto',
  ctaAlignment = 'left',
  fullHeight = false,
  showStatsCard = false,
  statsCard,
  className,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Memoize text color class to avoid recalculating multiple times
  const textColorClass = useMemo(() => {
    return getHeroTextColorClass(textColor, Boolean(backgroundImage || gradientOverlay))
  }, [textColor, backgroundImage, gradientOverlay])

  // Memoize alignment classes
  const alignmentClasses = useMemo(() => {
    return getHeroAlignmentClasses(ctaAlignment)
  }, [ctaAlignment])

  const overlayClass = useMemo(() => {
    return getHeroOverlayClass(overlayDarkness)
  }, [overlayDarkness])

  // Trigger fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Track scroll position to hide bounce indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to next section
  const scrollToNext = () => {
    const heroElement = document.getElementById('hero-section')
    if (heroElement) {
      const nextElement = heroElement.nextElementSibling as HTMLElement
      if (nextElement) {
        nextElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id="hero-section"
      className={cn(
        'hero-section relative flex items-center bg-ds-light-neutral overflow-hidden',
        fullHeight
          ? 'h-screen min-h-screen px-4 sm:px-6 lg:px-8'
          : 'py-20 px-4 sm:px-6 lg:px-8 min-h-[70vh]',
        className,
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt="hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle overlay for better text readability */}
          <div className={cn('absolute inset-0', overlayClass)} />
        </>
      )}
      {gradientOverlay && !backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-ds-dark-blue/80 to-ds-pastille-green/60" />
      )}
      <div className="relative z-10 max-w-container mx-auto w-full">
        <div
          className={cn(
            'max-w-container transition-all duration-1000 ease-out transform',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            showStatsCard ? 'flex flex-col lg:flex-row lg:items-center lg:gap-12' : '',
          )}
        >
          {/* Main Content */}
          <div className={cn(showStatsCard ? 'flex-1' : '')}>
            {Boolean(subtitle) &&
              (isLexicalEditorState(subtitle) ? (
                <RichText
                  data={subtitle}
                  className={cn(
                    'text-lg sm:text-xl font-light leading-relaxed mb-8',
                    textColorClass,
                    alignmentClasses.text,
                  )}
                />
              ) : (
                <ConsistentHTML
                  as="p"
                  html={(typeof subtitle === 'string' ? subtitle : '') || ''}
                  className={cn(
                    'text-lg sm:text-xl font-light leading-relaxed mb-8',
                    textColorClass,
                    alignmentClasses.text,
                  )}
                />
              ))}
            {(ctaButton?.label && ctaButton?.href) ||
            (secondaryCTA?.label && secondaryCTA?.href) ? (
              <div
                className={cn(
                  'flex flex-col sm:flex-row gap-4 w-full sm:w-auto',
                  alignmentClasses.buttons,
                )}
              >
                {ctaButton?.label && ctaButton?.href && (
                  <CMSLink
                    href={ctaButton.href}
                    variant={ctaButton.variant === 'secondary' ? 'secondary' : 'primary'}
                    size="lg"
                    className="w-full sm:w-auto text-center"
                    external={ctaButton.href.startsWith('http')}
                  >
                    {ctaButton.label}
                  </CMSLink>
                )}
                {secondaryCTA?.label && secondaryCTA?.href && (
                  <CMSLink
                    href={secondaryCTA.href}
                    variant="outline"
                    size="lg"
                    className={cn(
                      'w-full sm:w-auto text-center',
                      'border-white text-white hover:bg-white hover:text-ds-dark-blue',
                    )}
                    external={secondaryCTA.href.startsWith('http')}
                  >
                    {secondaryCTA.label}
                  </CMSLink>
                )}
              </div>
            ) : null}
          </div>

          {/* Statistics Card */}
          {showStatsCard && statsCard && (
            <div className="flex lg:justify-end mt-8 lg:mt-0">
              <SleepDisorderStatsCard
                title={statsCard.title ?? undefined}
                statisticLabel={statsCard.statisticLabel ?? undefined}
                statisticValue={statsCard.statisticValue ?? undefined}
                description={statsCard.description ?? undefined}
                progressPercentage={statsCard.progressPercentage ?? undefined}
                className="w-full max-w-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator - only show when full height is enabled and user hasn't scrolled */}
      {fullHeight && !hasScrolled && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={scrollToNext}
            className={cn(
              'flex flex-col items-center space-y-2 transition-all duration-700 ease-out transform hover:scale-110',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              'animate-bounce',
            )}
            aria-label="Scroll to next section"
          >
            <span className={cn('text-sm font-light tracking-wider uppercase', textColorClass)}>
              Scroll
            </span>
            <ChevronDown
              className={cn(
                'w-6 h-6',
                textColorClass === 'text-gray-200' ? 'text-white' : textColorClass,
              )}
            />
          </button>
        </div>
      )}
    </section>
  )
}
