import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const getVisiblePages = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    const pages: (number | '...')[] = [1]
    if (currentPage > 3) pages.push('...')

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) pages.push(i)

    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  const NavBtn = ({
    onClick,
    disabled,
    children,
  }: {
    onClick: () => void
    disabled: boolean
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 flex items-center justify-center rounded-sm text-text-muted hover:text-coppel-blue hover:bg-coppel-blue-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  )

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      <NavBtn onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        <ChevronsLeft className="w-4 h-4" />
      </NavBtn>
      <NavBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="w-4 h-4" />
      </NavBtn>

      {getVisiblePages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-text-muted">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-8 h-8 flex items-center justify-center rounded-sm text-sm font-medium transition-colors
              ${page === currentPage
                ? 'bg-coppel-blue text-white'
                : 'text-text-primary hover:bg-coppel-blue-light hover:text-coppel-blue'
              }
            `}
          >
            {page}
          </button>
        )
      )}

      <NavBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight className="w-4 h-4" />
      </NavBtn>
      <NavBtn onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        <ChevronsRight className="w-4 h-4" />
      </NavBtn>
    </div>
  )
}
