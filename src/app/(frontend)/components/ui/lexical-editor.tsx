'use client'

import React, { useMemo } from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'
import { isLexicalEditorState } from './rich-text'

type LexicalValue =
  | string
  | {
      root?: {
        type?: string
        text?: string
        children?: unknown[]
        [k: string]: unknown
      }
      [k: string]: unknown
    }
  | null
  | undefined

export type LexicalEditorProps = {
  value?: LexicalValue
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  readOnly?: boolean
  variant?: 'default' | 'minimal' | 'full'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  error?: string
  required?: boolean
}

/**
 * Lexical Editor UI Component
 * Provides a consistent interface for rich text editing across the application
 */
export function LexicalEditor({
  value,
  onChange,
  placeholder = 'Start typing...',
  className,
  readOnly = false,
  variant: _variant = 'default',
  size = 'md',
  label,
  error,
  required = false,
}: LexicalEditorProps) {
  const stringValue = typeof value === 'string' ? value : ''
  const canEdit = !readOnly && !isLexicalEditorState(value)

  const containerClasses = cn(
    'relative border rounded-lg transition-all duration-200',
    !error && 'border-gray-300',
    error && 'border-red-500 ring-2 ring-red-500/20',
    readOnly && 'bg-gray-50',
    !readOnly && 'bg-white',
    className,
  )

  const inputClasses = cn(
    'w-full resize-none outline-none transition-all duration-200',
    size === 'sm' && 'text-sm p-2 min-h-[80px]',
    size === 'md' && 'text-base p-3 min-h-[100px]',
    size === 'lg' && 'text-lg p-4 min-h-[120px]',
    readOnly && 'cursor-not-allowed bg-gray-100',
  )

  const labelClasses = cn(
    'block text-sm font-medium mb-2 transition-colors duration-200',
    !error && 'text-gray-700',
    error && 'text-red-600',
  )

  const errorClasses = 'mt-2 text-sm text-red-600'
  const lexicalData = useMemo(() => (isLexicalEditorState(value) ? value : undefined), [value])

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {lexicalData ? (
          <PayloadRichText
            data={lexicalData as unknown}
            className={cn('px-3 py-2', inputClasses)}
          />
        ) : (
          <textarea
            className={inputClasses}
            value={stringValue}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={!canEdit}
          />
        )}
      </div>

      {error && <p className={errorClasses}>{error}</p>}
    </div>
  )
}

/**
 * Minimal Lexical Editor for simple text input
 */
export function MinimalLexicalEditor(props: Omit<LexicalEditorProps, 'variant'>) {
  return <LexicalEditor {...props} variant="minimal" />
}

/**
 * Full Lexical Editor with toolbar
 */
export function FullLexicalEditor(props: Omit<LexicalEditorProps, 'variant'>) {
  return <LexicalEditor {...props} variant="full" />
}
