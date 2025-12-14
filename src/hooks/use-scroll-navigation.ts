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
    const heroEl = heroRef.current ?? (document.getElementById('hero-section') as HTMLElement | null)

    // If there is no hero, enable the gradient background immediately
    if (!heroEl) {
      setIsVisible(true)
      setIsScrolled(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const isHeroVisible = Boolean(entry?.isIntersecting)

        // When hero is visible near the top, keep navbar transparent; otherwise apply gradient.
        setIsVisible(true)
        setIsScrolled(!isHeroVisible)
      },
      { threshold: 0.05 },
    )

    observer.observe(heroEl)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { isScrolled, isVisible, heroRef }
}
