import { useState, useRef, useEffect, useCallback } from 'react'
import type { Header } from '@/payload-types'

type NavigationItem = NonNullable<Header['navigation']>[number]

interface UseResponsiveNavigationProps {
  items: NavigationItem[]
  navContainerRef: React.RefObject<HTMLDivElement | null>
  navItemsRef: React.RefObject<HTMLDivElement | null>
  ctaRef: React.RefObject<HTMLDivElement | null>
  logoRef: React.RefObject<HTMLAnchorElement | null>
}

// Constants
const LOGO_DEFAULT_WIDTH = 240
const CONTAINER_PADDING = 64
const MORE_BUTTON_WIDTH = 48
const INITIAL_CALC_DELAY = 200
const ITEM_BASE_WIDTH = 100 // Approximate average width
const SPACING_PER_ITEM = 16

export function useResponsiveNavigation({
  items,
  navContainerRef,
  navItemsRef,
  ctaRef,
  logoRef,
}: UseResponsiveNavigationProps) {
  const [visibleItems, setVisibleItems] = useState<NavigationItem[]>(items)
  const [hiddenItems, setHiddenItems] = useState<NavigationItem[]>([])
  const frameRef = useRef<number>(0)
  const itemWidthsRef = useRef<Map<string, number>>(new Map())
  const isCalculatingRef = useRef(false)

  // Measure all items upfront (only when all are visible)
  const measureItems = useCallback(() => {
    if (!navItemsRef.current || isCalculatingRef.current) return false

    const children = Array.from(navItemsRef.current.children) as HTMLElement[]
    const newWidths = new Map<string, number>()

    // Measure each child with data-nav-item attribute (excludes More button)
    children.forEach((child) => {
      const navItemLabel = child.getAttribute('data-nav-item')

      if (navItemLabel) {
        const width = child.offsetWidth || ITEM_BASE_WIDTH
        newWidths.set(navItemLabel, width)
      }
    })

    // Only save measurements if we got all items
    if (newWidths.size === items.length) {
      itemWidthsRef.current = newWidths
      return true
    }

    return false
  }, [items, navItemsRef])

  // Calculate which items fit based on measured widths
  const calculateVisibility = useCallback(() => {
    if (!navContainerRef.current) return

    const containerWidth = navContainerRef.current.offsetWidth
    const ctaWidth = ctaRef.current?.offsetWidth ?? 0
    const logoWidth = logoRef.current?.offsetWidth ?? LOGO_DEFAULT_WIDTH

    const availableSpace = containerWidth - logoWidth - ctaWidth - CONTAINER_PADDING

    const visible: NavigationItem[] = []
    const hidden: NavigationItem[] = []
    let totalWidth = 0
    let hasHidden = false

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemWidth = itemWidthsRef.current.get(item.label) ?? ITEM_BASE_WIDTH
      const spacing = i > 0 ? SPACING_PER_ITEM : 0

      // Reserve space for More button if we've already hidden items
      const moreButtonSpace = hasHidden ? MORE_BUTTON_WIDTH : 0
      const neededSpace = totalWidth + itemWidth + spacing + moreButtonSpace

      if (neededSpace <= availableSpace) {
        totalWidth += itemWidth + spacing
        visible.push(item)
      } else {
        hidden.push(item)
        hasHidden = true
      }
    }

    // Ensure at least one item is visible
    if (visible.length === 0 && items.length > 0) {
      visible.push(items[0])
      hidden.push(...items.slice(1))
    }

    return { visible, hidden }
  }, [items, navContainerRef, ctaRef, logoRef])

  // Update state with new visibility
  const updateVisibility = useCallback(() => {
    if (isCalculatingRef.current) return

    isCalculatingRef.current = true

    const result = calculateVisibility()
    if (result) {
      setVisibleItems(result.visible)
      setHiddenItems(result.hidden)
    }

    isCalculatingRef.current = false
  }, [calculateVisibility])

  // Schedule calculation
  const scheduleCalculation = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0

      // First try to measure if we haven't yet or items changed
      const hasMeasurements = itemWidthsRef.current.size === items.length
      if (!hasMeasurements) {
        measureItems()
      }

      // Then calculate visibility
      updateVisibility()
    })
  }, [measureItems, updateVisibility, items.length])

  // Initial setup and measurements
  useEffect(() => {
    if (!navContainerRef.current || !navItemsRef.current) return

    // Force all items to be visible initially for measurement
    setVisibleItems(items)
    setHiddenItems([])

    // Measure after a delay to ensure DOM is ready
    const measureTimeout = setTimeout(() => {
      if (measureItems()) {
        scheduleCalculation()
      }
    }, INITIAL_CALC_DELAY)

    return () => clearTimeout(measureTimeout)
  }, [items, navContainerRef, navItemsRef, measureItems, scheduleCalculation])

  // React to resize events
  useEffect(() => {
    if (!navContainerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      scheduleCalculation()
    })

    resizeObserver.observe(navContainerRef.current)

    if (ctaRef.current) {
      resizeObserver.observe(ctaRef.current)
    }

    window.addEventListener('resize', scheduleCalculation)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', scheduleCalculation)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [navContainerRef, ctaRef, scheduleCalculation])

  return {
    visibleItems,
    hiddenItems,
  }
}
