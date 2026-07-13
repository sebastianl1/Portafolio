import { useState } from 'react'
import { knowledgeAreas } from '../../data/skills'
import { Section } from '../layout/Section'

export function Skills() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <Section id="skills" title="Áreas de conocimiento">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {knowledgeAreas.map((area) => {
          const isOpen = expanded === area.id

          return (
            <div
              key={area.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${isOpen ? 'var(--accent-dim)' : 'var(--border)'}`,
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => setExpanded(isOpen ? null : area.id)}
              onMouseEnter={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.borderColor = 'var(--accent-dim)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'none'
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: '1.6rem' }}>{area.icon}</span>
                <h3
                  style={{
                    color: 'var(--accent)',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  {area.title}
                </h3>
              </div>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginBottom: isOpen && area.subtopics.length > 0 ? 16 : 0,
                }}
              >
                {area.description}
              </p>

              {isOpen && area.subtopics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {area.subtopics.map((topic) => (
                    <span
                      key={topic}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 999,
                        fontSize: '0.78rem',
                        background: 'var(--accent-dim)',
                        color: 'var(--accent)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <div
                style={{
                  marginTop: 12,
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {isOpen ? '▲ colapsar' : '▼ expandir'}
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
