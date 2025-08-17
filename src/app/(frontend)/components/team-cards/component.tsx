'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Page } from '@/payload-types'

type TeamCardsProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'teamCards' }>

export function TeamCards({
  title = '',
  subtitle,
  members,
  enableCarousel = false,
}: TeamCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mobileIndex, setMobileIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % Math.ceil(members.length / 3))
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + Math.ceil(members.length / 3)) % Math.ceil(members.length / 3),
    )

  const nextMobileSlide = () => setMobileIndex((prev) => (prev + 1) % members.length)
  const prevMobileSlide = () =>
    setMobileIndex((prev) => (prev - 1 + members.length) % members.length)

  const visibleMembers = enableCarousel
    ? members.slice(currentIndex * 3, currentIndex * 3 + 3)
    : members

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 bg-gradient-to-br from-ds-light-neutral/30 to-ds-pastille-green/10"
    >
      <div className="text-center mb-12">
        <h2
          className={`text-3xl md:text-4xl font-heading text-ds-dark-blue mb-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-lg text-ds-pastille-green font-light transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {enableCarousel && members.length > 3 && (
        <div className="hidden lg:flex justify-center gap-4 mb-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-ds-pastille-green text-ds-pastille-green hover:bg-ds-pastille-green hover:text-white transition-colors duration-300"
            aria-label="Previous team members"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-ds-pastille-green text-ds-pastille-green hover:bg-ds-pastille-green hover:text-white transition-colors duration-300"
            aria-label="Next team members"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex lg:hidden justify-center gap-4 mb-8">
        <button
          onClick={prevMobileSlide}
          className="p-2 rounded-full border border-ds-pastille-green text-ds-pastille-green hover:bg-ds-pastille-green hover:text-white transition-colors duration-300"
          aria-label="Previous team member"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextMobileSlide}
          className="p-2 rounded-full border border-ds-pastille-green text-ds-pastille-green hover:bg-ds-pastille-green hover:text-white transition-colors duration-300"
          aria-label="Next team member"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleMembers.map((member, index) => (
          <div
            key={member.id}
            className={`bg-transparent hover:shadow-lg transition-all duration-500 ease-out overflow-hidden ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
          >
            <div className="relative w-full h-80 overflow-hidden md:rounded-full mx-auto mb-6 max-w-xs">
              <Image
                src={(member?.image as unknown as string) || '/placeholder.svg'}
                alt={member.name || 'team member'}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300 md:rounded-full"
              />
            </div>

            <div className="text-center p-6">
              <h3 className="text-xl font-semibold text-ds-dark-blue mb-2">{member.name}</h3>
              <p className="text-ds-pastille-green mb-4 leading-relaxed">{member.description}</p>

              <Link
                href={member.link.href}
                className="inline-block text-ds-accent-yellow font-medium hover:text-ds-dark-blue transition-colors duration-300 relative group"
              >
                {member.link.text}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-ds-accent-yellow transform scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-right" />
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-ds-dark-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:hidden w-full">
        <div className="relative overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {members.map((member) => (
              <div key={member.id} className="w-full flex-shrink-0">
                <div className="bg-transparent hover:shadow-lg transition-all duration-300 overflow-hidden px-4">
                  <div className="relative w-full h-80 overflow-hidden rounded-none md:rounded-full mx-auto mb-6 max-w-xs">
                    <Image
                      src={(member?.image as unknown as string) || '/placeholder.svg'}
                      alt={member.name || 'team member'}
                      fill
                      className="object-cover rounded-none md:rounded-full"
                    />
                  </div>

                  <div className="text-center p-6">
                    <h3 className="text-xl font-semibold text-ds-dark-blue mb-2">{member.name}</h3>
                    <p className="text-ds-pastille-green mb-4 leading-relaxed">
                      {member.description}
                    </p>

                    <Link
                      href={member.link.href}
                      className="inline-block text-ds-accent-yellow font-medium hover:text-ds-dark-blue transition-colors duration-300 relative group"
                    >
                      {member.link.text}
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-ds-accent-yellow transform scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-right" />
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-ds-dark-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {members.map((_, index) => (
            <button
              key={index}
              onClick={() => setMobileIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === mobileIndex ? 'bg-ds-accent-yellow' : 'bg-ds-pastille-green/30'}`}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {enableCarousel && members.length > 3 && (
        <div className="hidden lg:flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(members.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-ds-accent-yellow' : 'bg-ds-pastille-green/30'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
