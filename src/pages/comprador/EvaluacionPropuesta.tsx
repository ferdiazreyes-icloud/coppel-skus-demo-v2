import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import NumberInput from '../../components/ui/NumberInput'
import Textarea from '../../components/ui/Textarea'
import DateRangePicker from '../../components/ui/DateRangePicker'
import Checkbox from '../../components/ui/Checkbox'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { useNotificationStore } from '../../stores/useNotificationStore'
import { MOCK_PRODUCTS, MOCK_SOLICITUDES } from '../../data/mockProducts'
import { formatCurrency, formatPercent } from '../../utils/formatCurrency'

export default function EvaluacionPropuesta() {
  const { proveedorId, productoId } = useParams()
  const navigate = useNavigate()

  const product = MOCK_PRODUCTS.find((p) => p.id === productoId)
  const solicitud = MOCK_SOLICITUDES.find((s) => s.supplierId === proveedorId)
  const supplierName = solicitud?.supplierName || 'Proveedor'

  const [quantity, setQuantity] = useState(1)
  const [specs, setSpecs] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [participaPlaneacion, setParticipaPlaneacion] = useState(false)
  const [solicitarInfo, setSolicitarInfo] = useState(false)
  const [especificarReceptor, setEspecificarReceptor] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addNotification } = useNotificationStore()

  if (!product) {
    return (
      <div className="px-6 py-10">
        <p className="text-text-secondary">Producto no encontrado.</p>
      </div>
    )
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/comprador' },
          { label: "Propuestas y SKU's", to: '/comprador' },
          { label: 'Bandeja de solicitudes', to: '/comprador' },
          { label: supplierName, to: `/comprador/propuestas/${proveedorId}` },
          { label: 'Solicitar muestra' },
        ]}
      />

      <div className="px-6 pb-10">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Product card */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <div className="flex gap-6">
              {/* Thumbnail */}
              <div className="w-36 h-36 shrink-0 rounded-md overflow-hidden bg-bg-main">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-lg font-bold text-text-primary">
                      {product.name}
                    </h2>
                    <p className="text-sm text-text-secondary">Marca: {product.brand}</p>
                  </div>
                  <Badge status={product.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mt-4 text-sm">
                  <div>
                    <span className="text-text-muted">Tipo de proveedor:</span>{' '}
                    <span className="font-semibold text-text-primary">{product.supplierType}</span>
                  </div>
                  <div>
                    <span className="text-text-muted">Modelo:</span>{' '}
                    <span className="font-semibold text-text-primary">{product.model}</span>
                  </div>
                  <div>
                    <NumberInput
                      label="Cantidad"
                      value={quantity}
                      onChange={setQuantity}
                      min={1}
                      max={999}
                    />
                  </div>
                  <div>
                    <span className="text-text-muted">Precio venta:</span>{' '}
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(product.salePrice)}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted">Costo:</span>{' '}
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(product.cost)}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-muted">Margen:</span>{' '}
                    <span className="font-semibold text-text-primary">
                      {formatPercent(product.margin)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-4">
              Especificaciones
            </h3>
            <Textarea
              placeholder="Escribe las especificaciones o comentarios para la muestra..."
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              maxChars={100}
            />
          </div>

          {/* Delivery address */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-4">
              Dirección de entrega
            </h3>
            <Button
              variant="outline"
              icon={<MapPin className="w-4 h-4" />}
              className="w-full"
            >
              Elegir dirección
            </Button>
          </div>

          {/* Delivery date range */}
          <div className="bg-bg-card rounded-md border border-border p-6">
            <h3 className="font-sans text-base font-semibold text-text-primary mb-4">
              Rango de entrega
            </h3>
            <DateRangePicker
              startValue={startDate}
              endValue={endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
            />
          </div>

          {/* Checkboxes */}
          <div className="bg-bg-card rounded-md border border-border p-6 space-y-4">
            <Checkbox
              label="Participa en planeación"
              checked={participaPlaneacion}
              onChange={setParticipaPlaneacion}
            />
            <Checkbox
              label="Solicitar información para alta"
              checked={solicitarInfo}
              onChange={setSolicitarInfo}
            />
            <Checkbox
              label="Especificar quien recibe la muestra"
              checked={especificarReceptor}
              onChange={setEspecificarReceptor}
            />
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              className="w-full max-w-xs"
              onClick={() => setShowConfirm(true)}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Solicitar muestra"
        message={`¿Deseas solicitar muestra de "${product.name}" al proveedor ${supplierName}?`}
        confirmLabel="Solicitar"
        onConfirm={() => {
          setShowConfirm(false)
          addNotification({
            title: 'Solicitud de muestra',
            message: `Juanita Solis ha solicitado muestra de ${product.name}.`,
            targetRole: 'proveedor',
            link: '/proveedor/solicitudes/sol-001',
          })
          setShowSuccess(true)
        }}
      />

      <ConfirmModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false)
          navigate(`/comprador/propuestas/${proveedorId}`)
        }}
        onConfirm={() => {}}
        title="Solicitud enviada"
        message="La solicitud de muestra ha sido enviada al proveedor exitosamente."
        variant="success"
      />
    </div>
  )
}
