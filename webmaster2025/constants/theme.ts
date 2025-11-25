// Theme configuration for consistent styling across the application

export const theme = {
  colors: {
    primary: {
      50: '#fef7ed',
      100: '#fdedd3',
      200: '#fbd8a5',
      300: '#f8bc6d',
      400: '#f49633',
      500: '#f17a0f',
      600: '#e25f05',
      700: '#bb4808',
      800: '#95380e',
      900: '#78300f',
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    warm: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px',
  },
  shadows: {
    soft: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
    warm: '0 4px 14px 0 rgba(241, 122, 15, 0.15)',
    medium: '0 4px 12px 0 rgba(0, 0, 0, 0.12)',
    large: '0 8px 24px 0 rgba(0, 0, 0, 0.16)',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const

export const categories = {
  'Family Services': { color: '#f17a0f', bg: '#fef7ed', icon: '👨‍👩‍👧' },
  'Health Support': { color: '#0ea5e9', bg: '#f0f9ff', icon: '🏥' },
  'Education': { color: '#10b981', bg: '#ecfdf5', icon: '📚' },
  'Emergency Aid': { color: '#ef4444', bg: '#fef2f2', icon: '🚨' },
  'Events': { color: '#8b5cf6', bg: '#f5f3ff', icon: '🎉' },
  'Non-Profits': { color: '#f59e0b', bg: '#fffbeb', icon: '🤝' },
} as const

export type CategoryType = keyof typeof categories
