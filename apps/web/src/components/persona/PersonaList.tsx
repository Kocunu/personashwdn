import { usePersonaStore } from '../../state/personaStore'

const formatArcana = (arcana?: string) =>
  arcana?.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase()) ?? ''

export function PersonaList() {
  const { personas, isLoading, error } = usePersonaStore((state) => ({
    personas: state.personas,
    isLoading: state.isLoading,
    error: state.error,
  }))

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
        <article
          key={persona.id}
          className="rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:border-neon/40 hover:bg-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/40">
                {formatArcana(persona.arcana)}
              </p>
              <h3 className="font-display text-2xl text-white">{persona.name}</h3>
            </div>
            <div className="text-right text-sm text-white/60">
              <p>Lv {persona.stats.level}</p>
              <p className="text-xs text-white/40">Game: {persona.sourceGame ?? '—'}</p>
            </div>
          </div>

          <dl className="mt-4 grid gap-3 text-sm text-white/70 md:grid-cols-3">
            <div>
              <dt className="text-white/40">Stats</dt>
              <dd className="mt-1 flex flex-wrap gap-2 text-xs">
                {['strength', 'magic', 'endurance', 'agility', 'luck'].map((stat) => (
                  <span key={stat} className="rounded-full bg-white/10 px-2 py-1">
                    {stat.slice(0, 3).toUpperCase()} {persona.stats[stat as keyof typeof persona.stats]}
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
      ))}
    </div>
  )
}
