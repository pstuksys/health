import Image from 'next/image'
import { cn } from '@/lib/utils'

type ContentBlockProps = {
  title: string
  content: string
  layout?: 'full' | 'split'
  image?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export function ContentBlock({ title, content, layout = 'full', image, imagePosition = 'right', className }: ContentBlockProps) {
  if (layout === 'full') {
    return (
      <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center">{title}</h2>
            <div className="text-lg font-light leading-relaxed text-ds-pastille-green prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            {image && (
              <div className="mt-12">
                <Image src={image || '/placeholder.svg'} alt={title} width={800} height={400} className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  const isImageLeft = imagePosition === 'left'

  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-12 items-start', !isImageLeft && 'lg:grid-flow-col-dense')}>
          <div className={cn('space-y-6', !isImageLeft && 'lg:col-start-1')}>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue">{title}</h2>
            <div className="text-lg font-light leading-relaxed text-ds-pastille-green prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {image && (
            <div className={cn('relative', !isImageLeft && 'lg:col-start-2')}>
              <Image src={image || '/placeholder.svg'} alt={title} width={600} height={400} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


