'use client'

import { categories } from '@/constants/theme'
import { getResourceOfTheDay, mockResources } from '@/lib/mockData'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ResourceOfTheDayPage() {
  const resource = getResourceOfTheDay()
  const categoryInfo = categories[resource.category as keyof typeof categories] || {
    color: '#6b7280',
    bg: '#f3f4f6',
    icon: '📍',
  }

  const yesterdayResource = mockResources[(new Date().getDate() - 1) % mockResources.length]
  const previousPicks = mockResources
    .filter((r) => r.id !== resource.id && r.id !== yesterdayResource.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
              <Star className="w-5 h-5 fill-yellow-500" />
              <span className="font-semibold">Resource of the Day</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-neutral-800 mb-4">
              Today&apos;s Featured Resource
            </h1>
            <p className="text-xl text-neutral-600">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>

          {/* Featured Resource Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Banner Image */}
            {resource.image && (
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={resource.image}
                  alt={resource.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg"
                    style={{ backgroundColor: categoryInfo.color }}
                  >
                    {categoryInfo.icon} {resource.category}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-800 mb-4">
                      {resource.name}
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">{resource.description}</p>
                  </div>

                  {/* Why It Matters */}
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border-2 border-primary-100">
                    <h3 className="font-display font-bold text-xl text-neutral-800 mb-3">
                      Why This Resource Matters
                    </h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {resource.category === 'Emergency Aid' &&
                        'This resource provides critical support for community members facing immediate challenges, offering a lifeline when it\'s needed most.'}
                      {resource.category === 'Health Support' &&
                        'Accessible healthcare and wellness services are essential for community wellbeing, and this resource makes quality care available to all.'}
                      {resource.category === 'Education' &&
                        'Education opens doors to opportunity. This resource empowers youth and families to build brighter futures through learning and mentorship.'}
                      {resource.category === 'Family Services' &&
                        'Strong families build strong communities. This resource provides the support families need to thrive.'}
                      {resource.category === 'Events' &&
                        'Community events bring neighbors together, fostering connection and shared experiences that strengthen our bonds.'}
                      {resource.category === 'Non-Profits' &&
                        'Non-profit organizations are the heart of community service, dedicating resources to making a positive impact.'}
                    </p>
                  </div>

                  {/* Who It Helps */}
                  <div>
                    <h3 className="font-display font-bold text-xl text-neutral-800 mb-3">Who It Helps</h3>
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
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Card */}
                  <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-200">
                    <h3 className="font-display font-bold text-xl text-neutral-800 mb-4">Get in Touch</h3>
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
                          <span className="break-all text-sm">{resource.email}</span>
                        </a>
                      )}
                      {resource.address && (
                        <div className="flex items-start space-x-3 text-neutral-700">
                          <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                          <span className="text-sm">{resource.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hours Card */}
                  <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-200">
                    <h3 className="font-display font-bold text-xl text-neutral-800 mb-4 flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Hours</span>
                    </h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(resource.hours).slice(0, 3).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="font-medium text-neutral-700">{day}</span>
                          <span className="text-neutral-600">{hours}</span>
                        </div>
                      ))}
                      <Link
                        href={`/resource/${resource.id}`}
                        className="block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        View Full Hours →
                      </Link>
                    </div>
                  </div>

                  {/* View Full Profile */}
                  <Link
                    href={`/resource/${resource.id}`}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium text-center hover:from-primary-600 hover:to-primary-700 transition-all shadow-warm"
                  >
                    View Full Profile
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Previous Picks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-neutral-800 mb-8">Previous Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousPicks.map((prevResource, index) => (
              <motion.div
                key={prevResource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/resource/${prevResource.id}`}>
                  <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-200 hover:border-primary-300 transition-all card-hover">
                    <h3 className="font-display font-bold text-lg text-neutral-800 mb-2">
                      {prevResource.name}
                    </h3>
                    <p className="text-neutral-600 text-sm line-clamp-2 mb-4">{prevResource.description}</p>
                    <span className="text-primary-600 text-sm font-medium">View Resource →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
