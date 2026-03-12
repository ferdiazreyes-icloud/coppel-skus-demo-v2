import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronLeft, X } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuthStore'
import { CROSS_ROLE_STEPS } from '../../data/crossRoleSteps'

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

const PADDING = 12
const TOOLTIP_GAP = 16
const MAX_SPOTLIGHT_HEIGHT = 500 // Cap the spotlight height for very tall elements

export default function CrossRoleTour({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [transitionLabel, setTransitionLabel] = useState('')
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const setRole = useAuthStore((s) => s.setRole)
  const prevRouteRef = useRef('')

  const current = CROSS_ROLE_STEPS[step]
  const isFirst = step === 0
  const isLast = step === CROSS_ROLE_STEPS.length - 1
  const totalSteps = CROSS_ROLE_STEPS.length

  // Clamp rect to viewport and cap height
  const clampRect = useCallback((r: DOMRect): Rect => {
    const top = Math.max(0, r.top)
    const left = Math.max(0, r.left)
    const visibleBottom = Math.min(r.bottom, window.innerHeight)
    const visibleRight = Math.min(r.right, window.innerWidth)
    const height = Math.min(visibleBottom - top, MAX_SPOTLIGHT_HEIGHT)
    const width = visibleRight - left
    return { top, left, width: Math.max(width, 0), height: Math.max(height, 0) }
  }, [])

  const measureAndTrack = useCallback(
    (target: string) => {
      const el = document.querySelector(`[data-tour="${target}"]`)
      if (!el) return false

      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

      let rafId: number
      let settled = 0
      let lastTop = -1

      const poll = () => {
        const r = el.getBoundingClientRect()
        setTargetRect(clampRect(r))

        if (Math.abs(r.top - lastTop) < 1) {
          settled++
        } else {
          settled = 0
        }
        lastTop = r.top

        if (settled < 15) {
          rafId = requestAnimationFrame(poll)
        }
      }

      rafId = requestAnimationFrame(poll)
      return () => cancelAnimationFrame(rafId)
    },
    [clampRect]
  )

  // Navigate to the correct route and measure the target
  useEffect(() => {
    if (!open || !current || transitioning) return

    // Switch role if needed
    if (current.role) {
      setRole(current.role)
    }

    // Check if we need to navigate
    const needsNav = location.pathname !== current.route
    if (needsNav) {
      // Show transition screen
      const isRoleSwitch = !!current.role
      const prevRoute = prevRouteRef.current
      const nextPageName = current.title.replace(/^\d+\.\s*/, '')

      if (isRoleSwitch) {
        setTransitionLabel(`Cambiando a ${current.role === 'comprador' ? 'Comprador' : 'Proveedor'}...`)
      } else if (prevRoute !== current.route) {
        setTransitionLabel(`Navegando a: ${nextPageName}`)
      }

      setTransitioning(true)
      setTargetRect(null)

      const timer = setTimeout(() => {
        navigate(current.route)
        prevRouteRef.current = current.route
        setTransitioning(false)
      }, isRoleSwitch ? 1200 : 700)

      return () => clearTimeout(timer)
    }

    // Already on the right route — find and measure
    prevRouteRef.current = current.route

    let cleanup: (() => void) | false = false
    const timer = setTimeout(() => {
      cleanup = measureAndTrack(current.target)
      if (!cleanup) {
        // Element not found yet, retry with longer delay
        const retry = setTimeout(() => {
          cleanup = measureAndTrack(current.target)
        }, 600)
        return () => clearTimeout(retry)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      if (cleanup) cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step, location.pathname, transitioning])

  // Re-measure on scroll
  useEffect(() => {
    if (!open || !current || transitioning) return
    const handler = () => {
      const el = document.querySelector(`[data-tour="${current.target}"]`)
      if (el) {
        setTargetRect(clampRect(el.getBoundingClientRect()))
      }
    }
    window.addEventListener('scroll', handler, true)
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler, true)
      window.removeEventListener('resize', handler)
    }
  }, [open, current, transitioning, clampRect])

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(0)
      setTargetRect(null)
      setTransitioning(false)
      prevRouteRef.current = ''
    }
  }, [open])

  if (!open || !current) return null

  const handleNext = () => {
    if (isLast) {
      onClose()
    } else {
      setTargetRect(null)
      setStep((s) => s + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirst) {
      setTargetRect(null)
      setStep((s) => s - 1)
    }
  }

  // Role indicator
  const currentRole = current.role || (step > 0 ? CROSS_ROLE_STEPS.slice(0, step).reverse().find(s => s.role)?.role : undefined) || 'comprador'
  const roleLabel = currentRole === 'comprador' ? '👩 Comprador' : '👨 Proveedor'

  // Transition screen between pages
  if (transitioning) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 animate-fade-in">
        <div className="text-center animate-scale-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-coppel-navy flex items-center justify-center">
            <div className="w-8 h-8 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
          </div>
          <p className="text-white text-lg font-semibold font-sans">
            {transitionLabel}
          </p>
          <p className="text-white/50 text-sm mt-2">
            Paso {step + 1} de {totalSteps}
          </p>
        </div>
      </div>
    )
  }

  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }

    const pos = current.position || 'bottom'
    const spotBottom = targetRect.top + targetRect.height + PADDING + TOOLTIP_GAP
    const spaceBelow = window.innerHeight - spotBottom

    // If tooltip would go off screen below, force to top
    const effectivePos = pos === 'bottom' && spaceBelow < 220 ? 'top' : pos

    switch (effectivePos) {
      case 'bottom':
        return {
          position: 'fixed',
          top: spotBottom,
          left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 380)),
          maxWidth: 360,
        }
      case 'top':
        return {
          position: 'fixed',
          bottom: window.innerHeight - targetRect.top + PADDING + TOOLTIP_GAP,
          left: Math.max(16, Math.min(targetRect.left, window.innerWidth - 380)),
          maxWidth: 360,
        }
      case 'right':
        return {
          position: 'fixed',
          top: Math.max(80, targetRect.top),
          left: Math.min(targetRect.left + targetRect.width + PADDING + TOOLTIP_GAP, window.innerWidth - 380),
          maxWidth: 360,
        }
      case 'left':
        return {
          position: 'fixed',
          top: Math.max(80, targetRect.top),
          right: window.innerWidth - targetRect.left + PADDING + TOOLTIP_GAP,
          maxWidth: 360,
        }
    }
  }

  const renderOverlay = () => {
    if (!targetRect) {
      return (
        <div className="fixed inset-0 bg-black/60 z-[200] animate-fade-in" />
      )
    }

    const x = targetRect.left - PADDING
    const y = targetRect.top - PADDING
    const w = targetRect.width + PADDING * 2
    const h = targetRect.height + PADDING * 2
    const r = 12

    return (
      <svg
        className="fixed inset-0 w-full h-full z-[200]"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <mask id="cross-tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect x={x} y={y} width={w} height={h} rx={r} ry={r} fill="black" />
          </mask>
        </defs>
        <rect
          x="0" y="0" width="100%" height="100%"
          fill="rgba(0,0,0,0.65)"
          mask="url(#cross-tour-mask)"
          style={{ pointerEvents: 'auto' }}
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
          <div className="flex items-center justify-between px-5 py-3 bg-coppel-navy">
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/60 font-medium">
                Flujo completo · Paso {step + 1}/{totalSteps}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                {roleLabel}
              </span>
            </div>
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
            {/* Progress bar */}
            <div className="flex gap-0.5 mb-4">
              {CROSS_ROLE_STEPS.map((s, i) => {
                const isComprador = !s.role ? (CROSS_ROLE_STEPS.slice(0, i + 1).reverse().find(ss => ss.role)?.role || 'comprador') === 'comprador' : s.role === 'comprador'
                return (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= step
                        ? isComprador ? 'bg-coppel-blue' : 'bg-status-pending-supplier'
                        : 'bg-border'
                    }`}
                  />
                )
              })}
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
                  className="flex items-center gap-1 h-8 px-4 rounded-pill bg-coppel-navy text-white text-xs font-semibold hover:bg-coppel-blue transition-colors"
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
