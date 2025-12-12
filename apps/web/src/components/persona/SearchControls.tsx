import { useEffect, type FormEvent } from 'react'
import { usePersonaStore } from '../../state/personaStore'

const ARCANA_OPTIONS = [
  'fool',
  'magician',
  'priestess',
  'empress',
  'emperor',
  'hierophant',
  'lovers',
  'chariot',
  'justice',
  'hermit',
  'fortune',
  'strength',
  'hanged_man',
  'death',
  'temperance',
  'devil',
  'tower',
  'star',
  'moon',
  'sun',
  'judgement',
  'aeon',
  'world',
]

export function SearchControls() {
  const filters = usePersonaStore((state) => state.filters)
  const setFilters = usePersonaStore((state) => state.setFilters)
  const loadPersonas = usePersonaStore((state) => state.loadPersonas)
  const isLoading = usePersonaStore((state) => state.isLoading)

  // Auto-fetch when filters change (debounced) but only when there's a search term or filters applied
  useEffect(() => {
    const hasSearch = !!filters.search?.trim()
    const hasRange = filters.minLevel !== undefined || filters.maxLevel !== undefined
    const hasArcana = !!filters.arcana
    if (!hasSearch && !hasRange && !hasArcana) return

    const handle = setTimeout(() => {
      void loadPersonas()
    }, 250)
    return () => clearTimeout(handle)
  }, [filters.search, filters.arcana, filters.minLevel, filters.maxLevel, loadPersonas])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    void loadPersonas()
  }

  const handleReset = () => {
    setFilters({
      search: '',
      arcana: undefined,
      minLevel: undefined,
      maxLevel: undefined,
    })
    void loadPersonas()
  }

  return (
    <div className="rounded-md border border-white/15 bg-[#10192c]/80 p-3 text-white shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs uppercase tracking-[0.35em] text-white/60">
        <span className="rounded-sm bg-white/10 px-2 py-1 text-white">Search</span>
        <span className="rounded-sm px-2 py-1 text-white/40">Personas</span>
        <span className="rounded-sm px-2 py-1 text-white/40">Moves</span>
      </div>
      <form onSubmit={handleSubmit} className="mt-3 space-y-3">
        <input
          type="text"
          value={filters.search ?? ''}
          onChange={(event) => setFilters({ search: event.target.value })}
          placeholder="Search Personas by name, arcana, or keyword…"
          className="w-full rounded border border-white/15 bg-black/30 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-neon/60 focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <select
            value={filters.arcana ?? ''}
            onChange={(event) =>
              setFilters({
                arcana: event.target.value || undefined,
              })
            }
            className="w-44 rounded border border-white/15 bg-black/30 px-2.5 py-2 text-white focus:border-neon/60 focus:outline-none"
          >
            <option value="">Any Arcana</option>
            {ARCANA_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={99}
              value={filters.minLevel ?? ''}
              onChange={(event) =>
                setFilters({
                  minLevel: event.target.value ? Number.parseInt(event.target.value, 10) : undefined,
                })
              }
              placeholder="Min Lv"
              className="w-24 rounded border border-white/15 bg-black/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-neon/60 focus:outline-none"
            />
            <span className="text-white/50">-</span>
            <input
              type="number"
              min={1}
              max={99}
              value={filters.maxLevel ?? ''}
              onChange={(event) =>
                setFilters({
                  maxLevel: event.target.value ? Number.parseInt(event.target.value, 10) : undefined,
                })
              }
              placeholder="Max Lv"
              className="w-24 rounded border border-white/15 bg-black/30 px-3 py-2 text-white placeholder:text-white/40 focus:border-neon/60 focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded border border-neon/60 bg-neon/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon transition hover:bg-neon/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Loading…' : 'Search'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
