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
  avatar: 'https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=100',
  initials: 'JS',
}

export const MOCK_PROVEEDOR: User = {
  id: 'prov-001',
  name: 'Felipe López',
  role: 'proveedor',
  avatar: 'https://images.pexels.com/photos/7841788/pexels-photo-7841788.jpeg?auto=compress&cs=tinysrgb&w=100',
  initials: 'FL',
}
