import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  options: SelectOption[]
  placeholder?: string
  helper?: string
  error?: string
  required?: boolean
}

export default function Select({
  label,
  options,
  placeholder,
  helper,
  error,
  required,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`
            w-full h-10 px-3 pr-10 text-sm text-text-primary bg-bg-card
            border rounded-sm outline-none appearance-none transition-colors
            focus:border-border-focus focus:ring-1 focus:ring-border-focus
            disabled:bg-bg-hover disabled:text-text-muted disabled:cursor-not-allowed
            ${error ? 'border-error' : 'border-border-input'}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
      {error && <span className="text-xs text-error">{error}</span>}
      {helper && !error && <span className="text-xs text-text-muted">{helper}</span>}
    </div>
  )
}
