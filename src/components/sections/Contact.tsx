import { profile } from '../../data/profile'
import { Section } from '../layout/Section'

const socialLinks = [
  { key: 'github' as const, label: 'GitHub', icon: '🐙' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: '💼' },
  { key: 'email' as const, label: 'Email', icon: '✉' },
]

export function Contact() {
  return (
    <Section id="contact" title="Contacto">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {socialLinks.map(({ key, label, icon }) => {
          const url = profile.social[key]
          if (!url) return null
          return (
            <a
              key={key}
              href={key === 'email' ? `mailto:${url}` : url}
              target={key === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 20px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'var(--accent-dim)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span>{icon}</span> {label}
            </a>
          )
        })}
      </div>
    </Section>
  )
}
