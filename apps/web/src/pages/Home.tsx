interface HomePageProps {
  goToPersonaDex: () => void
}

export function HomePage({ goToPersonaDex }: HomePageProps) {
  const features = [
    {
      title: 'PersonaDex Search',
      body: 'Browse stats, affinities, and skill kits for every Persona in our curated library.',
    },
    {
      title: 'Community Roadmap',
      body: 'Help shape features like matchmaker, ranked ladders, and co-op boss raids.',
    },
    {
      title: 'Devlog',
      body: 'Follow updates as we ship search refinements, UI polish, and data expansions.',
    },
  ]

  return (
    <section className="home-screen space-y-12 px-6 py-12 text-white">
      <div className="hero-banner spark-field glass-panel overflow-hidden rounded-3xl border border-white/10 p-10 shadow-[0_30px_80px_rgba(5,7,15,0.8)]">
        <div className="hero-banner__content space-y-4">
          <p className="text-sm uppercase tracking-[0.6em] text-white/60">Persona Archive</p>
          <h1 className="font-display text-5xl text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]">
            PersonaDex Search Console
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            Filter demons by arcana, level, and keywords to explore their battle-ready stats. Every response is served
            straight from our Bun/Elysia backend, making this UI a live preview of the data set that will power the
            future battle engine.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={goToPersonaDex}
              className="rounded-full border border-neon/60 bg-neon/20 px-6 py-3 text-sm font-semibold text-neon shadow-[0_10px_40px_rgba(118,228,255,0.4)] transition hover:bg-neon/30"
            >
              Launch PersonaDex
            </button>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
              New Update
            </span>
          </div>
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
