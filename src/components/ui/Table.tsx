import { useState, type ReactNode } from 'react'
import { ArrowUpDown } from 'lucide-react'
import Checkbox from './Checkbox'

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  render?: (row: T) => ReactNode
  width?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: string
  selectable?: boolean
  selectedKeys?: Set<string>
  onSelectionChange?: (keys: Set<string>) => void
  onRowClick?: (row: T) => void
  className?: string
}

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  selectable = false,
  selectedKeys = new Set(),
  onSelectionChange,
  onRowClick,
  className = '',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = String(a[sortKey] ?? '')
        const bVal = String(b[sortKey] ?? '')
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      })
    : data

  const allSelected = data.length > 0 && data.every((row) => selectedKeys.has(String(row[keyField])))

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange?.(new Set())
    } else {
      onSelectionChange?.(new Set(data.map((row) => String(row[keyField]))))
    }
  }

  const toggleRow = (key: string) => {
    const next = new Set(selectedKeys)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    onSelectionChange?.(next)
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        {/* Header */}
        <thead>
          <tr className="bg-coppel-navy text-white">
            {selectable && (
              <th className="w-12 px-3 py-3">
                <Checkbox checked={allSelected} onChange={toggleAll} />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-semibold whitespace-nowrap ${col.width || ''}`}
              >
                {col.sortable ? (
                  <button
                    onClick={() => handleSort(col.key)}
                    className="inline-flex items-center gap-1 hover:text-coppel-yellow transition-colors"
                  >
                    {col.header}
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {sortedData.map((row, i) => {
            const rowKey = String(row[keyField])
            return (
              <tr
                key={rowKey}
                onClick={() => onRowClick?.(row)}
                className={`
                  border-b border-border transition-colors
                  ${onRowClick ? 'cursor-pointer' : ''}
                  ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}
                  hover:bg-coppel-blue-light
                `}
              >
                {selectable && (
                  <td className="w-12 px-3 py-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedKeys.has(rowKey)}
                      onChange={() => toggleRow(rowKey)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="py-12 text-center text-text-muted text-sm">
          No hay datos disponibles
        </div>
      )}
    </div>
  )
}
