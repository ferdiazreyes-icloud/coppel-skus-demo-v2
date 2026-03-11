import { useState } from 'react'
import FormSection from '../../../components/shared/FormSection'
import Checkbox from '../../../components/ui/Checkbox'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

const colorTabs = ['Rojo', 'Color 2', 'Color 3']

const STORE_DATA = [
  { id: 'coppel', name: 'Coppel', ex: 233, gr: 537, me: 292, ch: 123, selected: true },
  { id: 'canada', name: 'Canadá', ex: 1, gr: 1, me: 0, ch: 406, selected: true },
  { id: 'minitienda', name: 'MiniTienda', ex: 8, gr: 30, me: 15, ch: 9, selected: true },
  { id: 'digital', name: 'Digital', ex: 9, gr: 0, me: 0, ch: 18, selected: false },
  { id: 'apple', name: 'Coppel Apple', ex: 0, gr: 1, me: 0, ch: 117, selected: false },
]

const BODEGA_DATA = [
  { id: 'clcn', name: 'CLCN', estadistico: 4.0, tipo: 0, manual: 5, tiendas: 65, selected: true },
  { id: 'leon', name: 'LEON', estadistico: 3.0, tipo: 0, manual: 2, tiendas: 79, selected: true },
  { id: 'mtr', name: 'MTR', estadistico: 8.5, tipo: 0, manual: 10, tiendas: 120, selected: true },
  { id: 'gdl', name: 'GDL', estadistico: 12.0, tipo: 0, manual: 15, tiendas: 200, selected: true },
  { id: 'cdmx', name: 'CDMX', estadistico: 25.0, tipo: 0, manual: 30, tiendas: 350, selected: true },
  { id: 'pue', name: 'PUE', estadistico: 7.5, tipo: 0, manual: 8, tiendas: 95, selected: true },
  { id: 'mrl', name: 'MRL', estadistico: 15.0, tipo: 0, manual: 12, tiendas: 180, selected: false },
  { id: 'tij', name: 'TIJ', estadistico: 10.0, tipo: 0, manual: 8, tiendas: 141, selected: true },
  { id: 'hmo', name: 'HMO', estadistico: 5.0, tipo: 0, manual: 5, tiendas: 100, selected: true },
  { id: 'ver', name: 'VER', estadistico: 10.0, tipo: 0, manual: 5, tiendas: 200, selected: true },
]

