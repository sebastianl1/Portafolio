import { profile } from '../../data/profile'
import { Section } from '../layout/Section'

const socialLinks = [
  { key: 'github' as const, label: 'GitHub', icon: '🐙', desc: 'Código abierto y proyectos' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: '💼', desc: 'Perfil profesional' },
  { key: 'email' as const, label: 'Email', icon: '✉️', desc: 'Envíame un mensaje' },
]

const s: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 40,
    alignItems: 'center',
  },
  left: {
    textAlign: 'left' as const,
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
  const available = socialLinks.filter(({ key }) => profile.social[key])

  return (
    <Section id="contact" title="Contacto">
      <div style={s.grid}>
        <div style={s.left}>
          <h3 style={s.heading}>
            Hablemos<span style={s.gradient}>.</span>
          </h3>
          <p style={s.subtitle}>
            Estoy abierto a oportunidades laborales, colaboraciones en proyectos open-source,
            o simplemente una conversación interesante. No dudes en escribirme.
          </p>
        </div>

        <div style={s.links}>
          {available.map(({ key, label, icon, desc }) => {
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
                  <span style={s.linkLabel}>{label}</span>
                  <span style={s.linkDesc}>{desc}</span>
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
