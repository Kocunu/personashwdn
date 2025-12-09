import { useEffect } from 'react'
import { SearchControls } from '../components/persona/SearchControls'
import { PersonaList } from '../components/persona/PersonaList'
import { PersonaDetailPanel } from '../components/persona/PersonaDetailPanel'
import { usePersonaStore } from '../state/personaStore'

export function PersonaDexPage() {
  const loadPersonas = usePersonaStore((state) => state.loadPersonas)
  const selectNextPersona = usePersonaStore((state) => state.selectNextPersona)
  const selectPreviousPersona = usePersonaStore((state) => state.selectPreviousPersona)
  const openDetail = usePersonaStore((state) => state.openDetail)
  const closeDetail = usePersonaStore((state) => state.closeDetail)
  const toggleDetail = usePersonaStore((state) => state.toggleDetail)
  const isDetailOpen = usePersonaStore((state) => state.isDetailOpen)

  useEffect(() => {
    void loadPersonas()
  }, [loadPersonas])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        selectNextPersona()
        openDetail()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        selectPreviousPersona()
        openDetail()
      } else if (event.key === 'Enter') {
        openDetail()
      } else if (event.key === 'Escape') {
        closeDetail()
      } else if (event.key.toLowerCase() === 'd') {
        toggleDetail()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectNextPersona, selectPreviousPersona, openDetail, closeDetail, toggleDetail])

  return (
    <section className="space-y-10 px-8 py-10">
      <div className="hero-banner spark-field rounded-3xl border border-white/5 bg-gradient-to-br from-midnight/60 via-black/40 to-transparent p-8 shadow-[0_30px_80px_rgba(5,7,15,0.8)]">
        <div className="hero-banner__content space-y-4">
        <p className="text-sm uppercase tracking-[0.6em] text-white/60">
          Persona Archive
        </p>
        <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">
          PersonaDex Search Console
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-white/70">
          Filter demons by arcana, level, and keywords to explore their battle-ready stats.
          Every response is served straight from our Bun/Elysia backend, making this UI a live preview
          of the data set that will power the future battle engine.
        </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px,1fr,420px]">
        <div className="space-y-6">
          <SearchControls />
        </div>
        <PersonaList />
        <div className="space-y-4">
          {!isDetailOpen && (
            <button
              type="button"
              onClick={openDetail}
              className="w-full rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-neon/40 hover:text-white"
            >
              Open Dossier
            </button>
          )}
          <PersonaDetailPanel />
        </div>
      </div>
    </section>
  )
}
