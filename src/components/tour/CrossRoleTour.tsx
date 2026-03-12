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

export default function CrossRoleTour({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const [navigating, setNavigating] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const setRole = useAuthStore((s) => s.setRole)

  const current = CROSS_ROLE_STEPS[step]
  const isFirst = step === 0
  const isLast = step === CROSS_ROLE_STEPS.length - 1
  const totalSteps = CROSS_ROLE_STEPS.length

  const measureAndTrack = useCallback(
    (target: string) => {
      const el = document.querySelector(`[data-tour="${target}"]`)
      if (!el) return false

      el.scrollIntoView({ behavior: 'smooth', block: 'center' })

      let rafId: number
      let settled = 0
      let lastTop = -1

      const poll = () => {
        const r = el.getBoundingClientRect()
        setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height })

        if (Math.abs(r.top - lastTop) < 1) {
          settled++
        } else {
          settled = 0
        }
        lastTop = r.top

        if (settled < 10) {
          rafId = requestAnimationFrame(poll)
        }
      }

      rafId = requestAnimationFrame(poll)
      return () => cancelAnimationFrame(rafId)
    },
    []
  )

  // Navigate to the correct route and measure the target
  useEffect(() => {
    if (!open || !current) return

    // Switch role if needed
    if (current.role) {
      setRole(current.role)
    }

    // Check if we need to navigate
    const needsNav = location.pathname !== current.route
    if (needsNav) {
      setNavigating(true)
      setTargetRect(null)
      navigate(current.route)
      return
    }

    // Already on the right route — find and measure
    setNavigating(false)

    // Wait for DOM to render, then measure
    let cleanup: (() => void) | false = false
    const timer = setTimeout(() => {
      cleanup = measureAndTrack(current.target)
      if (!cleanup) {
        // Element not found yet, retry
        const retry = setTimeout(() => {
          cleanup = measureAndTrack(current.target)
        }, 500)
        return () => clearTimeout(retry)
      }
    }, 200)

    return () => {
      clearTimeout(timer)
      if (cleanup) cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step, location.pathname])

  // Re-measure on scroll
  useEffect(() => {
    if (!open || !current || navigating) return
    const handler = () => {
      const el = document.querySelector(`[data-tour="${current.target}"]`)
      if (el) {
        const r = el.getBoundingClientRect()
        setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      }
    }
    window.addEventListener('scroll', handler, true)
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler, true)
      window.removeEventListener('resize', handler)
    }
  }, [open, current, navigating])

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(0)
      setTargetRect(null)
      setNavigating(false)
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

  const getTooltipStyle = (): React.CSSProperties => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }

    const pos = current.position || 'bottom'

    switch (pos) {
      case 'bottom':
        return {
          position: 'fixed',
          top: targetRect.top + targetRect.height + PADDING + TOOLTIP_GAP,
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
          top: targetRect.top,
          left: Math.min(targetRect.left + targetRect.width + PADDING + TOOLTIP_GAP, window.innerWidth - 380),
          maxWidth: 360,
        }
      case 'left':
        return {
          position: 'fixed',
          top: targetRect.top,
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

  // Role indicator
  const currentRole = current.role || (step > 0 ? CROSS_ROLE_STEPS.slice(0, step).reverse().find(s => s.role)?.role : undefined) || 'comprador'
  const roleLabel = currentRole === 'comprador' ? '👩 Comprador' : '👨 Proveedor'

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
