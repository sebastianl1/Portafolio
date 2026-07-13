import { profile } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollReveal'

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
          width: 140,
          height: 140,
          borderRadius: '50%',
          margin: '0 auto 24px',
          background: 'var(--bg-card)',
          border: '2px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          overflow: 'hidden',
        }}
      >
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6">
          <circle cx="50" cy="32" r="18" />
          <path d="M18 82c0-18 14-32 32-32s32 14 32 32" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 20,
        }}
      >
        {profile.name}
      </h1>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        {profile.bio}
      </p>
    </section>
  )
}
