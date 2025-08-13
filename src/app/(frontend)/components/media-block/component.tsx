import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CTAButton = { label: string; href: string }

type MediaBlockProps = {
  image: string
  imagePosition?: 'left' | 'right'
  title: string
  content: string
  ctaButton?: CTAButton
  backgroundColor?: 'default' | 'light' | 'dark'
  className?: string
}

export function MediaBlock({ image, imagePosition = 'left', title, content, ctaButton, backgroundColor = 'default', className }: MediaBlockProps) {
  const getBackgroundClasses = () => (backgroundColor === 'light' ? 'bg-ds-light-neutral' : backgroundColor === 'dark' ? 'bg-ds-dark-blue text-white' : 'bg-white')
  const isImageLeft = imagePosition === 'left'
  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', getBackgroundClasses(), className)}>
      <div className="max-w-7xl mx-auto">
        <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-12 items-center', !isImageLeft && 'lg:grid-flow-col-dense')}>
          <div className={cn('relative', !isImageLeft && 'lg:col-start-2')}>
            <Image src={image || '/placeholder.svg'} alt={title} width={600} height={400} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className={cn('space-y-6', !isImageLeft && 'lg:col-start-1')}>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight">{title}</h2>
            <div className={cn('text-lg font-light leading-relaxed', backgroundColor === 'dark' ? 'text-gray-200' : 'text-ds-pastille-green')} dangerouslySetInnerHTML={{ __html: content }} />
            {ctaButton && (
              <div className="pt-4">
                <Button asChild size="lg" className="font-semibold px-8 py-3 bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue">
                  <Link href={ctaButton.href}>{ctaButton.label}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


