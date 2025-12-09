export type NavKey = 'home' | 'personadex' | 'battles'

interface NavBarProps {
  active: NavKey
  onNavigate: (key: NavKey) => void
}

const NAV_ITEMS: { label: string; key: NavKey; disabled?: boolean }[] = [
  { label: 'Home', key: 'home' },
  { label: 'PersonaDex', key: 'personadex' },
  { label: 'Battles (soon)', key: 'battles', disabled: true },
]

export function NavBar({ active, onNavigate }: NavBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-8 py-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">Project</p>
        <h1 className="font-display text-3xl text-neon">Persona Showdown</h1>
      </div>

      <nav className="flex flex-wrap items-center gap-3">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              if (!item.disabled) onNavigate(item.key)
            }}
            disabled={item.disabled}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === item.key
                ? 'bg-neon/20 text-neon shadow-[0_0_30px_rgba(118,228,255,0.45)]'
                : 'text-white/70 hover:text-white'
            } ${item.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
