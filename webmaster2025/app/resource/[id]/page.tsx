'use client'

import { categories } from '@/constants/theme'
import { mockResources } from '@/lib/mockData'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    Bus,
    CheckCircle,
    Clock,
    Languages,
    Mail,
    MapPin,
    Navigation,
    Phone,
    XCircle
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, use } from 'react'

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false })

function ResourceDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const resource = mockResources.find((r) => r.id === id)

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-3xl text-neutral-800 mb-4">Resource Not Found</h1>
          <Link
            href="/directory"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Return to Directory
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = categories[resource.category as keyof typeof categories] || {
    color: '#6b7280',
    bg: '#f3f4f6',
    icon: '📍',
  }

  const isOpen = () => {
    const now = new Date()
    const day = now.toLocaleDateString('en-US', { weekday: 'long' })
    const hours = resource.hours[day]
    return hours && hours !== 'Closed'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/directory"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* Banner */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden mt-4">
        {resource.image ? (
          <Image
            src={resource.image}
            alt={resource.name}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ backgroundColor: categoryInfo.bg }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-4 shadow-lg"
              style={{ backgroundColor: categoryInfo.color }}
            >
              {categoryInfo.icon} {resource.category}
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-2">
              {resource.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="font-display font-bold text-2xl text-neutral-800 mb-4">About</h2>
              <p className="text-neutral-600 leading-relaxed text-lg">{resource.description}</p>
            </section>

            {/* Process Guide */}
            {resource.processGuide && resource.processGuide.length > 0 && (
              <section>
                <h2 className="font-display font-bold text-2xl text-neutral-800 mb-4">
                  What to Expect
                </h2>
                <div className="bg-neutral-50 rounded-2xl p-6 space-y-4">
                  {resource.processGuide.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: categoryInfo.color }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-neutral-700 pt-1">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <section>
                <h2 className="font-display font-bold text-2xl text-neutral-800 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-xl text-neutral-800">Status</h3>
                {isOpen() ? (
                  <span className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Open Now</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Closed</span>
                  </span>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-neutral-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {resource.phone && (
                  <a
                    href={`tel:${resource.phone}`}
                    className="flex items-center space-x-3 text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{resource.phone}</span>
                  </a>
                )}
                {resource.email && (
                  <a
                    href={`mailto:${resource.email}`}
                    className="flex items-center space-x-3 text-neutral-700 hover:text-primary-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="break-all">{resource.email}</span>
                  </a>
                )}
                {resource.address && (
                  <div className="flex items-start space-x-3 text-neutral-700">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>{resource.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-neutral-800 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Operating Hours</span>
              </h3>
              <div className="space-y-2">
                {Object.entries(resource.hours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0"
                  >
                    <span className="font-medium text-neutral-700">{day}</span>
                    <span className="text-neutral-600">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility Card */}
            <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-neutral-800 mb-4">
                Accessibility & Preparation
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {resource.accessibility.wheelchair ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-neutral-700">Wheelchair Accessible</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Languages className="w-5 h-5 mt-1 text-neutral-600" />
                  <div>
                    <span className="text-neutral-700 font-medium block mb-1">Languages:</span>
                    <span className="text-neutral-600 text-sm">
                      {resource.accessibility.languages.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {resource.accessibility.transitFriendly ? (
                    <Bus className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-neutral-700">Transit Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-12">
          <h2 className="font-display font-bold text-2xl text-neutral-800 mb-4 flex items-center space-x-2">
            <Navigation className="w-6 h-6" />
            <span>Location</span>
          </h2>
          <div className="bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden" style={{ height: '400px' }}>
            <MapComponent
              center={[resource.coordinates.lat, resource.coordinates.lng]}
              zoom={13}
              markers={[
                {
                  position: [resource.coordinates.lat, resource.coordinates.lng],
                  title: resource.name,
                },
              ]}
              useUserLocation={false}
            />
          </div>
          {resource.address && (
            <p className="mt-4 text-neutral-600 flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{resource.address}</span>
            </p>
          )}
        </section>
      </div>
    </div>
  )
}

export default function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading resource...</p>
        </div>
      </div>
    }>
      <ResourceDetailContent params={params} />
    </Suspense>
  )
}

