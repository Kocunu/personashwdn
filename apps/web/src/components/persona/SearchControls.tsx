import type { FormEvent } from 'react'
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
]

export function SearchControls() {
  const filters = usePersonaStore((state) => state.filters)
  const setFilters = usePersonaStore((state) => state.setFilters)
  const loadPersonas = usePersonaStore((state) => state.loadPersonas)
  const isLoading = usePersonaStore((state) => state.isLoading)

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
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/5 bg-white/5 p-6 shadow-inner shadow-black/40"
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-white/70">Search</label>
          <input
            type="text"
            value={filters.search ?? ''}
            onChange={(event) => setFilters({ search: event.target.value })}
            placeholder="Pixie, Jack Frost..."
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-neon/60 focus:outline-none"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-white/70">Arcana</label>
            <select
              value={filters.arcana ?? ''}
              onChange={(event) =>
                setFilters({
                  arcana: event.target.value || undefined,
                })
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-neon/60 focus:outline-none"
            >
              <option value="">Any</option>
              {ARCANA_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-white/70">Min Lv</label>
              <input
                type="number"
                min={1}
                max={99}
                value={filters.minLevel ?? ''}
                onChange={(event) =>
                  setFilters({
                    minLevel: event.target.value
                      ? Number.parseInt(event.target.value, 10)
                      : undefined,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white focus:border-neon/60 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/70">Max Lv</label>
              <input
                type="number"
                min={1}
                max={99}
                value={filters.maxLevel ?? ''}
                onChange={(event) =>
                  setFilters({
                    maxLevel: event.target.value
                      ? Number.parseInt(event.target.value, 10)
                      : undefined,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white focus:border-neon/60 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full border border-neon/60 bg-neon/20 px-6 py-2 text-sm font-semibold text-neon transition hover:bg-neon/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Loading…' : 'Search Personas'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}
