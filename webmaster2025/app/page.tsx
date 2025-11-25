'use client'

import ResourceCard from '@/components/ResourceCard'
import SearchBar from '@/components/SearchBar'
import { mockResources } from '@/lib/mockData'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

export default function HomePage() {
  const featuredResources = mockResources.filter(r => r.featured).slice(0, 5)
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const announcements = [
    {
      id: '1',
      type: 'urgent',
      title: 'Winter Food Drive',
      message: 'Donations needed! Help us stock the shelves for families in need this season.',
      link: '/directory?category=Emergency+Aid',
    },
    {
      id: '2',
      type: 'info',
      title: 'New Shelter Hours',
      message: 'Emergency shelter now open 24/7. Walk-ins welcome.',
      link: '/resource/4',
    },
    {
      id: '3',
      type: 'success',
      title: 'Scholarship Deadline',
      message: 'Youth Education Hub scholarship applications due January 31st.',
      link: '/resource/3',
    },
  ]

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-neutral-800 mb-6 leading-tight">
              Welcome to Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                Community Resource Hub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-10 leading-relaxed">
              Your trusted guide to local services, empowering our community through accessible resources,
              meaningful connections, and compassionate support.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar size="lg" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600"
            >
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Trusted Information</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Always Accessible</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span>Community Powered</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-warm-50 border-b border-warm-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-5 h-5 text-warm-600" />
            <h2 className="font-display font-semibold text-lg text-neutral-800">Announcements & Updates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {announcements.map((announcement) => (
              <Link
                key={announcement.id}
                href={announcement.link}
                className="bg-white rounded-xl p-4 border border-warm-200 hover:border-warm-300 transition-all card-hover"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      announcement.type === 'urgent'
                        ? 'bg-red-500'
                        : announcement.type === 'info'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-800 mb-1">{announcement.title}</h3>
                    <p className="text-sm text-neutral-600">{announcement.message}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-800 mb-2">
                Featured Resources
              </h2>
              <p className="text-neutral-600">Discover trusted services making a difference in our community</p>
            </div>
            <Link
              href="/directory"
              className="hidden md:flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredResources.map((resource, index) => (
                <div key={resource.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                  <ResourceCard resource={resource} index={index} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 hidden md:block"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-700" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10 hidden md:block"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-neutral-700" />
            </button>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/directory"
              className="inline-flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              <span>View All Resources</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-neutral-800 mb-8 text-center">
            How Can We Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Browse Directory',
                description: 'Explore all available resources',
                href: '/directory',
                icon: '🔍',
                color: 'from-primary-500 to-primary-600',
              },
              {
                title: 'AI Concierge',
                description: 'Get personalized recommendations',
                href: '/concierge',
                icon: '💬',
                color: 'from-secondary-500 to-secondary-600',
              },
              {
                title: 'View Heatmap',
                description: 'See community needs data',
                href: '/heatmap',
                icon: '🗺️',
                color: 'from-warm-500 to-warm-600',
              },
              {
                title: 'Read Stories',
                description: 'Inspiring community journeys',
                href: '/stories',
                icon: '📖',
                color: 'from-green-500 to-green-600',
              },
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={action.href}>
                  <div className="bg-white rounded-2xl p-6 shadow-soft card-hover h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-3xl mb-4`}>
                      {action.icon}
                    </div>
                    <h3 className="font-display font-bold text-xl text-neutral-800 mb-2">{action.title}</h3>
                    <p className="text-neutral-600 text-sm">{action.description}</p>
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

