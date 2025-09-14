'use client'

import { useState, useMemo } from 'react'

import { ChevronDown, Search } from 'lucide-react'
import type { Page } from '@/payload-types'
import { RichText, isLexicalEditorState } from '../ui/rich-text'

type ExpandableTableProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'expandableTable' }
>

export function ExpandableTable({
  title = '',
  subtitle,
  description,
  items = [],
  enableSearch = false,
  searchPlaceholder = 'Search items...',
}: ExpandableTableProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!enableSearch || !searchQuery.trim()) return items

    return items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
      const contentMatch = item.content?.toLowerCase().includes(searchQuery.toLowerCase())

      // For rich text details, we need to extract plain text for searching
      let detailsMatch = false
      if (item.details && isLexicalEditorState(item.details)) {
        // Extract text content from lexical state for searching
        const detailsText = JSON.stringify(item.details).toLowerCase()
        detailsMatch = detailsText.includes(searchQuery.toLowerCase())
      }

      return titleMatch || contentMatch || detailsMatch
    })
  }, [items, searchQuery, enableSearch])

  const handleItemClick = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId)
  }

  const hasDetails = (item: any) => {
    return item.details && isLexicalEditorState(item.details)
  }

  return (
    <section className="py-6 px-4 sm:px-4 lg:px-4">
      <div className="max-w-container mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Text Content - Left Side */}
          <div className="mb-8 lg:mb-0 lg:sticky lg:top-20">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-light text-ds-dark-blue mb-4">{title}</h2>
              {subtitle && (
                <h3 className="text-xl font-semibold text-ds-pastille-green mb-6">{subtitle}</h3>
              )}
              {description && (
                <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
              )}
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
                  <div
                    className={`w-full px-6 py-4 text-left flex items-center justify-between ${
                      hasDetails(item)
                        ? 'cursor-pointer hover:bg-ds-light-neutral/50 transition-colors duration-200'
                        : ''
                    }`}
                    onClick={hasDetails(item) ? () => handleItemClick(item.id || '') : undefined}
                    role={hasDetails(item) ? 'button' : undefined}
                    tabIndex={hasDetails(item) ? 0 : undefined}
                    onKeyDown={
                      hasDetails(item)
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleItemClick(item.id || '')
                            }
                          }
                        : undefined
                    }
                  >
                    <div>
                      <h3 className="font-semibold text-ds-dark-blue text-lg">{item.title}</h3>
                      {item.content && <p className="text-gray-600 mt-1">{item.content}</p>}
                    </div>
                    {hasDetails(item) && (
                      <ChevronDown
                        className={`h-5 w-5 text-ds-pastille-green transition-transform duration-300 flex-shrink-0 ml-4 ${
                          activeItem === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>

                  {/* Expandable Content */}
                  {hasDetails(item) && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-4 border-t border-ds-pastille-green/20">
                        <div className="pt-4">
                          <RichText
                            data={item.details as unknown}
                            className="text-gray-700 leading-relaxed max-w-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
