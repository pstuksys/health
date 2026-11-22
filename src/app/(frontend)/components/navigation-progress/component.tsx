'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Thin bar at the top of the screen while a page navigation is pending.
 *
 * Replaces the old (frontend)/loading.tsx spinner: a loading.tsx boundary makes
 * the page stream, so headers are sent before notFound() runs and missing
 * pages returned HTTP 200 instead of 404 (bad for SEO).
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentUrl = `${pathname}?${searchParams.toString()}`

  const [pending, setPending] = useState(false)
  const [lastUrl, setLastUrl] = useState(currentUrl)

  // The URL changed, so the navigation finished. Resetting during render (not in
  // an effect) is React's recommended way to reset state when a value changes.
  if (lastUrl !== currentUrl) {
    setLastUrl(currentUrl)
    setPending(false)
  }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Same page (hash links such as #book-video-consultation): nothing to load.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      setPending(true)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!pending) return null

  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-ds-light-neutral"
    >
      <div className="h-full w-1/3 animate-[nav-progress_1s_ease-in-out_infinite] bg-ds-accent-yellow" />
    </div>
  )
}
