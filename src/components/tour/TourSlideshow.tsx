import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTourStore } from '../../stores/useTourStore'
import { ALL_TOURS } from '../../data/tourSteps'

export default function TourSlideshow() {
  const { activeTour, currentStep, nextStep, prevStep, endTour } = useTourStore()

  if (!activeTour) return null

  const tour = ALL_TOURS.find((t) => t.id === activeTour)
  if (!tour) return null

  const slide = tour.slides[currentStep]
  if (!slide) return null

  const totalSteps = tour.slides.length
  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={endTour} />

      {/* Card */}
      <div className="relative w-full max-w-lg bg-bg-card rounded-lg shadow-2xl animate-scale-in overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-border">
          <div
            className="h-full bg-coppel-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={endTour}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Icon area */}
        <div className={`${slide.iconBg} px-8 pt-10 pb-8 flex flex-col items-center`}>
          <span className="text-5xl mb-3">{slide.icon}</span>
          <p className="text-white/70 text-xs font-medium tracking-wider uppercase">
            {tour.name} — Paso {currentStep + 1} de {totalSteps}
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <h3 className="font-sans text-xl font-bold text-text-primary mb-3">
            {slide.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {slide.description}
          </p>
          {slide.tip && (
            <div className="mt-4 px-4 py-3 bg-coppel-blue-light rounded-md">
              <p className="text-xs text-coppel-blue font-medium">
                <span className="font-bold">Tip:</span> {slide.tip}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-8 pb-6">
          <button
            onClick={endTour}
            className="text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            Saltar tour
          </button>

          <div className="flex items-center gap-3">
            {!isFirst && (
              <button
                onClick={prevStep}
                className="flex items-center gap-1 h-10 px-4 rounded-pill border-2 border-border text-sm font-semibold text-text-primary hover:border-coppel-blue hover:text-coppel-blue transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
            )}
            <button
              onClick={isLast ? endTour : nextStep}
              className="flex items-center gap-1 h-10 px-5 rounded-pill bg-coppel-blue text-white text-sm font-semibold hover:bg-coppel-blue-hover transition-colors"
            >
              {isLast ? 'Finalizar' : 'Siguiente'}
              {!isLast && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 pb-5">
          {tour.slides.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep
                  ? 'bg-coppel-blue'
                  : i < currentStep
                  ? 'bg-success'
                  : 'bg-border-dark'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
