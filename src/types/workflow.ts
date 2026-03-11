import type { ProposalStatus } from './product'

export interface StatusConfig {
  label: string
  bgColor: string
  textColor: string
}

export const STATUS_MAP: Record<ProposalStatus, StatusConfig> = {
  en_revision: {
    label: 'En revisión',
    bgColor: 'bg-status-review-bg',
    textColor: 'text-status-review',
  },
  listo_para_evaluar: {
    label: 'Listo para evaluar',
    bgColor: 'bg-status-ready-bg',
    textColor: 'text-status-ready',
  },
  cotizacion_solicitada: {
    label: 'Cotización solicitada',
    bgColor: 'bg-status-pending-buyer-bg',
    textColor: 'text-status-pending-buyer',
  },
  en_proceso_de_alta: {
    label: 'En proceso de alta',
    bgColor: 'bg-status-in-progress-bg',
    textColor: 'text-status-in-progress',
  },
  preseleccionado: {
    label: 'Preseleccionado',
    bgColor: 'bg-status-preselected-bg',
    textColor: 'text-status-preselected',
  },
  pendiente_comprador: {
    label: 'Pendiente comprador',
    bgColor: 'bg-status-pending-buyer-bg',
    textColor: 'text-status-pending-buyer',
  },
  pendiente_proveedor: {
    label: 'Pendiente proveedor',
    bgColor: 'bg-status-pending-supplier-bg',
    textColor: 'text-status-pending-supplier',
  },
}
