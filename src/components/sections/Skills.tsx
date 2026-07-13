import { knowledgeAreas } from '../../data/skills'
import { Section } from '../layout/Section'

export function Skills() {
  return (
    <Section id="skills" title="Áreas de conocimiento">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {knowledgeAreas.map((area) => (
          <div
            key={area.id}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: '1.2rem' }}>{area.icon}</span>
              <h3
                style={{
                  color: 'var(--accent)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                }}
              >
                {area.title}
              </h3>
            </div>

            {area.subtopics.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {area.subtopics.map((topic) => (
                  <span
                    key={topic}
                    style={{
                      padding: '2px 8px',
                      borderRadius: 999,
                      fontSize: '0.7rem',
                      background: 'var(--accent-dim)',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
