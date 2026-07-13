import type { ReactNode } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface Props {
  id: string
  title?: string
  children: ReactNode
}

const s: Record<string, React.CSSProperties> = {
  section: {
    padding: 'var(--section-py) 24px',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 700,
    marginBottom: 8,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
    letterSpacing: -0.3,
  },
  accent: {
    color: 'var(--accent)',
  },
  underline: {
    width: 48,
    height: 3,
    borderRadius: 2,
    background: 'var(--accent-gradient)',
    marginBottom: 32,
  },
}

export function Section({ id, title, children }: Props) {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id={id}
      ref={ref}
      style={s.section}
    >
      {title && (
        <h2
          className={`reveal ${visible ? 'visible' : ''}`}
          style={s.heading}
        >
          {title}
          <span style={s.accent}>.</span>
        </h2>
      )}
      {title && (
        <div className={`reveal-stagger ${visible ? 'visible' : ''}`} style={s.underline} />
      )}
      <div className={`reveal ${visible ? 'visible' : ''}`}>
        {children}
      </div>
    </section>
  )
}
