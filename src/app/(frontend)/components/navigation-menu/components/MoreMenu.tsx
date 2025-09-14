'use client'

import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { resolveUrl } from '@/lib/navigation'
import type { Header } from '@/payload-types'

// Extract types from Header interface
type NavigationItem = NonNullable<Header['navigation']>[number]

interface MoreMenuProps {
  hiddenItems: NavigationItem[]
  isOpen: boolean
  onToggle: () => void
  onItemClick: (item: NavigationItem) => void
  moreButtonRef: React.RefObject<HTMLButtonElement | null>
}

export function MoreMenu({
  hiddenItems,
  isOpen,
  onToggle,
  onItemClick,
  moreButtonRef,
}: MoreMenuProps) {
  if (hiddenItems.length === 0) return null

  return (
    <div className="relative">
      <button
        ref={moreButtonRef}
        onClick={onToggle}
        className="nav-item text-white hover:text-ds-accent-yellow px-3 py-2 text-sm font-light transition-all duration-200 ease-out flex items-center"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-9999">
          {hiddenItems.map((item, i) => (
            <div key={`${item.label}-${i}`}>
              {item.linkType === 'internal' || item.linkType === 'external' ? (
                <Link
                  href={resolveUrl(item)}
                  className="block px-4 py-2 text-sm text-ds-dark-blue hover:text-ds-accent-yellow hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => onToggle()}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="w-full text-left px-4 py-2 text-sm text-ds-dark-blue hover:text-ds-pastille-green hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => {
                    onToggle()
                    onItemClick(item)
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
  )
}
