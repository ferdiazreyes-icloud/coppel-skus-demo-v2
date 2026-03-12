interface CoppelLogoProps {
  variant?: 'white' | 'navy'
  className?: string
}

/**
 * Logo Coppel fiel al original:
 * 3 círculos amarillos de tamaño descendente (grande a chico, izq a der) + texto "Coppel"
 */
export default function CoppelLogo({ variant = 'white', className = '' }: CoppelLogoProps) {
  const textColor = variant === 'white' ? 'text-white' : 'text-coppel-navy'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Three yellow dots — large to small, vertically centered */}
      <div className="flex items-center gap-[5px]">
        <span className="w-[22px] h-[22px] rounded-full bg-coppel-yellow" />
        <span className="w-[16px] h-[16px] rounded-full bg-coppel-yellow" />
        <span className="w-[12px] h-[12px] rounded-full bg-coppel-yellow" />
      </div>
      {/* Text */}
      <span className={`font-sans text-[32px] font-bold leading-none ${textColor}`}>
        Coppel
      </span>
    </div>
  )
}
