import { useEffect } from 'react'
import { SearchControls } from '../components/persona/SearchControls'
import { PersonaList } from '../components/persona/PersonaList'
import { PersonaDetailPanel } from '../components/persona/PersonaDetailPanel'
import { usePersonaStore } from '../state/personaStore'

export function PersonaDexPage() {
  const loadPersonas = usePersonaStore((state) => state.loadPersonas)
  const selectNextPersona = usePersonaStore((state) => state.selectNextPersona)
  const selectPreviousPersona = usePersonaStore((state) => state.selectPreviousPersona)
  const selectedId = usePersonaStore((state) => state.selectedId)

  useEffect(() => {
    void loadPersonas();
  }, [loadPersonas]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        selectNextPersona()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        selectPreviousPersona()
      } else if (event.key === 'Enter') {
        // no-op (detail hidden)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectNextPersona, selectPreviousPersona]);

  return (
    <section className="space-y-8 px-6 py-8 md:px-8 md:py-10">
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

      <div className="space-y-4">
        <SearchControls />
        {selectedId ? (
          <div className="grid gap-4 xl:grid-cols-[1.4fr,1fr] items-start">
            <PersonaList />
            <PersonaDetailPanel />
          </div>
        ) : (
          <PersonaList />
        )}
      </div>
    </section>
  );
}
