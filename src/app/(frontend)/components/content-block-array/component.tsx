import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'
import { mediaToUrl } from '@/lib/media'
import type { Page } from '@/payload-types'

type ContentBlockArrayProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'contentBlockArray' }
>

export function ContentBlockArray({
  title,
  contentBlocks,
  layout = 'default',
}: ContentBlockArrayProps) {
  if (!contentBlocks || contentBlocks.length === 0) return null

  return (
    <section className={cn('py-12 px-4 sm:px-4 lg:px-4')}>
      <div className="max-w-container mx-auto">
        {title && (
          <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center mb-12">
            {title}
          </h2>
        )}

        <div className="space-y-4 md:space-y-1">
          {contentBlocks.map((block, index) => {
            const imageUrl = mediaToUrl(block.image as any)
            const isImageLeft = block.imagePosition === 'left'
            const shouldAlternate = layout === 'alternating' && index % 2 === 1

            const actualImagePosition = shouldAlternate
              ? isImageLeft
                ? 'right'
                : 'left'
              : block.imagePosition

            return (
              <div
                key={block.id || index}
                className={cn(
                  'flex flex-col md:flex-row lg:flex-row items-center',
                  actualImagePosition === 'left' ? 'md:flex-row-reverse lg:flex-row-reverse' : '',
                )}
              >
                {/* Text Block */}
                <div className="w-full md:w-1/2 lg:w-1/2 text-center md:text-left lg:text-left">
                  <div
                    className={cn(
                      'max-w-[500px] mx-auto pb-4 md:pb-0',
                      actualImagePosition === 'right'
                        ? 'md:mx-0 md:pl-5 lg:mx-0 lg:pl-5'
                        : 'md:mx-auto md:pl-5 lg:mx-auto',
                    )}
                  >
                    <h3 className="text-2xl lg:text-3xl font-light text-ds-dark-blue mb-4">
                      {block.title}
                    </h3>
                    <p className="text-ds-pastille-green text-base lg:text-lg leading-relaxed mb-6">
                      {block.description}
                    </p>
                    {block.buttonText && (
                      <CMSLink
                        href={resolveLinkHref({
                          linkType: block.linkType || 'external',
                          internal: block.internal
                            ? {
                                relation: {
                                  relationTo: block.internal.relationTo,
                                  value: { slug: block.internal.value },
                                },
                              }
                            : undefined,
                          external: block.external,
                        })}
                        variant="ghost"
                        size="lg"
                        external={block.linkType === 'external'}
                        className="!text-ds-dark-blue hover:!text-ds-accent-yellow"
                      >
                        {block.buttonText}
                      </CMSLink>
                    )}
                  </div>
                </div>

                {/* Image Block */}
                {imageUrl && (
                  <div className="w-full md:w-1/2 lg:w-1/2">
                    <div className="relative w-full h-64 md:h-[400px] lg:h-[400px] overflow-hidden shadow-lg">
                      <Image
                        src={imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
