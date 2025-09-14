'use client'

import Link from 'next/link'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { resolveUrl } from '@/lib/navigation'
import type { Header } from '@/payload-types'

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
  return (
    <div
      ref={navItemsRef}
      className={`flex items-baseline min-w-0 ${
        hiddenItems.length > 0 ? 'space-x-4' : 'space-x-8'
      }`}
    >
      {visibleItems.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className="relative flex-shrink-0"
          onMouseEnter={() => onMouseEnter(item.label)}
          onMouseLeave={onMouseLeave}
        >
          {item.linkType === 'internal' || item.linkType === 'external' || item.href ? (
            <Link
              href={resolveUrl(item)}
              className="nav-item text-white hover:text-ds-accent-yellow px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center whitespace-nowrap max-w-[120px]"
              title={item.label}
            >
              <span className="truncate">{item.label}</span>
              {item.megaMenu && <ChevronRight className="ml-1 h-3 w-3 rotate-90 flex-shrink-0" />}
            </Link>
          ) : (
            <button className="nav-item text-white hover:text-ds-accent-yellow px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center whitespace-nowrap max-w-[120px]">
              <span className="truncate">{item.label}</span>
              {item.megaMenu && <ChevronRight className="ml-1 h-3 w-3 rotate-90 flex-shrink-0" />}
            </button>
          )}
        </div>
      ))}

      {/* More button - always show if we have items and there might be hidden ones */}
      {(hiddenItems.length > 0 ||
        visibleItems.length < visibleItems.length + hiddenItems.length) && (
        <div className="relative">
          <button
            ref={moreButtonRef}
            onClick={onToggleMoreMenu}
            className="nav-item text-white hover:text-ds-accent-yellow px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center"
            aria-haspopup="menu"
            aria-expanded={showMoreMenu}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {/* More menu dropdown */}
          {showMoreMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-9999">
              {hiddenItems.map((item, i) => (
                <div key={`${item.label}-${i}`}>
                  {item.linkType === 'internal' || item.linkType === 'external' ? (
                    <Link
                      href={resolveUrl(item)}
                      className="block px-4 py-2 text-sm text-ds-dark-blue hover:text-ds-accent-yellow hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => onToggleMoreMenu()}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-ds-dark-blue hover:text-ds-pastille-green hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => {
                        onToggleMoreMenu()
                        onMoreItemClick(item)
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
  )
}
