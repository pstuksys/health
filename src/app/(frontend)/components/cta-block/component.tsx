import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import { RichText } from '@/app/(frontend)/components/ui/rich-text'
import { cn } from '@/lib/utils'
import { getAlignmentClasses } from '@/lib/design-system'
import type { ExtractBlock } from '@/types/blocks'

type CTABlockProps = ExtractBlock<'ctaBlock'> & { className?: string }

export function CTABlock({
  title,
  description,
  ctaButton,
  align,
  variant,
  className,
}: CTABlockProps) {
  const alignValue = align ?? 'center'
  const variantValue = variant ?? 'default'
  const alignmentClasses = getAlignmentClasses(alignValue)
  const getBackgroundClasses = () =>
    variantValue === 'accent'
      ? 'bg-ds-accent-yellow text-ds-dark-blue'
      : variantValue === 'gradient'
        ? 'bg-gradient-blue-green text-white'
        : 'bg-ds-light-neutral text-ds-dark-blue'
  const getButtonClasses = () =>
    variantValue === 'accent'
      ? 'bg-ds-dark-blue hover:bg-ds-dark-blue/90 text-white'
      : variantValue === 'gradient'
        ? 'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue'
        : 'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue'

  return (
    <section className={cn('py-6 px-4 sm:px-4 lg:px-4', getBackgroundClasses(), className)}>
      <div className="max-w-4xl mx-auto">
        <div className={cn('space-y-6', alignmentClasses)}>
          <RichText
            data={title}
            className={cn('text-3xl sm:text-4xl font-light leading-tight', alignmentClasses)}
          />
          {description && (
            <RichText
              data={description}
              className={cn(
                'text-lg font-light leading-relaxed max-w-2xl',
                variantValue === 'gradient' ? 'text-gray-200' : 'opacity-80',
                alignValue === 'center' && 'mx-auto',
                alignmentClasses,
              )}
            />
          )}
          {ctaButton && (
            <div className={cn('pt-4', alignmentClasses)}>
              <Button
                asChild
                size="lg"
                className={cn('font-semibold px-8 py-3', getButtonClasses())}
              >
                <Link href={ctaButton.href ?? '#'}>{ctaButton.label ?? 'Learn More'}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
