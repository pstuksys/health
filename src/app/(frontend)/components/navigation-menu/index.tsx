'use client'

import { useState, useRef, useEffect } from 'react'
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
import { findNavigationItem, getFirstCategoryTitle } from '../../../../lib/navigationUtils'

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

  // Event handlers
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

    const item = findNavigationItem(items, itemLabel)
    if (item?.megaMenu?.categories) {
      setHoveredItem(itemLabel)
      setSelectedCategory(getFirstCategoryTitle(item.megaMenu))
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

  const handleMoreItemClick = (item: NavigationItem) => {
    handleMouseEnter(item.label)
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
          <div className="hidden md:block relative flex-1 mx-8 min-w-0 overflow-hidden">
            <NavigationItems
              visibleItems={visibleItems}
              hiddenItems={hiddenItems}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMoreItemClick={handleMoreItemClick}
              navItemsRef={navItemsRef}
              moreButtonRef={moreButtonRef}
              showMoreMenu={showMoreMenu}
              onToggleMoreMenu={() => setShowMoreMenu(!showMoreMenu)}
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
        onMouseEnter={() => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
          }
        }}
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
