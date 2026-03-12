import { useParams, useNavigate } from 'react-router-dom'
import { FileText, Download } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Button from '../../components/ui/Button'
import { MOCK_SOLICITUDES } from '../../data/mockProducts'

const MOCK_DOCS = [
  { name: 'Manual Mattel', type: 'PDF' },
  { name: 'Catálogo Mattel', type: 'PDF' },
  { name: 'Mattel prospecto2026', type: 'PDF' },
]

const MOCK_IMAGES = [
  'https://shop.mattel.com/cdn/shop/files/784568611a6a51f51918dc4cb1dc175e52a2bb7d_b924277b-ca4a-44a4-bf21-175f0261ac5d.jpg?v=1736787185',
  'https://shop.mattel.com/cdn/shop/files/fw6cf2schrhqje1pqfzj.jpg?v=1751045162',
  'https://shop.mattel.com/cdn/shop/files/oz3iehxa0qpel57prolu.jpg?v=1751045157',
  'https://shop.mattel.com/cdn/shop/files/rcnqr5v1jim333xqvhdi.jpg?v=1736448104',
]

export default function SolicitudDetalle() {
  const { solicitudId } = useParams()
  const navigate = useNavigate()

  const solicitud = MOCK_SOLICITUDES.find((s) => s.id === solicitudId)

  if (!solicitud) {
    return (
      <div className="px-6 py-10">
        <p className="text-text-secondary">Solicitud no encontrada.</p>
      </div>
    )
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/proveedor' },
          { label: 'Mis solicitudes', to: '/proveedor/solicitudes' },
          { label: `Solicitud ${solicitud.code}` },
        ]}
      />

      <div className="px-6 pb-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h1 className="font-sans text-xl font-bold text-text-primary mb-1">
              Solicitud {solicitud.code}
            </h1>
            <p className="text-sm text-text-secondary">
              Comprador: Juanita Solis — {solicitud.products.length} productos solicitados
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-3">
              Especificaciones del comprador
            </h3>
            <div className="bg-bg-main rounded-sm border border-border p-4">
              <p className="text-sm text-text-secondary leading-relaxed">
                Necesitamos muñecas de la línea Wicked y Frozen para la temporada navideña 2026.
                Requerimos variedad de colores y tamaños. Incluir información de empaque individual
                y master. Precio competitivo para volumen mínimo de 500 unidades por SKU.
                Tiempo de entrega máximo: 45 días.
              </p>
            </div>
          </div>

          {/* Reference images */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-3">
              Imágenes o referencias del producto solicitado
            </h3>
            <div className="flex gap-3 flex-wrap">
              {MOCK_IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Referencia ${i + 1}`}
                  className="w-28 h-28 rounded-md object-cover border border-border"
                />
              ))}
            </div>
          </div>

          {/* Attached documents */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-3">
              Archivos del producto solicitado
            </h3>
            <div className="space-y-3">
              {MOCK_DOCS.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between py-2 px-3 bg-bg-main rounded-sm border border-border"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-coppel-blue" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                      <p className="text-xs text-text-muted">{doc.type}</p>
                    </div>
                  </div>
                  <button className="text-coppel-blue hover:text-coppel-blue-hover transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-3">
              Siguientes pasos
            </h3>
            <p className="text-sm text-text-secondary mb-5">
              Carga los productos que interesaron al comprador. Si son pocos, hazlo de forma
              individual. Si son muchos, usa la plantilla de Excel para carga masiva.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/proveedor/solicitudes/${solicitudId}/carga-individual`)}
              >
                Carga individual
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(`/proveedor/solicitudes/${solicitudId}/carga-masiva`)}
              >
                Carga masiva
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
