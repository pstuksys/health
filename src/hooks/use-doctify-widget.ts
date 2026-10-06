import { useEffect, useRef, useState } from 'react'

type UseDoctifyWidgetOptions = {
  widgetId: string
  scriptUrl: string
  rootMargin?: string
}

export type DoctifyWidgetStatus = 'idle' | 'loading' | 'loaded' | 'error'

type UseDoctifyWidgetReturn = {
  status: DoctifyWidgetStatus
  containerRef: React.RefObject<HTMLDivElement | null>
}

const DEFAULT_ROOT_MARGIN = '200px'

export const DOCTIFY_PRACTICE_URL =
  'https://www.doctify.com/uk/practice/independent-physiological-diagnostics'

// The widget markup links Doctify's global.css, which only declares @font-face rules for
// Poppins. The site already self-hosts Poppins (next/font), so the link is dropped as soon as
// it is inserted (MutationObserver callbacks run before the next render), which stops ~5
// duplicate font downloads.
function removeDoctifyFontStylesheets(root: Element) {
  root
    .querySelectorAll('link[href*="doctify.com/assets/fonts/"]')
    .forEach((link) => link.remove())
}

// Doctify's script renders once, on execution, into the element with `widgetId`
// (via innerHTML). It is not a reusable library, so it is injected on every mount:
// after a client-side navigation the container is a fresh, empty element and a
// previously loaded script would not fill it again.
export function useDoctifyWidget({
  widgetId,
  scriptUrl,
  rootMargin = DEFAULT_ROOT_MARGIN,
}: UseDoctifyWidgetOptions): UseDoctifyWidgetReturn {
  const [status, setStatus] = useState<DoctifyWidgetStatus>('idle')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let script: HTMLScriptElement | null = null
    const fontLinkObserver = new MutationObserver(() => removeDoctifyFontStylesheets(container))

    const injectScript = () => {
      setStatus('loading')
      fontLinkObserver.observe(container, { childList: true, subtree: true })
      script = document.createElement('script')
      script.src = scriptUrl
      script.async = true
      script.onload = () => {
        fontLinkObserver.disconnect()
        setStatus('loaded')
      }
      script.onerror = () => {
        fontLinkObserver.disconnect()
        setStatus('error')
      }
      document.body.appendChild(script)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        injectScript()
      },
      { rootMargin },
    )
    observer.observe(container)

    return () => {
      observer.disconnect()
      fontLinkObserver.disconnect()
      script?.remove()
    }
  }, [widgetId, scriptUrl, rootMargin])

  return { status, containerRef }
}
