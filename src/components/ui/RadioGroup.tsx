interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  direction?: 'row' | 'column'
  className?: string
}

export default function RadioGroup({
  name,
  options,
  value,
  onChange,
  disabled = false,
  direction = 'row',
  className = '',
}: RadioGroupProps) {
  return (
    <div
      className={`flex gap-4 ${direction === 'column' ? 'flex-col' : 'flex-row flex-wrap'} ${className}`}
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
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            disabled={disabled}
            className="sr-only"
          />
        </label>
      ))}
    </div>
  )
}
