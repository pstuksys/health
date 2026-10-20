'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

type TurnstileRenderOptions = {
  sitekey: string
  theme: 'light' | 'dark'
  size: 'flexible'
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string
      remove: (widgetId: string) => void
    }
  }
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

type TurnstileProps = {
  siteKey: string
  // Must be stable (e.g. a useState setter): it is captured when the widget renders
  onTokenChange: (token: string | null) => void
  theme?: 'light' | 'dark'
}

// Tokens are single-use: remount (change `key`) after each submission to get a fresh one
export function Turnstile({ siteKey, onTokenChange, theme = 'light' }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  function renderWidget() {
    if (!window.turnstile || !containerRef.current || widgetIdRef.current) return
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      size: 'flexible',
      callback: (token) => onTokenChange(token),
      'expired-callback': () => onTokenChange(null),
      'error-callback': () => onTokenChange(null),
    })
  }

  useEffect(
    () => () => {
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current)
      widgetIdRef.current = null
    },
    [],
  )

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} className="min-h-[65px] w-full" />
    </>
  )
}
