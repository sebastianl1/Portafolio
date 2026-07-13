import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

const links = [
  {
    id: 'whatsapp',
    href: profile.social.whatsapp ? `https://wa.me/${profile.social.whatsapp}` : '',
    label: 'WhatsApp',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'email',
    href: profile.social.email ? `mailto:${profile.social.email}` : '',
    label: 'Gmail',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'github',
    href: profile.social.github ?? '',
    label: 'GitHub',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
]

const s: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    bottom: 28,
    right: 28,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    zIndex: 100,
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
    transition: 'all var(--transition)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    position: 'relative',
  },
  linkActive: {
    background: 'var(--bg-glass)',
    cursor: 'pointer',
    pointerEvents: 'auto' as const,
  },
  linkInactive: {
    background: 'transparent',
    opacity: 0.25,
    cursor: 'default',
    pointerEvents: 'none' as const,
  },
  tooltip: {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    right: 0,
    padding: '4px 10px',
    borderRadius: 6,
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    fontSize: '0.7rem',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: 0,
    transform: 'translateY(4px)',
    transition: 'all var(--transition)',
  },
}

export function SocialFloating() {
  const [mounted, setMounted] = useState(false)
  const [tooltip, setTooltip] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        ...s.container,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(0)' : 'translateX(20px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {links.map((link) => {
        const active = !!link.href
        return (
          <a
            key={link.id}
            href={active ? link.href : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            tabIndex={active ? 0 : -1}
            style={{
              ...s.link,
              ...(active ? s.linkActive : s.linkInactive),
            }}
            onMouseEnter={(e) => {
              if (!active) return
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.background = 'var(--accent-dim)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              setTooltip(link.label)
            }}
            onMouseLeave={(e) => {
              if (!active) return
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'var(--bg-glass)'
              e.currentTarget.style.transform = 'none'
              setTooltip(null)
            }}
          >
            {link.svg}
            <span
              style={{
                ...s.tooltip,
                opacity: tooltip === link.label ? 1 : 0,
                transform: tooltip === link.label ? 'translateY(0)' : 'translateY(4px)',
              }}
            >
              {link.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
