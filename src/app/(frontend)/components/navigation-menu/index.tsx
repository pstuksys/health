'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Header } from '@/payload-types'
import { CMSLink } from '../ui'
import { resolveUrl } from '@/lib/navigation'
import { MegaMenuDropdown } from './components/MegaMenuDropdown'
import { MobileNavigation } from './components/MobileNavigation'
import { NavigationItems } from './components/NavigationItems'
import { useResponsiveNavigation } from '../../../../hooks/useResponsiveNavigation'
import { findNavigationItem } from '@/lib/navigation'
// getFirstCategoryTitle - no longer needed (categories are now direct links, not nested items)

// Constants
const MEGA_MENU_HIDE_DELAY = 150 // milliseconds

// Extract types from Header interface
type NavigationItem = NonNullable<Header['navigation']>[number]
type CTAButton = NonNullable<Header['ctaButton']>

interface NavigationMenuProps {
  items: NavigationItem[]
  ctaButton?: CTAButton
  sticky?: boolean
  className?: string
  isScrolled?: boolean
  isVisible?: boolean
}

export function NavigationMenu({
  items,
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
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  // Use the custom hook for responsive navigation
  const { visibleItems, hiddenItems } = useResponsiveNavigation({
    items,
    navContainerRef,
    navItemsRef,
    ctaRef,
    logoRef,
  })

  // Event handlers - memoized for performance
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const toggleMoreMenu = useCallback(() => {
    setShowMoreMenu((prev) => !prev)
  }, [])

  const handleCategoryClick = useCallback((categoryTitle: string) => {
    setSelectedCategory(categoryTitle)
  }, [])

  const handleMouseEnter = useCallback(
    (itemLabel: string) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      const item = findNavigationItem(items, itemLabel)
      if (item?.megaMenu?.categories) {
        setHoveredItem(itemLabel)
        // setSelectedCategory(getFirstCategoryTitle(item.megaMenu)) // No longer needed - categories are direct links
        setSelectedCategory(null) // Keep for backwards compatibility with components
        setIsMegaMenuVisible(true)
        setShowMoreMenu(false) // Close More menu when opening mega menu
      }
    },
    [items],
  )

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuVisible(false)
      setHoveredItem(null)
      setSelectedCategory(null)
    }, MEGA_MENU_HIDE_DELAY)
  }, [])

  const handleMoreItemClick = useCallback(
    (item: NavigationItem) => {
      handleMouseEnter(item.label)
      setShowMoreMenu(false)
    },
    [handleMouseEnter],
  )

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  // Close mega menu and More menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Close mega menu if clicking outside
      if (megaMenuRef.current && !megaMenuRef.current.contains(target)) {
        setIsMegaMenuVisible(false)
        setHoveredItem(null)
        setSelectedCategory(null)
      }

      // Close More menu if clicking outside
      if (moreButtonRef.current && !moreButtonRef.current.contains(target)) {
        const isClickInsideMoreMenu = (target as Element).closest('[data-more-menu]')
        if (!isClickInsideMoreMenu) {
          setShowMoreMenu(false)
        }
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMoreMenu(false)
        setIsMegaMenuVisible(false)
        setHoveredItem(null)
        setSelectedCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
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
        'w-full z-50 transition-all duration-300 ease-out',
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
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block relative flex-1 mx-8 min-w-0">
            <NavigationItems
              visibleItems={visibleItems}
              hiddenItems={hiddenItems}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMoreItemClick={handleMoreItemClick}
              navItemsRef={navItemsRef}
              moreButtonRef={moreButtonRef}
              showMoreMenu={showMoreMenu}
              onToggleMoreMenu={toggleMoreMenu}
            />
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
              className="text-white hover:text-ds-accent-yellow p-2 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown - Full width below navigation */}
      <MegaMenuDropdown
        isVisible={isMegaMenuVisible}
        hoveredItem={hoveredItem}
        selectedCategory={selectedCategory}
        items={items}
        onCategoryClick={handleCategoryClick}
        onMouseEnter={clearHoverTimeout}
        onMouseLeave={handleMouseLeave}
        megaMenuRef={megaMenuRef}
      />

      {/* Mobile Navigation - Full Screen Modal */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        items={items}
        ctaButton={ctaButton}
        onClose={toggleMobileMenu}
        logoRef={logoRef}
      />
    </nav>
  )
}
