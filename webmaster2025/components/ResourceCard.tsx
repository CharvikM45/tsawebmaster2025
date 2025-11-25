'use client'

import { categories } from '@/constants/theme'
import { Resource } from '@/lib/mockData'
import { motion } from 'framer-motion'
import { Clock, MapPin, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ResourceCardProps {
  resource: Resource
  index?: number
}

export default function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  const categoryInfo = categories[resource.category as keyof typeof categories] || {
    color: '#6b7280',
    bg: '#f3f4f6',
    icon: '📍',
  }

  const isOpen = () => {
    const now = new Date()
    const day = now.toLocaleDateString('en-US', { weekday: 'long' })
    const hours = resource.hours[day]
    if (!hours || hours === 'Closed') return false
    // Simple check - in a real app, parse hours properly
    return hours !== 'Closed'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-hover"
    >
      <Link href={`/resource/${resource.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 h-full flex flex-col">
          {/* Image */}
          {resource.image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={resource.image}
                alt={resource.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white shadow-lg"
                  style={{ backgroundColor: categoryInfo.color }}
                >
                  {categoryInfo.icon} {resource.category}
                </span>
              </div>
              {isOpen() && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium shadow-lg">
                    Open Now
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-display font-bold text-xl text-neutral-800 mb-2 line-clamp-2">
              {resource.name}
            </h3>
            <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1">
              {resource.description}
            </p>

            {/* Details */}
            <div className="space-y-2 mb-4">
              {resource.address && (
                <div className="flex items-start space-x-2 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{resource.address}</span>
                </div>
              )}
              {resource.hours && (
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {Object.entries(resource.hours).find(([_, hours]) => hours !== 'Closed')?.[1] || 'Hours vary'}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {resource.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-md text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

