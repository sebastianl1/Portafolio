import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getKnowledgeAreas } from '../../data/skills'
import { Section } from '../layout/Section'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const s: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12,
  },
  gridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 10,
  },
  card: {
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    padding: '16px 14px',
    background: 'var(--bg-card)',
    transition: 'all var(--transition)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  iconRow: {
    fontSize: '1.3rem',
    lineHeight: 1,
    flexShrink: 0,
  },
  title: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
    lineHeight: 1.3,
  },
  desc: {
    color: 'var(--text-secondary)',
    fontSize: '0.72rem',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    margin: 0,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 'auto',
    paddingTop: 8,
  },
  tag: {
    fontSize: '0.68rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    background: 'var(--bg-subtle)',
    border: '1px solid var(--border)',
    padding: '3px 7px',
    borderRadius: 999,
    lineHeight: 1,
  },
}

function SkillCard({ area, index }: { area: { id: string; title: string; description: string; icon: string; subtopics: string[] }; index: number }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`reveal-stagger ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        style={s.card}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-accent)'
          e.currentTarget.style.transform = 'translateY(-3px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={s.header}>
          <span style={s.iconRow}>{area.icon}</span>
          <h3 style={s.title}>{area.title}</h3>
        </div>
        <p style={s.desc}>{area.description}</p>
        <div style={s.tags}>
          {area.subtopics.slice(0, 4).map((st) => (
            <span key={st} style={s.tag}>
              {st}
            </span>
          ))}
          {area.subtopics.length > 4 && (
            <span style={{ ...s.tag, opacity: 0.6 }}>+{area.subtopics.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  const { language } = useLanguage()
  const areas = getKnowledgeAreas(language)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Section id="skills" title={t('section.skills', language)}>
      <div style={isMobile ? s.gridMobile : s.grid}>
        {areas.map((area, i) => (
          <SkillCard key={area.id} area={area} index={i} />
        ))}
      </div>
    </Section>
  )
}
