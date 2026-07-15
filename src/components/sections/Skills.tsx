import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getKnowledgeAreas } from '../../data/skills'
import { Section } from '../layout/Section'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const s: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16,
  },
  gridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 12,
  },
  card: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    padding: '24px',
    background: 'var(--bg-card)',
    transition: 'all var(--transition)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  subtopicsWrap: {
    marginTop: 'auto',
    flexShrink: 0,
  },
  iconRow: {
    fontSize: '1.8rem',
    marginBottom: 12,
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 6,
    fontFamily: 'var(--font-display)',
  },
  desc: {
    color: 'var(--text-secondary)',
    fontSize: '0.78rem',
    lineHeight: 1.6,
    marginBottom: 14,
  },
  subtopic: {
    color: 'var(--text-muted)',
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    padding: '4px 0',
    borderTop: '1px solid var(--border)',
  },
  subtopicFirst: {
    color: 'var(--text-muted)',
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    padding: '4px 0',
    borderTop: 'none',
  },
}

function SkillCard({ area, index }: { area: { id: string; title: string; description: string; icon: string; subtopics: string[] }; index: number }) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`reveal-stagger ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        style={s.card}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-accent)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={s.iconRow}>{area.icon}</div>
        <h3 style={s.title}>{area.title}</h3>
        <p style={s.desc}>{area.description}</p>
        <div style={s.subtopicsWrap}>
          {area.subtopics.map((st, i) => (
            <div key={st} style={i === 0 ? s.subtopicFirst : s.subtopic}>→ {st}</div>
          ))}
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
