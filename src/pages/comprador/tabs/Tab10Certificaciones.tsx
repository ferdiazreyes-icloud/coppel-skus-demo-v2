import { useState } from 'react'
import { FileText, Plus, Trash2 } from 'lucide-react'
import FormSection from '../../../components/shared/FormSection'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { useSkuFormStore } from '../../../stores/useSkuFormStore'

interface Certification {
  id: number
  name: string
  file: string
  vigencia: string
}

export default function Tab10Certificaciones() {
  const { markTabComplete } = useSkuFormStore()
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: 'NOM-001-SCFI-2018', file: 'NOM-001-SCFI-2018.pdf', vigencia: '12/Dic/2026' },
  ])

  const handleSave = () => {
    markTabComplete('certificaciones')
  }

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { id: certifications.length + 1, name: '', file: '', vigencia: '' },
    ])
  }

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-5">
      {/* Certificaciones */}
      <FormSection title="Certificaciones" showInfoToggle onSave={handleSave}>
        <p className="text-sm text-text-secondary mb-6">
          Certificaciones aplicables al producto, cargadas por el proveedor.
        </p>

        <div className="space-y-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="border border-border rounded-md p-5">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-sans text-sm font-bold text-text-primary">
                  {cert.name || 'Nueva certificación'}
                </h4>
                {certifications.length > 1 && (
                  <button
                    onClick={() => removeCertification(cert.id)}
                    className="text-error hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Nombre de la certificación"
                  value={cert.name}
                  placeholder="NOM-XXX-XXXX-XXXX"
                  required
                />
                <Input
                  label="Vigencia"
                  value={cert.vigencia}
                  placeholder="DD/MMM/AAAA"
                  required
                />
              </div>

              {cert.file ? (
                <div className="flex items-center gap-3 p-3 bg-bg-light rounded-md">
                  <FileText className="w-5 h-5 text-coppel-blue flex-shrink-0" />
                  <a href="#" className="text-sm text-coppel-blue font-medium hover:underline">
                    {cert.file}
                  </a>
                  <span className="text-sm text-text-muted ml-auto">
                    Vigencia: {cert.vigencia}
                  </span>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                  <p className="text-sm text-text-muted mb-2">
                    Arrastra un archivo PDF o haz clic para seleccionar
                  </p>
                  <Button variant="outline" size="sm">
                    Seleccionar archivo
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addCertification}
          className="text-sm text-coppel-blue font-medium hover:underline inline-flex items-center gap-1 mt-4"
        >
          <Plus className="w-4 h-4" /> Agregar certificación
        </button>
      </FormSection>
    </div>
  )
}
