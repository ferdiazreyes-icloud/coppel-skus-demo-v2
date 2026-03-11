import { useState } from 'react'
import { Plus } from 'lucide-react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'
import { formatPercent } from '../../../utils/formatCurrency'

interface ConceptRow {
  id: number
  concepto: string
  porcentaje: number
}

export default function Tab6CostosPrecios() {
  const { markTabComplete } = useSkuFormStore()
  const [sobreprecios, setSobreprecios] = useState<ConceptRow[]>([
    { id: 1, concepto: 'factor_logistico', porcentaje: 2 },
  ])
  const [comisiones, setComisiones] = useState<ConceptRow[]>([
    { id: 1, concepto: 'regalias', porcentaje: 9 },
  ])
  const [gastos, setGastos] = useState<ConceptRow[]>([
    { id: 1, concepto: 'gasto', porcentaje: 4 },
  ])

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
        <p className="text-sm font-semibold text-text-primary">Total: {total}%</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Costos y precio de venta */}
      <FormSection title="Costos y precio de venta" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Completa la información clave del producto para definir su tipo de marca, estatus y clasificación comercial.
        </p>

        {/* Costo */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Costo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input label="Costo interior" type="number" placeholder="0.00" required />
          <Input label="Costo frontera" type="number" placeholder="0.00" required />
        </div>

        {/* Impuestos */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Impuestos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input label="IVA interior" value="16" suffix="%" />
          <Input label="IVA frontera" value="16" suffix="%" />
        </div>

        {/* Factor de utilidad */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Factor de utilidad y margen</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input label="Factor nacional" value="1.31" />
          <Input label="Margen marcaje nacional" value="24" suffix="%" />
          <div />
          <Input label="Factor importación" value="1.31" />
          <Input label="Margen marcaje importación" value="24" suffix="%" />
          <div />
          <Input label="Factor código" value="1.24" />
          <Input label="Margen marcaje código" value="19" suffix="%" />
        </div>
        <div className="bg-coppel-blue-light rounded-md p-4 mb-6">
          <span className="text-sm text-text-muted">Margen de utilidad:</span>{' '}
          <span className="font-sans text-lg font-bold text-coppel-blue">{formatPercent(47)}</span>
        </div>

        {/* Precio de venta */}
        <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">Precio de venta</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Precio de venta sugerido (Proveedor)" value="2189.00" suffix="$" disabled />
          <div />
          <Input label="Propuesta interior sin redondeo" value="1200.00" disabled />
          <Input label="Propuesta interior con redondeo" value="2199.00" disabled />
          <Input label="Precio de venta interior" value="2199.00" required suffix="$" />
        </div>
      </FormSection>

      {/* Costos y márgenes */}
      <FormSection title="Costos y márgenes" onSave={handleSave}>
        <div className="space-y-6">
          {renderConceptTable(
            sobreprecios,
            setSobreprecios,
            'Sobreprecio',
            'Agregar concepto sobreprecio',
            [
              { value: 'factor_logistico', label: 'Factor logístico' },
              { value: 'factor_comercial', label: 'Factor comercial' },
            ]
          )}

          <div className="border-t border-border pt-5">
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

          <div className="border-t border-border pt-5">
            {renderConceptTable(
              gastos,
              setGastos,
              'Gastos',
              'Agregar gasto',
              [
                { value: 'gasto', label: 'Gasto' },
                { value: 'flete', label: 'Flete' },
              ]
            )}
          </div>
        </div>
      </FormSection>
    </div>
  )
}
