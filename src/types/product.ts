export interface Product {
  id: string
  name: string
  brand: string
  model: string
  category: string
  subCategory: string
  productType: string
  classCode: string
  family: string
  imageUrl: string
  supplierType: string
  salePrice: number
  cost: number
  margin: number
  status: ProposalStatus
  supplierId: string
  supplierName: string
}

export type ProposalStatus =
  | 'en_revision'
  | 'listo_para_evaluar'
  | 'cotizacion_solicitada'
  | 'en_proceso_de_alta'
  | 'preseleccionado'
  | 'pendiente_comprador'
  | 'pendiente_proveedor'

export interface Solicitud {
  id: string
  code: string
  supplierId: string
  supplierName: string
  status: ProposalStatus
  createdAt: string
  products: Product[]
}

export interface SkuFormData {
  informacionGeneral: Record<string, unknown>
  estrategiaComercial: Record<string, unknown>
  datosPorColor: Record<string, unknown>
  atributos: Record<string, unknown>
  datosLogisticos: Record<string, unknown>
  costosPrecios: Record<string, unknown>
  adminStock: Record<string, unknown>
  configuracion: Record<string, unknown>
  clasificacion: Record<string, unknown>
  certificaciones: Record<string, unknown>
}

export const SKU_TABS = [
  { id: 'informacion-general', label: 'Información general', index: 0 },
  { id: 'estrategia-comercial', label: 'Estrategia comercial', index: 1 },
  { id: 'datos-por-color', label: 'Datos por color', index: 2 },
  { id: 'atributos', label: 'Atributos', index: 3 },
  { id: 'datos-logisticos', label: 'Datos logísticos y de empaque', index: 4 },
  { id: 'costos-precios', label: 'Costos y precios de venta', index: 5 },
  { id: 'admin-stock', label: 'Administración de stock', index: 6 },
  { id: 'configuracion', label: 'Configuración', index: 7 },
  { id: 'clasificacion', label: 'Clasificación', index: 8 },
  { id: 'certificaciones', label: 'Certificaciones', index: 9 },
] as const

export type SkuTabId = typeof SKU_TABS[number]['id']
