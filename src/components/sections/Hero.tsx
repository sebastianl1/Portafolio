import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
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
        padding: '120px 24px 60px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent)',
          fontSize: '0.8rem',
          marginBottom: 12,
          letterSpacing: 2,
        }}
      >
        Hola, mi nombre es
      </p>

      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 8,
        }}
      >
        {profile.name}
      </h1>

      <h2
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: 8,
        }}
      >
        {profile.title}
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent)',
          fontSize: '0.85rem',
          marginBottom: 24,
        }}
      >
        {profile.tagline}
      </p>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          maxWidth: 680,
          margin: '0 auto 28px',
        }}
      >
        {profile.bio}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          marginBottom: 28,
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: 8, letterSpacing: 1 }}>
            FORMACIÓN ACADÉMICA
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {profile.formation.map((f) => (
              <span
                key={f}
                style={{
                  padding: '4px 14px',
                  borderRadius: 999,
                  fontSize: '0.78rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: 8, letterSpacing: 1 }}>
            COMPETENCIAS
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {profile.competencies.map((c) => (
              <span
                key={c}
                style={{
                  padding: '4px 14px',
                  borderRadius: 999,
                  fontSize: '0.78rem',
                  background: 'var(--accent-dim)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button onClick={() => document.getElementById('projects')?.scrollIntoView()}>
          Ver proyectos
        </Button>
        <Button
          variant="outline"
          onClick={() => document.getElementById('contact')?.scrollIntoView()}
        >
          Contacto
        </Button>
      </div>
    </section>
  )
}
