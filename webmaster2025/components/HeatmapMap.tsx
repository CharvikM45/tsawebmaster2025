'use client'

import { DEFAULT_CENTER, DEFAULT_ZOOM, getUserLocation } from '@/lib/geolocation'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'

interface HeatmapData {
  category: string
  coordinates: { lat: number; lng: number }
  intensity: number
  neighborhood: string
}

interface HeatmapMapProps {
  data: HeatmapData[]
  selectedCategory: string
  onNeighborhoodClick: (neighborhood: string) => void
  useUserLocation?: boolean
}

export default function HeatmapMap({ 
  data, 
  selectedCategory, 
  onNeighborhoodClick,
  useUserLocation = false 
}: HeatmapMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.CircleMarker[]>([])
  const [userCenter, setUserCenter] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(useUserLocation)

  useEffect(() => {
    if (useUserLocation && !userCenter) {
      getUserLocation().then((location) => {
        setUserCenter([location.lat, location.lng])
        setLoading(false)
      })
    }
  }, [useUserLocation, userCenter])

  useEffect(() => {
    if (!mapContainerRef.current) return
    if (useUserLocation && loading) return

    const mapCenter = useUserLocation && userCenter ? userCenter : DEFAULT_CENTER

    // Initialize map if not already done
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(mapCenter, DEFAULT_ZOOM)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current)
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Add heatmap circles
    data.forEach((point) => {
      const intensity = point.intensity
      const radius = 20 + intensity * 30
      const opacity = 0.3 + intensity * 0.4

      // Color based on intensity
      let color = '#fbbf24' // yellow
      if (intensity > 0.7) color = '#ef4444' // red
      else if (intensity > 0.4) color = '#f97316' // orange

      const circle = L.circleMarker([point.coordinates.lat, point.coordinates.lng], {
        radius,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 1,
        fillOpacity: opacity,
      })
        .addTo(mapRef.current!)
        .bindPopup(
          `<div class="p-2">
            <strong>${point.neighborhood}</strong><br/>
            ${point.category}<br/>
            Intensity: ${Math.round(intensity * 100)}%
          </div>`
        )

      circle.on('click', () => {
        onNeighborhoodClick(point.neighborhood)
      })

      markersRef.current.push(circle)
    })

    return () => {
      markersRef.current.forEach((marker) => {
        mapRef.current?.removeLayer(marker)
      })
      markersRef.current = []
    }
  }, [data, selectedCategory, onNeighborhoodClick, useUserLocation, userCenter, loading])

  if (useUserLocation && loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-neutral-600">Loading your location...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainerRef} className="w-full h-full" />
}

