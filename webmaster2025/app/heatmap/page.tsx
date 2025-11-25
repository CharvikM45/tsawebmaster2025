'use client'

import { mockHeatmapData } from '@/lib/mockData'
import { motion } from 'framer-motion'
import { Info, TrendingDown, TrendingUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const HeatmapMap = dynamic(() => import('@/components/HeatmapMap'), { ssr: false })

const categories = [
  { id: 'food', label: 'Food Insecurity', color: '#f17a0f' },
  { id: 'mental', label: 'Mental Health', color: '#0ea5e9' },
  { id: 'housing', label: 'Housing', color: '#ef4444' },
  { id: 'youth', label: 'Youth Programs', color: '#10b981' },
]

export default function HeatmapPage() {
  const [selectedCategory, setSelectedCategory] = useState('food')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null)

  const filteredData = mockHeatmapData.filter((d) => d.category === categories.find((c) => c.id === selectedCategory)?.label)

  const insights = {
    trends: [
      { label: 'Food requests up 12%', trend: 'up', value: '12%' },
      { label: 'Housing needs stable', trend: 'stable', value: '0%' },
      { label: 'Mental health support requests', trend: 'up', value: '8%' },
    ],
    gaps: [
      'Northside area needs more food distribution points',
      'Youth programs in high demand across all neighborhoods',
      'Mental health services expanding to meet needs',
    ],
    changes: [
      { neighborhood: 'Downtown', change: '+15%', type: 'increase' },
      { neighborhood: 'Eastside', change: '-5%', type: 'decrease' },
      { neighborhood: 'Westside', change: '+8%', type: 'increase' },
    ],
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-neutral-800 mb-4">
            Community Needs Heatmap
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Visualize community needs across neighborhoods. Data-powered insights help us understand where
            support is needed most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="font-display font-bold text-xl text-neutral-800 mb-4">Select Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      selectedCategory === category.id
                        ? 'text-white shadow-lg'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    style={
                      selectedCategory === category.id
                        ? { backgroundColor: category.color }
                        : {}
                    }
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden" style={{ height: '600px' }}>
              <HeatmapMap
                data={filteredData}
                selectedCategory={selectedCategory}
                onNeighborhoodClick={setSelectedNeighborhood}
                useUserLocation={true}
              />
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-display font-bold text-lg text-neutral-800 mb-4">Intensity Legend</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-4 bg-gradient-to-r from-yellow-200 via-orange-400 to-red-600 rounded-full" />
                <div className="flex space-x-4 text-sm text-neutral-600">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            {/* Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-display font-bold text-xl text-neutral-800 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                <span>Trends</span>
              </h3>
              <div className="space-y-4">
                {insights.trends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-neutral-700 text-sm">{trend.label}</span>
                    <div className="flex items-center space-x-2">
                      {trend.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {trend.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                      <span
                        className={`font-semibold ${
                          trend.trend === 'up' ? 'text-green-600' : 'text-neutral-600'
                        }`}
                      >
                        {trend.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Gaps */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-display font-bold text-xl text-neutral-800 mb-4 flex items-center space-x-2">
                <Info className="w-5 h-5 text-secondary-500" />
                <span>Service Gaps</span>
              </h3>
              <ul className="space-y-3">
                {insights.gaps.map((gap, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-neutral-700">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weekly Changes */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="font-display font-bold text-xl text-neutral-800 mb-4">Weekly Changes</h3>
              <div className="space-y-3">
                {insights.changes.map((change, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                    <span className="text-neutral-700 font-medium">{change.neighborhood}</span>
                    <span
                      className={`font-semibold ${
                        change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {change.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Neighborhood Info */}
            {selectedNeighborhood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border-2 border-primary-200"
              >
                <h3 className="font-display font-bold text-lg text-neutral-800 mb-2">
                  {selectedNeighborhood}
                </h3>
                <p className="text-sm text-neutral-600">
                  Click on the map to see detailed statistics for this neighborhood.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

