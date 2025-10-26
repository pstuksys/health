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
}

function loadDoctifyScript(scriptUrl: string, widgetId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists in DOM
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src*="doctify.com"]`)

    if (existingScript) {
      // Script exists, just resolve
      resolve()
      return
    }

    // Verify container exists
    const container = document.getElementById(widgetId)
    if (!container) {
      reject(new Error('Widget container not found'))
      return
    }

    // Create script element
    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.defer = true

    // Set up load handlers
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

    const cleanup = () => {
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
    }

    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)

    // Append to document
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

    // If already attempted and failed, don't retry
    if (globalLoadState.hasAttempted && !globalLoadState.isLoaded) {
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

      hasLoadedRef.current = true
      globalLoadState.isLoading = true
      globalLoadState.hasAttempted = true

      try {
        await loadDoctifyScript(scriptUrl, widgetId)
        setIsLoaded(true)
      } catch (error) {
        console.warn('Doctify widget failed to load:', error)
        globalLoadState.isLoading = false
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
