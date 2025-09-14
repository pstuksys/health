'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { resolveUrl } from '@/lib/navigation'
import { CMSLink } from '../../ui'
import type { Header } from '@/payload-types'

// Extract types from Header interface
type NavigationItem = NonNullable<Header['navigation']>[number]
type CTAButton = NonNullable<Header['ctaButton']>

interface MobileNavigationProps {
  isOpen: boolean
  items: NavigationItem[]
  ctaButton?: CTAButton
  onClose: () => void
  logoRef: React.RefObject<HTMLAnchorElement | null>
}

export function MobileNavigation({
  isOpen,
  items,
  ctaButton,
  onClose,
  logoRef,
}: MobileNavigationProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="md:hidden fixed inset-0 bg-black/20 z-40 mobile-backdrop" onClick={onClose} />

      {/* Mobile menu */}
      <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in-down flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-primary shadow-lg flex-shrink-0">
          <div className="flex-shrink-0">
            <Link ref={logoRef} href="/" className="flex items-center flex-shrink-0 w-40">
              <Image
                src="/logo-white.svg"
                alt="Logo"
                width={240}
                height={40}
                className="w-full h-auto"
              />
            </Link>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-ds-accent-yellow p-2 transition-colors duration-200"
            aria-label="Close mobile menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={`${item.label}-${index}`}>
                {item.linkType === 'internal' || item.linkType === 'external' || item.href ? (
                  <Link
                    href={resolveUrl(item)}
                    className="text-ds-dark-blue hover:text-ds-pastille-green block text-lg font-light py-3 border-b border-gray-100 transition-colors duration-200"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="py-3 border-b border-gray-100">
                    <span className="text-ds-dark-blue font-medium text-lg block mb-3">
                      {item.label}
                    </span>
                    {item.megaMenu && (
                      <div className="space-y-4">
                        {item.megaMenu.categories?.map((category) => (
                          <div key={category.title} className="ml-4">
                            <span className="text-ds-pastille-green text-base font-medium block py-2">
                              {category.title}
                            </span>
                            <div className="ml-4 space-y-2">
                              {category.items?.map((subItem, index) => (
                                <Link
                                  key={`${category.title}-${index}`}
                                  href={resolveUrl(subItem)}
                                  className="text-ds-dark-blue hover:text-ds-accent-yellow text-sm font-light block py-2 hover:bg-gray-50 px-3 -mx-3 rounded transition-all duration-200"
                                  onClick={onClose}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            {ctaButton && (
              <div className="pt-6">
                <CMSLink href={resolveUrl(ctaButton)} variant="primary" className="w-full">
                  {ctaButton.label}
                </CMSLink>
              </div>
            )}
          </div>
          {/* Bottom padding to ensure last items are fully visible */}
          <div className="h-8"></div>
        </div>
      </div>
    </>
  )
}
