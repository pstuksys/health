'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'

type ContentBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'contentBlock' }>

export function ContentBlock({
  title,
  content,
  layout = 'full',
  image,
  imagePosition = 'right',
}: ContentBlockProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const imageUrl = mediaToUrl(image as any)

  if (layout === 'full') {
    return (
      <section ref={sectionRef} className={cn('py-16 px-4 sm:px-6 lg:px-8')}>
        <div className="max-w-container mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center">
              {title}
            </h2>
            {content && isLexicalEditorState(content) && (
              <RichText
                data={content as unknown}
                className="text-lg font-light leading-relaxed text-ds-pastille-green max-w-none"
              />
            )}
            {imageUrl && (
              <div
                className={cn(
                  'mt-12 relative w-full h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden rounded-lg shadow-lg transition-all duration-500 lg:sticky lg:top-4',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                )}
              >
                <Image
                  src={imageUrl || '/placeholder.svg'}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  const isImageLeft = imagePosition === 'left'

  return (
    <section ref={sectionRef} className={cn('py-16 px-4 sm:px-6 lg:px-8')}>
      <div className="max-w-container mx-auto">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 items-start',
            !isImageLeft && 'lg:grid-flow-col-dense',
          )}
        >
          <div
            className={cn(
              'space-y-6 transition-all duration-500',
              !isImageLeft && 'lg:col-start-1',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6',
            )}
          >
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue">
              {title}
            </h2>
            {content && isLexicalEditorState(content) && (
              <RichText
                data={content as unknown}
                className="text-lg font-light leading-relaxed text-ds-pastille-green max-w-none"
              />
            )}
          </div>
          {imageUrl && (
            <div
              className={cn(
                'relative w-full h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden rounded-lg shadow-lg transition-all duration-500 lg:sticky lg:top-4',
                !isImageLeft && 'lg:col-start-2',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              )}
            >
              <Image
                src={imageUrl || '/placeholder.svg'}
                alt={title}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
