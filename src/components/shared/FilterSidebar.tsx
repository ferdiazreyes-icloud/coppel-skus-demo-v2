import { useState } from 'react'
import { ChevronDown, ChevronUp, Download, Search } from 'lucide-react'
import Select from '../ui/Select'
import Input from '../ui/Input'
import Checkbox from '../ui/Checkbox'
import Button from '../ui/Button'
import FileUpload from '../ui/FileUpload'

interface FilterOption {
  value: string
  label: string
  checked?: boolean
}

interface FilterGroup {
  id: string
  label: string
  type: 'range' | 'checkboxes'
  options?: FilterOption[]
  prefix?: string
}

interface FilterSidebarProps {
  categories: { value: string; label: string }[]
  classes: { value: string; label: string }[]
  families: { value: string; label: string }[]
  filterGroups: FilterGroup[]
  onCategoryChange?: (value: string) => void
  onClassChange?: (value: string) => void
  onFamilyChange?: (value: string) => void
  onDownloadTemplate?: () => void
  onUploadTemplate?: (file: File) => void
  className?: string
}

export default function FilterSidebar({
  categories,
  classes,
  families,
  filterGroups,
  onCategoryChange,
  onClassChange,
  onFamilyChange,
  onDownloadTemplate,
  onUploadTemplate,
  className = '',
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['precio']))

  const toggleGroup = (id: string) => {
    const next = new Set(expandedGroups)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedGroups(next)
  }

  return (
    <aside className={`w-[333px] shrink-0 space-y-6 ${className}`}>
      {/* Category filters */}
      <div className="bg-bg-card rounded-md border border-border p-5 space-y-4">
        <Select label="Categoría" options={categories} placeholder="Selecciona" onChange={(e) => onCategoryChange?.(e.target.value)} />
        <Select label="Clase" options={classes} placeholder="Selecciona" onChange={(e) => onClassChange?.(e.target.value)} />
        <Select label="Familia" options={families} placeholder="Selecciona" onChange={(e) => onFamilyChange?.(e.target.value)} />
      </div>

      {/* Template download/upload */}
      <div className="bg-bg-card rounded-md border border-border p-5 space-y-4">
        <Button variant="outline" icon={<Download className="w-4 h-4" />} onClick={onDownloadTemplate} className="w-full">
          Descargar plantilla
        </Button>
        <FileUpload accept=".xlsx,.xls,.csv" onFileSelect={onUploadTemplate} />
      </div>

      {/* Filter groups */}
      <div className="bg-bg-card rounded-md border border-border p-5">
        <h3 className="font-sans text-lg font-semibold text-text-primary mb-1">Filtrar por</h3>
        <div className="border-b border-border mb-4" />

        <div className="space-y-3">
          {filterGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id)
            return (
              <div key={group.id}>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-primary"
                >
                  {group.label}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </button>

                {isExpanded && group.type === 'range' && (
                  <div className="grid grid-cols-2 gap-3 pb-3">
                    <Input placeholder={`${group.prefix || '$'} Mínimo`} type="number" />
                    <Input placeholder={`${group.prefix || '$'} Máximo`} type="number" />
                  </div>
                )}

                {isExpanded && group.type === 'checkboxes' && group.options && (
                  <div className="space-y-2 pb-3">
                    {group.options.slice(0, 5).map((opt) => (
                      <Checkbox key={opt.value} label={opt.label} checked={opt.checked} />
                    ))}
                    {group.options.length > 5 && (
                      <button className="text-xs text-coppel-blue font-medium hover:underline">
                        Ver más
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <Button variant="primary" icon={<Search className="w-4 h-4" />} className="w-full mt-4">
          Buscar
        </Button>
      </div>
    </aside>
  )
}
