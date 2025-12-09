import { create } from 'zustand'
import type { Persona, PersonaFilters } from '../lib/personaApi'
import { fetchPersonas } from '../lib/personaApi'

interface PersonaState {
  personas: Persona[]
  isLoading: boolean
  error: string | null
  filters: PersonaFilters
  setFilters: (filters: Partial<PersonaFilters>) => void
  loadPersonas: () => Promise<void>
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
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  loadPersonas: async () => {
    const { filters } = get()
    set({ isLoading: true, error: null })
    try {
      const data = await fetchPersonas(filters)
      set({ personas: data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      })
    }
  },
}))
