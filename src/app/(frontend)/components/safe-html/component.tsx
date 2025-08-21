'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type SafeHTMLProps = {
  html: string
  className?: string
  as?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * A safer alternative to dangerouslySetInnerHTML that prevents hydration mismatches
 * by only rendering HTML on the client side after initial hydration
 */
export function SafeHTML({ html, className, as: Component = 'div' }: SafeHTMLProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // During SSR and initial client render, show plain text without HTML
  if (!isHydrated) {
    // Strip HTML tags for initial render to prevent hydration mismatch
    const plainText = html.replace(/<[^>]*>/g, '').trim()
    return plainText ? <Component className={className}>{plainText}</Component> : null
  }

  // After hydration, render with HTML
  return html.trim() ? (
    <Component className={className} dangerouslySetInnerHTML={{ __html: html }} />
  ) : null
}

/**
 * Enhanced version that properly renders Lexical rich text content
 * with better formatting, styling, and hydration safety
 */
export function ConsistentHTML({ html, className, as: Component = 'div' }: SafeHTMLProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const cleanHtml = html?.trim() || ''

  if (!cleanHtml) return null

  // During SSR and before hydration, render plain text only
  if (!isHydrated) {
    const plainText = cleanHtml.replace(/<[^>]*>/g, '').trim()
    return plainText ? <Component className={className}>{plainText}</Component> : null
  }

  // After hydration, render with enhanced HTML
  const enhancedHtml = enhanceLexicalHTML(cleanHtml)

  return (
    <Component
      className={cn('rich-text-content', className)}
      dangerouslySetInnerHTML={{ __html: enhancedHtml }}
    />
  )
}

/**
 * Enhances Lexical HTML with better styling and formatting
 */
function enhanceLexicalHTML(html: string): string {
  // Add CSS classes for better styling
  let enhanced = html

  // Enhance headings with proper styling
  enhanced = enhanced.replace(/<h([1-6])>/g, '<h$1 class="rich-text-heading rich-text-heading-$1">')

  // Enhance paragraphs with proper spacing
  enhanced = enhanced.replace(/<p>/g, '<p class="rich-text-paragraph">')

  // Enhance links with proper styling
  enhanced = enhanced.replace(/<a\s+href=/g, '<a class="rich-text-link" href=')

  // Enhance lists with proper styling
  enhanced = enhanced.replace(/<(ul|ol)>/g, '<$1 class="rich-text-list">')

  // Enhance list items
  enhanced = enhanced.replace(/<li>/g, '<li class="rich-text-list-item">')

  // Enhance strong/bold text
  enhanced = enhanced.replace(/<strong>/g, '<strong class="rich-text-strong">')

  // Enhance italic text
  enhanced = enhanced.replace(/<em>/g, '<em class="rich-text-emphasis">')

  // Enhance underlined text
  enhanced = enhanced.replace(/<u>/g, '<u class="rich-text-underline">')

  return enhanced
}

/**
 * Specialized component for rendering hero titles with enhanced styling
 */
export function HeroTitle({ html, className }: { html: string; className?: string }) {
  return <ConsistentHTML html={html} as="h1" className={cn('hero-title', className)} />
}

/**
 * Specialized component for rendering hero subtitles with enhanced styling
 */
export function HeroSubtitle({ html, className }: { html: string; className?: string }) {
  return <ConsistentHTML html={html} as="p" className={cn('hero-subtitle', className)} />
}
