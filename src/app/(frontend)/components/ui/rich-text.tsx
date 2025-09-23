'use client'

import React, { memo } from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'
import { jsxConverters } from '@/lib/lexical/jsx-converters'

export type RichTextProps = Omit<
  React.ComponentProps<typeof PayloadRichText>,
  'data' | 'className'
> & {
  data?: unknown
  className?: string
}

/**
 * Reusable wrapper around Payload's Lexical RichText renderer.
 * - Strongly typed via React.ComponentProps<typeof PayloadRichText>
 * - Keeps API parity with upstream while allowing local styling via className
 * - Add a class for rich text content: 'rich-text-headings-blue' this will make h tags ds-dark-blue color.
 */
export const RichText = memo(function RichText({ className, data, ...rest }: RichTextProps) {
  return (
    <PayloadRichText
      {...(rest as unknown as React.ComponentProps<typeof PayloadRichText>)}
      data={data as unknown as React.ComponentProps<typeof PayloadRichText>['data']}
      className={cn('rich-text-content', className)}
      converters={jsxConverters}
    />
  )
})

export function isLexicalEditorState(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false
  return 'root' in (value as Record<string, unknown>)
}
