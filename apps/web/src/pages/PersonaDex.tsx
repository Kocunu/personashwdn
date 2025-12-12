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
  const isDetailOpen = usePersonaStore((state) => state.isDetailOpen)

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

  return (
    <section className="px-4 py-3 md:px-8 md:py-4">
      {/** mobile overlay lives here so the layout stays single-column on small screens */}
      <PersonaDetailPanel renderDesktop={false} />

      <div className="rounded-md border border-white/10 bg-[#0b0f16]/70 shadow-[0_25px_80px_rgba(0,0,0,0.55)] lg:h-[calc(100vh-200px)]">
        <div
          className={`grid min-h-0 items-stretch lg:h-full ${
            selectedId && isDetailOpen ? 'lg:grid-cols-[1.05fr,1fr]' : 'lg:grid-cols-1'
          }`}
        >
          <div
            className={`flex min-h-0 flex-col border-b border-white/10 p-3 lg:border-b-0 ${
              selectedId && isDetailOpen ? 'lg:border-r lg:border-white/10' : ''
            }`}
          >
            <div className="shrink-0">
              <SearchControls />
            </div>
            <div className="mt-2 min-h-0 flex-1">
              <PersonaList />
            </div>
          </div>

          {selectedId && isDetailOpen ? (
            <div className="hidden min-h-0 p-3 lg:block">
              <div className="h-full overflow-auto">
                <PersonaDetailPanel />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
