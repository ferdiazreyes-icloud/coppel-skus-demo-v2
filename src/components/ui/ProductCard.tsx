import Badge from './Badge'
import Checkbox from './Checkbox'
import type { Product } from '../../types/product'
import { formatCurrency, formatPercent } from '../../utils/formatCurrency'

interface ProductCardProps {
  product: Product
  selected?: boolean
  onSelect?: (selected: boolean) => void
  onViewFicha?: () => void
  onCompare?: (comparing: boolean) => void
  comparing?: boolean
  className?: string
}

export default function ProductCard({
  product,
  selected = false,
  onSelect,
  onViewFicha,
  onCompare,
  comparing = false,
  className = '',
}: ProductCardProps) {
  return (
    <div className={`bg-bg-card rounded-md border border-border p-5 flex gap-5 relative transition-shadow hover:shadow-md ${className}`}>
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <Badge status={product.status} />
      </div>

      {/* Selection checkbox */}
      {onSelect && (
        <div className="pt-1">
          <Checkbox
            label="Pre seleccionar"
            checked={selected}
            onChange={onSelect}
          />
        </div>
      )}

      {/* Product image */}
      <div className="w-24 h-24 rounded-md bg-bg-light overflow-hidden shrink-0 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
        ) : (
          <div className="text-text-muted text-xs">Sin imagen</div>
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-sans text-base font-semibold text-text-primary truncate pr-36">
          {product.name}
        </h3>
        <p className="text-sm text-text-muted">{product.brand}</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-2 mt-3 text-sm">
          <div>
            <span className="text-text-muted">Tipo de proveedor:</span>
            <span className="ml-2 font-medium">{product.supplierType}</span>
          </div>
          <div>
            <span className="text-text-muted">Modelo:</span>
            <span className="ml-2 font-medium">{product.model}</span>
          </div>
          <div>
            <span className="text-text-muted">Precio venta:</span>
            <span className="ml-2 font-medium">{formatCurrency(product.salePrice)}</span>
          </div>
          <div>
            <span className="text-text-muted">Costo:</span>
            <span className="ml-2 font-medium">{formatCurrency(product.cost)}</span>
          </div>
          <div>
            <span className="text-text-muted">Margen:</span>
            <span className="ml-2 font-medium">{formatPercent(product.margin)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-4">
          {onCompare && (
            <Checkbox label="Comparar" checked={comparing} onChange={onCompare} />
          )}
          {onViewFicha && (
            <button
              onClick={onViewFicha}
              className="px-4 h-8 text-xs font-semibold text-coppel-blue border-2 border-coppel-blue rounded-pill hover:bg-coppel-blue-light transition-colors"
            >
              Ficha técnica
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
