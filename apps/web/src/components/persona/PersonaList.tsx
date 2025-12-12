import { usePersonaStore } from '../../state/personaStore'
import { affinityLabels } from '../../lib/affinityLabels'

const formatArcana = (arcana?: string) =>
  arcana?.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) ?? ''

const formatElement = (element: string) =>
  element.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

export function PersonaList() {
  const personas = usePersonaStore((state) => state.personas)
  const isLoading = usePersonaStore((state) => state.isLoading)
  const error = usePersonaStore((state) => state.error)
  const selectedId = usePersonaStore((state) => state.selectedId)
  const selectPersona = usePersonaStore((state) => state.selectPersona)

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/5 p-10 text-center text-white/70">
        Loading personas…
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-ember/40 bg-ember/10 p-6 text-ember">
        {error}
      </div>
    )
  }

  if (personas.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-white/60">
        No personas found. Try adjusting your filters.
      </div>
    )
  }

  const statColumns = [
    { key: 'hp', label: 'HP' },
    { key: 'strength', label: 'STR' },
    { key: 'magic', label: 'MAG' },
    { key: 'endurance', label: 'END' },
    { key: 'agility', label: 'AGI' },
    { key: 'luck', label: 'LUC' },
  ] as const

  return (
    <div className="h-full overflow-auto rounded-md border border-white/10 bg-[#0b0f16]/60">
      <div className="min-w-[1040px]">
        <div className="sticky top-0 z-10 grid grid-cols-[56px,1.4fr,110px,60px,1.4fr,repeat(6,60px)] items-center border-b border-white/10 bg-[#101628]/95 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
          <span className="text-center">Icon</span>
          <span>Persona</span>
          <span className="text-center">Arcana</span>
          <span className="text-center">Lv</span>
          <span>Affinities</span>
          {statColumns.map((col) => (
            <span key={col.key} className="text-center">
              {col.label}
            </span>
          ))}
        </div>
        <div className="divide-y divide-white/5">
          {personas.map((persona) => {
            const isActive = selectedId === persona.id
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => selectPersona(persona.id)}
                className={`grid w-full grid-cols-[56px,1.4fr,110px,60px,1.4fr,repeat(6,60px)] items-center px-3 py-2 text-left text-[13px] transition ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex justify-center">
                  <div className="h-10 w-10 overflow-hidden rounded border border-white/15 bg-black/40">
                    {persona.image ? (
                      <img
                        src={persona.image}
                        alt={persona.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-white/40">
                        N/A
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="font-semibold text-white">{persona.name}</p>
                  <p className="text-xs text-white/60 line-clamp-1">{persona.description ?? '—'}</p>
                </div>
                <div className="text-center text-xs uppercase tracking-[0.2em] text-white/70">
                  {formatArcana(persona.arcana)}
                </div>
                <div className="text-center text-xs text-white/80">Lv {persona.stats.level}</div>
                <div className="flex flex-wrap gap-1 text-[11px] text-white/80">
                  {Object.entries(persona.affinities)
                    .slice(0, 3)
                    .map(([element, affinity]) => {
                      const label =
                        affinityLabels[affinity.toLowerCase()] ??
                        affinity.replace(/\b\w/g, (char) => char.toUpperCase())
                      return (
                        <span
                          key={element}
                          className="rounded border border-white/15 bg-black/20 px-1.5 py-0.5"
                        >
                          {formatElement(element)}: {label}
                        </span>
                      )
                    })}
                </div>
                {statColumns.map((col) => (
                  <span
                    key={col.key}
                    className="text-center font-mono text-xs text-white/90"
                  >
                    {persona.stats[col.key as keyof typeof persona.stats]}
                  </span>
                ))}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

