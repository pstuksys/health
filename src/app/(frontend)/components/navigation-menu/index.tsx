'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Header } from '@/payload-types'
import { CMSLink } from '../ui'
import { resolveUrl } from '@/lib/navigation'

// Extract types from Header interface
type NavigationItem = NonNullable<Header['navigation']>[number]
type CTAButton = NonNullable<Header['ctaButton']>

interface NavigationMenuProps {
  items: NavigationItem[]
  // logo?: string
  ctaButton?: CTAButton
  sticky?: boolean
  className?: string
  isScrolled?: boolean
  isVisible?: boolean
}

export function NavigationMenu({
  items,
  // logo,
  ctaButton,
  sticky = false,
  className,
  isScrolled = false,
  isVisible = true,
}: NavigationMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<NavigationItem[]>(items)
  const [hiddenItems, setHiddenItems] = useState<NavigationItem[]>([])
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const lastVisibleLenRef = useRef<number>(items.length)
  const lastHiddenLenRef = useRef<number>(0)

  useEffect(() => {
    if (!navContainerRef.current || !navItemsRef.current) return
    let frame = 0

    const recalc = () => {
      if (!navContainerRef.current || !navItemsRef.current) return
      const container = navContainerRef.current
      const navItemsEl = navItemsRef.current
      const ctaEl = ctaRef.current
      // const moreButtonEl = moreButtonRef.current

      const containerWidth = container.offsetWidth
      const ctaWidth = ctaEl?.offsetWidth ?? 0
      const logoWidth = logoRef.current?.offsetWidth ?? 240
      const padding = 64

      // Calculate available space more precisely
      const availableSpace = containerWidth - logoWidth - ctaWidth - padding - 32

      let totalItemsWidth = 0
      const children = Array.from(navItemsEl.children) as HTMLElement[]
      const newVisible: NavigationItem[] = []
      const newHidden: NavigationItem[] = []

      // First pass: try to fit all items with normal spacing
      for (let i = 0; i < items.length; i++) {
        const child = children[i]
        const width = child?.offsetWidth ?? 0
        const spacing = i > 0 ? 32 : 0 // space-x-8 = 32px

        if (totalItemsWidth + width + spacing <= availableSpace) {
          totalItemsWidth += width + spacing
          newVisible.push(items[i])
        } else {
          newHidden.push(items[i])
        }
      }

      // If we have hidden items, try to fit more by reducing spacing
      if (newHidden.length > 0 && newVisible.length > 0) {
        totalItemsWidth = 0
        newVisible.length = 0
        newHidden.length = 0

        for (let i = 0; i < items.length; i++) {
          const child = children[i]
          const width = child?.offsetWidth ?? 0
          const spacing = i > 0 ? 16 : 0 // space-x-4 = 16px

          if (totalItemsWidth + width + spacing <= availableSpace) {
            totalItemsWidth += width + spacing
            newVisible.push(items[i])
          } else {
            newHidden.push(items[i])
          }
        }
      }

      // Fallback: if we still have issues, ensure at least one item is visible
      if (newVisible.length === 0 && items.length > 0) {
        newVisible.push(items[0])
        newHidden.push(...items.slice(1))
      }

      if (
        newHidden.length !== lastHiddenLenRef.current ||
        newVisible.length !== lastVisibleLenRef.current
      ) {
        setVisibleItems(newVisible)
        setHiddenItems(newHidden)
        lastVisibleLenRef.current = newVisible.length
        lastHiddenLenRef.current = newHidden.length
      }
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        recalc()
      })
    }

    const ro = new ResizeObserver(schedule)
    ro.observe(navContainerRef.current)
    if (ctaRef.current) ro.observe(ctaRef.current)

    window.addEventListener('resize', schedule)

    // Initial calculation
    schedule()

    // Additional check after a short delay to catch any missed calculations
    const timeoutId = setTimeout(schedule, 100)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
      clearTimeout(timeoutId)
    }

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

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

    const item = items.find((item) => item.label === itemLabel)
    if (item?.megaMenu?.categories) {
      setHoveredItem(itemLabel)
      setSelectedCategory(item.megaMenu.categories[0]?.title || null)
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
    if (!megaMenu?.categories) return []

    if (selectedCategory) {
      const category = megaMenu.categories.find((cat) => cat.title === selectedCategory)
      return category?.items || []
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
        'w-full z-50 transition-all duration-300 ease-out ',
        isScrolled ? 'bg-gradient-primary shadow-lg' : 'bg-transparent',
        !isVisible && 'opacity-0 pointer-events-none',
        sticky && (isScrolled ? 'fixed top-0 left-0 right-0' : 'absolute top-0 left-0 right-0'),
        className,
      )}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-4">
        <div ref={navContainerRef} className="flex justify-between items-center h-16">
          <Link
            ref={logoRef}
            href="/"
            className="flex items-center flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px]"
          >
            <Image
              src="/logo-white.svg"
              alt="Logo"
              width={240}
              height={40}
              className="w-full h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block relative flex-1 mx-8 min-w-0 overflow-hidden">
            <div
              ref={navItemsRef}
              className={cn(
                'flex items-baseline min-w-0',
                hiddenItems.length > 0 ? 'space-x-4' : 'space-x-8',
              )}
            >
              {visibleItems.map((item, i) => (
                <div
                  key={`${item.label}-${i}`}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.linkType === 'internal' || item.linkType === 'external' || item.href ? (
                    <Link
                      href={resolveUrl(item)}
                      className="nav-item text-white hover:text-ds-accent-yellow px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center whitespace-nowrap max-w-[120px]"
                      title={item.label}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.megaMenu && (
                        <ChevronRight className="ml-1 h-3 w-3 rotate-90 flex-shrink-0" />
                      )}
                    </Link>
                  ) : (
                    <button className="nav-item text-white hover:text-ds-accent-yellow px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center whitespace-nowrap max-w-[120px]">
                      <span className="truncate">{item.label}</span>
                      {item.megaMenu && (
                        <ChevronRight className="ml-1 h-3 w-3 rotate-90 flex-shrink-0" />
                      )}
                    </button>
                  )}
                </div>
              ))}

              {/* More button - always show if we have items and there might be hidden ones */}
              {(hiddenItems.length > 0 || items.length > visibleItems.length) && (
                <div className="relative">
                  <button
                    ref={moreButtonRef}
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="nav-item text-white hover:text-ds-accent-yellow px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center"
                    aria-haspopup="menu"
                    aria-expanded={showMoreMenu}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {/* TODO fix visibility issue with more menu, currently overflow hidden */}
                  {showMoreMenu && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-9999">
                      {hiddenItems.map((item, i) => (
                        <div key={`${item.label}-${i}`}>
                          {item.linkType === 'internal' || item.linkType === 'external' ? (
                            <Link
                              href={resolveUrl(item)}
                              className="block px-4 py-2 text-sm text-ds-dark-blue hover:text-ds-accent-yellow hover:bg-gray-50 transition-colors duration-200"
                              onClick={() => setShowMoreMenu(false)}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-ds-dark-blue hover:text-ds-pastille-green hover:bg-gray-50 transition-colors duration-200"
                              onClick={() => {
                                setShowMoreMenu(false)
                                handleMouseEnter(item.label)
                              }}
                            >
                              {item.label}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA Button */}
          {ctaButton && (
            <div
              ref={ctaRef}
              className="hidden md:block flex-shrink-0 max-w-[150px] md:max-w-[180px]"
            >
              <CMSLink variant="primary" href={resolveUrl(ctaButton)}>
                {ctaButton.label}
              </CMSLink>
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
                      ?.megaMenu?.categories?.map((category) => (
                        <div key={category.title} className="group">
                          <div
                            className={cn(
                              'mega-menu-item flex items-center justify-between cursor-pointer transition-colors duration-200 p-2 -m-2 rounded',
                              selectedCategory === category.title
                                ? 'text-ds-accent-yellow bg-ds-accent-yellow/10'
                                : 'text-ds-dark-blue hover:text-ds-accent-yellow hover:bg-gray-100',
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
                      items.find((item) => item.label === hoveredItem)?.megaMenu?.categories?.[0]
                        ?.title ||
                      hoveredItem.toUpperCase()}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {getDisplayedItems(
                      items.find((item) => item.label === hoveredItem)?.megaMenu,
                    ).map((subItem, index) => (
                      <Link
                        key={index}
                        href={resolveUrl(subItem)}
                        className="mega-menu-item text-ds-dark-blue hover:text-ds-accent-yellow text-sm font-light py-1 transition-colors duration-200 block hover:bg-gray-50 px-2 -mx-2 rounded"
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
                              key={featured.label}
                              href={resolveUrl(featured)}
                              className="mega-menu-item text-ds-accent-yellow hover:text-ds-dark-blue text-sm font-light transition-colors duration-200 block hover:bg-gray-50 px-2 -mx-2 rounded py-1"
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
                onClick={toggleMobileMenu}
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
      )}
    </nav>
  )
}
