'use client'
import type React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import { FaFacebook, FaLinkedin, FaTwitter, FaMailBulk, FaPhone, FaArrowUp } from 'react-icons/fa'
import { Button } from '../ui/button'

type SocialLink = { platform?: string; href: string }
type FooterLink = { label: string; href: string }

type FooterProps = {
  about: string
  socialLinks: SocialLink[]
  navLinks: FooterLink[]
  legalLinks: FooterLink[]
  contact?: { email?: string; phone?: string; address?: string }
  className?: string
}

export function Footer({
  about,
  socialLinks,
  navLinks,
  legalLinks,
  contact,
  className,
}: FooterProps) {
  return (
    <footer className={cn('bg-ds-dark-blue text-white py-12', className)}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-300 font-light text-sm md:text-md leading-relaxed">{about}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <ul className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link?.href}
                    className="text-gray-300 hover:text-ds-accent-yellow transition-colors duration-200 inline-flex items-center justify-center rounded-full p-2"
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
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Navigation</h3>
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
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
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-gray-300 font-light">
              {contact?.email && (
                <p className="flex items-center gap-2">
                  <FaMailBulk size={18} /> <span>{contact.email}</span>
                </p>
              )}
              {contact?.phone && (
                <p className="flex items-center gap-2">
                  <FaPhone size={18} /> <span>{contact.phone}</span>
                </p>
              )}
              {contact?.address && <p className="whitespace-pre-line">{contact.address}</p>}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-ds-pastille-green relative">
          <p className="text-center text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} Health. All rights reserved.
          </p>
          <Button
            onClick={() => {
              if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label="Back to top"
            className="hidden sm:inline-flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-ds-accent-yellow text-ds-dark-blue rounded-full p-3 shadow-lg hover:bg-ds-accent-yellow/90 transition-colors py-3"
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
