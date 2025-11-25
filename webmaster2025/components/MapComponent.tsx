'use client'

import { DEFAULT_CENTER, DEFAULT_ZOOM, getUserLocation } from '@/lib/geolocation'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'

interface Marker {
  position: [number, number]
  title: string
}

interface MapComponentProps {
  center?: [number, number]
  zoom?: number
  markers: Marker[]
  useUserLocation?: boolean
}

export default function MapComponent({ 
  center, 
  zoom = DEFAULT_ZOOM, 
  markers,
  useUserLocation = false 
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
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

    const mapCenter = useUserLocation && userCenter ? userCenter : (center || DEFAULT_CENTER)

    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map(mapContainerRef.current).setView(mapCenter, zoom)

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current)
    } else {
      // Update map center if it changed
      mapRef.current.setView(mapCenter, zoom)
    }

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer)
      }
    })

    // Add markers
    markers.forEach((marker) => {
      L.marker(marker.position, {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      })
        .addTo(mapRef.current!)
        .bindPopup(marker.title)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, zoom, markers, useUserLocation, userCenter, loading])

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

