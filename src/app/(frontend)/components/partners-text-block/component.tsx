'use client'

import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'
import { useEffect, useRef, useState } from 'react'

type PartnersTextBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'partnersTextBlock' }
>

export function PartnersTextBlock({ title, partners }: PartnersTextBlockProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={cn('py-16 px-4')}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl font-light text-ds-dark-blue text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {title}
        </h2>

        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 gap-4',
            `lg:grid-cols-${Math.min(partners.length, 6)}`,
          )}
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`flex items-center justify-center p-6 border border-pastille-green/20 rounded-md bg-white hover:shadow-md transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-ds-dark-blue/70 font-medium text-center">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
