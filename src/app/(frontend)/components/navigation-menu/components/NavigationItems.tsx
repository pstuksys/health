'use client'

import Link from 'next/link'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveUrl } from '@/lib/navigation'
import type { Header } from '@/payload-types'

// Constants
const NAV_ITEM_CLASSES =
  'text-white hover:text-ds-accent-yellow px-2 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center whitespace-nowrap min-w-0'

// Extract types from Header interface
type NavigationItem = NonNullable<Header['navigation']>[number]

interface NavigationItemsProps {
  visibleItems: NavigationItem[]
  hiddenItems: NavigationItem[]
  onMouseEnter: (itemLabel: string) => void
  onMouseLeave: () => void
  onMoreItemClick: (item: NavigationItem) => void
  navItemsRef: React.RefObject<HTMLDivElement | null>
  moreButtonRef: React.RefObject<HTMLButtonElement | null>
  showMoreMenu: boolean
  onToggleMoreMenu: () => void
}

// Helper to render nav item content
function NavItemContent({ label, hasMegaMenu }: { label: string; hasMegaMenu: boolean }) {
  return (
    <>
      <span className="truncate max-w-[150px] lg:max-w-[200px]">{label}</span>
      {hasMegaMenu && <ChevronRight className="ml-1 h-3 w-3 rotate-90 flex-shrink-0" />}
    </>
  )
}

export function NavigationItems({
  visibleItems,
  hiddenItems,
  onMouseEnter,
  onMouseLeave,
  onMoreItemClick,
  navItemsRef,
  moreButtonRef,
  showMoreMenu,
  onToggleMoreMenu,
}: NavigationItemsProps) {
  const hasHiddenItems = hiddenItems.length > 0

  return (
    <div
      ref={navItemsRef}
      className={cn(
        'flex items-baseline min-w-0',
        hasHiddenItems ? 'space-x-2 lg:space-x-3' : 'space-x-4 lg:space-x-6',
      )}
    >
      {visibleItems.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className="relative flex-shrink-0"
          onMouseEnter={() => onMouseEnter(item.label)}
          onMouseLeave={onMouseLeave}
          data-nav-item={item.label}
        >
          {item.linkType === 'internal' || item.linkType === 'external' || item.href ? (
            <Link
              href={resolveUrl(item)}
              className={cn('nav-item', NAV_ITEM_CLASSES)}
              title={item.label}
            >
              <NavItemContent label={item.label} hasMegaMenu={!!item.megaMenu} />
            </Link>
          ) : (
            <button className={cn('nav-item', NAV_ITEM_CLASSES)} type="button">
              <NavItemContent label={item.label} hasMegaMenu={!!item.megaMenu} />
            </button>
          )}
        </div>
      ))}

      {/* More button - only show if there are hidden items */}
      {hasHiddenItems && (
        <div className="relative flex-shrink-0">
          <button
            ref={moreButtonRef}
            onClick={onToggleMoreMenu}
            className={cn('nav-item', NAV_ITEM_CLASSES, showMoreMenu && 'text-ds-accent-yellow')}
            aria-haspopup="menu"
            aria-expanded={showMoreMenu}
            aria-label="More navigation items"
            type="button"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {/* More menu dropdown with animation */}
          {showMoreMenu && (
            <div
              data-more-menu
              className={cn(
                'absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2',
                'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200',
                'z-[99999]',
                'overflow-hidden',
              )}
            >
              {/* Header */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  More Options
                </p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                {hiddenItems.map((item, i) => (
                  <div key={`more-${item.label}-${i}`}>
                    {item.linkType === 'internal' || item.linkType === 'external' ? (
                      <Link
                        href={resolveUrl(item)}
                        className={cn(
                          'block px-4 py-2.5 text-sm text-ds-dark-blue',
                          'hover:text-ds-accent-yellow hover:bg-ds-accent-yellow/10',
                          'transition-all duration-200',
                          'font-light',
                        )}
                        onClick={onToggleMoreMenu}
                      >
                        <span className="flex items-center gap-2">
                          <span className="truncate">{item.label}</span>
                          {item.megaMenu && (
                            <ChevronRight className="h-3 w-3 flex-shrink-0 opacity-50" />
                          )}
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={cn(
                          'w-full text-left px-4 py-2.5 text-sm text-ds-dark-blue',
                          'hover:text-ds-accent-yellow hover:bg-ds-accent-yellow/10',
                          'transition-all duration-200',
                          'font-light',
                        )}
                        onClick={() => {
                          onToggleMoreMenu()
                          onMoreItemClick(item)
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="truncate">{item.label}</span>
                          {item.megaMenu && (
                            <ChevronRight className="h-3 w-3 flex-shrink-0 opacity-50" />
                          )}
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
