import { Minus, Plus } from 'lucide-react'

interface NumberInputProps {
  label?: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  required?: boolean
  disabled?: boolean
  className?: string
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  required,
  disabled = false,
  className = '',
}: NumberInputProps) {
  const decrement = () => {
    if (value > min && !disabled) onChange(value - 1)
  }
  const increment = () => {
    if (value < max && !disabled) onChange(value + 1)
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <div className="inline-flex items-center">
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
          className="w-10 h-10 flex items-center justify-center bg-coppel-blue text-white rounded-l-sm hover:bg-coppel-blue-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const v = parseInt(e.target.value)
            if (!isNaN(v) && v >= min && v <= max) onChange(v)
          }}
          disabled={disabled}
          className="w-14 h-10 text-center text-sm text-text-primary bg-bg-card border-y border-border-input outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={increment}
          disabled={disabled || value >= max}
          className="w-10 h-10 flex items-center justify-center bg-coppel-blue text-white rounded-r-sm hover:bg-coppel-blue-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
