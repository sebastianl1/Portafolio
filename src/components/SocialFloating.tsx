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

export function SocialFloating() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        zIndex: 100,
      }}
    >
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          tabIndex={link.href ? 0 : -1}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 10,
            background: link.href ? 'var(--bg-card)' : 'transparent',
            border: link.href ? '1px solid var(--border)' : '1px solid transparent',
            color: link.href ? 'var(--text-muted)' : 'var(--text-muted)',
            opacity: link.href ? 1 : 0.3,
            textDecoration: 'none',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
            pointerEvents: link.href ? 'auto' : 'none',
            cursor: link.href ? 'pointer' : 'default',
          }}
          onMouseEnter={(e) => {
            if (!link.href) return
            e.currentTarget.style.color = 'var(--accent)'
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.background = 'var(--accent-dim)'
          }}
          onMouseLeave={(e) => {
            if (!link.href) return
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.background = 'var(--bg-card)'
          }}
        >
          {link.svg}
        </a>
      ))}
    </div>
  )
}
