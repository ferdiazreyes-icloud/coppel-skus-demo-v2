import ImageCarousel from '../ui/ImageCarousel'
import Button from '../ui/Button'
import { X, Lock } from 'lucide-react'

interface ProductHeaderProps {
  name: string
  lineCode: string
  lineName: string
  proposalId: string
  category: string
  subCategory: string
  productType: string
  classCode: string
  family: string
  brand: string
  model: string
  images: string[]
  canSubmit?: boolean
  onCancel?: () => void
  onSubmit?: () => void
  submitLabel?: string
  cancelLabel?: string
}

export default function ProductHeader({
  name,
  lineCode,
  lineName,
  proposalId,
  category,
  subCategory,
  productType,
  classCode,
  family,
  brand,
  model,
  images,
  canSubmit = false,
  onCancel,
  onSubmit,
  submitLabel = 'Dar de alta SKU',
  cancelLabel = 'Cancelar alta',
}: ProductHeaderProps) {
  return (
    <div className="bg-coppel-blue-light rounded-md p-6">
      <div className="flex gap-6">
        {/* Image carousel */}
        <div className="w-32 h-32 shrink-0">
          <ImageCarousel images={images} alt={name} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-sans text-lg font-semibold text-text-primary">{name}</h2>
              <p className="text-sm text-text-secondary">
                {lineCode} — {lineName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm text-text-muted">ID Propuesta:</span>{' '}
              <span className="font-sans font-bold text-text-primary">{proposalId}</span>
            </div>
          </div>

          {/* Classification */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm">
            <div>
              <span className="text-text-muted">Categoría:</span>{' '}
              <span className="font-semibold text-coppel-blue">{category}</span>
            </div>
            <div>
              <span className="text-text-muted">Sub Categoría:</span>{' '}
              <span className="font-semibold text-coppel-blue">{subCategory}</span>
            </div>
            <div>
              <span className="text-text-muted">Tipo de producto:</span>{' '}
              <span className="font-semibold">{productType}</span>
            </div>
            <div>
              <span className="text-text-muted">Clase:</span>{' '}
              <span className="font-semibold">{classCode}</span>
            </div>
            <div>
              <span className="text-text-muted">Familia:</span>{' '}
              <span className="font-semibold">{family}</span>
            </div>
            <div>
              <span className="text-text-muted">Marca:</span>{' '}
              <span className="font-semibold">{brand}</span>
            </div>
          </div>
          <div className="mt-1 text-sm">
            <span className="text-text-muted">Modelo:</span>{' '}
            <span className="font-semibold">{model}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            {onCancel && (
              <Button variant="outline" size="sm" icon={<X className="w-4 h-4" />} onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            {onSubmit && (
              <Button
                variant="primary"
                size="sm"
                icon={<Lock className="w-4 h-4" />}
                onClick={onSubmit}
                disabled={!canSubmit}
              >
                {submitLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
