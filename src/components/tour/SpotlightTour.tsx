import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronRight, ChevronLeft, X } from 'lucide-react'

export interface SpotlightStep {
  /** data-tour attribute value of the target element */
  target: string
  title: string
  description: string
  /** Preferred tooltip position relative to the target */
  position?: 'top' | 'bottom' | 'left' | 'right'
}

interface SpotlightTourProps {
  steps: SpotlightStep[]
  open: boolean
  onClose: () => void
  tourName?: string
}

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

const PADDING = 12
const TOOLTIP_GAP = 16

export default function SpotlightTour({ steps, open, onClose, tourName }: SpotlightTourProps) {
  const [step, setStep] = useState(0)
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const current = steps[step]
  const isFirst = step === 0
  const isLast = step === steps.length - 1

  const measureTarget = useCallback(() => {
    if (!current) return
    const el = document.querySelector(`[data-tour="${current.target}"]`)
    if (el) {
      const r = el.getBoundingClientRect()
      setTargetRect({
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      })
      // Scroll element into view
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      setTargetRect(null)
    }
  }, [current])

  useEffect(() => {
    if (!open) {
      setStep(0)
      return
    }
    // Small delay to let the page render
    const timer = setTimeout(measureTarget, 300)
    return () => clearTimeout(timer)
  }, [open, step, measureTarget])

  // Re-measure on resize
  useEffect(() => {
    if (!open) return
    const handler = () => measureTarget()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [open, measureTarget])

  if (!open || !current) return null

  const handleNext = () => {
    if (isLast) {
      onClose()
    } else {
      setStep((s) => s + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirst) setStep((s) => s - 1)
  }

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }

    const pos = current.position || 'bottom'
    const scrollY = window.scrollY
    const viewportRect = {
      top: targetRect.top - scrollY,
      left: targetRect.left,
      width: targetRect.width,
      height: targetRect.height,
    }

    switch (pos) {
      case 'bottom':
        return {
          position: 'fixed',
          top: viewportRect.top + viewportRect.height + TOOLTIP_GAP,
          left: Math.max(16, Math.min(viewportRect.left, window.innerWidth - 380)),
          maxWidth: 360,
        }
      case 'top':
        return {
          position: 'fixed',
          bottom: window.innerHeight - viewportRect.top + TOOLTIP_GAP,
          left: Math.max(16, Math.min(viewportRect.left, window.innerWidth - 380)),
          maxWidth: 360,
        }
      case 'right':
        return {
          position: 'fixed',
          top: viewportRect.top,
          left: viewportRect.left + viewportRect.width + TOOLTIP_GAP,
          maxWidth: 360,
        }
      case 'left':
        return {
          position: 'fixed',
          top: viewportRect.top,
          right: window.innerWidth - viewportRect.left + TOOLTIP_GAP,
          maxWidth: 360,
        }
    }
  }

  // SVG overlay with spotlight cutout
  const renderOverlay = () => {
    const scrollY = window.scrollY
    if (!targetRect) {
      return (
        <div className="fixed inset-0 bg-black/60 z-[200] animate-fade-in" onClick={onClose} />
      )
    }

    const x = targetRect.left - PADDING
    const y = targetRect.top - scrollY - PADDING
    const w = targetRect.width + PADDING * 2
    const h = targetRect.height + PADDING * 2
    const r = 12

    return (
      <svg
        className="fixed inset-0 w-full h-full z-[200]"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect x={x} y={y} width={w} height={h} rx={r} ry={r} fill="black" />
          </mask>
        </defs>
        <rect
          x="0" y="0" width="100%" height="100%"
          fill="rgba(0,0,0,0.65)"
          mask="url(#spotlight-mask)"
          style={{ pointerEvents: 'auto' }}
          onClick={onClose}
        />
        {/* Highlight border */}
        <rect
          x={x} y={y} width={w} height={h}
          rx={r} ry={r}
          fill="none"
          stroke="rgba(245,197,24,0.8)"
          strokeWidth="2"
          className="animate-pulse"
        />
      </svg>
    )
  }

  return (
    <>
      {renderOverlay()}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="z-[201] animate-slide-up"
        style={{ ...getTooltipStyle(), position: 'fixed' }}
      >
        <div className="bg-bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-coppel-blue">
            <span className="text-xs text-white/80 font-medium">
              {tourName && `${tourName} · `}Paso {step + 1} de {steps.length}
            </span>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="px-5 py-4">
            <h4 className="font-sans text-base font-bold text-text-primary mb-2">
              {current.title}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Progress + Nav */}
          <div className="px-5 pb-4">
            {/* Progress dots */}
            <div className="flex gap-1 mb-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= step ? 'bg-coppel-blue' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                Saltar tour
              </button>
              <div className="flex gap-2">
                {!isFirst && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 h-8 px-3 rounded-pill border border-border text-xs font-semibold text-text-primary hover:border-coppel-blue transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Anterior
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 h-8 px-4 rounded-pill bg-coppel-blue text-white text-xs font-semibold hover:bg-coppel-blue-hover transition-colors"
                >
                  {isLast ? 'Finalizar' : 'Siguiente'}
                  {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
