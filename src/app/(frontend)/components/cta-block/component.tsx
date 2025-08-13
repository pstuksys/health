import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAlignmentClasses, type AlignmentType } from '@/lib/design-system'

type CTAButton = { label: string; href: string }

type CTABlockProps = {
  title: string
  description?: string
  ctaButton: CTAButton
  align?: AlignmentType
  variant?: 'default' | 'accent' | 'gradient'
  className?: string
}

export function CTABlock({ title, description, ctaButton, align = 'center', variant = 'default', className }: CTABlockProps) {
  const alignmentClasses = getAlignmentClasses(align)
  const getBackgroundClasses = () => (variant === 'accent' ? 'bg-ds-accent-yellow text-ds-dark-blue' : variant === 'gradient' ? 'bg-gradient-blue-green text-white' : 'bg-ds-light-neutral text-ds-dark-blue')
  const getButtonClasses = () => (variant === 'accent' ? 'bg-ds-dark-blue hover:bg-ds-dark-blue/90 text-white' : variant === 'gradient' ? 'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue' : 'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue')
  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', getBackgroundClasses(), className)}>
      <div className="max-w-4xl mx-auto">
        <div className={cn('space-y-6', alignmentClasses)}>
          <h2 className={cn('text-3xl sm:text-4xl font-light leading-tight', alignmentClasses)} dangerouslySetInnerHTML={{ __html: title }} />
          {description && (
            <p className={cn('text-lg font-light leading-relaxed max-w-2xl', variant === 'gradient' ? 'text-gray-200' : 'opacity-80', align === 'center' && 'mx-auto', alignmentClasses)} dangerouslySetInnerHTML={{ __html: description }} />
          )}
          <div className={cn('pt-4', alignmentClasses)}>
            <Button asChild size="lg" className={cn('font-semibold px-8 py-3', getButtonClasses())}>
              <Link href={ctaButton.href}>{ctaButton.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}


