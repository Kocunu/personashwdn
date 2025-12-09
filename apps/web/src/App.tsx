import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
import { AppLayout } from './components/AppLayout'
import { NavBar, type NavKey } from './components/NavBar'
import { PersonaDexPage } from './pages/PersonaDex'
import { HomePage } from './pages/Home'

interface PageProps {
  goToPersonaDex: () => void
}

const PersonaDexScreen: ComponentType<PageProps> = () => <PersonaDexPage />

const PAGE_COMPONENTS: Record<NavKey, ComponentType<PageProps>> = {
  home: HomePage,
  personadex: PersonaDexScreen,
  battles: PersonaDexScreen,
}

function App() {
  const [active, setActive] = useState<NavKey>('personadex')
  const ActivePage = useMemo(() => PAGE_COMPONENTS[active], [active])
  const goToPersonaDex = () => setActive('personadex')

  return (
    <AppLayout>
      <NavBar active={active} onNavigate={setActive} />
      <ActivePage goToPersonaDex={goToPersonaDex} />
    </AppLayout>
  )
}

export default App
