import { create } from 'zustand'
import type { Persona, PersonaFilters } from '../lib/personaApi'
import { fetchPersonas } from '../lib/personaApi'

interface PersonaState {
  personas: Persona[]
  isLoading: boolean
  error: string | null
  filters: PersonaFilters
  selectedId: string | null
  isDetailOpen: boolean
  setFilters: (filters: Partial<PersonaFilters>) => void
  loadPersonas: () => Promise<void>
  selectPersona: (id: string | null) => void
  selectNextPersona: () => void
  selectPreviousPersona: () => void
  openDetail: () => void
  closeDetail: () => void
  toggleDetail: () => void
}

export const usePersonaStore = create<PersonaState>((set, get) => ({
  personas: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    arcana: undefined,
    minLevel: undefined,
    maxLevel: undefined,
  },
  selectedId: null,
  isDetailOpen: true,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  loadPersonas: async () => {
    const { filters, selectedId } = get()
    set({ isLoading: true, error: null })
    try {
      const data = await fetchPersonas(filters)
      const nextSelected =
        data.find((persona) => persona.id === selectedId)?.id ?? data[0]?.id ?? null
      set({ personas: data, isLoading: false, selectedId: nextSelected })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      })
    }
  },
  selectPersona: (id) =>
    set({
      selectedId: id,
      isDetailOpen: true,
    }),
  selectNextPersona: () =>
    set((state) => {
      if (!state.personas.length) return state
      const currentIndex = state.personas.findIndex((p) => p.id === state.selectedId)
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % state.personas.length : 0
      return { selectedId: state.personas[nextIndex].id, isDetailOpen: true }
    }),
  selectPreviousPersona: () =>
    set((state) => {
      if (!state.personas.length) return state
      const currentIndex = state.personas.findIndex((p) => p.id === state.selectedId)
      const prevIndex =
        currentIndex >= 0
          ? (currentIndex - 1 + state.personas.length) % state.personas.length
          : state.personas.length - 1
      return { selectedId: state.personas[prevIndex].id, isDetailOpen: true }
    }),
  openDetail: () => set({ isDetailOpen: true }),
  closeDetail: () => set({ isDetailOpen: false }),
  toggleDetail: () => set((state) => ({ isDetailOpen: !state.isDetailOpen })),
}))
