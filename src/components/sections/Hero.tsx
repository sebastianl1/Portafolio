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
        padding: '120px 24px 48px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent)',
          fontSize: '0.8rem',
          marginBottom: 10,
          letterSpacing: 2,
        }}
      >
        Hola, mi nombre es
      </p>

      <h1
        style={{
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 6,
        }}
      >
        {profile.name}
      </h1>

      <h2
        style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: 6,
        }}
      >
        {profile.title}
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          marginBottom: 28,
        }}
      >
        {profile.tagline}
      </p>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          maxWidth: 640,
          margin: '0 auto 28px',
        }}
      >
        {profile.bio}
      </p>

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
