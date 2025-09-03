'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { mediaToUrl } from '@/lib/media'
import { Page } from '@/payload-types'

type ParallaxHeroProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'parallaxHero' }>

export function ParallaxHero({
  title,
  subtitle,
  buttonText,
  buttonHref,
  backgroundImage,
}: ParallaxHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [offsetY, setOffsetY] = useState(0)
  const bgUrl = mediaToUrl(backgroundImage)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          // Stronger parallax: increase multiplier for a more noticeable effect
          setOffsetY(Math.round(rect.top * -0.7))
        }
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[80vh] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-[160%] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgUrl})`,
          transform: `translate3d(0, ${offsetY}px, 0)`,
          willChange: 'transform',
        }}
      />

      <div className="absolute inset-0 bg-ds-dark-blue/40" />

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
            {title || ''}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed">
            {subtitle || ''}
          </p>
          <Button
            asChild
            className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold px-8 py-3 text-lg rounded-md transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Link href={buttonHref ?? '#'}>{buttonText || 'Learn More'}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
