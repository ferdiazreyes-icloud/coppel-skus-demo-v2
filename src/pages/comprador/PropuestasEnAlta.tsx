import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Table, { type Column } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Select from '../../components/ui/Select'
import { MOCK_PRODUCTS } from '../../data/mockProducts'
import { CATEGORIES } from '../../data/mockCatalog'
import type { Product } from '../../types/product'

const categoryTabs = [
  { id: 'juguetes', label: 'Juguetes', emoji: '🧸' },
  { id: 'bebes', label: 'Bebés', emoji: '👶' },
  { id: 'consolas', label: 'Consolas y videojuegos', emoji: '🎮' },
]

const columns: Column<Product>[] = [
  {
    key: 'imageUrl',
    header: 'Imagen',
    width: 'w-16',
    render: (row) => (
      <img
        src={row.imageUrl}
        alt={row.name}
        className="w-12 h-12 rounded object-cover"
      />
    ),
  },
  {
    key: 'name',
    header: 'Artículo',
    sortable: true,
    render: (row) => (
      <span className="font-medium text-text-primary">
        {row.id.replace('prod-', '')} - {row.name}
      </span>
    ),
  },
  { key: 'brand', header: 'Marca', sortable: true },
  { key: 'model', header: 'Modelo', sortable: true },
  {
    key: 'supplierName',
    header: 'Proveedor',
    sortable: true,
    render: (row) => (
      <span className="text-sm">
        {row.supplierId.replace('sup-', '')} - {row.supplierName}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Estatus',
    sortable: true,
    render: (row) => <Badge status={row.status} />,
  },
  {
    key: 'classCode',
    header: 'Clase',
    sortable: true,
  },
]

export default function PropuestasEnAlta() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('juguetes')
  const [showModal, setShowModal] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())

  // Filter products that are in alta process
  const products = MOCK_PRODUCTS.filter(
    (p) => p.status === 'pendiente_comprador' || p.status === 'pendiente_proveedor'
  )

  const handleRowClick = (row: Product) => {
    navigate(`/comprador/alta-skus/${row.id}/informacion-general`)
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/comprador' },
          { label: "Propuestas y SKU's", to: '/comprador' },
          { label: 'Propuestas en proceso de alta' },
        ]}
      />

      <div className="px-6 pb-10">
        {/* Header */}
        <div data-tour="alta-header" className="flex items-center justify-between mb-6">
          <h1 className="font-sans text-xl font-bold text-text-primary">
            Propuestas en proceso de alta
          </h1>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowModal(true)}
          >
            Nuevo producto
          </Button>
        </div>

        {/* Category tabs */}
        <div data-tour="category-tabs" className="flex gap-1 mb-6">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-t-md text-sm font-medium transition-colors
                ${activeCategory === tab.id
                  ? 'bg-coppel-navy text-white'
                  : 'bg-bg-light text-text-muted hover:bg-border hover:text-text-primary'
                }
              `}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div data-tour="products-table" className="bg-bg-card rounded-md border border-border overflow-hidden">
          <Table
            columns={columns as unknown as Column<Record<string, unknown>>[]}
            data={products as unknown as Record<string, unknown>[]}
            keyField="id"
            selectable
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            onRowClick={(row) => handleRowClick(row as unknown as Product)}
          />
        </div>
      </div>

      {/* Assign supplier modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Asigna un proveedor a este SKU"
        actions={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Regresar
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Continuar
            </Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary mb-5">
          Selecciona la clave del proveedor. Si no recuerdas el número, búscalo en el catálogo de proveedores.
        </p>
        <div className="space-y-4">
          <Select
            label="Nombre/ID proveedor o nombre/ID prospecto"
            options={[
              { value: 'sup-001', label: '234567 - Mattel S.A. de C.V.' },
              { value: 'sup-002', label: '345678 - Prinsel S.A. de C.V.' },
            ]}
            placeholder="Selecciona"
          />
          <Select
            label="Categoría"
            options={CATEGORIES}
            placeholder="Selecciona"
          />
          <a
            href="#"
            className="text-sm text-coppel-blue font-medium hover:underline"
          >
            Ir al alta del proveedor
          </a>
        </div>
      </Modal>
    </div>
  )
}
