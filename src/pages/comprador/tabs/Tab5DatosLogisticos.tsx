import { useState } from 'react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import RadioGroup from '../../../components/ui/RadioGroup'
import NumberInput from '../../../components/ui/NumberInput'
import Checkbox from '../../../components/ui/Checkbox'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

const CEDIS_DATA = [
  { id: 'mtr', name: 'CEDIS Coppel Monterrey (MTR)', cedis: 'xxxxxxx', freq: 'xxxxxxxx', lead: 'xxxxxxxx', destino: 'MTY, CULC, HILLO/TGRD/OPC', selected: true },
  { id: 'clcn', name: 'CEDIS Coppel Culiacán (CLCN)', cedis: 'xxxxxxx', freq: 'xxxxxxxx', lead: 'xxxxxxxx', destino: 'CULC, MZTL, LPZ', selected: true },
  { id: 'gdl', name: 'CEDIS Coppel Guadalajara (GDL)', cedis: 'xxxxxxx', freq: 'xxxxxxxx', lead: 'xxxxxxxx', destino: 'GDL, AGS, ZAC', selected: true },
  { id: 'cdmx', name: 'CEDIS Coppel CDMX (CDMX)', cedis: 'xxxxxxx', freq: 'xxxxxxxx', lead: 'xxxxxxxx', destino: 'CDMX, PUE, QRO', selected: false },
]

const WEIGHT_UNITS = [
  { value: 'kg', label: 'Kilogramos kg' },
  { value: 'g', label: 'Gramos g' },
]

const MEASURE_UNITS = [
  { value: 'cm', label: 'Centímetros' },
  { value: 'in', label: 'Pulgadas' },
]

export default function Tab5DatosLogisticos() {
  const { markTabComplete } = useSkuFormStore()
  const [pieces, setPieces] = useState(1)
  const [masterQty, setMasterQty] = useState(1)
  const [pcsContainer, setPcsContainer] = useState(500)
  const [moq, setMoq] = useState(1000)

  const handleSave = () => {
    markTabComplete('datos-logisticos')
  }

  return (
    <div className="space-y-5">
      {/* Datos de fábrica */}
      <FormSection title="Datos de fábrica" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Información del fabricante y origen de producción del producto importado.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre de fábrica" placeholder="Nombre del fabricante" required />
          <Input label="País de fabricación" placeholder="China" required />
          <Input label="Puerto de embarque" placeholder="Shanghai" required />
          <Input label="Tiempo de tránsito (días)" type="number" placeholder="45" required />
        </div>
      </FormSection>

      {/* Piezas contenedor y MOQ */}
      <FormSection title="Piezas contenedor y MOQ" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Define la cantidad de piezas por contenedor y el mínimo de orden (MOQ).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Tipo de contenedor"
            options={[
              { value: '20ft', label: '20 pies' },
              { value: '40ft', label: '40 pies' },
              { value: '40hc', label: '40 pies HC' },
            ]}
            required
          />
          <NumberInput label="Piezas por contenedor" value={pcsContainer} onChange={setPcsContainer} min={1} required />
          <NumberInput label="MOQ (mínimo de orden)" value={moq} onChange={setMoq} min={1} required />
        </div>
      </FormSection>

      {/* Datos logísticos */}
      <FormSection title="Datos logísticos" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Consulta la configuración y los centros logísticos asociados a este producto.
        </p>

        {/* Configuración logística */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Configuración logística</h4>
        <Select
          label="Tipo de excepción de distribución"
          options={[{ value: 'logistica', label: 'Logística_códigos excepción' }]}
        />

        {/* CEDIS table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-coppel-navy text-white">
                <th className="w-10 px-3 py-2" />
                <th className="px-4 py-2 text-left font-semibold">Receptor</th>
                <th className="px-4 py-2 text-left font-semibold">CEDIS</th>
                <th className="px-4 py-2 text-left font-semibold">Frecuencia</th>
                <th className="px-4 py-2 text-left font-semibold">Lead time</th>
                <th className="px-4 py-2 text-left font-semibold">CEDIS destino</th>
              </tr>
            </thead>
            <tbody>
              {CEDIS_DATA.map((row, i) => (
                <tr key={row.id} className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}>
                  <td className="px-3 py-2">
                    <Checkbox checked={row.selected} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-2 text-text-primary font-medium">{row.name}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.cedis}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.freq}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.lead}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.destino}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <a href="#" className="text-sm text-coppel-blue font-medium hover:underline mt-3 inline-block">
          Ir a la configuración logística
        </a>
      </FormSection>

      {/* Medidas con empaque individual */}
      <FormSection title="Medidas con empaque individual" showInfoToggle onSave={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Unidad de peso" options={WEIGHT_UNITS} required />
          <Input label="Peso" type="number" required />
          <NumberInput label="Número de piezas" value={pieces} onChange={setPieces} min={1} required />
          <Select label="Unidad de medida" options={MEASURE_UNITS} required />
          <Input label="Alto" type="number" required />
          <Input label="Frente" type="number" required />
          <Input label="Fondo" type="number" required />
          <Input label="Estiba máxima" type="number" />
          <Input label="Cartón máximo" type="number" />
        </div>
      </FormSection>

      {/* Empaques del producto */}
      <FormSection title="Empaques del producto" onSave={handleSave}>
        <RadioGroup
          label="¿Qué aplica para mi producto?"
          options={[
            { value: 'carton', label: 'Cartón master' },
            { value: 'bulto', label: 'Bulto' },
          ]}
          value="carton"
          onChange={() => {}}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <NumberInput label="Cantidad de uds cartón máster" value={masterQty} onChange={setMasterQty} min={1} required />
          <Input label="Múltiple cartón máster" type="number" required />
          <Select label="Unidad de peso" options={WEIGHT_UNITS} required />
          <Input label="Peso" type="number" required />
          <Select label="Unidad de medida" options={MEASURE_UNITS} required />
          <Input label="Alto" type="number" required />
          <Input label="Frente" type="number" required />
          <Input label="Fondo" type="number" required />
        </div>
      </FormSection>

      {/* Entrega y manipulación */}
      <FormSection title="Entrega y manipulación" showInfoToggle onSave={handleSave}>
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Pallet</h4>
        <RadioGroup
          label="¿La entrega puede ser paletizable?"
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' },
          ]}
          value="si"
          onChange={() => {}}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Select label="Unidad de medida" options={MEASURE_UNITS} required />
          <div />
          <Input label="Layout largo" type="number" required />
          <Input label="Layout ancho" type="number" required />
        </div>

        <div className="border-t border-border pt-4 mt-5">
          <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Acomodo</h4>
          <RadioGroup
            label="¿El producto puede acomodarse de distintas formas sin afectar calidad?"
            options={[
              { value: 'si', label: 'Sí' },
              { value: 'no', label: 'No' },
            ]}
            value="no"
            onChange={() => {}}
            required
          />
        </div>
      </FormSection>
    </div>
  )
}
