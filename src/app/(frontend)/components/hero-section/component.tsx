import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAlignmentClasses, type AlignmentType } from '@/lib/design-system'

type CTAButton = { label: string; href: string; variant?: 'primary' | 'secondary' }

type HeroSectionProps = {
  title: string
  subtitle?: string
  align?: AlignmentType
  backgroundImage?: string
  ctaButton?: CTAButton
  secondaryCTA?: CTAButton
  gradientOverlay?: boolean
  className?: string
}

export function HeroSection({ title, subtitle, align = 'center', backgroundImage, ctaButton, secondaryCTA, gradientOverlay = false, className }: HeroSectionProps) {
  const alignmentClasses = getAlignmentClasses(align)
  return (
    <section className={cn('relative py-20 px-4 sm:px-6 lg:px-8 min-h-[60vh] flex items-center', backgroundImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-ds-light-neutral', className)} style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}>
      {gradientOverlay && <div className="absolute inset-0 bg-gradient-to-r from-ds-dark-blue/80 to-ds-pastille-green/60" />}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className={cn('max-w-4xl', alignmentClasses)}>
          <h1 className={cn('text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6', backgroundImage || gradientOverlay ? 'text-white' : 'text-ds-dark-blue', alignmentClasses)} dangerouslySetInnerHTML={{ __html: title }} />
          {subtitle && <p className={cn('text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-2xl', backgroundImage || gradientOverlay ? 'text-gray-200' : 'text-ds-pastille-green', alignmentClasses)} dangerouslySetInnerHTML={{ __html: subtitle }} />}
          {(ctaButton || secondaryCTA) && (
            <div className={cn('flex flex-col sm:flex-row gap-4', alignmentClasses)}>
              {ctaButton && (
                <Button asChild size="lg" className={cn('font-semibold px-8 py-3', ctaButton.variant === 'secondary' ? 'bg-transparent border-2 border-ds-accent-yellow text-ds-accent-yellow hover:bg-ds-accent-yellow hover:text-ds-dark-blue' : 'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue')}>
                  <Link href={ctaButton.href}>{ctaButton.label}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button asChild variant="outline" size="lg" className={cn('font-semibold px-8 py-3', backgroundImage || gradientOverlay ? 'border-white text-white hover:bg-white hover:text-ds-dark-blue' : 'border-ds-dark-blue text-ds-dark-blue hover:bg-ds-dark-blue hover:text-white')}>
                  <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


