'use client'

import { useEffect, useState } from 'react'

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
 * A simpler version that just ensures consistent empty rendering
 * Now truly hydration-safe by suppressing hydration for rich content
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

  // After hydration, render with HTML
  return <Component className={className} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
}
