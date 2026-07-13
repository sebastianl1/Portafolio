import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Hero() {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''}`}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            fontSize: '0.9rem',
            marginBottom: 16,
            letterSpacing: 2,
          }}
        >
          Hola, mi nombre es
        </p>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          {profile.name}
        </h1>

        <h2
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: 12,
          }}
        >
          {profile.title}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            fontSize: '0.95rem',
            marginBottom: 40,
          }}
        >
          {profile.tagline}
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
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
      </div>
    </section>
  )
}
