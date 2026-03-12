import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  actions?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  size = 'md',
}: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={`
          relative bg-bg-card rounded-md shadow-xl w-full ${sizeClasses[size]}
          animate-scale-in
        `}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-sans text-lg font-semibold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
