import { create } from 'zustand'
import type { Role } from '../types/user'

export interface Notification {
  id: string
  title: string
  message: string
  targetRole: Role
  read: boolean
  createdAt: string
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markAsRead: (id: string) => void
  getUnreadCount: (role: Role) => number
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],

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

  getUnreadCount: (role) =>
    get().notifications.filter((n) => n.targetRole === role && !n.read).length,
}))
