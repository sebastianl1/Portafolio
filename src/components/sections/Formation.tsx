import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getProfile } from '../../data/profile'
import { getKnowledgeAreas } from '../../data/skills'
import { courses } from '../../data/courses'
import { Section } from '../layout/Section'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { FormationItem } from '../../types/portfolio'

const s: Record<string, React.CSSProperties> = {
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--accent)',
    letterSpacing: 2,
    marginBottom: 20,
  },
  timeline: {
    position: 'relative',
    paddingLeft: 28,
  },
  timelineMobile: {
    position: 'relative',
    paddingLeft: 22,
  },
  timelineLine: {
    position: 'absolute',
    left: 10,
    top: 4,
    bottom: 4,
    width: 2,
    background: 'var(--border)',
    borderRadius: 1,
  },
  timelineLineMobile: {
    position: 'absolute',
    left: 8,
    top: 4,
    bottom: 4,
    width: 2,
    background: 'var(--border)',
    borderRadius: 1,
  },
  timelineDot: {
    position: 'absolute',
    left: 4,
    top: 18,
    width: 14,
    height: 14,
    borderRadius: '50%',
    border: '2px solid var(--accent)',
    background: 'var(--bg-primary)',
    zIndex: 1,
  },
  timelineDotMobile: {
    position: 'absolute',
    left: 3,
    top: 16,
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: '2px solid var(--accent)',
    background: 'var(--bg-primary)',
    zIndex: 1,
  },
  timelineDotIndependent: {
    position: 'absolute',
    left: 4,
    top: 18,
    width: 14,
    height: 14,
    borderRadius: '50%',
    border: '2px solid var(--accent-neutral)',
    background: 'var(--bg-primary)',
    zIndex: 1,
  },
  timelineDotIndependentMobile: {
    position: 'absolute',
    left: 3,
    top: 16,
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: '2px solid var(--accent-neutral)',
    background: 'var(--bg-primary)',
    zIndex: 1,
  },
  card: {
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'var(--bg-card)',
    transition: 'all var(--transition)',
    marginBottom: 12,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
  },
  cardHeaderMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
  },
  cardTitle: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.4,
  },
  cardTitleMobile: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.4,
  },
  cardMeta: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    marginTop: 3,
  },
  cardMetaMobile: {
    fontSize: '0.68rem',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    marginTop: 3,
  },
  expandIcon: {
    color: 'var(--text-muted)',
    fontSize: '0.7rem',
    transition: 'transform var(--transition)',
  },
  cardBody: {
    padding: '0 18px 14px',
    borderTop: '1px solid var(--border)',
    paddingTop: 12,
  },
  cardBodyMobile: {
    padding: '0 14px 12px',
    borderTop: '1px solid var(--border)',
    paddingTop: 10,
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '0.82rem',
    lineHeight: 1.7,
    marginBottom: 14,
  },
  descriptionMobile: {
    color: 'var(--text-secondary)',
    fontSize: '0.78rem',
    lineHeight: 1.7,
    marginBottom: 12,
  },
  competency: {
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
    lineHeight: 1.6,
  },
  competencyMobile: {
    color: 'var(--text-secondary)',
    fontSize: '0.76rem',
    lineHeight: 1.6,
  },
  competencyBullet: {
    color: 'var(--accent)',
    fontSize: '0.65rem',
    marginTop: 5,
    flexShrink: 0,
  },
  areaTag: {
    padding: '3px 10px',
    borderRadius: 999,
    fontSize: '0.68rem',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap' as const,
  },
  certGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
  },
  certGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 10,
  },
  certCard: {
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
    background: 'var(--bg-card)',
    transition: 'all var(--transition)',
    cursor: 'default',
  },
  certCardMobile: {
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    padding: '14px',
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 12,
    background: 'var(--bg-card)',
    transition: 'all var(--transition)',
    cursor: 'default',
  },
  certIcon: {
    fontSize: '1.6rem',
    lineHeight: 1,
  },
  certTitle: {
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.4,
  },
  certInst: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    marginTop: 2,
  },
  pdfBtn: {
    width: '100%',
    padding: '7px 0',
    borderRadius: 6,
    border: '1px solid var(--accent)',
    background: 'transparent',
    color: 'var(--accent)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 'auto',
    transition: 'all var(--transition)',
  },
  pdfBtnMobile: {
    padding: '6px 14px',
    borderRadius: 6,
    border: '1px solid var(--accent)',
    background: 'transparent',
    color: 'var(--accent)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.7rem',
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all var(--transition)',
  },
  comingSoon: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-mono)',
  },
}

