import homeHero from '../assets/new_home_1920x1080.jpg'

interface HomePageProps {
  goToPersonaDex: () => void
}

export function HomePage({ goToPersonaDex }: HomePageProps) {
  const features = [
    {
      title: 'Battle Sandbox',
      body: 'Prototype AI fights coming soon. Queue up your squad and test new strategies.',
    },
    {
      title: 'PersonaDex Search',
      body: 'Browse stats, affinities, and skill kits for every Persona in our curated library.',
    },
    {
      title: 'Community Roadmap',
      body: 'Help shape features like matchmaker, ranked ladders, and co-op boss raids.',
    },
  ]

  return (
    <section className="home-screen space-y-12 px-6 py-12 text-white">
      <div className="home-hero glass-panel overflow-hidden rounded-3xl border border-white/10 p-10">
        <div className="home-hero__content space-y-4">
          <p className="text-sm uppercase tracking-[0.6em] text-white/70">Welcome to Persona Showdown</p>
          <h1 className="font-display text-5xl text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
            Battles are coming.
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            Our goal is a browser-based battle experience inspired by Pokémon Showdown, but with the
            Personas and demons you love from SMT. Start by exploring the PersonaDex, then get ready for
            live PvP and raids.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/80 opacity-60"
              disabled
            >
              Play (Soon)
            </button>
            <button
              type="button"
              onClick={goToPersonaDex}
              className="rounded-full border border-neon/60 bg-neon/20 px-6 py-3 text-sm font-semibold text-neon shadow-[0_10px_40px_rgba(118,228,255,0.4)] transition hover:bg-neon/30"
            >
              Launch PersonaDex
            </button>
          </div>
        </div>
        <div className="home-hero__media">
          <img src={homeHero} alt="Persona party artwork" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {features.map((card) => (
          <article key={card.title} className="home-feature-card">
            <h3 className="font-display text-xl text-white">{card.title}</h3>
            <p className="mt-3 text-sm text-white/70">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
