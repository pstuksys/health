'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'

type TwoBlocksTextProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'twoBlocksText' }
>

export function TwoBlocksText({ leftBlock, rightBlock }: TwoBlocksTextProps) {
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

  return (
    <section ref={sectionRef} className="bg-ds-light-neutral p-4 md:p-4">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          {/* Left Block */}
          <div
            className={cn(
              'space-y-4 transition-all duration-500',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6',
            )}
          >
            {leftBlock?.subtitle && (
              <p className="text-lg md:text-xl text-ds-pastille-green font-light">
                {leftBlock.subtitle}
              </p>
            )}
            {leftBlock?.title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-ds-dark-blue leading-tight">
                {leftBlock.title}
              </h1>
            )}
            {leftBlock?.content && isLexicalEditorState(leftBlock.content) && (
              <RichText
                data={leftBlock.content as unknown}
                className="text-lg font-light leading-relaxed text-ds-pastille-green max-w-none"
              />
            )}
          </div>

          {/* Right Block */}
          <div
            className={cn(
              'bg-ds-dark-blue rounded-3xl p-8 md:p-10 lg:p-12 transition-all duration-500',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6',
            )}
          >
            {rightBlock?.title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 leading-tight">
                {rightBlock.title}
              </h2>
            )}

            <div className="space-y-6 text-white">
              {rightBlock?.content && isLexicalEditorState(rightBlock.content) && (
                <RichText
                  data={rightBlock.content as unknown}
                  className="text-base md:text-lg leading-relaxed font-light max-w-none prose-p:text-white prose-strong:text-ds-accent-yellow prose-em:text-ds-accent-yellow"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
