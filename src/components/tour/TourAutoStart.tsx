import { useEffect } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useTourStore, type TourId } from '../../stores/useTourStore'

/**
 * Auto-starts the role-specific tour on first visit.
 * Place inside PageLayout so it runs when a role is active.
 */
export default function TourAutoStart() {
  const role = useAuthStore((s) => s.role)
  const { activeTour, hasCompleted, startTour } = useTourStore()

  useEffect(() => {
    if (!role || activeTour) return

    const tourId: TourId = role === 'comprador' ? 'comprador' : 'proveedor'

    // Small delay so the page renders first
    const timer = setTimeout(() => {
      if (!hasCompleted(tourId)) {
        startTour(tourId)
      }
    }, 800)

    return () => clearTimeout(timer)
    // Only run once when role changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  return null
}
