'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'

import { FaFacebook, FaLinkedin, FaTwitter, FaMailBulk, FaPhone, FaArrowUp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { Button } from '../ui/button'
import { Building } from 'lucide-react'
import { CQCRatingCard } from '../footer-card/component'
import { useDoctifyWidget } from '@/hooks/use-doctify-widget'
import type { Footer as FooterType } from '@/payload-types'

type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'x'

type FooterLink = {
  label: string
  href: string
}

type FooterProps = {
  socialLinks: NonNullable<FooterType['socialLinks']>
  navLinks: FooterLink[]
  legalLinks: FooterLink[]
  contact?: {
    email?: string
    phone?: string
    address?: string
  }
  className?: string
}

const DOCTIFY_WIDGET_ID = '0v6ey52e'
const DOCTIFY_SCRIPT_URL = `https://www.doctify.com/get-script?widget_container_id=${DOCTIFY_WIDGET_ID}&type=micro-star-widget&tenant=athena-uk&language=en&profileType=practice&layoutType=layoutI&slugs=independent-physiological-diagnostics&background=white`

const ICON_SIZE_LARGE = 28
const ICON_SIZE_SMALL = 18
const TRANSITION_CLASSES = 'transition-colors duration-200' as const
const HOVER_TEXT_CLASSES = 'hover:text-ds-accent-yellow' as const

const SOCIAL_ICON_MAP: Record<SocialPlatform, IconType> = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  x: FaXTwitter,
  linkedin: FaLinkedin,
}

