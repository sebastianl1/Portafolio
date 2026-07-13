import { useState } from 'react'
import { profile } from '../../data/profile'
import { courses } from '../../data/courses'
import { knowledgeAreas } from '../../data/skills'
import { Section } from '../layout/Section'
import type { FormationItem } from '../../types/portfolio'

function FormationCard({ item }: { item: FormationItem }) {
  const [isOpen, setIsOpen] = useState(false)

  const relatedAreas = knowledgeAreas.filter((a) =>
    item.knowledgeAreaIds.includes(a.id),
  )

  return (
    <div
      style={{
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {item.title}
          </div>
          {(item.institution || item.duration) && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              {[item.institution, item.duration].filter(Boolean).join(' · ')}
            </div>
          )}
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
      {isOpen && (
        <div style={{ padding: '0 16px 12px', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 12 }}>
            {item.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
            {item.competencies.map((c) => (
              <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ color: 'var(--accent)', fontSize: '0.7rem', marginTop: 4 }}>●</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                  {c}
                </span>
              </div>
            ))}
          </div>
          {relatedAreas.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {relatedAreas.map((area) => (
                <span
                  key={area.id}
                  style={{
                    padding: '2px 10px',
                    borderRadius: 999,
                    fontSize: '0.7rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {area.icon} {area.title}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function Formation() {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  const technical = profile.formation.filter((f) => f.type === 'technical')
  const independent = profile.formation.filter((f) => f.type === 'independent')

  return (
    <Section id="formation" title="Trayectoria">
      {/* ─── Formación Técnica y Tecnológica ─── */}
      <div style={{ marginBottom: 32 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent)',
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          FORMACIÓN TÉCNICA Y TECNOLÓGICA
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {technical.map((item) => (
            <FormationCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* ─── Formación Independiente ─── */}
      <div style={{ marginBottom: 32 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent)',
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          FORMACIÓN INDEPENDIENTE
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {independent.map((item) => (
            <FormationCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* ─── Programas Especializados ─── */}
      <div style={{ marginBottom: 32 }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent)',
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          PROGRAMAS ESPECIALIZADOS
        </p>
        {courses.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Próximamente...
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {courses.map((course) => {
              const isOpen = expandedCourse === course.id
              return (
                <div
                  key={course.id}
                  style={{
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpandedCourse(isOpen ? null : course.id)}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {course.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                        {course.institution}
                      </div>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 16px 12px', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 10 }}>
                        {course.description}
                      </p>
                      {course.certificateUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(course.certificateUrl, '_blank')
                          }}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 999,
                            border: '1px solid var(--accent)',
                            background: 'transparent',
                            color: 'var(--accent)',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Ver certificado
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ─── Áreas de Conocimiento ─── */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent)',
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          ÁREAS DE CONOCIMIENTO
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {knowledgeAreas.map((area) => (
            <span
              key={area.id}
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                fontSize: '0.78rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                cursor: 'default',
              }}
              title={area.subtopics.join(', ')}
            >
              {area.icon} {area.title}
            </span>
          ))}
        </div>
      </div>
    </Section>
  )
}
