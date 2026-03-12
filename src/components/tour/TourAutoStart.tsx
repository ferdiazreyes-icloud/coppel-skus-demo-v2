import { useState, useEffect } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useTourStore, type TourId } from '../../stores/useTourStore'
import { COMPRADOR_HOME_STEPS, PROVEEDOR_HOME_STEPS } from '../../data/spotlightSteps'
import WelcomeModal from './WelcomeModal'
import SpotlightTour from './SpotlightTour'

/**
 * Auto-starts the role-specific spotlight tour on first visit.
 * Shows a Welcome modal first, then launches the spotlight tour.
 */
export default function TourAutoStart() {
  const role = useAuthStore((s) => s.role)
  const user = useAuthStore((s) => s.user)
  const { hasCompleted, activeTour } = useTourStore()
  const [showWelcome, setShowWelcome] = useState(false)
  const [showSpotlight, setShowSpotlight] = useState(false)

  const tourId: TourId = role === 'comprador' ? 'comprador' : 'proveedor'
  const steps = role === 'comprador' ? COMPRADOR_HOME_STEPS : PROVEEDOR_HOME_STEPS
  const roleName = role === 'comprador' ? 'Comprador' : 'Proveedor'

  useEffect(() => {
    if (!role || activeTour) return

    // Check if user has already completed this role's tour
    if (!hasCompleted(tourId)) {
      const timer = setTimeout(() => setShowWelcome(true), 600)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  const handleStartTour = () => {
    setShowWelcome(false)
    // Small delay so Welcome modal closes first
    setTimeout(() => setShowSpotlight(true), 200)
  }

  const handleSkipWelcome = () => {
    setShowWelcome(false)
    // Mark as completed so it doesn't show again
    const { endTour, startTour } = useTourStore.getState()
    startTour(tourId)
    endTour()
  }

  const handleCloseSpotlight = () => {
    setShowSpotlight(false)
    // Mark tour as completed
    const { endTour, startTour } = useTourStore.getState()
    startTour(tourId)
    endTour()
  }

  return (
    <>
      <WelcomeModal
        open={showWelcome}
        roleName={roleName}
        userName={user?.name || ''}
        onStartTour={handleStartTour}
        onSkip={handleSkipWelcome}
      />
      <SpotlightTour
        steps={steps}
        open={showSpotlight}
        onClose={handleCloseSpotlight}
        tourName={`Tour ${roleName}`}
      />
    </>
  )
}