export function Footer({ socialLinks, navLinks, legalLinks, contact, className }: FooterProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  const { isLoaded: widgetLoaded, containerRef } = useDoctifyWidget({
    widgetId: DOCTIFY_WIDGET_ID,
    scriptUrl: DOCTIFY_SCRIPT_URL,
    rootMargin: '200px',
  })

  const handleContactClick = useCallback((type: 'email' | 'phone', value: string) => {
    const prefix = type === 'email' ? 'mailto:' : 'tel:'
    window.location.href = `${prefix}${value}`
  }, [])

  const handleAddressClick = useCallback(async () => {
    if (!contact?.address) return

    try {
      await navigator.clipboard.writeText(contact.address)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 1000)
    } catch (error) {
      console.warn('Failed to copy address:', error)
    }
  }, [contact?.address])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer className={cn('bg-gradient-primary text-white py-12 shadow-lg', className)}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <ul className="flex items-center gap-4">
                {socialLinks
                  .filter((link) => link.platform && link.url)
                  .map((link) => {
                    const platform = link.platform as SocialPlatform
                    const Icon = SOCIAL_ICON_MAP[platform]
                    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1)

                    return (
                      <li key={link.id ?? platform}>
                        <Link
                          href={link.url!}
                          className={cn(
                            'text-gray-300 inline-flex items-center justify-center rounded-full p-2 hover:bg-white/10',
                            HOVER_TEXT_CLASSES,
                            TRANSITION_CLASSES,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on ${platformName}`}
                        >
                          <Icon size={ICON_SIZE_LARGE} />
                        </Link>
                      </li>
                    )
                  })}
              </ul>
              {/* Doctify Badge - Wrapped with key to prevent React reconciliation issues */}
              <div key="doctify-widget-wrapper" ref={containerRef}>
                {!widgetLoaded ? (
                  <div className="min-h-[60px] text-gray-400 text-xs animate-pulse">
                    Loading reviews...
                  </div>
                ) : null}
                <div id={DOCTIFY_WIDGET_ID} className="min-h-[60px]" suppressHydrationWarning />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 md:gap-8">
            {/* Navigation links */}
            {navLinks.length > 0 && (
              <div className="space-y-4">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <li
                      key={`nav-${link.label}-${index}`}
                      className="border-b border-white/10 pb-2 last:border-b-0"
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'block text-gray-300 font-light',
                          HOVER_TEXT_CLASSES,
                          TRANSITION_CLASSES,
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Legal links */}
            {legalLinks.length > 0 && (
              <div className="space-y-4">
                <ul className="space-y-2">
                  {legalLinks.map((link, index) => (
                    <li
                      key={`legal-${link.label}-${index}`}
                      className="border-b border-white/10 pb-2 last:border-b-0"
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'block text-gray-300 font-light',
                          HOVER_TEXT_CLASSES,
                          TRANSITION_CLASSES,
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2 text-gray-300 font-light overflow-hidden">
              {contact?.email && (
                <button
                  onClick={() => handleContactClick('email', contact.email!)}
                  className={cn('flex items-center gap-2 cursor-pointer group', TRANSITION_CLASSES)}
                  aria-label={`Send email to ${contact.email}`}
                  type="button"
                >
                  <FaMailBulk
                    size={ICON_SIZE_SMALL}
                    className={cn(
                      HOVER_TEXT_CLASSES,
                      TRANSITION_CLASSES,
                      'group-hover:text-ds-accent-yellow',
                    )}
                  />
                  <span
                    className={cn(
                      HOVER_TEXT_CLASSES,
                      TRANSITION_CLASSES,
                      'group-hover:text-ds-accent-yellow',
                    )}
                  >
                    {contact.email}
                  </span>
                </button>
              )}
              {contact?.phone && (
                <button
                  onClick={() => handleContactClick('phone', contact.phone!)}
                  className={cn('flex items-center gap-2 cursor-pointer group', TRANSITION_CLASSES)}
                  aria-label={`Call ${contact.phone}`}
                  type="button"
                >
                  <FaPhone
                    size={ICON_SIZE_SMALL}
                    className={cn(
                      HOVER_TEXT_CLASSES,
                      TRANSITION_CLASSES,
                      'group-hover:text-ds-accent-yellow',
                    )}
                  />
                  <span
                    className={cn(
                      HOVER_TEXT_CLASSES,
                      TRANSITION_CLASSES,
                      'group-hover:text-ds-accent-yellow',
                    )}
                  >
                    {contact.phone}
                  </span>
                </button>
              )}
              {contact?.address && (
                <button
                  onClick={handleAddressClick}
                  className={cn(
                    'flex items-center gap-2 cursor-pointer group text-left',
                    TRANSITION_CLASSES,
                  )}
                  aria-label={copySuccess ? 'Address copied!' : 'Copy address to clipboard'}
                  type="button"
                >
                  <Building
                    className={cn(
                      'flex-shrink-0',
                      HOVER_TEXT_CLASSES,
                      TRANSITION_CLASSES,
                      'group-hover:text-ds-accent-yellow',
                    )}
                    width={ICON_SIZE_SMALL}
                    height={ICON_SIZE_SMALL}
                  />
                  <span
                    className={cn(
                      'whitespace-pre-line',
                      HOVER_TEXT_CLASSES,
                      TRANSITION_CLASSES,
                      'group-hover:text-ds-accent-yellow',
                      copySuccess && 'text-ds-accent-yellow',
                    )}
                  >
                    {copySuccess ? 'Address copied!' : contact.address}
                  </span>
                </button>
              )}
            </div>
          </div>
          {/* CQC Rating Card */}
          <div className="flex md:justify-end">
            <CQCRatingCard />
          </div>
        </div>
        {/* Copyright && Back to top button */}
        <div className="mt-8 pt-8 border-t border-ds-accent-yellow relative">
          <p className="text-center text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} Health. All rights reserved.
          </p>
          <Button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="hidden sm:inline-flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 text-ds-dark-blue rounded-full shadow-lg bg-ds-accent-yellow p-3 hover:scale-[1.03] hover:bg-ds-accent-yellow/90 active:bg-ds-accent-yellow/80 transition-all duration-200"
            type="button"
          >
            <span className="block select-none" aria-hidden>
              <FaArrowUp className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
