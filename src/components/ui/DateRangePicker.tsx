import DatePicker from './DatePicker'

interface DateRangePickerProps {
  label?: string
  startValue?: string
  endValue?: string
  onStartChange?: (value: string) => void
  onEndChange?: (value: string) => void
  required?: boolean
  className?: string
}

export default function DateRangePicker({
  label,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  required,
  className = '',
}: DateRangePickerProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <div className="flex items-center gap-2">
        <DatePicker
          placeholder="Fecha de inicio"
          value={startValue}
          onChange={(e) => onStartChange?.(e.target.value)}
          className="flex-1"
        />
        <span className="text-text-muted font-medium">—</span>
        <DatePicker
          placeholder="Fecha final"
          value={endValue}
          onChange={(e) => onEndChange?.(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  )
}
