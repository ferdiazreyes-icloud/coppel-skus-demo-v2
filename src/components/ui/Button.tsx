import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'yellow'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconRight?: ReactNode
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-coppel-blue text-white hover:bg-coppel-blue-hover border-coppel-blue',
  outline:
    'bg-transparent text-coppel-blue border-coppel-blue hover:bg-coppel-blue-light',
  ghost:
    'bg-transparent text-coppel-blue border-transparent hover:bg-coppel-blue-light',
  danger:
    'bg-error text-white border-error hover:opacity-90',
  yellow:
    'bg-coppel-yellow text-coppel-navy border-coppel-yellow hover:bg-coppel-yellow-hover',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-sans font-semibold
        rounded-pill border-2 transition-all cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  )
}
