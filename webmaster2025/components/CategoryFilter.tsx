'use client'

import { categories, CategoryType } from '@/constants/theme'
import { motion } from 'framer-motion'

interface CategoryFilterProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categoryKeys = Object.keys(categories) as CategoryType[]

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
          selectedCategory === null
            ? 'bg-primary-500 text-white shadow-warm'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }`}
      >
        All Resources
      </button>
      {categoryKeys.map((category) => {
        const categoryInfo = categories[category]
        return (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center space-x-2 ${
              selectedCategory === category
                ? 'text-white shadow-lg'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300'
            }`}
            style={
              selectedCategory === category
                ? { backgroundColor: categoryInfo.color }
                : {}
            }
          >
            <span>{categoryInfo.icon}</span>
            <span>{category}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

