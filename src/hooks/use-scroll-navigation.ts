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
  const [isScrolled, setIsScrolled] = useState(false) // Start with false (transparent by default)
  const [isVisible, setIsVisible] = useState(true)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frame = 0
    let heroHeight = 0
    let hasHero = false
    let isInitialized = false
    let timeoutId: NodeJS.Timeout | null = null

    const getHeroEl = (): HTMLElement | null => {
      return heroRef.current ?? (document.getElementById('hero-section') as HTMLElement | null)
    }

    const checkForHero = () => {
      const heroEl = getHeroEl()
      if (heroEl && heroEl.offsetHeight > 0) {
        hasHero = true
        heroHeight = heroEl.offsetHeight
        return true
      }
      hasHero = false
      heroHeight = 0
      return false
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const scrollY = window.scrollY || window.pageYOffset

        if (hasHero) {
          // With hero section: transparent at top, gradient when scrolled
          if (scrollY === 0) {
            setIsVisible(true)
            setIsScrolled(false)
          } else if (scrollY > 0 && scrollY < heroHeight) {
            setIsVisible(false)
            setIsScrolled(false)
          } else {
            setIsVisible(true)
            setIsScrolled(true)
          }
        } else {
          // No hero section: always show gradient background
          setIsVisible(true)
          setIsScrolled(true)
        }
      })
    }

    // Check for hero section immediately and on changes
    const updateHero = () => {
      const foundHero = checkForHero()
      onScroll()

      // If we found a hero and haven't initialized yet, clear any pending timeout
      if (foundHero && !isInitialized) {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        isInitialized = true
      }
    }

    // Initial check
    updateHero()

    // If no hero found initially, wait a bit before showing gradient background
    if (!hasHero && !isInitialized) {
      timeoutId = setTimeout(() => {
        if (!hasHero) {
          // Still no hero after timeout, show gradient background
          setIsScrolled(true)
          isInitialized = true
        }
      }, 300) // Wait 300ms before showing gradient
    }

    // Check periodically for hero section changes
    const interval = setInterval(updateHero, 100)

    // Watch for DOM changes
    const mutationObserver = new MutationObserver(updateHero)
    const mainEl = document.querySelector('main')
    if (mainEl) {
      mutationObserver.observe(mainEl, {
        childList: true,
        subtree: true,
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      clearInterval(interval)
      mutationObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return { isScrolled, isVisible, heroRef }
}
