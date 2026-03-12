import { create } from 'zustand'
import type { Role } from '../types/user'

export interface Notification {
  id: string
  title: string
  message: string
  targetRole: Role
  read: boolean
  createdAt: string
  link?: string
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: (role: Role) => void
  getUnreadCount: (role: Role) => number
  getForRole: (role: Role) => Notification[]
}

// Seed with initial notifications so the demo feels alive
const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    title: 'Nueva solicitud recibida',
    message: 'Juanita Solis te ha enviado una solicitud de muestras para 8 productos.',
    targetRole: 'proveedor',
    read: false,
    createdAt: '2026-01-10T09:00:00Z',
    link: '/proveedor/solicitudes/sol-001',
  },
  {
    id: 'notif-002',
    title: 'Propuestas recibidas',
    message: 'Mattel S.A. de C.V. ha enviado 8 propuestas de producto para tu revisión.',
    targetRole: 'comprador',
    read: false,
    createdAt: '2026-01-12T14:30:00Z',
    link: '/comprador/propuestas/sup-001',
  },
  {
    id: 'notif-003',
    title: 'Producto preseleccionado',
    message: 'Muñeca Wicked ha sido preseleccionada por el comprador.',
    targetRole: 'proveedor',
    read: true,
    createdAt: '2026-01-08T11:00:00Z',
  },
  {
    id: 'notif-004',
    title: 'Solicitud de complemento',
    message: 'Se requiere información adicional para Montable Prinsel Push Car Adventure.',
    targetRole: 'proveedor',
    read: false,
    createdAt: '2026-01-14T16:00:00Z',
    link: '/proveedor/solicitudes/sol-002',
  },
  {
    id: 'notif-005',
    title: 'SKU dado de alta',
    message: 'Muñeca Frozen Aventuras Elsa ha sido dada de alta exitosamente.',
    targetRole: 'comprador',
    read: true,
    createdAt: '2026-01-05T10:00:00Z',
  },
]

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: SEED_NOTIFICATIONS,

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: (role) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.targetRole === role ? { ...n, read: true } : n
      ),
    })),

  getUnreadCount: (role) =>
    get().notifications.filter((n) => n.targetRole === role && !n.read).length,

  getForRole: (role) =>
    get().notifications.filter((n) => n.targetRole === role),
}))
