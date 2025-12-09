export interface PersonaStats {
  level: number
  hp: number
  sp: number
  strength: number
  magic: number
  endurance: number
  agility: number
  luck: number
}

export interface PersonaSkill {
  skillId: string
  inherited?: boolean
  learnLevel?: number
}

export interface Persona {
  id: string
  name: string
  arcana: string
  description?: string
  sourceGame?: string
  race?: string
  stats: PersonaStats
  affinities: Record<string, string>
  skills: PersonaSkill[]
}

export interface PersonaFilters {
  search?: string
  arcana?: string
  minLevel?: number
  maxLevel?: number
}

const BASE_URL = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'

const buildQueryString = (filters: PersonaFilters) => {
  const params = new URLSearchParams()
  if (filters.search) params.set('search', filters.search)
  if (filters.arcana) params.set('arcana', filters.arcana)
  if (filters.minLevel) params.set('minLevel', String(filters.minLevel))
  if (filters.maxLevel) params.set('maxLevel', String(filters.maxLevel))
  return params.toString()
}

export async function fetchPersonas(filters: PersonaFilters = {}) {
  const query = buildQueryString(filters)
  const url = `${BASE_URL}/api/personas${query ? `?${query}` : ''}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load personas (${response.status})`)
  }

  const data = (await response.json()) as { personas: Persona[] }
  return data.personas
}
