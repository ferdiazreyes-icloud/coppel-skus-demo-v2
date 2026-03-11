import { useState } from 'react'
import { Plus, ChevronUp, ChevronDown } from 'lucide-react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import RadioGroup from '../../../components/ui/RadioGroup'
import FileUpload from '../../../components/ui/FileUpload'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

interface ColorEntry {
  id: number
  color: string
  colorComercial: string
  productId: string
  aplicaGtin: string
  codigoGtin: string
  codigoGln: string
}

const COLOR_OPTIONS = [
  { value: 'rojo', label: 'Rojo' },
  { value: 'azul', label: 'Azul' },
  { value: 'verde', label: 'Verde' },
  { value: 'negro', label: 'Negro' },
  { value: 'blanco', label: 'Blanco' },
  { value: 'rosa', label: 'Rosa' },
]

const VENTA_SEMANAL = [
  { value: '10', label: '10 unidades' },
  { value: '25', label: '25 unidades' },
  { value: '50', label: '50 unidades' },
  { value: '100', label: '100 unidades' },
]

export default function Tab3Color() {
  const { markTabComplete } = useSkuFormStore()
  const [colors, setColors] = useState<ColorEntry[]>([
    { id: 1, color: 'rojo', colorComercial: 'Rojo', productId: '', aplicaGtin: 'si', codigoGtin: '', codigoGln: '' },
  ])
  const [expandedColors, setExpandedColors] = useState<Set<number>>(new Set([1]))

  const toggleColor = (id: number) => {
    const next = new Set(expandedColors)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedColors(next)
  }

  const addColor = () => {
    const newId = colors.length + 1
    setColors([...colors, {
      id: newId,
      color: '',
      colorComercial: '',
      productId: '',
      aplicaGtin: 'si',
      codigoGtin: '',
      codigoGln: '',
    }])
    setExpandedColors(new Set([...expandedColors, newId]))
  }

  const handleSave = () => {
    markTabComplete('datos-por-color')
  }

  return (
    <div className="space-y-5">
      <FormSection title="Datos por color" onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-5">
          Registra los colores del producto. Cada color genera un SKU distinto, por lo que es importante cargar todas las opciones aplicables.
        </p>

        <div className="space-y-4">
          {colors.map((entry) => (
            <div key={entry.id} className="border border-border rounded-md overflow-hidden">
              {/* Accordion header */}
              <button
                onClick={() => toggleColor(entry.id)}
                className="w-full flex items-center justify-between px-5 py-3 bg-bg-light hover:bg-border transition-colors"
              >
                <span className="font-sans text-sm font-semibold text-text-primary">
                  Color {entry.id}
                </span>
                {expandedColors.has(entry.id)
                  ? <ChevronUp className="w-4 h-4 text-text-muted" />
                  : <ChevronDown className="w-4 h-4 text-text-muted" />
                }
              </button>

              {/* Accordion content */}
              {expandedColors.has(entry.id) && (
                <div className="px-5 py-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Selecciona un color" options={COLOR_OPTIONS} required />
                    <Input label="Nombre del color comercial" placeholder="Nombre comercial" required />
                    <Input label="ID del producto" placeholder="ID" />
                  </div>

                  <RadioGroup
                    label="¿Aplica código GTIN?"
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' },
                    ]}
                    value={entry.aplicaGtin}
                    onChange={() => {}}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Código GTIN" placeholder="Código GTIN" required />
                    <Input label="Código GLN" placeholder="Código GLN" required />
                  </div>

                  {/* Pronóstico de venta */}
                  <div className="border-t border-border pt-4 mt-4">
                    <h4 className="font-sans text-sm font-semibold text-text-primary mb-3">
                      Pronóstico de venta
                    </h4>
                    <Select label="Venta estimada por semana" options={VENTA_SEMANAL} required />
                  </div>

                  {/* Imágenes */}
                  <div className="border-t border-border pt-4 mt-4">
                    <h4 className="font-sans text-sm font-semibold text-text-primary mb-2">
                      Imágenes del producto por color
                    </h4>
                    <p className="text-sm text-text-secondary mb-2">
                      Sube entre 1 y 20 imágenes. La primera imagen será tu portada.
                    </p>
                    <a href="#" className="text-sm text-coppel-blue font-medium hover:underline mb-3 inline-block">
                      Ver manual de fotos
                    </a>
                    <FileUpload accept="image/*" />
                    <p className="text-xs text-text-muted mt-2">
                      Resolución máxima: 4500 x 3500 px | Peso máximo: 5MB por imagen
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addColor}
          className="mt-4 text-sm text-coppel-blue font-medium hover:underline inline-flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Agregar color
        </button>
      </FormSection>
    </div>
  )
}
