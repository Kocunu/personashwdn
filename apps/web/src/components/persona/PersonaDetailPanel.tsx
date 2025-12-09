import { useMemo } from 'react'
import { usePersonaStore } from '../../state/personaStore'
import { getPersonaTheme } from '../../lib/personaThemes'
import leaningPortrait from '../../assets/girl-leaning-1600x900.jpg'
import lookupPortrait from '../../assets/loopup-bluetone-2048-1152.jpg'

const statOrder = ['strength', 'magic', 'endurance', 'agility', 'luck'] as const

export function PersonaDetailPanel() {
  const { personas, selectedId, isDetailOpen, closeDetail } = usePersonaStore((state) => ({
    personas: state.personas,
    selectedId: state.selectedId,
    isDetailOpen: state.isDetailOpen,
    closeDetail: state.closeDetail,
  }))

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

  const coolArcana = ['fool', 'star', 'moon', 'priestess', 'hermit']
  const portraitSrc = coolArcana.includes(persona.arcana ?? '') ? lookupPortrait : leaningPortrait
  const portraitClass = coolArcana.includes(persona.arcana ?? '') ? 'detail-portrait cool' : 'detail-portrait'

  const panelBody = (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/10 p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
      style={{
        background: `radial-gradient(circle at 15% 20%, ${theme.primary}33, transparent 55%), linear-gradient(125deg, ${theme.secondary}, rgba(5,7,15,0.95))`,
      }}
    >
      <button
        type="button"
        onClick={closeDetail}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/40"
      >
        Close
      </button>
      <img src={portraitSrc} alt="" aria-hidden className={portraitClass} />
      <div className="absolute inset-y-0 left-6 hidden w-[2px] bg-white/20 md:block" />
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/3">
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.6em] text-white/50">Arcana</p>
            <div className="mt-2 flex items-end gap-3">
              <span className="font-[Cinzel Decorative] text-4xl uppercase tracking-[0.3em] text-white">
                {persona.arcana?.slice(0, 3) ?? 'ARC'}
              </span>
              <div className="text-sm text-white/70">
                {persona.arcana?.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.6em] text-white/60">Codename</p>
              <h2 className="font-display text-4xl text-white">{persona.name}</h2>
            </div>
            <div className="mt-4 text-sm text-white/70">{persona.description ?? '—'}</div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/60">
              <span className="rounded-full border border-white/25 px-3 py-1">
                Lv {persona.stats.level}
              </span>
              {persona.sourceGame ? (
                <span className="rounded-full border border-white/25 px-3 py-1">
                  {persona.sourceGame}
                </span>
              ) : null}
              {persona.race ? (
                <span className="rounded-full border border-white/25 px-3 py-1">{persona.race}</span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="md:flex-1">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-[Cinzel Decorative] text-lg text-white/70">Parameters</h3>
              <div className="mt-3 space-y-2">
                {statOrder.map((stat) => (
                  <div key={stat} className="flex items-center gap-3 text-sm uppercase tracking-[0.3em]">
                    <span className="w-20 text-white/60">{stat.slice(0, 3)}</span>
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width: `${Math.min(100, persona.stats[stat] * 4)}%`,
                          background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-white">{persona.stats[stat]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-[Cinzel Decorative] text-lg text-white/70">Affinities</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {Object.entries(persona.affinities).map(([element, affinity]) => (
                  <div
                    key={element}
                    className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white/80"
                  >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">{element}</p>
                    <p className="text-white">
                      {affinity.replace(/\b\w/g, (char) => char.toUpperCase())}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-[Cinzel Decorative] text-lg text-white/70">Skill Program</h3>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              {persona.skills.map((skill) => (
                <div
                  key={skill.skillId}
                  className="rounded-full border border-white/20 px-4 py-2 text-white/80 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                >
                  <span className="uppercase tracking-[0.3em] text-white/40">
                    Lv {skill.learnLevel ?? '—'}
                  </span>{' '}
                  <span className="text-white">{skill.skillId}</span>
                </div>
              ))}
            </div>
          </div>
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
