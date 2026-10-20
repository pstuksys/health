'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export type RotatorArticle = {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  imageAlt: string
  href: string
  isExternal: boolean
}

const ROTATE_INTERVAL_MS = 6000
// Tolerance for sub-pixel scroll positions when detecting the start/end of the track
const EDGE_TOLERANCE_PX = 4

export function ArticleRotator({ articles }: { articles: RotatorArticle[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canScroll, setCanScroll] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Scrolls one card at a time and wraps around at either end, so it works for any number of
  // cards per view (1 on mobile, 2 on tablet, 3 on desktop)
  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!track || !(card instanceof HTMLElement)) return

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const maxScroll = track.scrollWidth - track.clientWidth
    let left = track.scrollLeft + direction * (card.offsetWidth + gap)
    if (direction === 1 && track.scrollLeft >= maxScroll - EDGE_TOLERANCE_PX) left = 0
    if (direction === -1 && track.scrollLeft <= EDGE_TOLERANCE_PX) left = maxScroll

    track.scrollTo({ left, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new ResizeObserver(() =>
      setCanScroll(track.scrollWidth > track.clientWidth + EDGE_TOLERANCE_PX),
    )
    observer.observe(track)
    return () => observer.disconnect()
  }, [articles.length])

  useEffect(() => {
    if (!canScroll || isPaused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => scrollByCard(1), ROTATE_INTERVAL_MS)
    return () => window.clearInterval(interval)
  }, [canScroll, isPaused, scrollByCard])

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Education Hub articles"
      >
        {articles.map((article) => (
          <li
            key={article.id}
            className="shrink-0 snap-start basis-full md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <Link
              href={article.href}
              target={article.isExternal ? '_blank' : undefined}
              rel={article.isExternal ? 'noopener noreferrer' : undefined}
              className="group flex h-full overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              {article.imageUrl && (
                <div className="relative w-2/5 shrink-0 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 40vw, (max-width: 1024px) 20vw, 14vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-light text-ds-dark-blue mb-2 line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-ds-pastille-green font-light line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-ds-dark-blue group-hover:text-ds-accent-yellow">
                  Read more
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {canScroll && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ds-dark-blue shadow-md hover:shadow-lg"
            aria-label="Previous articles"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ds-dark-blue shadow-md hover:shadow-lg"
            aria-label="Next articles"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
    </div>
  )
}
