'use client'
import type React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

import { FaFacebook, FaLinkedin, FaTwitter, FaMailBulk, FaPhone, FaArrowUp } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Building } from 'lucide-react'
import { CQCRatingCard } from '../footer-card/component'

type SocialLink = { platform?: string; href: string }
type FooterLink = { label: string; href: string }

type FooterProps = {
  socialLinks: SocialLink[]
  navLinks: FooterLink[]
  legalLinks: FooterLink[]
  contact?: { email?: string; phone?: string; address?: string }
  className?: string
}

export function Footer({ socialLinks, navLinks, legalLinks, contact, className }: FooterProps) {
  const handleEmailClick = () => {
    if (contact?.email) {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const handlePhoneClick = () => {
    if (contact?.phone) {
      window.location.href = `tel:${contact.phone}`
    }
  }

  useEffect(() => {
    // Check if Doctify script is already loaded
    const existingScript = document.querySelector('script[src*="doctify.com"]')
    if (existingScript) return

    // Load Doctify script only once
    const script = document.createElement('script')
    script.src =
      'https://www.doctify.com/get-script?widget_container_id=0v6ey52e&type=micro-star-widget&tenant=athena-uk&language=en&profileType=practice&layoutType=layoutI&slugs=independent-physiological-diagnostics&background=white'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }, [])

  return (
    <footer className={cn('bg-gradient-primary text-white py-12 shadow-lg', className)}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <ul className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link?.href}
                      className="text-gray-300 hover:text-ds-accent-yellow transition-colors duration-200 inline-flex items-center justify-center rounded-full p-2 hover:bg-white/10"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform ? `Follow us on ${link.platform}` : 'Follow us'}
                    >
                      {link.platform === 'facebook' && <FaFacebook size={28} />}
                      {link.platform === 'twitter' && <FaTwitter size={28} />}
                      {link.platform === 'linkedin' && <FaLinkedin size={28} />}
                      {!link.platform && <FaTwitter size={28} />}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Doctify Badge */}
              <div id="0v6ey52e"></div>
            </div>
          )}
          <div className="flex flex-col gap-4 md:gap-8">
            {/* Navigation links */}
            {navLinks.length > 0 && (
              <div className="space-y-4">
                {/* <h3 className="text-lg font-semibold text-white">Navigation</h3> */}
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <li key={index} className="border-b border-white/10 pb-2 last:border-b-0">
                      <Link
                        href={link.href}
                        className="block text-gray-300 hover:text-ds-accent-yellow font-light transition-colors duration-200"
                      >
                        {link?.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Legal links */}
            {legalLinks.length > 0 && (
              <div className="space-y-4">
                {/* <h3 className="text-lg font-semibold text-white">Legal</h3> */}
                <ul className="space-y-2">
                  {legalLinks.map((link, index) => (
                    <li key={index} className="border-b border-white/10 pb-2 last:border-b-0">
                      <Link
                        href={link.href}
                        className="block text-gray-300 hover:text-ds-accent-yellow font-light transition-colors duration-200"
                      >
                        {link?.label}
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
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 hover:text-ds-accent-yellow transition-colors duration-200 cursor-pointer group"
                  aria-label={`Send email to ${contact.email}`}
                >
                  <FaMailBulk
                    size={18}
                    className="group-hover:text-ds-accent-yellow transition-colors duration-200"
                  />
                  <span className="group-hover:text-ds-accent-yellow transition-colors duration-200">
                    {contact.email}
                  </span>
                </button>
              )}
              {contact?.phone && (
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2 hover:text-ds-accent-yellow transition-colors duration-200 cursor-pointer group"
                  aria-label={`Call ${contact.phone}`}
                >
                  <FaPhone
                    size={18}
                    className="group-hover:text-ds-accent-yellow transition-colors duration-200"
                  />
                  <span className="group-hover:text-ds-accent-yellow transition-colors duration-200">
                    {contact.phone}
                  </span>
                </button>
              )}
              {contact?.address && (
                <button
                  className="flex items-center gap-2 hover:text-ds-accent-yellow transition-colors duration-200 cursor-pointer group text-left"
                  aria-label="Copy address to clipboard"
                >
                  <Building className="w-[18px] h-[18px] flex-shrink-0 group-hover:text-ds-accent-yellow transition-colors duration-200" />
                  <span className="whitespace-pre-line group-hover:text-ds-accent-yellow transition-colors duration-200">
                    {contact.address}
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
            onClick={() => {
              if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label="Back to top"
            className="hidden sm:inline-flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 text-ds-dark-blue rounded-full shadow-lg bg-ds-accent-yellow p-3 hover:scale-[1.03] hover:bg-ds-accent-yellow/90 active:bg-ds-accent-yellow/80 transition-all duration-200 py-3"
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
