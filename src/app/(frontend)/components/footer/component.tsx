import type React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type SocialLink = { icon: React.ReactNode; href: string }
type FooterLink = { label: string; href: string }

type FooterProps = {
  about: string
  socialLinks: SocialLink[]
  footerLinks: FooterLink[]
  className?: string
}

export function Footer({ about, socialLinks, footerLinks, className }: FooterProps) {
  return (
    <footer className={cn('bg-ds-dark-blue text-white py-12', className)}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-300 font-light leading-relaxed">{about}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-ds-accent-yellow transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-ds-accent-yellow font-light transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-ds-pastille-green">
          <p className="text-center text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
