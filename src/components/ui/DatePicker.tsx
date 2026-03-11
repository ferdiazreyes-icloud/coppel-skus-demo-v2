import { Calendar } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  error?: string
  required?: boolean
}

export default function DatePicker({
  label,
  error,
  required,
  className = '',
  id,
  ...props
}: DatePickerProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type="date"
          className={`
            w-full h-10 px-3 pr-10 text-sm text-text-primary bg-bg-card
            border rounded-sm outline-none transition-colors
            focus:border-border-focus focus:ring-1 focus:ring-border-focus
            ${error ? 'border-error' : 'border-border-input'}
          `}
          {...props}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}
