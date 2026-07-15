import { useState, useMemo } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getProfile } from '../../data/profile'
import { getKnowledgeAreas } from '../../data/skills'
import { courses } from '../../data/courses'
import { Section } from '../layout/Section'
import { WorkInProgress } from '../ui/WorkInProgress'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { FormationItem, Course } from '../../types/portfolio'

const categoryKeys = ['cybersecurity', 'programming', 'electronics', 'solar', 'chemical', 'english', 'other']

const categoryColors: Record<string, string> = {
  cybersecurity: '#f87171',
  programming: '#00b894',
  electronics: '#fbbf24',
  solar: '#fb923c',
  chemical: '#a78bfa',
  english: '#60a5fa',
  other: '#c8c8d4',
}

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
  // --- Certificate section styles ---
  searchRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 14,
    maxWidth: 400,
  },
  searchInput: {
    width: '100%',
    padding: '8px 14px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.82rem',
    outline: 'none',
    transition: 'all var(--transition)',
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 4,
    marginBottom: 18,
  },
  filterPill: {
    padding: '5px 12px',
    borderRadius: 999,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    cursor: 'pointer',
    transition: 'all var(--transition)',
  },
  filterPillActive: {
    background: 'var(--accent-dim)',
    borderColor: 'var(--accent)',
    color: 'var(--accent)',
  },
  certGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
  },
  certGridMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
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
    cursor: 'pointer',
    transition: 'all var(--transition)',
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
    cursor: 'pointer',
    transition: 'all var(--transition)',
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
  noResults: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-mono)',
    padding: '24px 0',
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

function CertCard({ course }: { course: Course }) {
  const { language } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const catColor = course.category ? categoryColors[course.category] : categoryColors.other

  const openPdf = () => {
    if (course.certificateUrl) {
      window.open(import.meta.env.BASE_URL + course.certificateUrl, '_blank')
    }
  }

  return (
    <div
      style={{
        ...(isMobile ? s.certCardMobile : s.certCard),
        borderLeft: `3px solid ${catColor}`,
      }}
      onClick={openPdf}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = catColor
        e.currentTarget.style.borderLeftColor = catColor
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.borderLeftColor = catColor
        e.currentTarget.style.transform = 'none'
      }}
    >
      <span
        style={{
          ...s.certIcon,
          color: catColor,
        }}
      >
        📄
      </span>
      <div style={isMobile ? { flex: 1 } : undefined}>
        <div style={s.certTitle}>{course.title}</div>
        <div style={s.certInst}>{course.institution}</div>
      </div>
      {course.certificateUrl && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            openPdf()
          }}
          style={{
            ...(isMobile ? s.pdfBtnMobile : s.pdfBtn),
            borderColor: catColor,
            color: catColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${catColor}20`
            e.currentTarget.style.boxShadow = `0 0 12px ${catColor}40`
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
  )
}

export function Formation() {
  const { language } = useLanguage()
  const profile = getProfile(language)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [filterCat, setFilterCat] = useState('all')
  const [search, setSearch] = useState('')

  const technical = profile.formation.filter((f) => f.type === 'technical')
  const independent = profile.formation.filter((f) => f.type === 'independent')

  const filteredCourses = useMemo(() => {
    let result = courses
    if (filterCat !== 'all') {
      result = result.filter((c) => c.category === filterCat)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.institution.toLowerCase().includes(q),
      )
    }
    return result
  }, [filterCat, search])

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

        {courses.length > 0 ? (
          <>
            <div style={s.searchRow}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('cert.search', language)}
                style={s.searchInput}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.boxShadow = '0 0 12px var(--accent-glow)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            <div style={s.filterRow}>
              <button
                onClick={() => setFilterCat('all')}
                style={{
                  ...s.filterPill,
                  ...(filterCat === 'all' ? s.filterPillActive : {}),
                }}
              >
                {t('cert.todas', language)}
              </button>
              {categoryKeys.map((key) => {
                const hasCerts = courses.some((c) => c.category === key)
                if (!hasCerts) return null
                return (
                  <button
                    key={key}
                    onClick={() => setFilterCat(key)}
                    style={{
                      ...s.filterPill,
                      ...(filterCat === key ? s.filterPillActive : {}),
                    }}
                  >
                    {t(`cat.${key}`, language)}
                  </button>
                )
              })}
            </div>

            {filteredCourses.length === 0 ? (
              <p style={s.noResults}>{t('cert.sin-resultados', language)}</p>
            ) : (
              <div style={isMobile ? s.certGridMobile : s.certGrid}>
                {filteredCourses.map((course) => (
                  <CertCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </>
        ) : null}

        <WorkInProgress
          title={t('wip.certs-title', language)}
          description={t('wip.certs-desc', language)}
        />
      </div>
    </Section>
  )
}
