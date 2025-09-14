import { useState, useRef, useEffect } from 'react'
import type { Header } from '@/payload-types'

type NavigationItem = NonNullable<Header['navigation']>[number]

interface UseResponsiveNavigationProps {
  items: NavigationItem[]
  navContainerRef: React.RefObject<HTMLDivElement | null>
  navItemsRef: React.RefObject<HTMLDivElement | null>
  ctaRef: React.RefObject<HTMLDivElement | null>
  logoRef: React.RefObject<HTMLAnchorElement | null>
}

export function useResponsiveNavigation({
  items,
  navContainerRef,
  navItemsRef,
  ctaRef,
  logoRef,
}: UseResponsiveNavigationProps) {
  const [visibleItems, setVisibleItems] = useState<NavigationItem[]>(items)
  const [hiddenItems, setHiddenItems] = useState<NavigationItem[]>([])
  const lastVisibleLenRef = useRef<number>(items.length)
  const lastHiddenLenRef = useRef<number>(0)

  useEffect(() => {
    if (!navContainerRef.current || !navItemsRef.current) return
    let frame = 0

    const recalc = () => {
      if (!navContainerRef.current || !navItemsRef.current) return
      const container = navContainerRef.current
      const navItemsEl = navItemsRef.current
      const ctaEl = ctaRef.current

      const containerWidth = container.offsetWidth
      const ctaWidth = ctaEl?.offsetWidth ?? 0
      const logoWidth = logoRef.current?.offsetWidth ?? 240
      const padding = 64

      // Calculate available space more precisely
      const availableSpace = containerWidth - logoWidth - ctaWidth - padding - 32

      let totalItemsWidth = 0
      const children = Array.from(navItemsEl.children) as HTMLElement[]
      const newVisible: NavigationItem[] = []
      const newHidden: NavigationItem[] = []

      // First pass: try to fit all items with normal spacing
      for (let i = 0; i < items.length; i++) {
        const child = children[i]
        const width = child?.offsetWidth ?? 0
        const spacing = i > 0 ? 32 : 0 // space-x-8 = 32px

        if (totalItemsWidth + width + spacing <= availableSpace) {
          totalItemsWidth += width + spacing
          newVisible.push(items[i])
        } else {
          newHidden.push(items[i])
        }
      }

      // If we have hidden items, try to fit more by reducing spacing
      if (newHidden.length > 0 && newVisible.length > 0) {
        totalItemsWidth = 0
        newVisible.length = 0
        newHidden.length = 0

        for (let i = 0; i < items.length; i++) {
          const child = children[i]
          const width = child?.offsetWidth ?? 0
          const spacing = i > 0 ? 16 : 0 // space-x-4 = 16px

          if (totalItemsWidth + width + spacing <= availableSpace) {
            totalItemsWidth += width + spacing
            newVisible.push(items[i])
          } else {
            newHidden.push(items[i])
          }
        }
      }

      // Fallback: if we still have issues, ensure at least one item is visible
      if (newVisible.length === 0 && items.length > 0) {
        newVisible.push(items[0])
        newHidden.push(...items.slice(1))
      }

      if (
        newHidden.length !== lastHiddenLenRef.current ||
        newVisible.length !== lastVisibleLenRef.current
      ) {
        setVisibleItems(newVisible)
        setHiddenItems(newHidden)
        lastVisibleLenRef.current = newVisible.length
        lastHiddenLenRef.current = newHidden.length
      }
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        recalc()
      })
    }

    const ro = new ResizeObserver(schedule)
    ro.observe(navContainerRef.current)
    if (ctaRef.current) ro.observe(ctaRef.current)

    window.addEventListener('resize', schedule)

    // Initial calculation
    schedule()

    // Additional check after a short delay to catch any missed calculations
    const timeoutId = setTimeout(schedule, 100)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
      clearTimeout(timeoutId)
    }
  }, [items, navContainerRef, navItemsRef, ctaRef, logoRef])

  return {
    visibleItems,
    hiddenItems,
  }
}
