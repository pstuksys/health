import Image from 'next/image'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

type ImageBlockProps = {
  image: number | Media | null | undefined
  size?: 'small' | 'medium' | 'large' | null | undefined
  alignment?: 'left' | 'center' | 'right' | null | undefined
  className?: string
}

const sizeConfig = {
  small: {
    maxWidth: 200,
    maxHeight: 200,
    className: 'max-w-[200px] max-h-[200px]',
  },
  medium: {
    maxWidth: 400,
    maxHeight: 300,
    className: 'max-w-[400px] max-h-[300px]',
  },
  large: {
    maxWidth: 600,
    maxHeight: 400,
    className: 'max-w-[600px] max-h-[400px]',
  },
}

const alignmentClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export function ImageBlock({
  image,
  size = 'small',
  alignment = 'center',
  className,
}: ImageBlockProps) {
  if (!image) return null

  const config = sizeConfig[size || 'small']
  const alignmentClass = alignmentClasses[alignment || 'center']

  return (
    <section className={cn('py-6 px-4 sm:px-4 lg:px-4', className)}>
      <div className="max-w-container mx-auto">
        <div className={cn('flex', alignmentClass)}>
          <div className={cn('relative', config.className)}>
            <Image
              src={mediaToUrl(image)}
              alt={(image as Media)?.alt || 'Image'}
              width={config.maxWidth}
              height={config.maxHeight}
              className="w-full h-auto rounded-lg shadow-md object-contain"
              style={{
                maxWidth: `${config.maxWidth}px`,
                maxHeight: `${config.maxHeight}px`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
