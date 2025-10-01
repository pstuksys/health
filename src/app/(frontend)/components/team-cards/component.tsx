'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Page } from '@/payload-types'
import { CMSLink } from '../ui'
import { cn } from '@/lib/utils'

// Extract the teamCards block type from the Page blocks union
type TeamCardsBlock = Extract<NonNullable<Page['blocks']>[number], { blockType: 'teamCards' }>

export function TeamCards({
  title = 'Meet Our Team',
  subtitle = '',
  members = [],
}: Pick<TeamCardsBlock, 'title' | 'subtitle' | 'members'>) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]))
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [members.length])

  const displayMembers = members.length > 0 ? members : []

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-ds-dark-blue mb-4 text-balance">
            {title}
          </h2>
          <p className="text-xl text-ds-pastille-green max-w-2xl mx-auto text-pretty">{subtitle}</p>
        </div>

        <div className="space-y-8">
          {displayMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`transition-all duration-700 ease-out ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Main row with image and info */}
              <div className="transition-all duration-300 px-6 py-1 rounded-2xl bg-white">
                <div
                  className={`flex flex-col md:flex-row md:items-center gap-6 ${
                    (member.imagePosition || 'left') === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Profile Image */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="relative w-48 h-48 md:w-60 md:h-60 overflow-hidden rounded-full group cursor-pointer hover:shadow-2xl transition-all duration-300">
                      <Image
                        src={
                          typeof member.image === 'object' && member.image?.url
                            ? member.image.url
                            : '/placeholder.svg?height=400&width=400&text=Team+Member'
                        }
                        alt={`${member.name}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{
                          aspectRatio: '1/1',
                          objectPosition: 'center 20%',
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-full" />
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                          {member.linkedin && (
                            <CMSLink
                              href={member.linkedin}
                              variant="default"
                              className="bg-white bg-opacity-95 hover:bg-opacity-100 text-ds-accent-yellow p-1 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </CMSLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name and Description */}
                  <div className="flex-1 text-center md:text-left">
                    <div
                      className={`md:max-w-[400px] ${
                        (member.imagePosition || 'left') === 'right'
                          ? 'md:ml-auto md:mr-0'
                          : 'md:mr-auto'
                      }`}
                    >
                      <h3 className="text-xl md:text-2xl font-light text-ds-dark-blue mb-4">
                        {member.name}
                      </h3>
                      <div className="text-ds-pastille-green leading-relaxed text-sm md:text-base">
                        <p>{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
