import { useState } from 'react'
import { HelpCircle, X, ShoppingCart, Truck, ArrowLeftRight } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { useTourStore, type TourId } from '../../stores/useTourStore'
import { COMPRADOR_HOME_STEPS, PROVEEDOR_HOME_STEPS } from '../../data/spotlightSteps'
import { ALL_TOURS } from '../../data/tourSteps'
import SpotlightTour from './SpotlightTour'

const tourIcons: Record<TourId, typeof ShoppingCart> = {
  comprador: ShoppingCart,
  proveedor: Truck,
  crossRole: ArrowLeftRight,
}

const tourColors: Record<TourId, string> = {
  comprador: 'bg-coppel-blue',
  proveedor: 'bg-status-pending-supplier',
  crossRole: 'bg-coppel-navy',
}

export default function TourLauncher() {
  const [open, setOpen] = useState(false)
  const [spotlightTour, setSpotlightTour] = useState<TourId | null>(null)
  const { startTour, activeTour, hasCompleted } = useTourStore()
  const role = useAuthStore((s) => s.role)

  if (activeTour || spotlightTour) {
    // Show spotlight tour if active (role-specific ones only)
    if (spotlightTour && spotlightTour !== 'crossRole') {
      const steps = spotlightTour === 'comprador' ? COMPRADOR_HOME_STEPS : PROVEEDOR_HOME_STEPS
      return (
        <SpotlightTour
          steps={steps}
          open
          onClose={() => setSpotlightTour(null)}
          tourName={spotlightTour === 'comprador' ? 'Tour Comprador' : 'Tour Proveedor'}
        />
      )
    }
    // CrossRoleTour handles its own rendering via PageLayout
    return null
  }

  const handleStart = (id: TourId) => {
    setOpen(false)
    if (id === 'crossRole') {
      // Cross-role uses slideshow
      startTour(id)
    } else {
      // Role tours use spotlight
      setSpotlightTour(id)
    }
  }

  // Build available tours based on current role
  const availableTours = ALL_TOURS.filter((t) => {
    if (t.id === 'crossRole') return true
    if (t.id === role) return true
    return false
  })

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu */}
      {open && (
        <div className="absolute bottom-16 right-0 w-72 bg-bg-card rounded-lg border border-border shadow-xl animate-slide-up overflow-hidden">
          <div className="px-4 py-3 bg-coppel-navy">
            <h4 className="font-sans text-sm font-semibold text-white">
              Tours disponibles
            </h4>
            <p className="text-[11px] text-white/60 mt-0.5">
              Aprende a usar el portal paso a paso
            </p>
          </div>

          <div className="p-2">
            {availableTours.map((tour) => {
              const Icon = tourIcons[tour.id]
              const completed = hasCompleted(tour.id)
              return (
                <button
                  key={tour.id}
                  onClick={() => handleStart(tour.id)}
                  className="w-full flex items-start gap-3 px-3 py-3 rounded-md hover:bg-bg-light transition-colors text-left"
                >
                  <div className={`w-9 h-9 rounded-lg ${tourColors[tour.id]} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-primary">
                        {tour.name}
                      </span>
                      {completed && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success/10 text-success font-medium">
                          Visto
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-muted mt-0.5 truncate">
                      {tour.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          w-14 h-14 rounded-full shadow-lg flex items-center justify-center
          transition-all hover:scale-105 active:scale-95
          ${open
            ? 'bg-text-primary rotate-0'
            : 'bg-coppel-blue hover:bg-coppel-blue-hover'
          }
        `}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <HelpCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  )
}
