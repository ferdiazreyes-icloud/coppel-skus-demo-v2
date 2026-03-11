interface RadioOption {
  value: string
  label: string
}

export interface RadioGroupProps {
  name?: string
  label?: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  required?: boolean
  direction?: 'row' | 'column'
  className?: string
}

export default function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  disabled = false,
  required,
  direction = 'row',
  className = '',
}: RadioGroupProps) {
  const groupName = name || label?.toLowerCase().replace(/\s+/g, '-') || 'radio-group'

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </span>
      )}
      <div
        className={`flex gap-4 ${direction === 'column' ? 'flex-col' : 'flex-row flex-wrap'}`}
      >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`inline-flex items-center gap-2 cursor-pointer select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0
              ${value === opt.value ? 'border-coppel-blue' : 'border-border-input'}
              ${!disabled && value !== opt.value ? 'hover:border-coppel-blue' : ''}
            `}
            onClick={() => !disabled && onChange?.(opt.value)}
          >
            {value === opt.value && (
              <div className="w-2.5 h-2.5 rounded-full bg-coppel-blue" />
            )}
          </div>
          <span className="text-sm text-text-primary">{opt.label}</span>
          <input
            type="radio"
            name={groupName}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            disabled={disabled}
            className="sr-only"
          />
        </label>
      ))}
      </div>
    </div>
  )
}
