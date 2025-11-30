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
    <section className={cn('py-16 px-4 sm:px-4 lg:px-4')}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center mb-12">
            {title}
          </h2>
        )}

        <div className="space-y-12 ">
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
                    <p className="text-ds-pastille-green text-base lg:text-lg leading-relaxed mb-6 text-left lg:text-justify hyphens-none text-pretty">
                      {block.description}
                    </p>
                    {(block.buttonText || block.btn2Text) && (
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                            className="hover:!text-ds-dark-blue !text-ds-accent-yellow"
                          >
                            {block.buttonText}
                          </CMSLink>
                        )}
                        {block.btn2Text && (
                          <CMSLink
                            href={resolveLinkHref({
                              linkType: block.btn2LinkType || 'external',
                              internal: block.btn2Internal
                                ? {
                                    relation: {
                                      relationTo: block.btn2Internal.relationTo,
                                      value: { slug: block.btn2Internal.value },
                                    },
                                  }
                                : undefined,
                              external: block.btn2External,
                            })}
                            variant="ghost"
                            size="lg"
                            external={block.btn2LinkType === 'external'}
                            className="hover:!text-ds-dark-blue !text-ds-accent-yellow"
                          >
                            {block.btn2Text}
                          </CMSLink>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Block */}
                {imageUrl && (
                  <div className="w-full md:w-1/2 lg:w-1/2">
                    <div
                      className={cn(
                        'relative w-full aspect-[3/2] sm:aspect-[4/3] md:aspect-[4/3] max-w-[400px] max-[450px]:max-w-full md:max-w-[550px] lg:max-w-[550px] mx-auto overflow-hidden shadow-lg',
                        actualImagePosition === 'right'
                          ? 'md:ml-auto lg:ml-auto'
                          : 'md:mr-auto lg:mr-auto',
                      )}
                    >
                      <Image
                        src={imageUrl}
                        alt=""
                        fill
                        className={cn(
                          'object-cover',
                          actualImagePosition === 'right' ? 'object-right' : 'object-left',
                        )}
                        sizes="(max-width: 450px) 100vw, (max-width: 640px) 400px, (max-width: 1024px) 50vw, 45vw"
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
