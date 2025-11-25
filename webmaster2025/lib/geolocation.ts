// Geolocation utilities with Alpharetta, GA as default

export const DEFAULT_CENTER: [number, number] = [34.0754, -84.2941] // Alpharetta, GA
export const DEFAULT_ZOOM = 12

export interface Location {
  lat: number
  lng: number
}

/**
 * Get user's current location, falling back to Alpharetta, GA
 */
export async function getUserLocation(): Promise<Location> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      resolve({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => {
        // On error, use Alpharetta, GA as default
        resolve({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] })
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000, // 5 minutes
      }
    )
  })
}

