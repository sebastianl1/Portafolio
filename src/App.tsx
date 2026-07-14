import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Formation } from './components/sections/Formation'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { BackgroundCanvas } from './components/BackgroundCanvas'
import { SocialFloating } from './components/SocialFloating'
import { ScrollToTop } from './components/ScrollToTop'
import { ErrorBoundary } from './components/ErrorBoundary'

export default function App() {
  return (
    <>
      <BackgroundCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <ErrorBoundary><Hero /></ErrorBoundary>
          <ErrorBoundary><Formation /></ErrorBoundary>
          <ErrorBoundary><Projects /></ErrorBoundary>
          <ErrorBoundary><Contact /></ErrorBoundary>
        </main>
        <Footer />
        <SocialFloating />
        <ScrollToTop />
      </div>
    </>
  )
}
