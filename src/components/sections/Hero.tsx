import { profile } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const tags = [
  'Programación',
  'Ciberseguridad',
  'Matemáticas',
  'Procesos Químicos',
  'Electrónica y Solar',
  'Inglés Técnico',
]

export function Hero() {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id="hero"
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '120px 24px 48px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: '50%',
          margin: '0 auto 20px',
          background: 'var(--bg-card)',
          border: '2px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          overflow: 'hidden',
        }}
      >
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6">
          <circle cx="50" cy="32" r="18" />
          <path d="M18 82c0-18 14-32 32-32s32 14 32 32" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 14,
        }}
      >
        {profile.name}
      </h1>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          maxWidth: 600,
          margin: '0 auto 22px',
        }}
      >
        {profile.bio}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '6px 18px',
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              letterSpacing: 0.3,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}
            />
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
