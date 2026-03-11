import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { LayoutGrid, List } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import ProductCard from '../../components/ui/ProductCard'
import Pagination from '../../components/ui/Pagination'
import Select from '../../components/ui/Select'
import Checkbox from '../../components/ui/Checkbox'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import FileUpload from '../../components/ui/FileUpload'
import { MOCK_PRODUCTS, MOCK_SOLICITUDES } from '../../data/mockProducts'
import { CATEGORIES, CLASSES, FAMILIES, BRANDS } from '../../data/mockCatalog'
import { Download, Search, ChevronDown, ChevronUp } from 'lucide-react'

export default function ListadoPropuestas() {
  const { proveedorId } = useParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [reviewed, setReviewed] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(['precio', 'margen', 'marca']))

  const solicitud = MOCK_SOLICITUDES.find((s) => s.supplierId === proveedorId)
  const products = MOCK_PRODUCTS.filter((p) => p.supplierId === proveedorId)
  const supplierName = solicitud?.supplierName || 'Proveedor'
  const solicitudCode = solicitud?.code || '#000000'

  const toggleFilter = (id: string) => {
    const next = new Set(expandedFilters)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedFilters(next)
  }

  const toggleProduct = (productId: string, selected: boolean) => {
    const next = new Set(selectedProducts)
    if (selected) next.add(productId)
    else next.delete(productId)
    setSelectedProducts(next)
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/comprador' },
          { label: 'Propuestas y SKU\'s', to: '/comprador' },
          { label: 'Bandeja de solicitudes', to: '/comprador' },
          { label: supplierName },
        ]}
      />

      <div className="px-6 pb-10">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-sans text-xl font-bold text-text-primary">{supplierName}</h1>
          <p className="font-sans text-lg text-text-secondary">Solicitud {solicitudCode}</p>
        </div>

        <div className="flex gap-6">
          {/* ═══ SIDEBAR ═══ */}
          <aside className="w-[333px] shrink-0 space-y-5">
            {/* Category dropdowns */}
            <div className="bg-bg-card rounded-md border border-border p-5 space-y-4">
              <Select label="Categoría" options={CATEGORIES} placeholder="Selecciona" />
              <Select label="Clase" options={CLASSES} placeholder="Selecciona" />
              <Select label="Familia" options={FAMILIES} placeholder="Selecciona" />
            </div>

            {/* Template */}
            <div className="bg-bg-card rounded-md border border-border p-5 space-y-4">
              <Button variant="outline" icon={<Download className="w-4 h-4" />} className="w-full">
                Descargar plantilla
              </Button>
              <FileUpload accept=".xlsx,.xls,.csv" />
            </div>

            {/* Filters */}
            <div className="bg-bg-card rounded-md border border-border p-5">
              <h3 className="font-sans text-lg font-semibold text-text-primary">Filtrar por</h3>
              <div className="border-b border-border my-3" />

              {/* Precio */}
              <div className="mb-2">
                <button onClick={() => toggleFilter('precio')} className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-primary">
                  Precio
                  {expandedFilters.has('precio') ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                </button>
                {expandedFilters.has('precio') && (
                  <div className="grid grid-cols-2 gap-3 pb-3">
                    <Input placeholder="$ Mínimo" type="number" />
                    <Input placeholder="$ Máximo" type="number" />
                  </div>
                )}
              </div>

              {/* Margen */}
              <div className="mb-2">
                <button onClick={() => toggleFilter('margen')} className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-primary">
                  Margen (en porcentaje)
                  {expandedFilters.has('margen') ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                </button>
                {expandedFilters.has('margen') && (
                  <div className="grid grid-cols-2 gap-3 pb-3">
                    <Input placeholder="Mínimo" type="number" />
                    <Input placeholder="Máximo" type="number" />
                  </div>
                )}
              </div>

              {/* Marca */}
              <div className="mb-2">
                <button onClick={() => toggleFilter('marca')} className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-primary">
                  Marca
                  {expandedFilters.has('marca') ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                </button>
                {expandedFilters.has('marca') && (
                  <div className="space-y-2 pb-3">
                    <div className="relative mb-2">
                      <Input placeholder="Buscar" />
                    </div>
                    {BRANDS.map((brand) => (
                      <Checkbox key={brand.value} label={brand.label} />
                    ))}
                    <button className="text-xs text-coppel-blue font-medium hover:underline">Ver más</button>
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="mb-2">
                <button onClick={() => toggleFilter('color')} className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-primary">
                  Color
                  {expandedFilters.has('color') ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                </button>
              </div>

              {/* Tipo de producto */}
              <div>
                <button onClick={() => toggleFilter('tipo')} className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-primary">
                  Tipo de producto
                  {expandedFilters.has('tipo') ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
                </button>
              </div>

              <Button variant="primary" icon={<Search className="w-4 h-4" />} className="w-full mt-4">
                Buscar
              </Button>
            </div>
          </aside>

          {/* ═══ MAIN CONTENT ═══ */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">Ordenar por:</span>
                <Select
                  options={[
                    { value: 'relevancia', label: 'Relevancia' },
                    { value: 'precio', label: 'Precio' },
                    { value: 'margen', label: 'Margen' },
                  ]}
                  className="w-40"
                />
                <Select
                  options={[
                    { value: 'todos', label: 'Estatus' },
                    { value: 'en_revision', label: 'En revisión' },
                    { value: 'pendiente', label: 'Pendiente' },
                  ]}
                  className="w-36"
                />
                <Select
                  options={[
                    { value: 'todas', label: 'Planeaciones' },
                  ]}
                  className="w-40"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted">Vista:</span>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-coppel-blue text-white' : 'text-text-muted hover:text-text-primary'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-coppel-blue text-white' : 'text-text-muted hover:text-text-primary'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reviewed checkbox */}
            <div className="mb-5">
              <Checkbox
                label="He revisado todas las propuestas que le solicité al proveedor/prospecto"
                checked={reviewed}
                onChange={setReviewed}
              />
            </div>

            {/* Product list */}
            <div className="space-y-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={selectedProducts.has(product.id)}
                  onSelect={(sel) => toggleProduct(product.id, sel)}
                  onViewFicha={() => navigate(`/comprador/propuestas/${proveedorId}/${product.id}/evaluar`)}
                  onCompare={() => {}}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
