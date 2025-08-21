'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export type LexicalEditorProps = {
  value?: any
  onChange?: (value: any) => void
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
  variant = 'default',
  size = 'md',
  label,
  error,
  required = false,
}: LexicalEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isEmpty, setIsEmpty] = useState(!value || (typeof value === 'string' && !value.trim()))

  useEffect(() => {
    setIsEmpty(!value || (typeof value === 'string' && !value.trim()))
  }, [value])

  const containerClasses = cn(
    'relative border rounded-lg transition-all duration-200',
    !isFocused && !error && 'border-gray-300',
    isFocused && !error && 'border-ds-accent-yellow ring-2 ring-ds-accent-yellow/20',
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
    isEmpty && !isFocused && 'text-gray-500',
    (!isEmpty || isFocused) && 'text-gray-900',
    readOnly && 'cursor-not-allowed bg-gray-100',
  )

  const labelClasses = cn(
    'block text-sm font-medium mb-2 transition-colors duration-200',
    !error && 'text-gray-700',
    error && 'text-red-600',
  )

  const errorClasses = 'mt-2 text-sm text-red-600'

  // For now, this is a placeholder that shows the Lexical content
  // In a real implementation, this would integrate with the actual Lexical editor
  const renderContent = () => {
    if (!value) return null

    // If it's a string, display it directly
    if (typeof value === 'string') {
      return value
    }

    // If it's a Lexical object, extract the text content
    if (value && typeof value === 'object' && 'root' in value) {
      try {
        // Simple text extraction from Lexical structure
        const extractText = (node: any): string => {
          if (!node) return ''
          if (node.type === 'text') return node.text || ''
          if (node.children && Array.isArray(node.children)) {
            return node.children.map(extractText).join('')
          }
          return ''
        }

        const text = extractText(value.root)
        return text || placeholder
      } catch {
        return placeholder
      }
    }

    return placeholder
  }

  return (
    <div className={containerClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          className={inputClasses}
          contentEditable={!readOnly}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={(e) => {
            const content = e.currentTarget.textContent || ''
            setIsEmpty(!content.trim())
            if (onChange) {
              // For now, just pass the text content
              // In a real implementation, this would update the Lexical structure
              onChange(content)
            }
          }}
          suppressContentEditableWarning
        >
          {renderContent()}
        </div>

        {isEmpty && !isFocused && !readOnly && (
          <div className="absolute top-0 left-0 pointer-events-none text-gray-400">
            {placeholder}
          </div>
        )}
      </div>

      {error && <p className={errorClasses}>{error}</p>}

      {/* Toolbar for full variant */}
      {variant === 'full' && !readOnly && (
        <div className="border-t border-gray-200 p-2 bg-gray-50 rounded-b-lg">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="Underline"
            >
              <u>U</u>
            </button>
            <div className="w-px h-4 bg-gray-300" />
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              title="Link"
            >
              🔗
            </button>
          </div>
        </div>
      )}
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
