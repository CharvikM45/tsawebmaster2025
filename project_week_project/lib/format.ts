export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${(distanceKm * 1000).toFixed(0)} m`;
  }

  if (distanceKm > 1000) {
    return `${(distanceKm / 1000).toFixed(1)} Mm`;
  }

  return `${distanceKm.toFixed(0)} km`;
}

