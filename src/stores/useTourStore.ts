import { create } from 'zustand'

export type TourId = 'comprador' | 'proveedor' | 'crossRole'

interface TourState {
  activeTour: TourId | null
  currentStep: number
  completedTours: Set<TourId>
  showLauncher: boolean

  startTour: (id: TourId) => void
  nextStep: () => void
  prevStep: () => void
  endTour: () => void
  setShowLauncher: (show: boolean) => void
  hasCompleted: (id: TourId) => boolean
}

function getCompleted(): Set<TourId> {
  try {
    const raw = localStorage.getItem('sgc-completed-tours')
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveCompleted(set: Set<TourId>) {
  localStorage.setItem('sgc-completed-tours', JSON.stringify([...set]))
}

export const useTourStore = create<TourState>((set, get) => ({
  activeTour: null,
  currentStep: 0,
  completedTours: getCompleted(),
  showLauncher: false,

  startTour: (id) => set({ activeTour: id, currentStep: 0 }),

  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),

  prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),

  endTour: () => {
    const { activeTour, completedTours } = get()
    if (activeTour) {
      const next = new Set(completedTours)
      next.add(activeTour)
      saveCompleted(next)
      set({ activeTour: null, currentStep: 0, completedTours: next })
    } else {
      set({ activeTour: null, currentStep: 0 })
    }
  },

  setShowLauncher: (show) => set({ showLauncher: show }),

  hasCompleted: (id) => get().completedTours.has(id),
}))
