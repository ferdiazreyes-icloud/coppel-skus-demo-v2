import { create } from 'zustand'
import type { SkuTabId } from '../types/product'

interface SkuFormState {
  formData: Record<string, Record<string, unknown>>
  completedTabs: Set<SkuTabId>
  currentProductId: string | null

  setTabData: (tabId: SkuTabId, data: Record<string, unknown>) => void
  markTabComplete: (tabId: SkuTabId) => void
  markTabIncomplete: (tabId: SkuTabId) => void
  setCurrentProduct: (productId: string) => void
  reset: () => void
}

export const useSkuFormStore = create<SkuFormState>((set) => ({
  formData: {},
  completedTabs: new Set(),
  currentProductId: null,

  setTabData: (tabId, data) =>
    set((state) => ({
      formData: { ...state.formData, [tabId]: data },
    })),

  markTabComplete: (tabId) =>
    set((state) => {
      const next = new Set(state.completedTabs)
      next.add(tabId)
      return { completedTabs: next }
    }),

  markTabIncomplete: (tabId) =>
    set((state) => {
      const next = new Set(state.completedTabs)
      next.delete(tabId)
      return { completedTabs: next }
    }),

  setCurrentProduct: (productId) => set({ currentProductId: productId }),

  reset: () => set({ formData: {}, completedTabs: new Set(), currentProductId: null }),
}))
