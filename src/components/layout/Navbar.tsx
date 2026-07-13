import { useEffect, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

const links = [
  { key: 'nav.trayectoria', href: '#formation' },
  { key: 'nav.proyectos', href: '#projects' },
  { key: 'nav.contacto', href: '#contact' },
]

const sections = links.map((l) => l.href.slice(1))

const s: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-slow)',
  },
  navScrolled: {
    background: 'var(--bg-glass-solid)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    boxShadow: '0 1px 40px rgba(0, 0, 0, 0.5)',
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: 2,
    zIndex: 1001,
    background: 'var(--accent-gradient)',
    transition: 'width 0.1s linear',
  },
  container: {
    width: '100%',
    maxWidth: 'var(--max-width)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
  },
  logo: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 800,
    fontSize: '1rem',
    color: 'var(--accent)',
    letterSpacing: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: 'var(--accent-dim)',
    border: '1px solid var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 700,
    color: 'var(--accent)',
    transition: 'all var(--transition)',
  },
  linkContainer: {
    display: 'flex',
    gap: 2,
    padding: '3px',
    borderRadius: 'var(--radius)',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(0, 245, 212, 0.04)',
    transition: 'all var(--transition)',
    alignItems: 'center',
  },
  link: {
    padding: '7px 14px',
    borderRadius: 8,
    fontSize: '0.82rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all var(--transition)',
    position: 'relative',
  } as React.CSSProperties,
  linkActive: {
    color: 'var(--accent)',
    background: 'var(--accent-dim)',
  },
  linkInactive: {
    color: 'var(--text-secondary)',
    background: 'transparent',
  },
  langToggle: {
    padding: '6px 10px',
    borderRadius: 6,
    fontSize: '0.72rem',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'all var(--transition)',
    letterSpacing: 0.5,
    marginLeft: 8,
  },
}

export function Navbar() {
  const { language, toggleLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div style={{ ...s.progressBar, width: `${progress}%` }} />
      <nav
        style={{
          ...s.nav,
          ...(scrolled ? s.navScrolled : {}),
        }}
      >
        <div style={s.container}>
          <a href="#hero" style={s.logo}>
            <span
              style={s.badge}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }}
            >
              SL
            </span>
          </a>

          <div
            style={s.linkContainer}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.2)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 212, 0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.04)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {links.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    ...s.link,
                    ...(isActive ? s.linkActive : s.linkInactive),
                  }}
                >
                  {t(link.key, language)}
                </a>
              )
            })}

            <button
              onClick={toggleLanguage}
              style={s.langToggle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-muted)'
              }}
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
