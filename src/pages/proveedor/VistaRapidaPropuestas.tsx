import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Table, { type Column } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'
import { MOCK_PRODUCTS } from '../../data/mockProducts'
import { useState } from 'react'

const columns: Column<Record<string, unknown>>[] = [
  {
    key: 'imageUrl',
    header: 'Imagen',
    width: 'w-16',
    render: (row) => (
      <img
        src={row.imageUrl as string}
        alt={row.name as string}
        className="w-12 h-12 rounded object-cover"
      />
    ),
  },
  {
    key: 'name',
    header: 'Artículo',
    sortable: true,
    render: (row) => (
      <span className="font-medium text-text-primary">{row.name as string}</span>
    ),
  },
  { key: 'model', header: 'Modelo', sortable: true },
  { key: 'brand', header: 'Marca', sortable: true },
  {
    key: 'status',
    header: 'Estatus',
    sortable: true,
    render: (row) => <Badge status={row.status as import('../../types/product').ProposalStatus} />,
  },
  {
    key: 'link',
    header: '',
    render: () => (
      <span className="text-sm text-coppel-blue font-medium cursor-pointer hover:underline">
        Ficha técnica
      </span>
    ),
  },
]

export default function VistaRapidaPropuestas() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  // All products from sup-001 (Mattel, the logged-in supplier)
  const products = MOCK_PRODUCTS.filter((p) => p.supplierId === 'sup-001')

  const handleRowClick = (row: Record<string, unknown>) => {
    navigate(`/proveedor/propuestas/${row.id as string}`)
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/proveedor' },
          { label: 'Mis propuestas' },
        ]}
      />

      <div className="px-6 pb-10">
        <h1 className="font-sans text-xl font-bold text-text-primary mb-6">
          Mis propuestas
        </h1>

        <div className="bg-bg-card rounded-md border border-border overflow-hidden">
          <Table
            columns={columns}
            data={products as unknown as Record<string, unknown>[]}
            keyField="id"
            onRowClick={handleRowClick}
          />
        </div>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / 10) || 1}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
