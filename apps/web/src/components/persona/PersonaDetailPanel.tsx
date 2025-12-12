import { useMemo } from 'react'
import { usePersonaStore } from '../../state/personaStore'
import { getPersonaTheme } from '../../lib/personaThemes'
import { affinityLabels } from '../../lib/affinityLabels'

const statOrder = ['strength', 'magic', 'endurance', 'agility', 'luck'] as const
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

  if (!isDetailOpen) return null
  if (!persona) return null

  const theme = getPersonaTheme(persona.arcana)

  const panelBody = (
    <section className="relative space-y-4 text-white">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
        <div className="min-w-0">
          <h2 className="font-display text-3xl leading-tight text-white">{persona.name}</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.28em] text-white/70">
            <span className="rounded border border-white/15 px-2 py-1">{formatArcana(persona.arcana)}</span>
            <span className="rounded border border-white/15 px-2 py-1">Lv {persona.stats.level}</span>
            {persona.race ? (
              <span className="rounded border border-white/15 px-2 py-1 text-white/60">{persona.race}</span>
            ) : null}
            <span className="rounded border border-white/15 px-2 py-1 text-white/60">HP {persona.stats.hp}</span>
            <span className="rounded border border-white/15 px-2 py-1 text-white/60">SP {persona.stats.sp}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={closeDetail}
          className="shrink-0 rounded border border-white/20 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40"
        >
          Close
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr,0.75fr]">
        <div className="grid gap-4">
          <div className="rounded border border-white/10 bg-black/20 p-3">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/60">Parameters</h3>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {statOrder.map((stat) => (
                <div
                  key={stat}
                  className="grid grid-cols-[44px,1fr,40px] items-center gap-2 rounded bg-black/25 px-2 py-2 text-[12px]"
                >
                  <span className="text-white/70">{stat.slice(0, 3).toUpperCase()}</span>
                  <div className="relative h-2.5 overflow-hidden rounded bg-white/10">
                    <div
                      className="absolute inset-y-0 left-0 rounded"
                      style={{
                        width: `${Math.min(100, persona.stats[stat] * 4)}%`,
                        background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                      }}
                    />
                  </div>
                  <span className="text-right font-mono text-xs text-white">{persona.stats[stat]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-white/10 bg-black/20 p-3">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/60">Affinities</h3>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">
              {Object.entries(persona.affinities).map(([element, affinity]) => {
                const normalized = affinity.toLowerCase()
                const label =
                  affinityLabels[normalized] ?? affinity.replace(/\b\w/g, (char) => char.toUpperCase())
                const tone = affinityTone[normalized] ?? affinityTone.neutral
                return (
                  <div
                    key={element}
                    className={`flex items-center justify-between gap-2 rounded border px-2 py-1.5 ${tone}`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">
                      {formatElement(element)}
                    </span>
                    <span className="font-medium">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {persona.skills.length > 0 ? (
            <details className="rounded border border-white/10 bg-black/15">
              <summary className="cursor-pointer select-none px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-white/70">
                Skills
              </summary>
              <div className="border-t border-white/10">
                {persona.skills.map((skill, idx) => (
                  <div
                    key={skill.skillId}
                    className={`flex items-center justify-between px-3 py-2 text-[12px] ${
                      idx % 2 === 0 ? 'bg-white/5' : 'bg-white/0'
                    }`}
                  >
                    <span className="font-medium text-white/90">{skill.skillId}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                      Lv {skill.learnLevel ?? '—'}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="overflow-hidden rounded border border-white/10 bg-black/10">
            {persona.image ? (
              <img
                src={persona.image}
                alt={persona.name}
                className="h-56 w-full object-contain"
                loading="lazy"
              />
            ) : (
              <div className="flex h-56 items-center justify-center text-sm text-white/40">No image</div>
            )}
          </div>
          {persona.description ? (
            <p className="text-sm leading-relaxed text-white/70 line-clamp-6">{persona.description}</p>
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
      {renderDesktop ? <div className="hidden md:block">{panelBody}</div> : null}

      <div
        className={`fixed inset-0 z-40 bg-black/70 p-4 transition md:hidden ${
          isDetailOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-[#0c111a] p-4 shadow-2xl">{drawerContent}</div>
      </div>
    </>
  )
}
