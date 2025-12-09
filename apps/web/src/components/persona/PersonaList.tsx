import { usePersonaStore } from '../../state/personaStore'
import { getPersonaTheme } from '../../lib/personaThemes'

const formatArcana = (arcana?: string) =>
  arcana?.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase()) ?? ''

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
      <div className="rounded-2xl border border-white/5 bg-white/5 p-10 text-center text-white/60">
        No personas found. Try adjusting your filters.
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {personas.map((persona) => (
        <button
          key={persona.id}
          type="button"
          onClick={() => selectPersona(persona.id)}
          className="w-full text-left"
        >
          {(() => {
            const theme = getPersonaTheme(persona.arcana)
            const isActive = selectedId === persona.id
            return (
              <article
                className={`relative overflow-hidden rounded-2xl border p-5 transition ${
                  isActive
                    ? 'border-neon/70 shadow-[0_0_35px_rgba(118,228,255,0.35)]'
                    : 'border-white/5 hover:border-neon/40'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${theme.secondary} 0%, rgba(5,7,15,0.85) 70%)`,
                }}
              >
                <div
                  className="diagonal-strike"
                  style={{
                    position: 'absolute',
                    inset: '-10% -20%',
                    background: `linear-gradient(115deg, ${theme.primary}30, transparent)`,
                    opacity: 0.6,
                  }}
                />
                <div className="relative flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-[Cinzel Decorative] text-xs uppercase tracking-[0.6em] text-white/60">
                      {formatArcana(persona.arcana)}
                    </p>
                    <h3 className="font-display text-2xl text-white">{persona.name}</h3>
                  </div>
                  <div className="text-right text-sm text-white/70">
                    <p>Lv {persona.stats.level}</p>
                    <p className="text-xs text-white/50">Game: {persona.sourceGame ?? '—'}</p>
                  </div>
                </div>

                <dl className="relative mt-4 grid gap-3 text-sm text-white/80 md:grid-cols-3">
                  <div>
                    <dt className="text-white/40">Stats</dt>
                    <dd className="mt-1 flex flex-wrap gap-2 text-xs">
                      {['strength', 'magic', 'endurance', 'agility', 'luck'].map((stat) => (
                        <span
                          key={stat}
                          className="rounded-full bg-white/10 px-2 py-1 uppercase tracking-[0.2em]"
                        >
                          {stat.slice(0, 3)} {persona.stats[stat as keyof typeof persona.stats]}
                        </span>
                      ))}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-white/40">Affinities</dt>
                    <dd className="mt-1 flex flex-wrap gap-2 text-xs">
                      {Object.entries(persona.affinities).map(([element, affinity]) => (
                        <span
                          key={element}
                          className="rounded-full border border-white/10 px-2 py-1 text-white/70"
                        >
                          {element}:{' '}
                          <span className="text-white">
                            {affinity.replace(/\b\w/g, (char) => char.toUpperCase())}
                          </span>
                        </span>
                      ))}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-white/40">Skills</dt>
                    <dd className="mt-1 flex flex-wrap gap-2 text-xs">
                      {persona.skills.map((skill) => (
                        <span key={skill.skillId} className="rounded-full bg-white/10 px-2 py-1">
                          {skill.skillId}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </article>
            )
          })()}
        </button>
      ))}
    </div>
  )
}

