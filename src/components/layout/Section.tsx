import type { ReactNode } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface Props {
  id: string
  title?: string
  children: ReactNode
}

export function Section({ id, title, children }: Props) {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: '100px 24px',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
      }}
    >
      {title && (
        <h2
          className={`reveal ${visible ? 'visible' : ''}`}
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: 48,
            color: 'var(--text-primary)',
          }}
        >
          {title}
          <span style={{ color: 'var(--accent)' }}>.</span>
        </h2>
      )}
      <div className={`reveal ${visible ? 'visible' : ''}`}>{children}</div>
    </section>
  )
}
