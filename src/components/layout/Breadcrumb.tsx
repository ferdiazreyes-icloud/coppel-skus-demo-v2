import { Home, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 px-6 py-4 text-sm">
      <Link to="/" className="text-coppel-blue hover:underline">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
          {item.to ? (
            <Link to={item.to} className="text-coppel-blue hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-muted">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
