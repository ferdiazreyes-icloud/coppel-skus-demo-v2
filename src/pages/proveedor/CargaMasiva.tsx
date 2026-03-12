import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Download, CheckCircle } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import FileUpload from '../../components/ui/FileUpload'
import Table, { type Column } from '../../components/ui/Table'
import Pagination from '../../components/ui/Pagination'
import { MOCK_SOLICITUDES, MOCK_PRODUCTS } from '../../data/mockProducts'

const PRODUCT_TYPES = [
  { value: 'muneca', label: 'Muñeca' },
  { value: 'montable', label: 'Montable' },
  { value: 'juego_mesa', label: 'Juego de mesa' },
]

interface UploadedProduct {
  id: string
  imageUrl: string
  name: string
  model: string
  brand: string
  material: string
  color: string
  [key: string]: unknown
}

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
  { key: 'name', header: 'Artículo', sortable: true },
  { key: 'model', header: 'Modelo', sortable: true },
  { key: 'brand', header: 'Marca', sortable: true },
  {
    key: 'material',
    header: 'Material',
    sortable: true,
    render: () => <span className="text-sm">Plástico con detalles en tela</span>,
  },
  {
    key: 'color',
    header: 'Color',
    sortable: true,
    render: () => <span className="text-sm">Multicolor</span>,
  },
  {
    key: 'link',
    header: 'Link',
    render: () => (
      <button className="text-sm text-coppel-blue font-medium hover:underline">
        Ficha técnica
      </button>
    ),
  },
]

export default function CargaMasiva() {
  const { solicitudId } = useParams()
  const solicitud = MOCK_SOLICITUDES.find((s) => s.id === solicitudId)
  const solicitudCode = solicitud?.code || '#000000'

  const [fileUploaded, setFileUploaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Simulate uploaded products from the supplier's solicitud
  const uploadedProducts: UploadedProduct[] = MOCK_PRODUCTS
    .filter((p) => p.supplierId === solicitud?.supplierId)
    .map((p) => ({
      id: p.id,
      imageUrl: p.imageUrl,
      name: p.name,
      model: p.model,
      brand: p.brand,
      material: 'Plástico',
      color: 'Multicolor',
    }))

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/proveedor' },
          { label: 'Mis solicitudes', to: '/proveedor/solicitudes' },
          { label: `Solicitud ${solicitudCode}`, to: `/proveedor/solicitudes/${solicitudId}` },
          { label: 'Carga masiva' },
        ]}
      />

      <div className="px-6 pb-10">
        <h1 className="font-sans text-xl font-bold text-text-primary mb-6">
          Carga masiva de propuestas
        </h1>

        <div className="space-y-6">
          {/* Upload section */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-4">
              Carga de propuestas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                label="Tipo de producto(s)"
                options={PRODUCT_TYPES}
                required
              />
              <div className="flex items-end">
                <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                  Descargar plantilla
                </Button>
              </div>
            </div>

            <FileUpload
              accept=".xlsx,.xls,.csv"
              onFileSelect={() => setFileUploaded(true)}
            />

            {fileUploaded && (
              <div className="mt-4 flex items-center gap-3 py-3 px-4 bg-success/10 rounded-sm border border-success/30">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    propuestas_mattel_2026.xlsx
                  </p>
                  <p className="text-xs text-text-muted">Cargado el 15/01/2026</p>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button
                variant="primary"
                onClick={() => setFileUploaded(true)}
              >
                Finalizar
              </Button>
            </div>
          </div>

          {/* Uploaded products table */}
          {fileUploaded && (
            <div className="bg-bg-card rounded-md border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="font-sans text-base font-semibold text-text-primary">
                  Productos cargados ({uploadedProducts.length})
                </h3>
              </div>

              <Table
                columns={columns}
                data={uploadedProducts as unknown as Record<string, unknown>[]}
                keyField="id"
              />

              <div className="px-6 py-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(uploadedProducts.length / 5) || 1}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
