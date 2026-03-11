import { Check } from 'lucide-react'

interface CheckboxProps {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export default function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
}: CheckboxProps) {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div
        className={`
          w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all shrink-0
          ${checked ? 'bg-coppel-blue border-coppel-blue' : 'bg-bg-card border-border-input'}
          ${!disabled && !checked ? 'hover:border-coppel-blue' : ''}
        `}
        onClick={() => !disabled && onChange?.(!checked)}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </div>
      {label && <span className="text-sm text-text-primary">{label}</span>}
    </label>
  )
}
