import { type TextareaHTMLAttributes, useState } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  required?: boolean
  maxChars?: number
}

export default function Textarea({
  label,
  error,
  required,
  maxChars,
  className = '',
  value,
  onChange,
  id,
  ...props
}: TextareaProps) {
  const [charCount, setCharCount] = useState(String(value || '').length)
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-text-primary">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        {maxChars && (
          <span className="text-xs text-text-muted">
            {charCount}/{maxChars}
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        value={value}
        onChange={(e) => {
          setCharCount(e.target.value.length)
          onChange?.(e)
        }}
        maxLength={maxChars}
        className={`
          w-full min-h-[100px] px-3 py-2 text-sm text-text-primary bg-bg-card
          border rounded-sm outline-none transition-colors resize-y
          placeholder:text-text-light
          focus:border-border-focus focus:ring-1 focus:ring-border-focus
          ${error ? 'border-error' : 'border-border-input'}
        `}
        {...props}
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}
