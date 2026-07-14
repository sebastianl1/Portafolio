import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getProfile } from '../../data/profile'
import { Section } from '../layout/Section'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const socialLinks = [
  { key: 'github' as const, labelKey: 'contact.github', descKey: 'contact.github-desc', icon: '🐙' },
  { key: 'linkedin' as const, labelKey: 'contact.linkedin', descKey: 'contact.linkedin-desc', icon: '💼' },
  { key: 'email' as const, labelKey: 'contact.email', descKey: 'contact.email-desc', icon: '✉️' },
]

const s: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,
    alignItems: 'center',
  },
  gridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 32,
    alignItems: 'center',
  },
  left: {
    textAlign: 'left' as const,
  },
  leftMobile: {
    textAlign: 'center' as const,
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 800,
    marginBottom: 12,
    fontFamily: 'var(--font-display)',
    lineHeight: 1.2,
  },
  gradient: {
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    lineHeight: 1.7,
    maxWidth: 360,
  },
  subtitleMobile: {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    lineHeight: 1.7,
    maxWidth: '100%',
  },
  links: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 20px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'all var(--transition)',
    textDecoration: 'none',
  },
  linkIcon: {
    fontSize: '1.3rem',
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'var(--bg-card)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  linkText: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
  },
  linkLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  linkDesc: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    fontWeight: 400,
  },
}

export function Contact() {
  const { language } = useLanguage()
  const profile = getProfile(language)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const available = socialLinks.filter(({ key }) => profile.social[key])

  return (
    <Section id="contact" title={t('section.contacto', language)}>
      <div style={isMobile ? s.gridMobile : s.grid}>
        <div style={isMobile ? s.leftMobile : s.left}>
          <h3 style={s.heading}>
            {t('contact.hablemos', language)}
          </h3>
          <p style={isMobile ? s.subtitleMobile : s.subtitle}>
            {t('contact.subtitle', language)}
          </p>
        </div>

        <div style={s.links}>
          {available.map(({ key, labelKey, descKey, icon }) => {
            const url = profile.social[key]
            if (!url) return null
            return (
              <a
                key={key}
                href={key === 'email' ? `mailto:${url}` : url}
                target={key === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={s.link}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.background = 'var(--accent-dim)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <span style={s.linkIcon}>{icon}</span>
                <span style={s.linkText}>
                  <span style={s.linkLabel}>{t(labelKey, language)}</span>
                  <span style={s.linkDesc}>{t(descKey, language)}</span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
