'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveUrl } from '@/lib/navigation'
import type { Header } from '@/payload-types'

// Extract types from Header interface
type NavigationItem = NonNullable<Header['navigation']>[number]

interface MegaMenuDropdownProps {
  isVisible: boolean
  hoveredItem: string | null
  selectedCategory: string | null
  items: NavigationItem[]
  onCategoryClick: (categoryTitle: string) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  megaMenuRef: React.RefObject<HTMLDivElement | null>
}

export function MegaMenuDropdown({
  isVisible,
  hoveredItem,
  selectedCategory,
  items,
  onCategoryClick,
  onMouseEnter,
  onMouseLeave,
  megaMenuRef,
}: MegaMenuDropdownProps) {
  const getDisplayedItems = (megaMenu: NavigationItem['megaMenu']) => {
    if (!megaMenu?.categories) return []

    if (selectedCategory) {
      const category = megaMenu.categories.find((cat) => cat.title === selectedCategory)
      return category?.items || []
    }

    // Default to first category's items
    return megaMenu.categories[0]?.items || []
  }

  if (!isVisible || !hoveredItem) return null

  const currentItem = items.find((item) => item.label === hoveredItem)
  const megaMenu = currentItem?.megaMenu

  if (!megaMenu?.categories) return null

  return (
    <div
      ref={megaMenuRef}
      className="fixed left-0 right-0 w-full bg-white shadow-lg border-t border-gray-200 animate-fade-in-down transition-all duration-200 ease-out transform origin-top z-50"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex">
          {/* Categories Panel */}
          <div className="w-1/3 bg-white p-6">
            <h3 className="text-ds-dark-blue font-semibold text-sm uppercase tracking-wide mb-4">
              {hoveredItem}
            </h3>
            <div className="space-y-2">
              {megaMenu.categories.map((category) => (
                <div key={category.title} className="group">
                  <div
                    className={cn(
                      'mega-menu-item flex items-center justify-between cursor-pointer transition-colors duration-200 px-4 py-3 rounded',
                      selectedCategory === category.title
                        ? 'text-ds-accent-yellow bg-ds-accent-yellow/10'
                        : 'text-ds-dark-blue hover:text-ds-accent-yellow hover:bg-gray-100',
                    )}
                    onClick={() => onCategoryClick(category.title)}
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
              {selectedCategory || megaMenu.categories[0]?.title || hoveredItem.toUpperCase()}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {getDisplayedItems(megaMenu).map((subItem, index) => (
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
            {megaMenu.featured && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h5 className="text-ds-dark-blue font-medium text-sm mb-3">Featured</h5>
                <div className="space-y-2">
                  {megaMenu.featured.map((featured) => (
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
  )
}
