import { useState } from 'react'
import { Plus, GripVertical } from 'lucide-react'
import FormSection from '../../../components/shared/FormSection'
import Checkbox from '../../../components/ui/Checkbox'
import Button from '../../../components/ui/Button'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

interface Attribute {
  id: number
  name: string
  providerDesc: string
  buyerDesc: string
  selected: boolean
}

const MOCK_ATTRIBUTES: Attribute[] = [
  { id: 1, name: 'Tipo', providerDesc: 'Carrito de paseo', buyerDesc: 'Carrito de paseo', selected: true },
  { id: 2, name: 'Diseño', providerDesc: 'Carro', buyerDesc: 'Carro', selected: true },
  { id: 3, name: 'Material', providerDesc: 'Plástico', buyerDesc: 'Plástico', selected: true },
  { id: 4, name: 'Requiere baterías', providerDesc: 'No', buyerDesc: 'No', selected: false },
  { id: 5, name: 'Peso máximo', providerDesc: '25 kg', buyerDesc: '25 kg', selected: false },
  { id: 6, name: 'Edad recomendada', providerDesc: '1-3 años', buyerDesc: '1-3 años', selected: true },
]

const colorTabs = ['Rojo', 'Color 2', 'Color 3']

export default function Tab4Atributos() {
  const { markTabComplete } = useSkuFormStore()
  const [attributes, setAttributes] = useState(MOCK_ATTRIBUTES)
  const [activeColorTab, setActiveColorTab] = useState('Rojo')

  const toggleAttribute = (id: number) => {
    setAttributes(attributes.map((a) =>
      a.id === id ? { ...a, selected: !a.selected } : a
    ))
  }

  const handleSave = () => {
    markTabComplete('atributos')
  }

  return (
    <div className="space-y-5">
      {/* Atributos */}
      <FormSection title="Atributos" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Revisa los atributos que capturó el proveedor y selecciona los atributos para mostrar en la etiqueta de tienda. Edita los existentes o agrega nuevos si es necesario.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-coppel-navy text-white">
                <th className="w-10 px-3 py-2" />
                <th className="px-4 py-2 text-left font-semibold" colSpan={2}>Proveedor</th>
                <th className="px-4 py-2 text-left font-semibold" colSpan={2}>Comprador</th>
              </tr>
              <tr className="bg-coppel-navy/80 text-white text-xs">
                <th className="w-10 px-3 py-1" />
                <th className="px-4 py-1 text-left">Nombre del atributo</th>
                <th className="px-4 py-1 text-left">Descripción</th>
                <th className="px-4 py-1 text-left">Nombre del atributo</th>
                <th className="px-4 py-1 text-left">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr, i) => (
                <tr key={attr.id} className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}>
                  <td className="px-3 py-2">
                    <Checkbox checked={attr.selected} onChange={() => toggleAttribute(attr.id)} />
                  </td>
                  <td className="px-4 py-2 text-text-primary">{attr.name}</td>
                  <td className="px-4 py-2 text-text-secondary">{attr.providerDesc}</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      defaultValue={attr.name}
                      className="w-full h-8 px-2 text-sm border border-border-input rounded-sm bg-bg-card"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      defaultValue={attr.buyerDesc}
                      className="w-full h-8 px-2 text-sm border border-border-input rounded-sm bg-bg-card"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="mt-4 text-sm text-coppel-blue font-medium hover:underline inline-flex items-center gap-1">
          <Plus className="w-4 h-4" /> Agregar atributo
        </button>
      </FormSection>

      {/* Descripción de etiqueta */}
      <FormSection title="Descripción de etiqueta" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-4">
          Define orden de prioridad y ajusta las descripciones por renglón según corresponda.
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
          <div className="ml-auto">
            <Button variant="outline" size="sm">Ver etiqueta</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-coppel-navy text-white">
                <th className="px-3 py-2 text-left font-semibold w-20">Prioridad</th>
                <th className="w-10 px-2 py-2" />
                <th className="px-4 py-2 text-left font-semibold">Atributo</th>
                <th className="px-4 py-2 text-left font-semibold">Descripción</th>
                <th className="px-4 py-2 text-left font-semibold">Cont. etiqueta (38 caracteres)</th>
              </tr>
            </thead>
            <tbody>
              {attributes.filter((a) => a.selected).map((attr, i) => (
                <tr key={attr.id} className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}>
                  <td className="px-3 py-2 text-text-primary font-medium">{i + 1}</td>
                  <td className="px-2 py-2 cursor-grab">
                    <GripVertical className="w-4 h-4 text-text-muted" />
                  </td>
                  <td className="px-4 py-2 text-text-primary">{attr.name}</td>
                  <td className="px-4 py-2 text-text-secondary">{attr.buyerDesc}</td>
                  <td className="px-4 py-2 text-text-secondary">
                    {attr.name} {attr.buyerDesc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FormSection>
    </div>
  )
}
