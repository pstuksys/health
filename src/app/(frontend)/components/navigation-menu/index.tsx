'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/(frontend)/components/ui/button'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// TODO: move to types.ts
interface SubMenuItem {
  label: string
  href: string
}

interface MegaMenuCategory {
  title: string
  items: SubMenuItem[]
}

interface NavigationItem {
  label: string
  href?: string
  megaMenu?: {
    categories: MegaMenuCategory[]
    featured?: SubMenuItem[]
  }
}

interface CTAButton {
  label: string
  href: string
}

interface NavigationMenuProps {
  items: NavigationItem[]
  logo?: string
  ctaButton?: CTAButton
  sticky?: boolean
  className?: string
}

export function NavigationMenu({
  items,
  logo,
  ctaButton,
  sticky = false,
  className,
}: NavigationMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle)
  }

  const handleMouseEnter = (itemLabel: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    if (items.find((item) => item.label === itemLabel)?.megaMenu) {
      setHoveredItem(itemLabel)
      setSelectedCategory(
        items.find((item) => item.label === itemLabel)?.megaMenu?.categories[0]?.title || null,
      )
      setIsMegaMenuVisible(true)
    }
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuVisible(false)
      setHoveredItem(null)
      setSelectedCategory(null)
    }, 150) // 150ms delay to prevent disappearing too quickly
  }

  const getDisplayedItems = (megaMenu: NavigationItem['megaMenu']) => {
    if (!megaMenu) return []

    if (selectedCategory) {
      const category = megaMenu.categories.find((cat) => cat.title === selectedCategory)
      return category ? category.items : []
    }

    // Default to first category's items
    return megaMenu.categories[0]?.items || []
  }

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuVisible(false)
        setHoveredItem(null)
        setSelectedCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  return (
    <nav
      className={cn(
        'w-full bg-ds-dark-blue border-b border-gray-700 z-50',
        sticky && 'sticky top-0',
        className,
      )}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {logo ? (
              <Link href="/" className="flex items-center">
                <Image
                  src={logo || '/placeholder.svg'}
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            ) : (
              <Link href="/" className="text-xl font-semibold text-white">
                Logo
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block relative">
            <div className="ml-10 flex items-baseline space-x-8">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="nav-item text-white hover:text-ds-pastille-green px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center"
                    >
                      {item.label}
                      {item.megaMenu && <ChevronRight className="ml-1 h-3 w-3 rotate-90" />}
                    </Link>
                  ) : (
                    <button className="nav-item text-white hover:text-ds-pastille-green px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center">
                      {item.label}
                      {item.megaMenu && <ChevronRight className="ml-1 h-3 w-3 rotate-90" />}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          {ctaButton && (
            <div className="hidden md:block">
              <Button
                asChild
                className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold"
              >
                <Link href={ctaButton.href}>{ctaButton.label}</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-ds-pastille-green p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown - Full width below navigation */}
        {isMegaMenuVisible && hoveredItem && (
          <div
            ref={megaMenuRef}
            className="absolute left-0 right-0 w-screen bg-white shadow-lg border-t border-gray-200 animate-fade-in-down transition-all duration-200 ease-out transform origin-top"
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-container mx-auto">
              <div className="flex">
                {/* Categories Panel */}
                <div className="w-1/3 bg-gray-50 p-6">
                  <h3 className="text-ds-dark-blue font-semibold text-sm uppercase tracking-wide mb-4">
                    {hoveredItem}
                  </h3>
                  <div className="space-y-3">
                    {items
                      .find((item) => item.label === hoveredItem)
                      ?.megaMenu?.categories.map((category) => (
                        <div key={category.title} className="group">
                          <div
                            className={cn(
                              'mega-menu-item flex items-center justify-between cursor-pointer transition-colors duration-200 p-2 -m-2 rounded',
                              selectedCategory === category.title
                                ? 'text-ds-pastille-green bg-ds-pastille-green/10'
                                : 'text-ds-dark-blue hover:text-ds-pastille-green hover:bg-gray-100',
                            )}
                            onClick={() => handleCategoryClick(category.title)}
                          >
                            <span className="text-sm font-light">{category.title}</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Items Panel */}
                <div className="w-2/3 p-6">
                  <h4 className="text-ds-dark-blue font-semibold text-sm uppercase tracking-wide mb-4">
                    {selectedCategory ||
                      items.find((item) => item.label === hoveredItem)?.megaMenu?.categories[0]
                        ?.title ||
                      hoveredItem.toUpperCase()}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {getDisplayedItems(
                      items.find((item) => item.label === hoveredItem)?.megaMenu,
                    ).map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="mega-menu-item text-ds-dark-blue hover:text-ds-pastille-green text-sm font-light py-1 transition-colors duration-200 block hover:bg-gray-50 px-2 -mx-2 rounded"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>

                  {/* Featured Items */}
                  {items.find((item) => item.label === hoveredItem)?.megaMenu?.featured && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h5 className="text-ds-dark-blue font-medium text-sm mb-3">Featured</h5>
                      <div className="space-y-2">
                        {items
                          .find((item) => item.label === hoveredItem)
                          ?.megaMenu?.featured?.map((featured) => (
                            <Link
                              key={featured.href}
                              href={featured.href}
                              className="mega-menu-item text-ds-pastille-green hover:text-ds-dark-blue text-sm font-light transition-colors duration-200 block hover:bg-gray-50 px-2 -mx-2 rounded py-1"
                            >
                              {featured.label}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation - Full Screen Modal */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/20 z-40 mobile-backdrop"
            onClick={toggleMobileMenu}
          />

          {/* Mobile menu */}
          <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in-down">
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-ds-dark-blue">
              <div className="flex-shrink-0">
                {logo ? (
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src={logo || '/placeholder.svg'}
                      alt="Logo"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                ) : (
                  <Link
                    href="/"
                    className="text-xl font-semibold text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Logo
                  </Link>
                )}
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-ds-pastille-green p-2 transition-colors duration-200"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile menu content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-ds-dark-blue hover:text-ds-pastille-green block text-lg font-light py-3 border-b border-gray-100 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
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
                            {item.megaMenu.categories.map((category) => (
                              <div key={category.title} className="ml-4">
                                <span className="text-ds-pastille-green text-base font-medium block py-2">
                                  {category.title}
                                </span>
                                <div className="ml-4 space-y-2">
                                  {category.items.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="text-ds-dark-blue hover:text-ds-pastille-green text-sm font-light block py-2 hover:bg-gray-50 px-3 -mx-3 rounded transition-all duration-200"
                                      onClick={() => setIsMobileMenuOpen(false)}
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
                    <Button
                      asChild
                      className="w-full bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold py-4 text-lg transition-all duration-200"
                    >
                      <Link href={ctaButton.href} onClick={() => setIsMobileMenuOpen(false)}>
                        {ctaButton.label}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
