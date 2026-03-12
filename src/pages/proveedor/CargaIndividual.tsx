import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Trash2, Save } from 'lucide-react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import FormSection from '../../components/shared/FormSection'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Textarea from '../../components/ui/Textarea'
import FileUpload from '../../components/ui/FileUpload'
import Button from '../../components/ui/Button'
import { MOCK_SOLICITUDES } from '../../data/mockProducts'

const PRODUCT_TYPES = [
  { value: 'muneca', label: 'Muñeca' },
  { value: 'montable', label: 'Montable' },
  { value: 'juego_mesa', label: 'Juego de mesa' },
]

const COUNTRIES = [
  { value: 'china', label: 'China' },
  { value: 'mexico', label: 'México' },
  { value: 'usa', label: 'Estados Unidos' },
]

const IVA_OPTIONS = [
  { value: '16', label: '16%' },
  { value: '8', label: '8%' },
  { value: '0', label: '0%' },
]

export default function CargaIndividual() {
  const { solicitudId } = useParams()
  const navigate = useNavigate()
  const solicitud = MOCK_SOLICITUDES.find((s) => s.id === solicitudId)
  const solicitudCode = solicitud?.code || '#000000'

  const [productType, setProductType] = useState('muneca')

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/proveedor' },
          { label: 'Mis solicitudes', to: '/proveedor/solicitudes' },
          { label: `Solicitud ${solicitudCode}`, to: `/proveedor/solicitudes/${solicitudId}` },
          { label: 'Carga individual' },
        ]}
      />

      <div className="px-6 pb-10">
        <div className="max-w-3xl mx-auto space-y-5">
          <h1 className="font-sans text-xl font-bold text-text-primary">
            Carga individual de propuesta
          </h1>

          {/* Product type selector */}
          <div className="bg-bg-card rounded-md border border-border p-5">
            <Select
              label="Tipo de producto"
              options={PRODUCT_TYPES}
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            />
          </div>

          {/* Información general */}
          <FormSection title="Información general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Artículo" placeholder="Wicked - Elphaba" required />
              <Select label="Tipo de producto" options={PRODUCT_TYPES} value={productType} required />
              <Select label="País de origen" options={COUNTRIES} />
              <Input label="Marca" placeholder="Mattel" required />
              <Input label="Modelo" placeholder="1164823764" required />
              <Input label="URL de video del producto" placeholder="https://www.youtube.com/watch?v=..." />
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-text-primary block mb-1">
                Imágenes del producto
              </label>
              <FileUpload accept="image/*" />
            </div>

            <div className="mt-4">
              <Textarea
                label="Comentarios/Características"
                placeholder="Muñeca coleccionable de la línea Wicked, personaje Elphaba. Incluye vestido verde con detalles bordados, sombrero puntiagudo, capa y escoba. Articulaciones en hombros, codos y rodillas. Altura: 30 cm."
                maxChars={500}
              />
            </div>

            {/* Dynamic fields based on product type */}
            {productType === 'muneca' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <Input label="Altura de la muñeca" placeholder="30 cm" />
                <Input label="Material" placeholder="Plástico con detalles en tela" />
                <Input label="Accesorios incluidos" placeholder="Sombrero, capa y escoba" className="md:col-span-2" />
              </div>
            )}
            {productType === 'montable' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <Input label="Peso máximo soportado" placeholder="25 kg" />
                <Input label="Edad recomendada" placeholder="1-3 años" />
                <Input label="Material principal" placeholder="Plástico resistente" />
              </div>
            )}
          </FormSection>

          {/* Información comercial */}
          <FormSection title="Información comercial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Costo" type="number" placeholder="750.00" required suffix="$" />
              <Input label="Mínimo de compra" type="number" placeholder="12" required suffix="piezas" />
              <Input label="Tiempo de entrega" type="number" placeholder="7" required suffix="días" />
              <div />
              <Input label="Precio de venta sugerido" type="number" placeholder="1039.00" required suffix="$" />
              <Input label="Precio de promoción" type="number" placeholder="899.00" suffix="$" />
              <Input label="Precio de promoción por temporada" type="number" placeholder="859.00" suffix="$" />
              <Select label="IVA Interior" options={IVA_OPTIONS} />
            </div>
          </FormSection>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="danger"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => navigate(`/proveedor/solicitudes/${solicitudId}`)}
            >
              Eliminar propuesta
            </Button>
            <Button
              variant="primary"
              icon={<Save className="w-4 h-4" />}
              onClick={() => navigate(`/proveedor/solicitudes/${solicitudId}`)}
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
