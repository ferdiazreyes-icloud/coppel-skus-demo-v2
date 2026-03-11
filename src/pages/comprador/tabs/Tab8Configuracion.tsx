import { useState } from 'react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Checkbox from '../../../components/ui/Checkbox'
import DatePicker from '../../../components/ui/DatePicker'
import DateRangePicker from '../../../components/ui/DateRangePicker'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

const MODEL_COLOR_DATA = [
  { sku: '123445', modelo: 'Push Car Adventure', color: 'Rojo', noVenderExh: true, noExhibir: true, imprimirEtiqueta: false },
  { sku: '444844', modelo: 'Push Car Adventure', color: 'Azul', noVenderExh: false, noExhibir: false, imprimirEtiqueta: false },
]

export default function Tab8Configuracion() {
  const { markTabComplete } = useSkuFormStore()
  const [calcularVentaPerdida, setCalcularVentaPerdida] = useState(true)
  const [noRecogerTienda, setNoRecogerTienda] = useState(false)
  const [imprimirOferta, setImprimirOferta] = useState(true)
  const [permitirQr, setPermitirQr] = useState(true)
  const [etiquetaExistencia, setEtiquetaExistencia] = useState(false)
  const [productoNovedoso, setProductoNovedoso] = useState(false)
  const [despiezado, setDespiezado] = useState(false)
  const [noTransferible, setNoTransferible] = useState(false)
  const [repetirExhibicion, setRepetirExhibicion] = useState(false)

  const handleSave = () => {
    markTabComplete('configuracion')
  }

  return (
    <div className="space-y-5">
      {/* Pronósticos */}
      <FormSection title="Pronósticos" onSave={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker label="Fecha para descontinuar" />
          <DatePicker label="Fecha pronóstico" />
          <Input label="Días venta perdida" type="number" placeholder="30" required />
        </div>
        <div className="mt-4">
          <Checkbox
            label="Calcular venta perdida"
            checked={calcularVentaPerdida}
            onChange={setCalcularVentaPerdida}
          />
        </div>
      </FormSection>

      {/* Modelo - Color */}
      <FormSection title="Modelo - Color" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Consulta y configura los datos del modelo y color, así como su disponibilidad y visibilidad en tienda.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-coppel-navy text-white">
                <th className="px-4 py-2 text-left font-semibold">SKU</th>
                <th className="px-4 py-2 text-left font-semibold">Modelo</th>
                <th className="px-4 py-2 text-left font-semibold">Color</th>
                <th className="px-4 py-2 text-center font-semibold">No vender exhibición en tienda</th>
                <th className="px-4 py-2 text-center font-semibold">No exhibir en tienda</th>
                <th className="px-4 py-2 text-center font-semibold">Imprimir etiqueta sin stock</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_COLOR_DATA.map((row, i) => (
                <tr key={row.sku} className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}>
                  <td className="px-4 py-2 text-text-primary font-medium">{row.sku}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.modelo}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.color}</td>
                  <td className="px-4 py-2 text-center">
                    <Checkbox checked={row.noVenderExh} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Checkbox checked={row.noExhibir} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Checkbox checked={row.imprimirEtiqueta} onChange={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FormSection>

      {/* Entrega y etiquetado */}
      <FormSection title="Entrega y etiquetado" onSave={handleSave}>
        <div className="space-y-4">
          <Input label="Días de espera en tienda" type="number" required />

          <Checkbox
            label="No recoger en tienda (modo entrega R)"
            checked={noRecogerTienda}
            onChange={setNoRecogerTienda}
          />

          <div className="border-t border-border pt-4 space-y-3">
            <Checkbox
              label="Imprimir etiqueta de oferta única"
              checked={imprimirOferta}
              onChange={setImprimirOferta}
            />
            <Checkbox
              label="Permitir quick response"
              checked={permitirQr}
              onChange={setPermitirQr}
            />
            <Checkbox
              label="Etiqueta por existencia"
              checked={etiquetaExistencia}
              onChange={setEtiquetaExistencia}
            />

            <div className="flex items-start gap-4">
              <Checkbox
                label="Productos novedoso"
                checked={productoNovedoso}
                onChange={setProductoNovedoso}
              />
              {productoNovedoso && (
                <DateRangePicker className="flex-1" />
              )}
            </div>

            <Checkbox
              label="Despiezado (surtir agrupado)"
              checked={despiezado}
              onChange={setDespiezado}
            />
            <Checkbox
              label="No transferible entre bodegas"
              checked={noTransferible}
              onChange={setNoTransferible}
            />
            <Checkbox
              label="Repetir exhibición del artículo"
              checked={repetirExhibicion}
              onChange={setRepetirExhibicion}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-4">
            <Input label="Surtir por múltiplo a tienda" type="number" required />
            <Input label="Múltiplo para pedidos" type="number" required />
          </div>
        </div>
      </FormSection>
    </div>
  )
}
