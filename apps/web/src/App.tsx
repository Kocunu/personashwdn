import { AppLayout } from './components/AppLayout'
import { NavBar } from './components/NavBar'
import { PersonaDexPage } from './pages/PersonaDex'

function App() {
  return (
    <AppLayout>
      <NavBar />
      <PersonaDexPage />
    </AppLayout>
  )
}

export default App
