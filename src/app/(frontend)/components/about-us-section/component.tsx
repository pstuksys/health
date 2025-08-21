import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import { cn } from '@/lib/utils'

type CTAButton = { label: string; href: string }

type AboutUsSectionProps = {
  title: string
  content: string
  image?: string
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
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8 bg-ds-light-neutral', className)}>
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue">
              {title}
            </h2>
            <div
              className="text-lg font-light leading-relaxed text-ds-pastille-green prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {ctaButton && (
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold px-8 py-3"
                >
                  <Link href={ctaButton.href}>{ctaButton.label}</Link>
                </Button>
              </div>
            )}
          </div>
          {image && (
            <div className="relative">
              <Image
                src={image || '/placeholder.svg'}
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
