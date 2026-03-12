import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Edit3, Send } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { useNotificationStore } from '../../stores/useNotificationStore'
import { MOCK_PRODUCTS } from '../../data/mockProducts'
import { formatCurrency, formatPercent } from '../../utils/formatCurrency'

export default function FichaTecnica() {
  const { propuestaId } = useParams()
  const navigate = useNavigate()
  const { addNotification } = useNotificationStore()
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const product = MOCK_PRODUCTS.find((p) => p.id === propuestaId)

  if (!product) {
    return (
      <div className="px-6 py-10">
        <p className="text-text-secondary">Propuesta no encontrada.</p>
      </div>
    )
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/proveedor' },
          { label: 'Mis propuestas', to: '/proveedor/propuestas' },
          { label: product.name },
        ]}
      />

      <div className="px-6 pb-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Product header */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <div className="flex gap-6">
              <div className="w-40 h-40 shrink-0 rounded-md overflow-hidden bg-bg-main">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="font-sans text-xl font-bold text-text-primary">
                      {product.name}
                    </h1>
                    <p className="text-sm text-text-secondary mt-1">
                      Marca: {product.brand} — Modelo: {product.model}
                    </p>
                  </div>
                  <Badge status={product.status} />
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="sm" icon={<Edit3 className="w-4 h-4" />}>
                    Editar
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Send className="w-4 h-4" />}
                    onClick={() => setShowConfirm(true)}
                  >
                    Enviar a revisión
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Información general */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-4">
              Información general
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Artículo:</span>{' '}
                <span className="font-medium text-text-primary">{product.name}</span>
              </div>
              <div>
                <span className="text-text-muted">Tipo de producto:</span>{' '}
                <span className="font-medium text-text-primary">{product.productType}</span>
              </div>
              <div>
                <span className="text-text-muted">País de origen:</span>{' '}
                <span className="font-medium text-text-primary">China</span>
              </div>
              <div>
                <span className="text-text-muted">Marca:</span>{' '}
                <span className="font-medium text-text-primary">{product.brand}</span>
              </div>
              <div>
                <span className="text-text-muted">Modelo:</span>{' '}
                <span className="font-medium text-text-primary">{product.model}</span>
              </div>
              <div>
                <span className="text-text-muted">Categoría:</span>{' '}
                <span className="font-medium text-text-primary">{product.category}</span>
              </div>
              <div>
                <span className="text-text-muted">Clase:</span>{' '}
                <span className="font-medium text-text-primary">{product.classCode}</span>
              </div>
              <div>
                <span className="text-text-muted">Familia:</span>{' '}
                <span className="font-medium text-text-primary">{product.family}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <span className="text-sm text-text-muted">Comentarios:</span>
              <p className="text-sm text-text-primary mt-1 leading-relaxed">
                Muñeca coleccionable de la línea Wicked, personaje Elphaba. Incluye vestido verde
                con detalles bordados, sombrero puntiagudo, capa y escoba. Articulaciones en
                hombros, codos y rodillas. Altura: 30 cm.
              </p>
            </div>
          </div>

          {/* Información comercial */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-4">
              Información comercial
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Costo:</span>{' '}
                <span className="font-medium text-text-primary">{formatCurrency(product.cost)}</span>
              </div>
              <div>
                <span className="text-text-muted">Precio de venta sugerido:</span>{' '}
                <span className="font-medium text-text-primary">{formatCurrency(product.salePrice)}</span>
              </div>
              <div>
                <span className="text-text-muted">Margen:</span>{' '}
                <span className="font-medium text-text-primary">{formatPercent(product.margin)}</span>
              </div>
              <div>
                <span className="text-text-muted">Mínimo de compra:</span>{' '}
                <span className="font-medium text-text-primary">12 piezas</span>
              </div>
              <div>
                <span className="text-text-muted">Tiempo de entrega:</span>{' '}
                <span className="font-medium text-text-primary">7 días</span>
              </div>
              <div>
                <span className="text-text-muted">IVA:</span>{' '}
                <span className="font-medium text-text-primary">16%</span>
              </div>
              <div>
                <span className="text-text-muted">Precio de promoción:</span>{' '}
                <span className="font-medium text-text-primary">{formatCurrency(899)}</span>
              </div>
              <div>
                <span className="text-text-muted">Precio temporada:</span>{' '}
                <span className="font-medium text-text-primary">{formatCurrency(859)}</span>
              </div>
            </div>
          </div>

          {/* Imágenes */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-4">
              Imágenes del producto
            </h3>
            <div className="flex gap-3 flex-wrap">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-28 h-28 rounded-md object-cover border border-border"
              />
              <img
                src={product.imageUrl}
                alt="Ángulo 2"
                className="w-28 h-28 rounded-md object-cover border border-border scale-x-[-1]"
              />
              <img
                src={product.imageUrl}
                alt="Detalle"
                className="w-28 h-28 rounded-md object-cover border border-border brightness-105 saturate-110"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Enviar a revisión"
        message={`¿Deseas enviar "${product.name}" a revisión del comprador?`}
        confirmLabel="Enviar"
        onConfirm={() => {
          setShowConfirm(false)
          addNotification({
            title: 'Propuesta enviada a revisión',
            message: `Mattel S.A. de C.V. ha enviado "${product.name}" para tu revisión.`,
            targetRole: 'comprador',
            link: `/comprador/propuestas/sup-001`,
          })
          setShowSuccess(true)
        }}
      />

      <ConfirmModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false)
          navigate('/proveedor/solicitudes')
        }}
        onConfirm={() => {}}
        title="Enviado exitosamente"
        message="La propuesta ha sido enviada al comprador para su revisión."
        variant="success"
      />
    </div>
  )
}
