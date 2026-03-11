import type { ProposalStatus } from '../../types/product'
import { STATUS_MAP } from '../../types/workflow'

interface BadgeProps {
  status: ProposalStatus
  className?: string
}

export default function Badge({ status, className = '' }: BadgeProps) {
  const config = STATUS_MAP[status]

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-semibold
        ${config.bgColor} ${config.textColor} ${className}
      `}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  )
}
