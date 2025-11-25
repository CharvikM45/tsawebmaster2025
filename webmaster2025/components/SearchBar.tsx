'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SearchBarProps {
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  onSearch?: (query: string) => void
}

export default function SearchBar({ 
  placeholder = 'Search for resources...', 
  size = 'md',
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    } else {
      router.push(`/directory?q=${encodeURIComponent(query)}`)
    }
    setQuery('')
  }

  const sizeClasses = {
    sm: 'h-10 text-sm px-4',
    md: 'h-12 text-base px-5',
    lg: 'h-16 text-lg px-6',
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-neutral-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full pl-12 pr-4 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all bg-white text-neutral-800 placeholder-neutral-400"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 pr-2 flex items-center"
        >
          <div className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-warm">
            Search
          </div>
        </button>
      </div>
    </form>
  )
}

