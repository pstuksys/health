'use client'

import { useEffect, useRef, useState } from 'react'

type UseScrollNavigationResult = {
  isScrolled: boolean
  isVisible: boolean
  /**
   * Optional ref to attach to your hero section. If not provided,
   * the hook will try to find an element with id "hero-section".
   */
  heroRef: React.MutableRefObject<HTMLElement | null>
}

export function useScrollNavigation(): UseScrollNavigationResult {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frame = 0
    let heroHeight = 0

    const getHeroEl = (): HTMLElement | null => {
      return heroRef.current ?? (document.getElementById('hero-section') as HTMLElement | null)
    }

    const updateHeroHeight = () => {
      const el = getHeroEl()
      heroHeight = el ? el.offsetHeight : 0
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const scrollY = window.scrollY || window.pageYOffset
        // Determine visibility based on position relative to hero height
        if (heroHeight > 0) {
          if (scrollY > 0 && scrollY < heroHeight) {
            setIsVisible(false)
            setIsScrolled(false)
          } else if (scrollY === 0) {
            setIsVisible(true)
            setIsScrolled(false)
          } else {
            setIsVisible(true)
            setIsScrolled(true)
          }
        } else {
          // Fallback when hero not found: show at top transparent, scrolled otherwise
          setIsVisible(true)
          setIsScrolled(scrollY > 0)
        }
      })
    }

    const heroEl = getHeroEl()
    updateHeroHeight()

    const resizeObserver = new ResizeObserver(() => {
      updateHeroHeight()
      onScroll()
    })
    if (heroEl) resizeObserver.observe(heroEl)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Initial check
    onScroll()

    return () => {
      if (heroEl) resizeObserver.unobserve(heroEl)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return { isScrolled, isVisible, heroRef }
}
