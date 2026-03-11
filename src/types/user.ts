export type Role = 'comprador' | 'proveedor'

export interface User {
  id: string
  name: string
  role: Role
  avatar?: string
  initials: string
}

export const MOCK_COMPRADOR: User = {
  id: 'comp-001',
  name: 'Juanita Solis',
  role: 'comprador',
  initials: 'JS',
}

export const MOCK_PROVEEDOR: User = {
  id: 'prov-001',
  name: 'Felipe López',
  role: 'proveedor',
  initials: 'FL',
}
