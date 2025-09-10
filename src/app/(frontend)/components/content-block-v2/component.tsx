'use client'

import React from 'react'
import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'
import { RichText, isLexicalEditorState } from '@/app/(frontend)/components/ui'

type ContentBlockV2Props = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'contentBlockV2' }
>

const widthClasses = {
  third: 'w-full lg:w-1/3',
  half: 'w-full lg:w-1/2',
  full: 'w-full',
}

const spacingClasses = {
  none: { container: '', child: 'p-0' },
  sm: { container: '-m-2', child: 'p-2' },
  md: { container: '-m-3', child: 'p-3' },
  lg: { container: '-m-4', child: 'p-4' },
  xl: { container: '-m-6', child: 'p-6' },
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-8',
  lg: 'p-12',
  xl: 'p-16',
}

const backgroundColorClasses = {
  transparent: 'bg-transparent',
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-ds-dark-blue text-white',
}

export function ContentBlockV2({
  columns = [],
  spacing = 'md',
  containerPadding = 'md',
  backgroundColor = 'transparent',
}: ContentBlockV2Props) {
  if (!columns || columns.length === 0) {
    return null
  }

  const containerClasses = cn(
    'w-full',
    backgroundColorClasses[backgroundColor as keyof typeof backgroundColorClasses],
    paddingClasses[containerPadding as keyof typeof paddingClasses],
    backgroundColor !== 'transparent' && 'rounded-lg',
  )

  const currentSpacing = spacingClasses[spacing as keyof typeof spacingClasses]
  const flexClasses = cn('flex flex-wrap', currentSpacing.container)

  return (
    <section className="px-4 w-full max-w-container mx-auto">
      <div className="">
        <div className={containerClasses}>
          <div className={flexClasses}>
            {columns.map((column: any, index: number) => {
              if (!column.content || !isLexicalEditorState(column.content)) {
                return null
              }

              const columnWidth = column.width || 'full'
              const columnClasses = cn(
                widthClasses[columnWidth as keyof typeof widthClasses],
                currentSpacing.child,
              )

              return (
                <div key={column.id || index} className={columnClasses}>
                  <div className="h-full">
                    <RichText
                      data={column.content}
                      className={cn(
                        'prose max-w-none h-full',
                        backgroundColor === 'primary'
                          ? 'prose-invert text-white'
                          : 'prose-gray text-ds-pastille-green',
                        // Responsive prose sizing
                        'prose-sm lg:prose-base',
                        // Custom prose styling to match design system
                        'prose-headings:text-ds-dark-blue prose-headings:font-light',
                        backgroundColor === 'primary' && 'prose-headings:text-white',
                        'prose-p:leading-relaxed prose-p:font-light',
                        'prose-a:text-ds-accent-yellow prose-a:no-underline hover:prose-a:underline',
                        'prose-strong:text-ds-accent-yellow',
                        'prose-em:text-ds-accent-yellow',
                      )}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
