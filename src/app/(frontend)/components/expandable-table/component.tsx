'use client'

import { useState, useMemo } from 'react'
// @ts-expect-error - lucide-react is not typed
import { ChevronDown, Search } from 'lucide-react'
import type { Page } from '@/payload-types'

type ExpandableTableProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'expandableTable' }
>

export function ExpandableTable({
  title = '',
  subtitle,
  description = '',
  items = [],
  enableSearch = false,
  searchPlaceholder = 'Search items...',
}: ExpandableTableProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!enableSearch || !searchQuery.trim()) return items

    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [items, searchQuery, enableSearch])

  const handleItemClick = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Text Content - Left Side */}
          <div className="mb-8 lg:mb-0 lg:sticky lg:top-20">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue mb-4">{title}</h2>
              {subtitle && (
                <h3 className="text-xl font-semibold text-ds-pastille-green mb-6">{subtitle}</h3>
              )}
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>

          {/* Expandable Table - Right Side */}
          <div className="space-y-4">
            {/* Search Bar */}
            {enableSearch && (
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={searchPlaceholder ?? ''}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-ds-pastille-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-ds-dark-blue focus:border-transparent bg-white"
                />
              </div>
            )}

            {/* Expandable Items */}
            <div className="space-y-2">
              {(filteredItems || []).map((item) => (
                <div
                  key={item.id}
                  className="border border-ds-pastille-green/30 rounded-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  {/* Item Header */}
                  <button
                    onClick={() => handleItemClick(item.id || '')}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-ds-light-neutral/50 transition-colors duration-200"
                  >
                    <div>
                      <h3 className="font-semibold text-ds-dark-blue text-lg">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.content}</p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-ds-pastille-green transition-transform duration-300 flex-shrink-0 ml-4 ${
                        activeItem === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Expandable Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.details && (
                      <div className="px-6 pb-4 border-t border-ds-pastille-green/20">
                        <div className="pt-4 text-gray-700 leading-relaxed">{item.details}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {enableSearch && filteredItems.length === 0 && searchQuery.trim() && (
              <div className="text-center py-8 text-gray-500">
                <p>No items found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
