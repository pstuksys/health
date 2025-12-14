import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import { RichText } from '@/app/(frontend)/components/ui/rich-text'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { ExtractBlock } from '@/types/blocks'

type MediaBlockProps = ExtractBlock<'mediaBlock'> & { className?: string }

export function MediaBlock({
  image,
  imagePosition = 'left',
  title,
  content,
  ctaButton,
  backgroundColor = 'default',
  className,
}: MediaBlockProps) {
  const getBackgroundClasses = () =>
    backgroundColor === 'light'
      ? 'bg-ds-light-neutral'
      : backgroundColor === 'dark'
        ? 'bg-ds-dark-blue text-white'
        : 'bg-white'
  const isImageLeft = imagePosition === 'left'

  return (
    <section className={cn('py-6 px-4 sm:px-4 lg:px-4', getBackgroundClasses(), className)}>
      <div className="max-w-container mx-auto">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
            !isImageLeft && 'lg:grid-flow-col-dense',
          )}
        >
          <div className={cn('relative', !isImageLeft && 'lg:col-start-2')}>
            <Image
              src={mediaToUrl(image)}
              alt={title}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className={cn('space-y-6', !isImageLeft && 'lg:col-start-1')}>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight">{title}</h2>
            <RichText
              data={content}
              className={cn(
                'text-lg font-light leading-relaxed',
                backgroundColor === 'dark' ? 'text-gray-200' : 'text-ds-pastille-green',
              )}
            />
            {ctaButton && (
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="font-semibold px-8 py-3 bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue"
                >
                  <Link href={ctaButton.href ?? '#'}>{ctaButton.label ?? 'Learn More'}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
