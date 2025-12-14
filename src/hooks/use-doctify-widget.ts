import { useEffect, useRef, useState } from 'react'

type UseDoctifyWidgetOptions = {
  widgetId: string
  scriptUrl: string
  rootMargin?: string
}

type UseDoctifyWidgetReturn = {
  isLoaded: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

const DEFAULT_ROOT_MARGIN = '200px'

// Global state to track script loading across all component instances
const globalLoadState = {
  isLoading: false,
  isLoaded: false,
  hasAttempted: false,
  scriptUrl: '',
}

function findExistingScript(scriptUrl: string): HTMLScriptElement | null {
  const scripts = Array.from(document.querySelectorAll<HTMLScriptElement>('script[src]'))
  return scripts.find((s) => s.src === scriptUrl) ?? null
}

function loadDoctifyScript(scriptUrl: string, widgetId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists in DOM
    const existingScript = findExistingScript(scriptUrl)
    if (existingScript) {
      resolve()
      return
    }

    const container = document.getElementById(widgetId)
    if (!container) {
      reject(new Error('Widget container not found'))
      return
    }

    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.defer = true

    const cleanup = (timeoutId?: number) => {
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }

    const onLoad = () => {
      globalLoadState.isLoaded = true
      globalLoadState.isLoading = false
      cleanup()
      resolve()
    }

    const onError = () => {
      globalLoadState.isLoading = false
      cleanup()
      reject(new Error('Script failed to load'))
    }

    const timeoutId = window.setTimeout(() => {
      globalLoadState.isLoading = false
      cleanup(timeoutId)
      reject(new Error('Script load timed out'))
    }, 10000)

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)

    document.head.appendChild(script)
  })
}

export function useDoctifyWidget({
  widgetId,
  scriptUrl,
  rootMargin = DEFAULT_ROOT_MARGIN,
}: UseDoctifyWidgetOptions): UseDoctifyWidgetReturn {
  const [isLoaded, setIsLoaded] = useState(globalLoadState.isLoaded)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    // If already loaded globally, just update local state
    if (globalLoadState.isLoaded) {
      if (!isLoaded) setIsLoaded(true)
      return
    }

    // If already handling load for this instance, don't do it again
    if (hasLoadedRef.current) {
      return
    }

    const handleLoad = async () => {
      // Prevent multiple simultaneous loads
      if (globalLoadState.isLoading || hasLoadedRef.current) {
        return
      }

      // Guard: require container to exist before attempting load
      if (!containerRef.current) {
        return
      }

      hasLoadedRef.current = true
      globalLoadState.isLoading = true
      globalLoadState.hasAttempted = true
      globalLoadState.scriptUrl = scriptUrl

      try {
        await loadDoctifyScript(scriptUrl, widgetId)
        setIsLoaded(true)
      } catch (error) {
        console.warn('Doctify widget failed to load:', error)
        globalLoadState.isLoading = false
        hasLoadedRef.current = false
      }
    }

    // Use IntersectionObserver for lazy loading
    if ('IntersectionObserver' in window && containerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && !hasLoadedRef.current) {
            handleLoad()
            observerRef.current?.disconnect()
          }
        },
        { rootMargin },
      )

      observerRef.current.observe(containerRef.current)
    } else {
      // Fallback: load immediately
      handleLoad()
    }

    // Cleanup: only disconnect observer, never remove script
    return () => {
      observerRef.current?.disconnect()
    }
  }, [widgetId, scriptUrl, rootMargin, isLoaded])

  return { isLoaded, containerRef }
}
