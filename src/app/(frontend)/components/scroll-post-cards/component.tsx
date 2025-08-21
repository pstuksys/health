'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Page } from '@/payload-types'

type ScrollPostCardsProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'scrollPostCards' }
>

export function ScrollPostCards({ title, subtitle, posts }: ScrollPostCardsProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' },
    )

    const cardElements = containerRef.current?.querySelectorAll('[data-index]')
    cardElements?.forEach((el) => cardObserver.observe(el))
    return () => cardObserver.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="py-16 px-4 max-w-container mx-auto">
      {title && (
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-medical-blue mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-8">
        {(posts || []).map((post, index) => (
          <article
            key={post.id}
            data-index={index}
            className={`w-full bg-white rounded-lg border border-pastille-green/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-700 ${
              visibleCards.has(index)
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <div className="md:flex">
              <div className="md:w-2/5 relative h-64 md:h-80">
                <Image
                  src={(post.image as unknown as string) || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent-yellow text-medical-blue px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} read</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light text-medical-blue mb-4 leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

                <Link
                  href={post.href || '#'}
                  className="inline-flex items-center text-pastille-green hover:text-medical-blue transition-colors duration-200 font-medium group"
                >
                  Read Full Article
                  <svg
                    className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
