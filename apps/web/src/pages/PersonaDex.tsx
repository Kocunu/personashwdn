import { useEffect, useRef } from 'react'
import { SearchControls } from '../components/persona/SearchControls'
import { PersonaList } from '../components/persona/PersonaList'
import { PersonaDetailPanel } from '../components/persona/PersonaDetailPanel'
import { usePersonaStore } from '../state/personaStore'

export function PersonaDexPage() {
  const loadPersonas = usePersonaStore((state) => state.loadPersonas)
  const selectNextPersona = usePersonaStore((state) => state.selectNextPersona)
  const selectPreviousPersona = usePersonaStore((state) => state.selectPreviousPersona)
  const selectedId = usePersonaStore((state) => state.selectedId)
  const detailWrapperRef = useRef<HTMLDivElement | null>(null)
  const detailScrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    void loadPersonas()
  }, [loadPersonas])

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
  }, [selectNextPersona, selectPreviousPersona])

  useEffect(() => {
    if (!selectedId) return
    detailWrapperRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
    detailScrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [selectedId])

  return (
    <section className="px-4 py-4 md:px-8 md:py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-white/50">Project</p>
          <h2 className="font-display text-3xl text-white">PersonaDex</h2>
        </div>
        <p className="text-sm text-white/60">Live data feed · Bun/Elysia API</p>
      </div>

      <div className="mt-4 grid gap-4 lg:h-[calc(100vh-180px)] lg:grid-cols-[minmax(0,1.2fr),380px] lg:items-start">
        <div className="flex h-full min-h-0 flex-col gap-3 rounded border border-white/12 bg-[#0f1a2b]/80 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
          <div className="shrink-0">
            <SearchControls />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden rounded border border-white/10 bg-[#0c1525]/80 p-2">
            <PersonaList />
          </div>
        </div>

        <div className="hidden h-full min-h-0 lg:block">
          <div
            ref={detailWrapperRef}
            className="sticky top-20 h-full overflow-hidden rounded border border-white/12 bg-[#0f182a]/85 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
          >
            <div ref={detailScrollRef} className="h-full overflow-auto pr-1">
              <PersonaDetailPanel />
            </div>
          </div>
        </div>
      </div>

      {/** mobile overlay lives here so the layout stays single-column on small screens */}
      <PersonaDetailPanel renderDesktop={false} />
    </section>
  )
}