export default function Tab7AdminStock() {
  const { markTabComplete } = useSkuFormStore()
  const [activeColorTab, setActiveColorTab] = useState('Rojo')

  const storeTotal = {
    ex: STORE_DATA.reduce((s, r) => s + r.ex, 0),
    gr: STORE_DATA.reduce((s, r) => s + r.gr, 0),
    me: STORE_DATA.reduce((s, r) => s + r.me, 0),
    ch: STORE_DATA.reduce((s, r) => s + r.ch, 0),
  }

  const bodegaTotal = {
    estadistico: BODEGA_DATA.reduce((s, r) => s + r.estadistico, 0),
    manual: BODEGA_DATA.reduce((s, r) => s + r.manual, 0),
    tiendas: BODEGA_DATA.reduce((s, r) => s + r.tiendas, 0),
  }

  const handleSave = () => {
    markTabComplete('admin-stock')
  }

  return (
    <div className="space-y-5">
      {/* Stock por tamaño de tienda */}
      <FormSection title="Administración de stock por tamaño de tienda" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Haz el método de asignación de stock para cada formato y tamaño de tienda.
        </p>

        {/* Color tabs */}
        <div className="flex gap-1 mb-4">
          {colorTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveColorTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeColorTab === tab
                  ? 'bg-coppel-blue text-white'
                  : 'bg-bg-light text-text-muted hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-coppel-navy text-white">
                <th className="w-10 px-3 py-2" />
                <th className="px-4 py-2 text-left font-semibold">Seleccionar todos</th>
                <th className="px-4 py-2 text-left font-semibold">Formato de tienda</th>
                <th className="px-4 py-2 text-center font-semibold">EX</th>
                <th className="px-4 py-2 text-center font-semibold">GR</th>
                <th className="px-4 py-2 text-center font-semibold">ME</th>
                <th className="px-4 py-2 text-center font-semibold">CH</th>
              </tr>
            </thead>
            <tbody>
              {STORE_DATA.map((row, i) => (
                <tr key={row.id} className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}>
                  <td className="px-3 py-2">
                    <Checkbox checked={row.selected} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-2 text-text-primary font-medium" colSpan={1}>{row.name}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.name}</td>
                  <td className="px-4 py-2 text-center">{row.ex}</td>
                  <td className="px-4 py-2 text-center">{row.gr}</td>
                  <td className="px-4 py-2 text-center">{row.me}</td>
                  <td className="px-4 py-2 text-center">{row.ch}</td>
                </tr>
              ))}
              {/* Totals */}
              <tr className="bg-bg-light font-semibold border-t-2 border-border">
                <td className="px-3 py-2" />
                <td className="px-4 py-2" colSpan={2}>Total</td>
                <td className="px-4 py-2 text-center">{storeTotal.ex}</td>
                <td className="px-4 py-2 text-center">{storeTotal.gr}</td>
                <td className="px-4 py-2 text-center">{storeTotal.me}</td>
                <td className="px-4 py-2 text-center">{storeTotal.ch}</td>
              </tr>
              <tr className="bg-bg-light">
                <td className="px-3 py-2" />
                <td className="px-4 py-2 text-text-muted" colSpan={2}>Cantidad tiendas</td>
                <td className="px-4 py-2 text-center text-text-muted">100</td>
                <td className="px-4 py-2 text-center text-text-muted">240</td>
                <td className="px-4 py-2 text-center text-text-muted">45</td>
                <td className="px-4 py-2 text-center text-text-muted">245</td>
              </tr>
              <tr className="bg-bg-light">
                <td className="px-3 py-2" />
                <td className="px-4 py-2 text-text-muted" colSpan={2}>Mínimo de stock</td>
                <td className="px-4 py-2 text-center text-text-muted">1</td>
                <td className="px-4 py-2 text-center text-text-muted">1</td>
                <td className="px-4 py-2 text-center text-text-muted">1</td>
                <td className="px-4 py-2 text-center text-text-muted">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>

      {/* Porcentajes de distribución */}
      <FormSection title="Porcentajes de distribución" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Selecciona las bodegas donde se entregará el producto. El porcentaje estadístico debe sumar el 100%.
        </p>

        {/* Color tabs */}
        <div className="flex gap-1 mb-4">
          {colorTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveColorTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
                activeColorTab === tab
                  ? 'bg-coppel-blue text-white'
                  : 'bg-bg-light text-text-muted hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-coppel-navy text-white">
                <th className="w-10 px-3 py-2" />
                <th className="px-4 py-2 text-left font-semibold">Seleccionar todos</th>
                <th className="px-4 py-2 text-left font-semibold">Bodega</th>
                <th className="px-4 py-2 text-center font-semibold">% Estadístico</th>
                <th className="px-4 py-2 text-center font-semibold">Tipo de artículo</th>
                <th className="px-4 py-2 text-center font-semibold">% Manual*</th>
                <th className="px-4 py-2 text-center font-semibold"># Tiendas</th>
              </tr>
            </thead>
            <tbody>
              {BODEGA_DATA.map((row, i) => (
                <tr key={row.id} className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}>
                  <td className="px-3 py-2">
                    <Checkbox checked={row.selected} onChange={() => {}} />
                  </td>
                  <td className="px-4 py-2 text-text-primary font-medium">{row.name}</td>
                  <td className="px-4 py-2 text-text-secondary">{row.name}</td>
                  <td className="px-4 py-2 text-center">{row.estadistico.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">{row.tipo}</td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="number"
                      defaultValue={row.manual}
                      className="w-16 h-8 px-2 text-sm text-center border border-border-input rounded-sm bg-bg-card"
                    />
                    %
                  </td>
                  <td className="px-4 py-2 text-center">{row.tiendas}</td>
                </tr>
              ))}
              {/* Totals */}
              <tr className="bg-bg-light font-semibold border-t-2 border-border">
                <td className="px-3 py-2" />
                <td className="px-4 py-2" colSpan={2}>TOTAL</td>
                <td className="px-4 py-2 text-center">{bodegaTotal.estadistico.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">0</td>
                <td className="px-4 py-2 text-center">{bodegaTotal.manual}%</td>
                <td className="px-4 py-2 text-center">{bodegaTotal.tiendas}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FormSection>
    </div>
  )
}
