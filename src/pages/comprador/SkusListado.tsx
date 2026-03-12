import { useState } from 'react'
import Breadcrumb from '../../components/layout/Breadcrumb'
import Pagination from '../../components/ui/Pagination'
import { MOCK_PRODUCTS } from '../../data/mockProducts'

type SkuStatus = 'linea' | 'descontinuado'
type CompraStatus = 'comprar' | 'no_comprar'

interface SkuRow {
  image: string
  tipoArticulo: string
  sku: string
  estatus: SkuStatus
  clasificacion: string
  compra: CompraStatus
  canal: string
  proveedor: string
  fechaAlta: string
  articulo: string
  marca: string
  modelo: string
  pedido: boolean
}

const CATEGORY_TABS = ['Juguetes', 'Bebés', 'Consolas y videojuegos']

const MOCK_SKUS: SkuRow[] = MOCK_PRODUCTS.map((p, i) => ({
  image: p.imageUrl,
  tipoArticulo: 'Línea',
  sku: String(100000 + i * 11111 + Math.floor(Math.random() * 900000)).slice(0, 6),
  estatus: i >= 7 ? 'descontinuado' as SkuStatus : 'linea' as SkuStatus,
  clasificacion: i % 3 === 0 ? 'Línea' : i % 3 === 1 ? 'Prueba' : 'One shot',
  compra: i >= 6 ? 'no_comprar' as CompraStatus : 'comprar' as CompraStatus,
  canal: i % 2 === 0 ? 'Línea extendida' : 'Omnicanal',
  proveedor: p.supplierName.replace(' S.A. de C.V.', ''),
  fechaAlta: '11/Nov/2025',
  articulo: p.name,
  marca: p.brand,
  modelo: p.model,
  pedido: i < 5,
}))

const STATUS_STYLES: Record<SkuStatus, string> = {
  linea: 'bg-status-review-bg text-status-review',
  descontinuado: 'bg-status-in-progress-bg text-status-in-progress',
}

const STATUS_LABELS: Record<SkuStatus, string> = {
  linea: 'Línea',
  descontinuado: 'Descontinuado',
}

export default function SkusListado() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(MOCK_SKUS.length / itemsPerPage)
  const paginatedSkus = MOCK_SKUS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Inicio', to: '/comprador' },
          { label: "Propuestas y SKU's", to: '/comprador/propuestas-skus' },
          { label: "SKU's" },
        ]}
      />

      <div className="px-6 pb-10">
        <h1 className="font-sans text-xl font-semibold text-text-primary mb-5">
          SKU's
        </h1>

        {/* Category tabs */}
        <div className="flex gap-6 border-b border-border mb-6">
          {CATEGORY_TABS.map((cat, i) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(i); setCurrentPage(1) }}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeCategory === i
                  ? 'text-coppel-blue border-b-2 border-coppel-blue'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Imagen</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Tipo artículo</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">SKU</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Estatus</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">C/NC</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Comprar</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Canal</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Proveedor</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Fecha alta</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Artículo</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Marca</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Modelo</th>
                <th className="px-3 py-3 text-left font-semibold text-text-primary">Pedido</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSkus.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border ${i % 2 === 0 ? 'bg-bg-card' : 'bg-bg-light'}`}
                >
                  <td className="px-3 py-2">
                    <img
                      src={row.image}
                      alt={row.articulo}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-semibold ${STATUS_STYLES[row.estatus]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {STATUS_LABELS[row.estatus]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-text-primary font-medium">{row.sku}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.clasificacion}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.clasificacion}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.compra === 'comprar' ? 'Comprar' : 'No comprar'}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.canal}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.proveedor}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.fechaAlta}</td>
                  <td className="px-3 py-2 text-text-primary">{row.articulo}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.marca}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.modelo}</td>
                  <td className="px-3 py-2 text-text-secondary">{row.pedido ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
