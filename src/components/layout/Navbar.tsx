import { useEffect, useState } from 'react'

const links = [
  { href: '#formation', label: 'Trayectoria' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: scrolled ? 'rgba(10, 10, 15, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        boxShadow: scrolled ? '0 1px 40px rgba(0, 0, 0, 0.4)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 'var(--max-width)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '1rem',
            color: 'var(--accent)',
            letterSpacing: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--accent)',
            }}
          >
            SL
          </span>
        </a>

        <div
          style={{
            display: 'flex',
            gap: 2,
            padding: '3px',
            borderRadius: 'var(--radius)',
            background: scrolled ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
            border: '1px solid rgba(0, 245, 212, 0.04)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.2)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 212, 0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.04)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: '7px 18px',
                borderRadius: 8,
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: 500,
                textDecoration: 'none',
                position: 'relative',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-dim)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
