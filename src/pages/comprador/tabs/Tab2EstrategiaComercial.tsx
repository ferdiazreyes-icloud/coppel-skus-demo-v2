import { useState } from 'react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Checkbox from '../../../components/ui/Checkbox'
import Toggle from '../../../components/ui/Toggle'
import DatePicker from '../../../components/ui/DatePicker'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

const DISCOUNT_MONTHS = Array.from({ length: 13 }, (_, i) => ({
  month: i,
  days: i * 30,
  convenio: i === 0 ? 3 : 2,
  proveedor: 2,
  coppel: 2,
}))

export default function Tab2EstrategiaComercial() {
  const { markTabComplete } = useSkuFormStore()
  const [aplicaPreventa, setAplicaPreventa] = useState(true)
  const [aplicaDevolucion, setAplicaDevolucion] = useState(true)
  const [planDescuento, setPlanDescuento] = useState(true)

  const handleSave = () => {
    markTabComplete('estrategia-comercial')
  }

  return (
    <div className="space-y-5">
      {/* Condiciones de compra */}
      <FormSection title="Condiciones de compra" showInfoToggle onSave={handleSave}>
        <Input label="Mínimo a pedir (unidades)" type="number" placeholder="100" />
      </FormSection>

      {/* Preventa */}
      <FormSection title="Preventa" onSave={handleSave}>
        <div className="space-y-4">
          <Checkbox
            label="Aplica preventa"
            checked={aplicaPreventa}
            onChange={setAplicaPreventa}
          />
          {aplicaPreventa && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Unidades disponibles preventa" type="number" placeholder="200" required />
              <div />
              <DatePicker label="Fecha inicio preventa" required />
              <DatePicker label="Fecha final preventa" required />
              <DatePicker label="Fecha límite de venta al público" required />
            </div>
          )}
        </div>
      </FormSection>

      {/* Convenio de garantías */}
      <FormSection title="Convenio de garantías" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Configura el esquema de garantías aplicable a este producto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Esquema de garantías"
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
            ]}
          />
          <div />
          <Input
            label="Devoluciones por decisión del cliente"
            type="number"
            placeholder="10"
            suffix="Días para cambios o devoluciones"
          />
          <Input
            label="Garantía"
            type="number"
            placeholder="3"
            suffix="Meses de servicio de Garantía"
          />
        </div>
        <a href="#" className="text-sm text-coppel-blue font-medium hover:underline mt-4 inline-block">
          Ir al convenio de garantías
        </a>
      </FormSection>

      {/* Liquidación y descontinuados */}
      <FormSection title="Liquidación y descontinuados" showInfoToggle onSave={handleSave}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Plan de descuento"
              options={[
                { value: 'plan_a', label: 'Plan A' },
                { value: 'plan_b', label: 'Plan B' },
              ]}
            />
            <div className="flex items-end pb-1">
              <Toggle
                label="Prender/Apagar Plan de descuento"
                checked={planDescuento}
                onChange={setPlanDescuento}
              />
            </div>
          </div>

          <p className="text-sm text-text-secondary">
            DP (devaluación o provecho de mercancía): Define los porcentajes de descuento por mes para la liquidación del producto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Cobrar como"
              options={[
                { value: 'sellout', label: 'Sellout' },
                { value: 'sellin', label: 'Sell-in' },
              ]}
            />
          </div>

          <Checkbox
            label="Aplico devolución al mes 13"
            checked={aplicaDevolucion}
            onChange={setAplicaDevolucion}
          />

          {/* Discount table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-coppel-navy text-white">
                  <th className="px-3 py-2 text-left font-semibold">Mes</th>
                  <th className="px-3 py-2 text-left font-semibold">Días</th>
                  <th className="px-3 py-2 text-left font-semibold">% Convenio</th>
                  <th className="px-3 py-2 text-left font-semibold">% Proveedor*</th>
                  <th className="px-3 py-2 text-left font-semibold">% Coppel*</th>
                  <th className="px-3 py-2 text-left font-semibold">% Descuento</th>
                </tr>
              </thead>
              <tbody>
                {DISCOUNT_MONTHS.map((row, i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}>
                    <td className="px-3 py-2">{row.month}</td>
                    <td className="px-3 py-2">{row.days}</td>
                    <td className="px-3 py-2">{row.convenio}%</td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        defaultValue={row.proveedor}
                        className="w-16 h-8 px-2 text-sm text-center border border-border-input rounded-sm bg-bg-card"
                      />
                      %
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        defaultValue={row.coppel}
                        className="w-16 h-8 px-2 text-sm text-center border border-border-input rounded-sm bg-bg-card"
                      />
                      %
                    </td>
                    <td className="px-3 py-2 text-text-muted">Porcentaje</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a href="#" className="text-sm text-coppel-blue font-medium hover:underline">
            Ir al convenio comercial
          </a>
        </div>
      </FormSection>
    </div>
  )
}
