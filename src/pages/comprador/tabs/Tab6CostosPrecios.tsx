import { useState } from 'react'
import { Plus } from 'lucide-react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Checkbox from '../../../components/ui/Checkbox'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'
import { formatPercent } from '../../../utils/formatCurrency'

interface ConceptRow {
  id: number
  concepto: string
  porcentaje: number
}

const FRACCION_OPTIONS = [
  { value: '', label: 'Seleccione una fracción arancelaria' },
  { value: '9503.00.99', label: '9503.00.99 - Juguetes' },
  { value: '9503.00.01', label: '9503.00.01 - Triciclos y montables' },
]

const GASTO_IMPORT_OPTIONS = [
  { value: 'gastos_importacion', label: 'Gastos importación' },
  { value: 'agente_aduanal', label: 'Agente aduanal' },
  { value: 'maniobras', label: 'Maniobras' },
  { value: 'almacenaje', label: 'Almacenaje' },
]

const FLETE_OPTIONS = [
  { value: '', label: 'Seleccione un tipo de flete' },
  { value: 'maritimo', label: 'Marítimo' },
  { value: 'aereo', label: 'Aéreo' },
  { value: 'terrestre', label: 'Terrestre' },
]

export default function Tab6CostosPrecios() {
  const { markTabComplete } = useSkuFormStore()
  const [sobreprecios, setSobreprecios] = useState<ConceptRow[]>([
    { id: 1, concepto: 'cosmesticos_y_detactilados', porcentaje: 2 },
  ])
  const [comisiones, setComisiones] = useState<ConceptRow[]>([
    { id: 1, concepto: 'regalias', porcentaje: 9 },
  ])
  const [gastosImport, setGastosImport] = useState<ConceptRow[]>([
    { id: 1, concepto: 'gastos_importacion', porcentaje: 4 },
  ])
  const [aplicaPreferencial, setAplicaPreferencial] = useState(false)
  const [cuotaCompensatoria, setCuotaCompensatoria] = useState(false)

  const handleSave = () => {
    markTabComplete('costos-precios')
  }

  const renderConceptTable = (
    items: ConceptRow[],
    setItems: (items: ConceptRow[]) => void,
    label: string,
    addLabel: string,
    options: { value: string; label: string }[]
  ) => {
    const total = items.reduce((sum, item) => sum + item.porcentaje, 0)
    return (
      <div className="space-y-3">
        <h4 className="font-sans text-sm font-semibold text-text-primary">{label}</h4>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <Select
              label="Concepto"
              options={options}
              value={item.concepto}
            />
            <Input
              label="Porcentaje"
              type="number"
              value={String(item.porcentaje)}
              suffix="%"
            />
            <div />
          </div>
        ))}
        <button
          onClick={() => setItems([...items, { id: items.length + 1, concepto: '', porcentaje: 0 }])}
          className="text-sm text-coppel-blue font-medium hover:underline inline-flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> {addLabel}
        </button>
        <p className="text-sm font-semibold text-text-primary">Porcentaje total de {label.toLowerCase()}: {total}%</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Precio de venta */}
      <FormSection title="Precio de venta" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Ingrese o ajuste los precios de venta interior y frontera según la información proporcionada por el proveedor.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input label="Precio de venta sugerido LCD (Proveedor)" value="$490" disabled />
          <Input label="Precio de venta sugerido MXN (Proveedor)" value="$2,890.00" disabled />
          <div />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input label="Propuesta interior sin redondeo" value="$1,290.00" disabled />
          <Input label="Propuesta interior con redondeo" value="$1,899.00" disabled />
          <Input label="Precio de venta interior*" value="$2,199.00" required suffix="$" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Propuesta frontera sin redondeo" value="$1,200.00" disabled />
          <Input label="Propuesta frontera con redondeo" value="$1,899.00" disabled />
          <Input label="Precio de venta frontera*" value="$2,199.00" required suffix="$" />
        </div>
      </FormSection>

      {/* Costos y precio de venta */}
      <FormSection title="Costos y precio de venta" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Ingrese el costo base, seleccione el arancel correspondiente y agregue los gastos aplicables. Complete el tipo y costo de flete para calcular el costo total.
        </p>

        {/* Costo */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Costo</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input label="Costo unitario*" type="number" placeholder="0.00" required />
          <Input label="Costo Interior*" type="number" placeholder="$1,399.00" required />
          <Input label="Costo Moneda*" type="number" placeholder="$1,196.40" required />
        </div>

        {/* Arancel */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Arancel</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Select label="Fracción arancelaria*" options={FRACCION_OPTIONS} required />
          <Input label="Ad Valorem Interior" type="number" placeholder="0" suffix="%" />
          <Input label="Arancel frontera" type="number" placeholder="0" suffix="%" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input label="PROSEC" type="number" placeholder="0" suffix="%" />
          <Input label="Arancel IMMEX" type="number" placeholder="0" suffix="%" />
          <Input label="Cuota frontera" type="number" placeholder="0" suffix="%" />
        </div>

        <div className="flex flex-wrap gap-6 mb-4">
          <Checkbox
            label="¿Aplica arancel preferencial?"
            checked={aplicaPreferencial}
            onChange={setAplicaPreferencial}
          />
          <Checkbox
            label="¿Aplica cuota compensatoria?"
            checked={cuotaCompensatoria}
            onChange={setCuotaCompensatoria}
          />
        </div>

        {aplicaPreferencial && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input label="Arancel preferencial" type="number" suffix="%" />
          </div>
        )}

        {cuotaCompensatoria && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Select
              label="Tipo de cuota compensatoria*"
              options={[
                { value: 'ad_valorem', label: 'Ad valorem' },
                { value: 'especifica', label: 'Específica' },
              ]}
            />
            <Input label="Cuota compensatoria*" type="number" suffix="%" />
          </div>
        )}

        <a href="#" className="text-sm text-coppel-blue font-medium hover:underline mb-6 inline-block">
          ¿Qué es el arancel preferencial?
        </a>

        {/* Gastos importación */}
        <div className="border-t border-border pt-5 mt-5">
          <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Gastos</h4>
          {gastosImport.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-3">
              <Select
                label="Concepto*"
                options={GASTO_IMPORT_OPTIONS}
                value={item.concepto}
              />
              <Input
                label="Porcentaje"
                type="number"
                value={String(item.porcentaje)}
                suffix="%"
              />
              <div />
            </div>
          ))}
          <button
            onClick={() => setGastosImport([...gastosImport, { id: gastosImport.length + 1, concepto: '', porcentaje: 0 }])}
            className="text-sm text-coppel-blue font-medium hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Agregar gasto
          </button>
          <p className="text-sm font-semibold text-text-primary mt-2">
            Porcentaje total de gastos: {gastosImport.reduce((s, g) => s + g.porcentaje, 0)}%
          </p>
        </div>

        {/* Flete */}
        <div className="border-t border-border pt-5 mt-5">
          <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Flete</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select label="Tipo de flete" options={FLETE_OPTIONS} />
            <Input label="Costo de flete" type="number" placeholder="0.00" suffix="$" />
            <Input label="Porcentaje flete" type="number" placeholder="0" suffix="%" />
          </div>
        </div>
      </FormSection>

      {/* Cálculos comerciales */}
      <FormSection title="Cálculos comerciales" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Ingrese los impuestos, sobreprecios, comisiones y factores para calcular el precio y la utilidad del producto.
        </p>

        {/* Impuestos */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Impuestos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input label="IVA interior*" value="16" suffix="%" />
          <Input label="IVA frontera*" value="16" suffix="%" />
        </div>

        {/* Sobreprecios */}
        <div className="border-t border-border pt-5">
          {renderConceptTable(
            sobreprecios,
            setSobreprecios,
            'Sobreprecios',
            'Agregar concepto sobreprecio',
            [
              { value: 'cosmesticos_y_detactilados', label: 'Cosméticos y detactilados' },
              { value: 'factor_logistico', label: 'Factor logístico' },
              { value: 'factor_comercial', label: 'Factor comercial' },
            ]
          )}
        </div>

        {/* Comisiones y regalías */}
        <div className="border-t border-border pt-5 mt-5">
          {renderConceptTable(
            comisiones,
            setComisiones,
            'Comisiones y regalías',
            'Agregar comisión/regalía',
            [
              { value: 'regalias', label: 'Regalías' },
              { value: 'comision', label: 'Comisión' },
            ]
          )}
        </div>

        {/* Factizal */}
        <div className="border-t border-border pt-5 mt-5">
          <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Factizal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input label="Periodo conteo" type="number" placeholder="0" />
            <Input label="Periodo(s) contratado(s)" type="number" placeholder="0" />
          </div>
          <div className="bg-coppel-blue-light rounded-md p-4">
            <span className="text-sm text-text-muted">Margen de utilidad:</span>{' '}
            <span className="font-sans text-lg font-bold text-coppel-blue">{formatPercent(47)}</span>
          </div>
        </div>

        {/* Factor de utilidad y margen */}
        <div className="border-t border-border pt-5 mt-5">
          <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Factor de utilidad y margen</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Factor nacional" value="1.31" />
            <Input label="Margen marcaje nacional" value="24" suffix="%" />
            <div />
            <Input label="Factor importación" value="1.31" />
            <Input label="Margen marcaje importación" value="24" suffix="%" />
            <div />
            <Input label="Factor código" value="1.24" />
            <Input label="Margen marcaje código" value="19" suffix="%" />
          </div>
        </div>
      </FormSection>
    </div>
  )
}
