import { PlayCircle, X } from 'lucide-react'

interface WelcomeModalProps {
  open: boolean
  roleName: string
  userName: string
  onStartTour: () => void
  onSkip: () => void
}

export default function WelcomeModal({
  open,
  roleName,
  userName,
  onStartTour,
  onSkip,
}: WelcomeModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onSkip} />

      <div className="relative w-full max-w-md bg-bg-card rounded-lg shadow-2xl animate-scale-in overflow-hidden">
        {/* Close */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-coppel-blue px-8 pt-8 pb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <PlayCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-sans text-xl font-bold text-white">
            Bienvenido al Portal SGC
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Vista {roleName}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 text-center">
          <p className="text-sm text-text-secondary leading-relaxed">
            Hola <strong>{userName}</strong>, ¿te gustaría hacer un tour rápido para conocer
            las funcionalidades principales de tu panel?
          </p>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={onStartTour}
              className="w-full h-11 rounded-pill bg-coppel-blue text-white text-sm font-semibold hover:bg-coppel-blue-hover transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4.5 h-4.5" />
              Iniciar tour
            </button>
            <button
              onClick={onSkip}
              className="w-full h-11 rounded-pill border-2 border-border text-text-muted text-sm font-semibold hover:border-coppel-blue hover:text-coppel-blue transition-colors"
            >
              No, ya conozco el portal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
