import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import { getProfile } from '../data/profile'

function useSocialLinks() {
  const { language } = useLanguage()
  const profile = getProfile(language)
  return [
    {
      id: 'whatsapp',
      href: profile.social.whatsapp ? `https://wa.me/${profile.social.whatsapp}` : '',
      labelKey: 'social.whatsapp',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      id: 'email',
      href: profile.social.email ? `mailto:${profile.social.email}` : '',
      labelKey: 'social.gmail',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      href: profile.social.linkedin ?? '',
      labelKey: 'contact.linkedin',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      id: 'github',
      href: profile.social.github ?? '',
      labelKey: 'social.github',
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
  ]
}

const s: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'fixed',
    bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
    right: 'max(24px, env(safe-area-inset-right, 24px))',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 14,
    border: '1px solid var(--border-accent)',
    background: 'var(--accent-dim)',
    color: 'var(--accent)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transition: 'all var(--transition)',
    boxShadow: '0 0 16px var(--accent-glow)',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 12,
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transition: 'all var(--transition)',
  },
}

const BOTTOM_OFFSET = 150

export function SocialFloating() {
  const { language } = useLanguage()
  const links = useSocialLinks()
  const [mounted, setMounted] = useState(false)
  const [nearBottom, setNearBottom] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      setNearBottom(scrollBottom >= pageHeight - BOTTOM_OFFSET)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])

  const show = mounted && !nearBottom

  return (
    <div
      ref={ref}
      style={{
        ...s.wrapper,
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(20px)',
        pointerEvents: show ? 'auto' as const : 'none' as const,
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {links.map((link, i) => {
            const active = !!link.href
            return (
              <a
                key={link.id}
                href={active ? link.href : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(link.labelKey, language)}
                tabIndex={active ? 0 : -1}
                onClick={() => setOpen(false)}
                style={{
                  ...s.link,
                  opacity: 0,
                  animation: `fadeInUp 0.25s ease forwards`,
                  animationDelay: `${i * 60}ms`,
                  ...(active
                    ? { cursor: 'pointer', pointerEvents: 'auto' as const }
                    : { opacity: 0.25, cursor: 'default', pointerEvents: 'none' as const }),
                }}
                onMouseEnter={(e) => {
                  if (!active) return
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--accent-dim)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  if (!active) return
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--bg-glass)'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                {link.svg}
              </a>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close social links' : 'Open social links'}
        aria-expanded={open}
        style={s.fab}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--accent-dim-strong)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 0 24px var(--accent-glow)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--accent-dim)'
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = '0 0 16px var(--accent-glow)'
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  )
}
