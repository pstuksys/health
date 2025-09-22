import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import { RichText } from '@/app/(frontend)/components/ui/rich-text'
import { PayloadImage } from '@/app/(frontend)/components/ui/payload-image'
import { cn } from '@/lib/utils'
import type { Media } from '@/payload-types'

type CTAButton = {
  label?: string | null | undefined
  href?: string | null | undefined
}

type AboutUsSectionProps = {
  title: string
  content?: any // Lexical content
  image?: number | Media | null | undefined
  ctaButton?: CTAButton
  className?: string
}

export function AboutUsSection({
  title,
  content,
  image,
  ctaButton,
  className,
}: AboutUsSectionProps) {
  return (
    <section className={cn('py-6 px-4 sm:px-4 lg:px-4 bg-ds-light-neutral', className)}>
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue">
              {title}
            </h2>
            <RichText
              data={content}
              className="text-lg font-light leading-relaxed text-ds-pastille-green prose prose-lg max-w-none"
            />
            {ctaButton && (
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold px-8 py-3"
                >
                  <Link href={ctaButton.href ?? '#'}>{ctaButton.label ?? 'Learn More'}</Link>
                </Button>
              </div>
            )}
          </div>
          {image && (
            <div className="relative">
              <PayloadImage
                media={image}
                variant="card"
                alt={title}
                width={600}
                height={400}
                className="w-full h-auto shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
