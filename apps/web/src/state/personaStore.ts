import { create } from 'zustand'
import type { Persona, PersonaFilters } from '../lib/personaApi'
import { fetchPersonas } from '../lib/personaApi'

interface PersonaState {
  personas: Persona[]
  isLoading: boolean
  error: string | null
  filters: PersonaFilters
  selectedId: string | null
  setFilters: (filters: Partial<PersonaFilters>) => void
  loadPersonas: () => Promise<void>
  selectPersona: (id: string | null) => void
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
  selectPersona: (id) => set({ selectedId: id }),
}))
