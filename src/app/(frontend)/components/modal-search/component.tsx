"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ModalSearchProps = { isOpen: boolean; onClose: () => void; onSearch?: (query: string) => void; className?: string }

export function ModalSearch({ isOpen, onClose, onSearch, className }: ModalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && onSearch) onSearch(searchQuery.trim())
  }

  if (!isOpen) return null

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center', className)}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2" aria-label="Close search modal">
          <X className="h-6 w-6" />
        </button>
        <div className="mb-8">
          <h2 className="text-2xl font-light text-ds-dark-blue text-center">How can we help you find something?</h2>
        </div>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative">
            <Input type="text" placeholder="Search for anything..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 text-lg bg-white border-2 border-gray-200 focus:border-ds-pastille-green focus:ring-ds-pastille-green" autoFocus />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold px-8">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


