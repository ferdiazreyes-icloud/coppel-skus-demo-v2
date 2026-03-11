import { useState, type ReactNode } from 'react'
import { ChevronUp, ChevronDown, Save } from 'lucide-react'
import Toggle from '../ui/Toggle'

interface FormSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  showInfoToggle?: boolean
  infoToggleLabel?: string
  infoToggleChecked?: boolean
  onInfoToggleChange?: (checked: boolean) => void
  showSaveButton?: boolean
  onSave?: () => void
  icon?: ReactNode
  className?: string
}

export default function FormSection({
  title,
  children,
  defaultOpen = true,
  showInfoToggle = false,
  infoToggleLabel = 'Info. SKU de referencia',
  infoToggleChecked = false,
  onInfoToggleChange,
  showSaveButton = true,
  onSave,
  icon,
  className = '',
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`bg-bg-card rounded-md border border-border ${className}`}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-sans text-base font-semibold text-text-primary">{title}</h3>
          {icon && <span className="text-coppel-blue">{icon}</span>}
        </div>
        <div className="flex items-center gap-4">
          {showInfoToggle && (
            <div onClick={(e) => e.stopPropagation()}>
              <Toggle
                label={infoToggleLabel}
                checked={infoToggleChecked}
                onChange={(v) => onInfoToggleChange?.(v)}
              />
            </div>
          )}
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-text-muted" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-muted" />
          )}
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="border-t border-border pt-5">{children}</div>

          {/* Save button */}
          {showSaveButton && (
            <div className="flex justify-end mt-6">
              <button
                onClick={onSave}
                className="inline-flex items-center gap-2 h-10 px-5 bg-coppel-blue text-white text-sm font-semibold rounded-pill hover:bg-coppel-blue-hover transition-colors"
              >
                Guardar
                <Save className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
