import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import RadioGroup from '../../../components/ui/RadioGroup'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

const CLASIFICACION_OPTIONS = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'recompra', label: 'Recompra' },
  { value: 'sustitucion', label: 'Sustitución' },
]

const TEMPORADA_OPTIONS = [
  { value: 'permanente', label: 'Permanente' },
  { value: 'navidad', label: 'Navidad' },
  { value: 'dia_nino', label: 'Día del niño' },
  { value: 'verano', label: 'Verano' },
  { value: 'reyes', label: 'Reyes' },
]

const SEGMENTO_OPTIONS = [
  { value: 'infantil', label: 'Infantil' },
  { value: 'juvenil', label: 'Juvenil' },
  { value: 'adulto', label: 'Adulto' },
  { value: 'bebe', label: 'Bebé' },
]

export default function Tab9Clasificacion() {
  const { markTabComplete } = useSkuFormStore()

  const handleSave = () => {
    markTabComplete('clasificacion')
  }

  return (
    <div className="space-y-5">
      {/* Clasificación del producto */}
      <FormSection title="Clasificación del producto" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Define la clasificación comercial del producto para su correcta gestión en el catálogo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Tipo de alta" options={CLASIFICACION_OPTIONS} required />
          <Select label="Temporada" options={TEMPORADA_OPTIONS} required />
          <Select label="Segmento" options={SEGMENTO_OPTIONS} required />
          <Input label="Vida útil estimada (meses)" type="number" placeholder="24" />
        </div>
      </FormSection>

      {/* Clasificación arancelaria */}
      <FormSection title="Clasificación arancelaria" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Información arancelaria requerida para el despacho aduanal del producto importado.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Fracción arancelaria" placeholder="9503.00.99" required />
          <Input label="NICO" placeholder="00" />
          <Input label="Descripción arancelaria" placeholder="Los demás juguetes" />
          <Input label="Unidad de medida comercial" placeholder="Pieza" />
        </div>
      </FormSection>

      {/* Regulaciones y restricciones */}
      <FormSection title="Regulaciones y restricciones" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Indica si el producto está sujeto a regulaciones o restricciones no arancelarias.
        </p>
        <RadioGroup
          label="¿Requiere permiso de importación?"
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
          ]}
          value="no"
          onChange={() => {}}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <RadioGroup
            label="¿Sujeto a NOM?"
            options={[
              { value: 'si', label: 'Sí' },
              { value: 'no', label: 'No' },
            ]}
            value="si"
            onChange={() => {}}
            required
          />
          <Input label="NOM aplicable" placeholder="NOM-001-SCFI-2018" />
        </div>
      </FormSection>
    </div>
  )
}
