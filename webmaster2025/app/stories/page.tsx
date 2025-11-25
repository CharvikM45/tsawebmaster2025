'use client'

import { mockStories } from '@/lib/mockData'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, User, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<typeof mockStories[0] | null>(null)

  const weeklyThemes = [
    {
      title: 'Resilience & Hope',
      description: 'Stories of community members overcoming challenges',
      count: 3,
    },
    {
      title: 'Giving Back',
      description: 'How resources create opportunities to help others',
      count: 2,
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-neutral-800 mb-4">
            Community Stories
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Real stories from real people. Discover how our community resources are making a difference in
            people&apos;s lives.
          </p>
        </div>
      </section>

      {/* Weekly Themes */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-neutral-800 mb-6">Weekly Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {weeklyThemes.map((theme, index) => (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-soft border-2 border-primary-100"
              >
                <h3 className="font-display font-bold text-xl text-neutral-800 mb-2">{theme.title}</h3>
                <p className="text-neutral-600 mb-4">{theme.description}</p>
                <span className="text-sm text-primary-600 font-medium">{theme.count} stories</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-neutral-800 mb-6">All Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedStory(story)}
                className="bg-white rounded-2xl overflow-hidden shadow-soft card-hover cursor-pointer"
              >
                {story.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-neutral-800 mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">{story.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{story.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(story.date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedStory(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto p-8 md:p-12">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>

                {selectedStory.image && (
                  <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={selectedStory.image}
                      alt={selectedStory.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <h1 className="font-display font-bold text-3xl md:text-4xl text-neutral-800 mb-4">
                    {selectedStory.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-neutral-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{selectedStory.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>{format(new Date(selectedStory.date), 'MMMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-neutral-700 leading-relaxed text-lg whitespace-pre-line">
                    {selectedStory.content}
                  </p>
                </div>

                {selectedStory.tags && selectedStory.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-neutral-200">
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

