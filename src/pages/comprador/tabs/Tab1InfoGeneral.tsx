import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Textarea from '../../../components/ui/Textarea'
import RadioGroup from '../../../components/ui/RadioGroup'
import NumberInput from '../../../components/ui/NumberInput'
import Button from '../../../components/ui/Button'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

const ORIGINS = [
  { value: 'nacional', label: 'Nacional' },
  { value: 'importacion', label: 'Importación' },
]

const COUNTRIES = [
  { value: 'china', label: 'China' },
  { value: 'mexico', label: 'México' },
  { value: 'usa', label: 'Estados Unidos' },
]

const WEIGHT_UNITS = [
  { value: 'kg', label: 'Kilogramos kg' },
  { value: 'g', label: 'Gramos g' },
  { value: 'lb', label: 'Libras lb' },
]

const MEASURE_UNITS = [
  { value: 'cm', label: 'Centímetros' },
  { value: 'in', label: 'Pulgadas' },
  { value: 'm', label: 'Metros' },
]

const STATUS_OPTIONS = [
  { value: 'en_linea', label: 'En línea' },
  { value: 'descontinuado', label: 'Descontinuado' },
]

const DELIVERY_MODES = [
  { value: 'estandar', label: 'Estándar' },
  { value: 'express', label: 'Express' },
]

export default function Tab1InfoGeneral() {
  const { markTabComplete } = useSkuFormStore()
  const [pieces, setPieces] = useState(1)
  const [contents, setContents] = useState([{ name: 'Contenido 1', qty: 1 }])

  const addContent = () => {
    setContents([...contents, { name: `Contenido ${contents.length + 1}`, qty: 1 }])
  }

  const removeContent = (index: number) => {
    setContents(contents.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    markTabComplete('informacion-general')
  }

  return (
    <div className="space-y-5">
      {/* Datos del producto */}
      <FormSection title="Datos del producto" showInfoToggle onSave={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Categoría" options={[{ value: '10', label: '10-Juguetes' }]} required />
          <Select label="Sub Categoría" options={[{ value: '31', label: '31-Bebés' }]} required />
          <Select label="Clase" options={[{ value: '03', label: '03-Juguetes' }]} required />
          <Select label="Familia" options={[{ value: '04', label: '04-Montable' }]} required />
          <Select label="Tipo de producto (PMd)" options={[{ value: 'montable', label: 'Montable' }]} required />
          <Input label="Artículo" placeholder="Montable" required />
          <Input label="Marca" placeholder="Marca" required />
          <Input label="Modelo" placeholder="Push car adventure" required />
        </div>
        <div className="mt-4">
          <RadioGroup
            label="Tipo de marca"
            options={[
              { value: 'propia', label: 'Marca propia' },
              { value: 'licencia', label: 'Licencia' },
            ]}
            value="propia"
            onChange={() => {}}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Select label="Haga una marca" options={[]} required />
        </div>
        <div className="mt-4">
          <Textarea label="Descripción de artículo" maxChars={500} required />
        </div>
      </FormSection>

      {/* Modelo */}
      <FormSection title="Modelo" onSave={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Modelo base" placeholder="Push Car" required />
          <Input label="Modelo etiqueta" placeholder="Push Car Adventure" required />
        </div>
      </FormSection>

      {/* Origen */}
      <FormSection title="Origen" onSave={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Origen" options={ORIGINS} value="importacion" />
          <Select label="País de origen" options={COUNTRIES} required />
          <Input label="Empresa importadora" placeholder="Nombre de la empresa importadora" required />
        </div>
      </FormSection>

      {/* No. Serie / MEI */}
      <FormSection title="No. Serie/MEI" onSave={handleSave}>
        <RadioGroup
          label="¿Aplica no. Serie / MEI?"
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
          ]}
          value="no"
          onChange={() => {}}
          required
        />
      </FormSection>

      {/* Tiempo de armado */}
      <FormSection title="Tiempo de armado total" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Captura el tiempo estimado que le tomaría a una persona promedio —no a un experto— armar este SKU.
        </p>
        <Input label="Tiempo de armado (minutos)" type="number" placeholder="0" required />
      </FormSection>

      {/* Estatus y canal */}
      <FormSection title="Estatus y canal" onSave={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Estatus" options={STATUS_OPTIONS} required />
          <div />
          <RadioGroup
            label="Compra/No compra"
            options={[
              { value: 'compra', label: 'Compra' },
              { value: 'no_compra', label: 'No compra' },
            ]}
            value="compra"
            onChange={() => {}}
            required
          />
          <RadioGroup
            label="Canal"
            options={[
              { value: 'unicanal', label: 'Unicanal' },
              { value: 'linea_extendida', label: 'Línea extendida' },
            ]}
            value="unicanal"
            onChange={() => {}}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Select label="Modo de entrega" options={DELIVERY_MODES} required />
        </div>
      </FormSection>

      {/* Medidas del producto armado */}
      <FormSection title="Medidas del producto armado" showInfoToggle onSave={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre del producto armado" required />
          <Select label="Unidad de Peso" options={WEIGHT_UNITS} required />
          <Input label="Peso" type="number" placeholder="6.94" required />
          <NumberInput label="Número de piezas" value={pieces} onChange={setPieces} min={1} required />
          <Select label="Unidad de medida" options={MEASURE_UNITS} required />
          <Input label="Alto" type="number" required />
          <Input label="Diámetro (si aplica)" type="number" />
          <Input label="Frente" type="number" required />
          <Input label="Fondo" type="number" required />
        </div>
        <div className="mt-4">
          <Button variant="outline" icon={<Plus className="w-4 h-4" />}>
            Agregar producto armado
          </Button>
        </div>
      </FormSection>

      {/* Artículos incluidos */}
      <FormSection title="Artículos incluidos" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Especifica los artículos y accesorios que conforman el contenido del paquete.
        </p>
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium text-text-primary">Contenido*</th>
              <th className="text-left py-2 font-medium text-text-primary w-32">Cantidad*</th>
              <th className="w-16" />
            </tr>
          </thead>
          <tbody>
            {contents.map((item, i) => (
              <tr key={i} className="border-b border-border">
                <td className="py-2 pr-4">
                  <Input value={item.name} onChange={() => {}} />
                </td>
                <td className="py-2">
                  <NumberInput
                    value={item.qty}
                    onChange={(v) => {
                      const next = [...contents]
                      next[i] = { ...next[i], qty: v }
                      setContents(next)
                    }}
                    min={1}
                  />
                </td>
                <td className="py-2 text-center">
                  <button
                    onClick={() => removeContent(i)}
                    className="text-error hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addContent}
          className="text-sm text-coppel-blue font-medium hover:underline inline-flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Agregar contenido
        </button>
      </FormSection>
    </div>
  )
}
