'use client'

import ResourceCard from '@/components/ResourceCard'
import { categories } from '@/constants/theme'
import { Resource } from '@/lib/mockData'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'

const steps = [
  { id: 1, title: 'Basic Information', description: 'Tell us about the resource' },
  { id: 2, title: 'Contact & Hours', description: 'How can people reach you?' },
  { id: 3, title: 'Details & Tags', description: 'Add more information' },
  { id: 4, title: 'Review & Submit', description: 'Preview and confirm' },
]

export default function SubmitPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<Resource>>({
    name: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    address: '',
    hours: {},
    tags: [],
    accessibility: {
      wheelchair: false,
      languages: [],
      transitFriendly: false,
    },
    coordinates: { lat: 37.7749, lng: -122.4194 },
  })
  const [submitted, setSubmitted] = useState(false)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // In a real app, this would send data to an API
    console.log('Submitting:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl p-12 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display font-bold text-4xl text-neutral-800 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Your resource submission has been received. Our team will review it and add it to the directory
            within 24-48 hours. You&apos;ll receive a confirmation email once it&apos;s live.
          </p>
          <a
            href="/directory"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
          >
            <span>Browse Directory</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-neutral-800 mb-4">
            Submit a Resource
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Help grow our community resource directory! Your contributions make it easier for neighbors to
            find the support they need. All submissions are reviewed to ensure quality and accuracy.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-6 h-6" /> : step.id}
                  </div>
                  <div className="mt-2 text-center hidden md:block">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-neutral-800' : 'text-neutral-500'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step.id ? 'bg-primary-500' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Resource Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="e.g., Community Food Bank"
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateFormData('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                    required
                  >
                    <option value="">Select a category</option>
                    {Object.keys(categories).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    placeholder="Describe what this resource offers and who it helps..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all resize-none"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact & Hours */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="contact@example.org"
                      className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="123 Main Street, City, State 12345"
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-4">
                    Operating Hours
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                      (day) => (
                        <div key={day}>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">{day}</label>
                          <input
                            type="text"
                            value={formData.hours?.[day] || ''}
                            onChange={(e) =>
                              updateFormData('hours', {
                                ...formData.hours,
                                [day]: e.target.value,
                              })
                            }
                            placeholder="9:00 AM - 5:00 PM"
                            className="w-full px-3 py-2 rounded-lg border-2 border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details & Tags */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="food, emergency, family (comma-separated)"
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                    onBlur={(e) => {
                      const tags = e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter((t) => t.length > 0)
                      updateFormData('tags', tags)
                    }}
                  />
                  <p className="text-sm text-neutral-500 mt-2">
                    Add tags to help people find this resource (e.g., food, housing, youth)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-4">
                    Accessibility & Features
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.accessibility?.wheelchair || false}
                        onChange={(e) =>
                          updateFormData('accessibility', {
                            ...formData.accessibility,
                            wheelchair: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-neutral-700">Wheelchair Accessible</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.accessibility?.transitFriendly || false}
                        onChange={(e) =>
                          updateFormData('accessibility', {
                            ...formData.accessibility,
                            transitFriendly: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-neutral-700">Transit Friendly</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Process Guide (Optional)
                  </label>
                  <textarea
                    placeholder="Step-by-step instructions for users (one per line)..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all resize-none"
                    onBlur={(e) => {
                      const steps = e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter((s) => s.length > 0)
                      updateFormData('processGuide', steps)
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-bold text-2xl text-neutral-800 mb-4">
                    Preview Your Resource
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Review the information below. This is how your resource will appear in the directory.
                  </p>
                  <div className="bg-neutral-50 rounded-2xl p-6">
                    <ResourceCard resource={formData as Resource} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-neutral-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-all"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all"
              >
                <Check className="w-5 h-5" />
                <span>Submit Resource</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

