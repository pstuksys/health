'use client'

import { useEffect, useState, useRef, useMemo, useCallback } from 'react'

interface AnimatedCounterProps {
  value: string | number
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 2000, className = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // Memoize parsed value to avoid recalculation
  const parsedValue = useMemo(() => {
    if (typeof value === 'number') {
      return { numericValue: value, suffix: '', isRatio: false }
    }

    const str = value.toString()

    // Handle ratio values like "1 in 3", "2 in 5", etc.
    const ratioMatch = str.match(/^(\d+)\s+in\s+(\d+)$/)
    if (ratioMatch) {
      return {
        numericValue: parseFloat(ratioMatch[1]),
        suffix: ` in ${ratioMatch[2]}`,
        isRatio: true,
      }
    }

    // Handle currency and percentage values
    const match = str.match(/^([£$€]?)(\d+(?:\.\d+)?)([BMK%]?)(.*)$/)
    if (!match) {
      return { numericValue: 0, suffix: str, isRatio: false }
    }

    const [, prefix, number, multiplier, suffix] = match
    let numericValue = parseFloat(number)

    // Apply multiplier (but preserve % in suffix)
    switch (multiplier) {
      case 'B':
        numericValue *= 1000000000
        break
      case 'M':
        numericValue *= 1000000
        break
      case 'K':
        numericValue *= 1000
        break
      case '%':
        // Don't modify numericValue for percentages, just preserve the %
        break
    }

    return {
      numericValue,
      suffix: prefix + (multiplier === '%' ? '%' : '') + suffix,
      isRatio: false,
    }
  }, [value])

  // Memoize intersection observer callback
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true)
      }
    },
    [isVisible],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [handleIntersection])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const startValue = 0
    const endValue = parsedValue.numericValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Use easeOutCubic for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOutCubic

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, parsedValue.numericValue, duration])

  // Memoize formatted display value
  const formattedValue = useMemo(() => {
    if (parsedValue.isRatio) {
      // For ratios, just show the animated number + suffix
      return Math.round(displayValue) + parsedValue.suffix
    }

    // For other values, format with appropriate units
    if (displayValue >= 1000000000) {
      return (displayValue / 1000000000).toFixed(displayValue % 1000000000 === 0 ? 0 : 1) + 'B'
    }
    if (displayValue >= 1000000) {
      return (displayValue / 1000000).toFixed(displayValue % 1000000 === 0 ? 0 : 1) + 'M'
    }
    if (displayValue >= 1000) {
      return (displayValue / 1000).toFixed(displayValue % 1000 === 0 ? 0 : 1) + 'K'
    }
    return displayValue.toFixed(displayValue % 1 === 0 ? 0 : 1)
  }, [displayValue, parsedValue])

  return (
    <div ref={elementRef} className={className}>
      {parsedValue.isRatio
        ? formattedValue
        : parsedValue.suffix.includes('%')
          ? formattedValue + parsedValue.suffix
          : parsedValue.suffix + formattedValue}
    </div>
  )
}