function FormationCard({ item, index }: { item: FormationItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const { ref, visible } = useScrollReveal()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const areas = getKnowledgeAreas(language)

  const relatedAreas = areas.filter((a) =>
    item.knowledgeAreaIds.includes(a.id),
  )
  const isIndependent = item.type === 'independent'

  const dotStyle = isIndependent
    ? (isMobile ? s.timelineDotIndependentMobile : s.timelineDotIndependent)
    : (isMobile ? s.timelineDotMobile : s.timelineDot)

  return (
    <div
      ref={ref}
      className={`reveal-stagger ${visible ? 'visible' : ''}`}
      style={{ position: 'relative', transitionDelay: `${index * 100}ms` }}
    >
      <div style={dotStyle} />
      <div
        style={s.card}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'var(--border-accent)'
            e.currentTarget.style.transform = 'translateX(4px)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.transform = 'none'
          }
        }}
      >
        <div style={isMobile ? s.cardHeaderMobile : s.cardHeader}>
          <div>
            <div style={isMobile ? s.cardTitleMobile : s.cardTitle}>{item.title}</div>
            {(item.institution || item.duration) && (
              <div style={isMobile ? s.cardMetaMobile : s.cardMeta}>
                {[item.institution, item.duration].filter(Boolean).join(' · ')}
              </div>
            )}
          </div>
          <span style={{ ...s.expandIcon, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows var(--transition-slow)',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <div style={isMobile ? s.cardBodyMobile : s.cardBody}>
              <p style={isMobile ? s.descriptionMobile : s.description}>{item.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 14 }}>
                {item.competencies.map((c) => (
                  <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={s.competencyBullet}>●</span>
                    <span style={isMobile ? s.competencyMobile : s.competency}>{c}</span>
                  </div>
                ))}
              </div>
              {relatedAreas.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {relatedAreas.map((area) => (
                    <span key={area.id} style={s.areaTag}>
                      {area.icon} {area.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Formation() {
  const { language } = useLanguage()
  const profile = getProfile(language)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const technical = profile.formation.filter((f) => f.type === 'technical')
  const independent = profile.formation.filter((f) => f.type === 'independent')

  const timelineStyle = isMobile ? s.timelineMobile : s.timeline
  const timelineLineStyle = isMobile ? s.timelineLineMobile : s.timelineLine

  return (
    <Section id="formation" title={t('section.formacion', language)}>
      <div style={{ marginBottom: 40 }}>
        <p style={s.sectionLabel}>{t('formation.tecnica', language)}</p>
        <div style={timelineStyle}>
          <div style={timelineLineStyle} />
          {technical.map((item, i) => (
            <FormationCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 40 }}>
        <p style={{ ...s.sectionLabel, color: 'var(--accent-neutral)' }}>
          {t('formation.independiente', language)}
        </p>
        <div style={timelineStyle}>
          <div style={timelineLineStyle} />
          {independent.map((item, i) => (
            <FormationCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <p style={s.sectionLabel}>{t('formation.certificados', language)}</p>
        {courses.length === 0 ? (
          <p style={s.comingSoon}>{t('formation.proximamente', language)}</p>
        ) : (
          <div style={isMobile ? s.certGridMobile : s.certGrid}>
            {courses.map((course) => (
              <div key={course.id} style={isMobile ? s.certCardMobile : s.certCard}>
                <span style={s.certIcon}>📄</span>
                <div style={isMobile ? { flex: 1 } : undefined}>
                  <div style={s.certTitle}>{course.title}</div>
                  <div style={s.certInst}>{course.institution}</div>
                </div>
                {course.certificateUrl && (
                  <button
                    onClick={() => window.open(import.meta.env.BASE_URL + course.certificateUrl, '_blank')}
                    style={isMobile ? s.pdfBtnMobile : s.pdfBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--accent-dim)'
                      e.currentTarget.style.boxShadow = '0 0 12px var(--accent-glow)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {t('cert.ver-pdf', language)}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
