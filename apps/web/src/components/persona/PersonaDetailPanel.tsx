import { useMemo } from 'react'
import { usePersonaStore } from '../../state/personaStore'
import { getPersonaTheme } from '../../lib/personaThemes'
import { affinityLabels } from '../../lib/affinityLabels'

const statTable = [
  { key: 'hp', label: 'HP' },
  { key: 'sp', label: 'SP' },
  { key: 'strength', label: 'STR' },
  { key: 'magic', label: 'MAG' },
  { key: 'endurance', label: 'END' },
  { key: 'agility', label: 'AGI' },
  { key: 'luck', label: 'LUC' },
] as const
const formatArcana = (arcana?: string) =>
  arcana?.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) ?? ''
const formatElement = (element: string) =>
  element.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

const affinityTone: Record<string, string> = {
  weak: 'border-ember/40 bg-ember/10 text-ember',
  resist: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100',
  null: 'border-white/20 bg-white/5 text-white/85',
  drain: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-100',
  repel: 'border-amber-400/30 bg-amber-400/10 text-amber-100',
  neutral: 'border-white/15 bg-black/10 text-white/80',
}

interface PersonaDetailPanelProps {
  renderDesktop?: boolean
}

export function PersonaDetailPanel({ renderDesktop = true }: PersonaDetailPanelProps) {
  const personas = usePersonaStore((state) => state.personas)
  const selectedId = usePersonaStore((state) => state.selectedId)
  const isDetailOpen = usePersonaStore((state) => state.isDetailOpen)
  const closeDetail = usePersonaStore((state) => state.closeDetail)

  const persona = useMemo(
    () => personas.find((candidate) => candidate.id === selectedId),
    [personas, selectedId],
  )

  if (renderDesktop === false && !isDetailOpen) return null
  const theme = persona ? getPersonaTheme(persona.arcana) : null

  const detailContent = persona ? (
    <section className="flex h-full flex-col gap-4 text-white">
      <div className="flex items-start justify-between gap-3 rounded border border-white/15 bg-[#121e30] p-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">{formatArcana(persona.arcana)}</p>
          <h2 className="font-display text-3xl text-white">{persona.name}</h2>
          <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-white/60">
            <span className="rounded border border-white/20 px-2 py-0.5">Lv {persona.stats.level}</span>
            {persona.race ? (
              <span className="rounded border border-white/20 px-2 py-0.5 text-white/70">{persona.race}</span>
            ) : null}
            <span className="rounded border border-white/20 px-2 py-0.5 text-white/70">HP {persona.stats.hp}</span>
            <span className="rounded border border-white/20 px-2 py-0.5 text-white/70">SP {persona.stats.sp}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={closeDetail}
          className="rounded border border-white/20 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40"
        >
          Close
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="space-y-4">
          <section className="rounded border border-white/12 bg-[#111a2b]/90">
            <header className="border-b border-white/10 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
              Base Parameters
            </header>
            <table className="w-full text-sm text-white/80">
              <tbody>
                {statTable.map((stat) => (
                  <tr key={stat.key} className="border-b border-white/5 last:border-b-0">
                    <td className="px-3 py-2 font-semibold uppercase tracking-[0.25em] text-white/70">{stat.label}</td>
                    <td className="px-3 py-2">
                      <div className="relative h-2.5 overflow-hidden rounded bg-white/10">
                        <div
                          className="absolute inset-y-0 left-0 rounded"
                          style={{
                            width: `${Math.min(100, (persona.stats[stat.key as keyof typeof persona.stats] as number) * 1.5)}%`,
                            background: `linear-gradient(90deg, ${theme?.primary ?? '#6dd5ed'}, ${theme?.accent ?? '#2193b0'})`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-xs text-white">
                      {persona.stats[stat.key as keyof typeof persona.stats]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="rounded border border-white/12 bg-[#111a2b]/90">
            <header className="border-b border-white/10 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
              Affinities
            </header>
            <table className="w-full text-sm text-white/80">
              <tbody>
                {Object.entries(persona.affinities).map(([element, affinity]) => {
                  const normalized = affinity.toLowerCase()
                  const label =
                    affinityLabels[normalized] ?? affinity.replace(/\b\w/g, (char) => char.toUpperCase())
                  const tone = affinityTone[normalized] ?? affinityTone.neutral
                  return (
                    <tr key={element} className="border-b border-white/5 last:border-b-0">
                      <td className="px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
                        {formatElement(element)}
                      </td>
                      <td className="px-3 py-2">
                        <span className={`rounded border px-2 py-1 text-xs font-semibold ${tone}`}>{label}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>

          {persona.skills.length > 0 ? (
            <section className="rounded border border-white/12 bg-[#111a2b]/90">
              <header className="border-b border-white/10 px-3 py-2 text-xs uppercase tracking-[0.35em] text-white/60">
                Skills
              </header>
              <table className="w-full text-sm text-white/80">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.3em] text-white/50">
                    <th className="px-3 py-2 text-left font-normal">Skill</th>
                    <th className="px-3 py-2 text-left font-normal">Learn Lv</th>
                  </tr>
                </thead>
                <tbody>
                  {persona.skills.map((skill, idx) => (
                    <tr
                      key={skill.skillId}
                      className={idx % 2 === 0 ? 'bg-white/5' : ''}
                    >
                      <td className="px-3 py-2 font-medium text-white">{skill.skillId}</td>
                      <td className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
                        {skill.learnLevel ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : null}
        </div>

        <div className="space-y-4">
          <section className="rounded border border-white/12 bg-[#111a2b]/90 p-3">
            {persona.image ? (
              <img src={persona.image} alt={persona.name} className="mx-auto max-h-64 object-contain" loading="lazy" />
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-white/40">No image</div>
            )}
          </section>
          {persona.description ? (
            <section className="rounded border border-white/12 bg-[#111a2b]/90 p-3 text-sm text-white/70">
              {persona.description}
            </section>
          ) : null}
        </div>
      </div>
    </section>
  ) : (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-2 text-center text-white/60">
      <p className="text-xs uppercase tracking-[0.4em] text-white/40">PersonaDex</p>
      <p>Select a persona from the list to view details.</p>
    </div>
  )

  if (!renderDesktop) {
    if (!isDetailOpen || !persona) return null
    return (
      <div
        className={`fixed inset-0 z-40 bg-black/70 p-4 transition md:hidden ${
          isDetailOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-[#0c111a] p-4 shadow-2xl">{detailContent}</div>
      </div>
    )
  }

  return detailContent
}
