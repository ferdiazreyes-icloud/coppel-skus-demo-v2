interface CoppelLogoProps {
  variant?: 'white' | 'navy'
  className?: string
}

/**
 * Logo Coppel fiel al Figma:
 * 3 círculos amarillos de tamaño ascendente (izq a der) + texto "Coppel"
 * Los círculos tienen tamaños ~14px, ~18px, ~22px de diámetro
 */
export default function CoppelLogo({ variant = 'white', className = '' }: CoppelLogoProps) {
  const textColor = variant === 'white' ? 'text-white' : 'text-coppel-navy'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Three yellow dots — ascending size */}
      <div className="flex items-end gap-[5px]">
        <span className="w-[14px] h-[14px] rounded-full bg-coppel-yellow" />
        <span className="w-[18px] h-[18px] rounded-full bg-coppel-yellow" />
        <span className="w-[22px] h-[22px] rounded-full bg-coppel-yellow" />
      </div>
      {/* Text */}
      <span className={`font-sans text-[32px] font-bold leading-none ${textColor}`}>
        Coppel
      </span>
    </div>
  )
}
