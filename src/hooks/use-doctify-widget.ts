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

type GlobalScriptLoadState = {
  isLoading: boolean
  isLoaded: boolean
  hasAttempted: boolean
}

// Track script load state per script URL so multiple widgets can coexist
const globalScriptLoadState = new Map<string, GlobalScriptLoadState>()

function getOrInitGlobalState(scriptUrl: string): GlobalScriptLoadState {
  const existing = globalScriptLoadState.get(scriptUrl)
  if (existing) return existing
  const created: GlobalScriptLoadState = { isLoading: false, isLoaded: false, hasAttempted: false }
  globalScriptLoadState.set(scriptUrl, created)
  return created
}

function hasScriptWithSrc(scriptUrl: string): boolean {
  return Array.from(document.scripts).some((s) => s.src === scriptUrl)
}

function loadDoctifyScript(scriptUrl: string, widgetId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const state = getOrInitGlobalState(scriptUrl)

    // If script already exists in DOM, consider it loaded for this URL
    if (hasScriptWithSrc(scriptUrl)) {
      state.isLoaded = true
      state.isLoading = false
      state.hasAttempted = true
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
      state.isLoaded = true
      state.isLoading = false
      state.hasAttempted = true
      cleanup()
      resolve()
    }

    const onError = () => {
      state.isLoading = false
      state.hasAttempted = true
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
  const [isLoaded, setIsLoaded] = useState(() => getOrInitGlobalState(scriptUrl).isLoaded)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    const state = getOrInitGlobalState(scriptUrl)

    // If already loaded for this script URL, just update local state
    if (state.isLoaded) {
      if (!isLoaded) setIsLoaded(true)
      return
    }

    // If already attempted and failed, don't retry
    if (state.hasAttempted && !state.isLoaded) {
      return
    }

    // If already handling load for this instance, don't do it again
    if (hasLoadedRef.current) {
      return
    }

    const handleLoad = async () => {
      // Prevent multiple simultaneous loads
      if (state.isLoading || hasLoadedRef.current) {
        return
      }

      hasLoadedRef.current = true
      state.isLoading = true
      state.hasAttempted = true

      try {
        await loadDoctifyScript(scriptUrl, widgetId)
        setIsLoaded(true)
      } catch (error) {
        console.warn('Doctify widget failed to load:', error)
        state.isLoading = false
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
