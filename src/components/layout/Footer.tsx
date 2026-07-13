import { profile } from '../../data/profile'

const s: Record<string, React.CSSProperties> = {
  footer: {
    borderTop: 'none',
    position: 'relative',
  },
  divider: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, var(--accent-dim), var(--accent-neutral), var(--accent-dim), transparent)',
    opacity: 0.5,
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '40px 24px 32px',
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr',
    gap: 32,
  },
  brand: {
    fontSize: '1.1rem',
    fontWeight: 800,
    fontFamily: 'var(--font-display)',
    marginBottom: 6,
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  tagline: {
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-mono)',
    lineHeight: 1.6,
  },
  colTitle: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    letterSpacing: 1,
    marginBottom: 12,
    fontFamily: 'var(--font-mono)',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  link: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    textDecoration: 'none',
    transition: 'color var(--transition)',
  },
  bottom: {
    textAlign: 'center',
    padding: '16px 24px',
    borderTop: '1px solid var(--border)',
  },
  bottomText: {
    color: 'var(--text-muted)',
    fontSize: '0.78rem',
  },
  accent: {
    color: 'var(--accent)',
  },
}

const quickLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Trayectoria', href: '#formation' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: profile.social.github },
  { label: 'LinkedIn', href: profile.social.linkedin },
]

export function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.divider} />
      <div style={s.inner}>
        <div>
          <div style={s.brand}>{profile.name}</div>
          <p style={s.tagline}>{profile.tagline}</p>
        </div>

        <div>
          <div style={s.colTitle}>Navegación</div>
          <div style={s.links}>
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} style={s.link}>{link.label}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={s.colTitle}>Redes</div>
          <div style={s.links}>
            {socialLinks.filter((l) => l.href).map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={s.link}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={s.bottom}>
        <p style={s.bottomText}>
          &copy; {new Date().getFullYear()} Sebastián Laguna — Hecho con{' '}
          <span style={s.accent}>React + TypeScript</span>
        </p>
      </div>
    </footer>
  )
}
