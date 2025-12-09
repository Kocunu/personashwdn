const NAV_ITEMS = [
  { label: 'Home', href: '#home', isActive: false },
  { label: 'PersonaDex', href: '#personadex', isActive: true },
  { label: 'Battles (soon)', href: '#battles', isActive: false },
]

export function NavBar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-8 py-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">Project</p>
        <h1 className="font-display text-3xl text-neon">Persona Showdown</h1>
      </div>

      <nav className="flex flex-wrap items-center gap-3">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              item.isActive
                ? 'bg-neon/20 text-neon shadow-[0_0_30px_rgba(118,228,255,0.45)]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
