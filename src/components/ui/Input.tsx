import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helper?: string
  error?: string
  suffix?: ReactNode
  required?: boolean
}

export default function Input({
  label,
  helper,
  error,
  suffix,
  required,
  className = '',
  id,
  ...props
}: InputProps) {
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
          className={`
            w-full h-10 px-3 text-sm text-text-primary bg-bg-card
            border rounded-sm outline-none transition-colors
            placeholder:text-text-light
            focus:border-border-focus focus:ring-1 focus:ring-border-focus
            disabled:bg-bg-hover disabled:text-text-muted disabled:cursor-not-allowed
            ${error ? 'border-error' : 'border-border-input'}
            ${suffix ? 'pr-10' : ''}
          `}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            {suffix}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-error">{error}</span>}
      {helper && !error && <span className="text-xs text-text-muted">{helper}</span>}
    </div>
  )
}
