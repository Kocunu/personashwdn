import { useEffect } from 'react'
import { SearchControls } from '../components/persona/SearchControls'
import { PersonaList } from '../components/persona/PersonaList'
import { PersonaDetailPanel } from '../components/persona/PersonaDetailPanel'
import { usePersonaStore } from '../state/personaStore'

export function PersonaDexPage() {
  const loadPersonas = usePersonaStore((state) => state.loadPersonas)

  useEffect(() => {
    void loadPersonas()
  }, [loadPersonas])

  return (
    <section className="space-y-10 px-8 py-10">
      <div className="hero-banner spark-field rounded-3xl border border-white/5 bg-gradient-to-br from-midnight/60 via-black/40 to-transparent p-8 shadow-[0_30px_80px_rgba(5,7,15,0.8)]">
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

      <div className="grid gap-6 xl:grid-cols-[320px,1fr,420px]">
        <div className="space-y-6">
          <SearchControls />
        </div>
        <PersonaList />
        <PersonaDetailPanel />
      </div>
    </section>
  )
}
