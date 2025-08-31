import Image from 'next/image'
import { CMSLink } from '@/app/(frontend)/components/ui/cms-link'
import { cn } from '@/lib/utils'
import { ConsistentHTML } from '../safe-html/component'
import { RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'
type CTAButton = { label: string; href: string; variant?: 'primary' | 'secondary' }

type HeroSectionProps = {
  title: string
  subtitle?: Page['content'] | string
  backgroundImage?: string
  ctaButton?: CTAButton
  secondaryCTA?: CTAButton
  gradientOverlay?: boolean
  textColor?: 'auto' | 'light' | 'dark'
  className?: string
}

export function HeroSection({
  title: _title,
  subtitle,
  backgroundImage,
  ctaButton,
  secondaryCTA,
  gradientOverlay = false,
  textColor = 'auto',
  className,
}: HeroSectionProps) {
  // Map text color values to CSS classes
  const getTextColorClass = (isTitle: boolean = true) => {
    if (textColor === 'light') {
      return isTitle ? 'text-white' : 'text-gray-200'
    }
    if (textColor === 'dark') {
      return isTitle ? 'text-ds-dark-blue' : 'text-ds-pastille-green'
    }
    // Auto - based on background
    if (backgroundImage || gradientOverlay) {
      return isTitle ? 'text-white' : 'text-gray-200'
    }
    return isTitle ? 'text-ds-dark-blue' : 'text-ds-pastille-green'
  }

  return (
    <section
      id="hero-section"
      className={cn(
        'relative py-20 px-4 sm:px-6 lg:px-8 flex items-center bg-ds-light-neutral overflow-hidden min-h-[70vh]',
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
          <div className="absolute inset-0 bg-black/20" />
        </>
      )}
      {gradientOverlay && !backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-ds-dark-blue/80 to-ds-pastille-green/60" />
      )}
      <div className="relative z-10 max-w-container mx-auto w-full">
        <div className="max-w-container">
          {Boolean(subtitle) &&
            (isLexicalEditorState(subtitle) ? (
              <RichText
                data={subtitle}
                className={cn(
                  '',
                  // 'text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-2xl',
                  getTextColorClass(false),
                )}
              />
            ) : (
              <ConsistentHTML
                as="p"
                html={(typeof subtitle === 'string' ? subtitle : '') || ''}
                className={cn(
                  'text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-2xl',
                  getTextColorClass(false),
                )}
              />
            ))}
          {(ctaButton?.label && ctaButton?.href) || (secondaryCTA?.label && secondaryCTA?.href) ? (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
                    // getTextColorClass(false) === 'text-white'
                    // ? 'border-white text-white hover:bg-white hover:text-ds-dark-blue'
                    // : 'border-ds-dark-blue text-ds-dark-blue hover:bg-ds-dark-blue hover:text-white',
                  )}
                  external={secondaryCTA.href.startsWith('http')}
                >
                  {secondaryCTA.label}
                </CMSLink>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function isLexicalEditorState(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false
  return 'root' in (value as Record<string, unknown>)
}
