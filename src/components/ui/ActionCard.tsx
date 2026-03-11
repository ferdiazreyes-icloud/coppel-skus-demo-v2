import type { ReactNode } from 'react'

interface ActionCardProps {
  image?: string
  icon?: ReactNode
  title: string
  description: string
  buttonLabel: string
  onAction: () => void
  className?: string
}

export default function ActionCard({
  image,
  icon,
  title,
  description,
  buttonLabel,
  onAction,
  className = '',
}: ActionCardProps) {
  return (
    <div className={`bg-bg-card rounded-md overflow-hidden border border-border flex flex-col ${className}`}>
      {/* Image */}
      {image && (
        <div className="h-40 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Icon (alternative to image) */}
      {!image && icon && (
        <div className="h-40 flex items-center justify-center bg-bg-light">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-sans text-base font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary mt-1 flex-1">{description}</p>
        <button
          onClick={onAction}
          className="mt-4 w-full h-10 rounded-pill border-2 border-coppel-blue text-coppel-blue text-sm font-semibold hover:bg-coppel-blue hover:text-white transition-colors"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
