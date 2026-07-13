import { useRef, useEffect } from 'react'
import { profile } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const s: Record<string, React.CSSProperties> = {
  section: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '140px 24px 60px',
    textAlign: 'center',
    position: 'relative',
  },
  avatarWrapper: {
    position: 'relative',
    width: 140,
    height: 140,
    margin: '0 auto 24px',
  },
  avatarBorder: {
    position: 'absolute',
    inset: -3,
    borderRadius: '50%',
    background: 'var(--accent-gradient)',
    animation: 'rotateGradient 4s linear infinite',
  },
  avatarInner: {
    position: 'absolute',
    inset: 3,
    borderRadius: '50%',
    background: 'var(--bg-card)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 4vw, 2.8rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 8,
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% 100%',
    animation: 'gradientShift 4s ease infinite',
  },
  tagline: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
    color: 'var(--accent)',
    letterSpacing: 1,
    marginBottom: 20,
    opacity: 0.8,
  },
  bio: {
    color: 'var(--text-secondary)',
    fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
    lineHeight: 1.8,
    maxWidth: 620,
    margin: '0 auto 28px',
  },
  ctaRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 36,
    flexWrap: 'wrap' as const,
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 'var(--radius)',
    background: 'var(--accent)',
    color: '#0a0a0f',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--transition)',
    textDecoration: 'none',
  },
  ctaOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 'var(--radius)',
    background: 'transparent',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    fontWeight: 600,
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'all var(--transition)',
    textDecoration: 'none',
  },
}

export function Hero() {
  const { ref, visible } = useScrollReveal()
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible) return
    const ctaEls = ctaRef.current?.querySelectorAll('a')
    ctaEls?.forEach((el, i) => {
      el.animate([
        { opacity: 0, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 400, delay: 200 + i * 100, fill: 'forwards', easing: 'ease-out' })
    })
  }, [visible])

  return (
    <section
      id="hero"
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={s.section}
    >
      {/* Avatar */}
      <div style={s.avatarWrapper}>
        <div style={s.avatarBorder} />
        <div style={s.avatarInner}>
          <svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
            {/* Cabeza estilo geométrico / tech */}
            <circle cx="50" cy="30" r="16" stroke="var(--accent)" strokeWidth="2" />
            {/* Cuerpo / torso */}
            <path d="M18 88c0-18 14-32 32-32s32 14 32 32" stroke="var(--accent)" opacity="0.6" />
            {/* Líneas de circuito decorativas */}
            <path d="M34 42l-8-4M66 42l8-4" stroke="var(--accent-neutral)" strokeWidth="1.5" opacity="0.5" />
            <circle cx="26" cy="38" r="2" fill="var(--accent)" opacity="0.4" />
            <circle cx="74" cy="38" r="2" fill="var(--accent)" opacity="0.4" />
            {/* Línea de conexión tipo circuito */}
            <path d="M50 46v8M44 50h12" stroke="var(--accent-neutral)" strokeWidth="1.2" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Name */}
      <h1 style={s.name}>{profile.name}</h1>

      {/* Tagline */}
      <p style={s.tagline}>{profile.tagline}</p>

      {/* Bio */}
      <p style={s.bio}>{profile.bio}</p>

      {/* CTA Buttons */}
      <div ref={ctaRef} style={s.ctaRow}>
        <a
          href="#projects"
          style={s.ctaPrimary}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 24px var(--accent-glow)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 5 7 7-7 7" />
          </svg>
          Ver proyectos
        </a>
        <a
          href="#contact"
          style={s.ctaOutline}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.background = 'var(--accent-dim)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Contactar
        </a>
      </div>
    </section>
  )
}
