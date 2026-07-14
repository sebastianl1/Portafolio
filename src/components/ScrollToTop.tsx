import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

const BOTTOM_OFFSET = 150

const s: Record<string, React.CSSProperties> = {
  btn: {
    position: 'fixed',
    bottom: 28,
    left: 28,
    zIndex: 100,
    width: 44,
    height: 44,
    borderRadius: 12,
    border: '1px solid var(--border)',
    background: 'var(--bg-glass)',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transition: 'all var(--transition)',
  },
  btnMobile: {
    position: 'fixed',
    bottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
    left: 'max(16px, env(safe-area-inset-left, 16px))',
    zIndex: 100,
    width: 38,
    height: 38,
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--bg-glass)',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transition: 'all var(--transition)',
  },
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [nearBottom, setNearBottom] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 300
      const scrollBottom = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      setVisible(scrolled)
      setNearBottom(scrollBottom >= pageHeight - BOTTOM_OFFSET)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const show = visible && !nearBottom

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        ...(isMobile ? s.btnMobile : s.btn),
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: show ? 'auto' as const : 'none' as const,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent)'
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.background = 'var(--accent-dim)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-muted)'
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background = 'var(--bg-glass)'
        if (show) e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
