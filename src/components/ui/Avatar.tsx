interface AvatarProps {
  initials: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export default function Avatar({
  initials,
  size = 'md',
  className = '',
}: AvatarProps) {
  return (
    <div
      className={`
        rounded-full bg-coppel-blue-light text-coppel-blue
        flex items-center justify-center font-sans font-semibold
        ${sizeClasses[size]} ${className}
      `}
    >
      {initials}
    </div>
  )
}
