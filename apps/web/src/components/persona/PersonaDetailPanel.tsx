import { useMemo } from 'react'
import { usePersonaStore } from '../../state/personaStore'
import { getPersonaTheme } from '../../lib/personaThemes'
import { affinityLabels } from '../../lib/affinityLabels'

const statOrder = ['strength', 'magic', 'endurance', 'agility', 'luck'] as const
const formatArcana = (arcana?: string) =>
  arcana?.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) ?? ''
const formatElement = (element: string) =>
  element.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

export function PersonaDetailPanel() {
  const personas = usePersonaStore((state) => state.personas)
  const selectedId = usePersonaStore((state) => state.selectedId)
  const isDetailOpen = usePersonaStore((state) => state.isDetailOpen)
  const closeDetail = usePersonaStore((state) => state.closeDetail)

  const persona = useMemo(
    () => personas.find((candidate) => candidate.id === selectedId),
    [personas, selectedId],
  )

  if (!persona && !isDetailOpen) {
    return null
  }

  if (!persona) {
    return (
      <div className="spark-field flex h-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/60">
        <p className="font-[Cinzel Decorative] text-lg tracking-[0.5em] text-white/30">
          PersonaDex
        </p>
        <p>Select a persona card to reveal their dossier.</p>
      </div>
    )
  }

  const theme = getPersonaTheme(persona.arcana)

  const panelBody = (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4 text-white shadow-lg"
      style={{
        background: `linear-gradient(120deg, ${theme.secondary} 0%, rgba(10,12,18,0.9) 60%)`,
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">
          <span className="rounded border border-white/15 px-2 py-1">{formatArcana(persona.arcana)}</span>
          <span className="rounded border border-white/15 px-2 py-1">Lv {persona.stats.level}</span>
        </div>
        <button
          type="button"
          onClick={closeDetail}
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40"
        >
          Close
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr,1fr] pt-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-lg border border-white/15 bg-black/30">
              {persona.image ? (
                <img src={persona.image} alt={persona.name} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-white/40">N/A</div>
              )}
            </div>
            <div>
              <h2 className="font-display text-2xl text-white">{persona.name}</h2>
              <p className="text-xs text-white/60">{persona.race ?? 'Persona'}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/75">{persona.description ?? '—'}</p>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/60">Affinities</h3>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
              {Object.entries(persona.affinities).map(([element, affinity]) => {
                const label =
                  affinityLabels[affinity.toLowerCase()] ??
                  affinity.replace(/\b\w/g, (char) => char.toUpperCase())
                return (
                  <div key={element} className="rounded border border-white/10 bg-white/10 px-2 py-1.5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">{formatElement(element)}</p>
                    <p className="text-white">{label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <h3 className="text-xs uppercase tracking-[0.3em] text-white/60">Parameters</h3>
            <div className="mt-2 space-y-2">
              {statOrder.map((stat) => (
                <div key={stat} className="grid grid-cols-[48px,1fr,40px] items-center gap-2 text-xs uppercase tracking-[0.2em]">
                  <span className="text-white/70">{stat.slice(0, 3)}</span>
                  <div className="relative h-2 overflow-hidden rounded bg-white/10">
                    <div
                      className="absolute inset-y-0 left-0 rounded"
                      style={{
                        width: `${Math.min(100, persona.stats[stat] * 4)}%`,
                        background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                      }}
                    />
                  </div>
                  <span className="text-right text-white">{persona.stats[stat]}</span>
                </div>
              ))}
            </div>
          </div>

          {persona.skills.length > 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <h3 className="text-xs uppercase tracking-[0.3em] text-white/60">Skills</h3>
              <div className="mt-2 grid grid-cols-1 gap-2 text-xs">
                {persona.skills.map((skill) => (
                  <div
                    key={skill.skillId}
                    className="flex items-center justify-between rounded border border-white/15 bg-white/10 px-3 py-2 text-white/80"
                  >
                    <span className="font-medium">{skill.skillId}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                      Lv {skill.learnLevel ?? '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )

  const drawerContent = (
    <div
      className={`absolute inset-x-0 bottom-0 transform transition duration-500 ${
        isDetailOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {panelBody}
    </div>
  )

  return (
    <>
      <div
        className={`hidden md:block transition duration-500 ${
          isDetailOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        {panelBody}
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/70 p-4 transition md:hidden ${
          isDetailOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {drawerContent}
      </div>
    </>
  )
}
