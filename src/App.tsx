import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Formation } from './components/sections/Formation'
import { Skills } from './components/sections/Skills'
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
      <div className="page-enter" style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <ErrorBoundary><Hero /></ErrorBoundary>
          <div className="section-divider" />
          <ErrorBoundary><Formation /></ErrorBoundary>
          <div className="section-divider" />
          <ErrorBoundary><Skills /></ErrorBoundary>
          <div className="section-divider" />
          <ErrorBoundary><Projects /></ErrorBoundary>
          <div className="section-divider" />
          <ErrorBoundary><Contact /></ErrorBoundary>
        </main>
        <Footer />
        <SocialFloating />
        <ScrollToTop />
      </div>
    </>
  )
}
