import { create } from 'zustand'
import type { Role, User } from '../types/user'
import { MOCK_COMPRADOR, MOCK_PROVEEDOR } from '../types/user'

interface AuthState {
  role: Role | null
  user: User | null
  setRole: (role: Role) => void
  clearRole: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  user: null,
  setRole: (role) =>
    set({
      role,
      user: role === 'comprador' ? MOCK_COMPRADOR : MOCK_PROVEEDOR,
    }),
  clearRole: () => set({ role: null, user: null }),
}))
