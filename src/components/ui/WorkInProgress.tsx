import type { ReactNode } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface Props {
  title: string
  description: string
  icon?: ReactNode
}

const defaultIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', opacity: 0.6 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const s: Record<string, React.CSSProperties> = {
  wrapper: {
    textAlign: 'center',
    padding: '40px 24px',
    marginTop: 32,
    borderRadius: 'var(--radius-lg)',
    border: '1px dashed var(--border-accent)',
    background: 'var(--bg-card)',
    animation: 'borderPulseDash 3s ease-in-out infinite',
  },
  wrapperMobile: {
    textAlign: 'center',
    padding: '28px 16px',
    marginTop: 24,
    borderRadius: 'var(--radius-lg)',
    border: '1px dashed var(--border-accent)',
    background: 'var(--bg-card)',
    animation: 'borderPulseDash 3s ease-in-out infinite',
  },
  iconRow: {
    marginBottom: 14,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 8,
    fontFamily: 'var(--font-display)',
  },
  titleMobile: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 6,
    fontFamily: 'var(--font-display)',
  },
  desc: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    lineHeight: 1.7,
    maxWidth: 480,
    margin: '0 auto',
  },
  descMobile: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    lineHeight: 1.7,
  },
}

export function WorkInProgress({ title, description, icon }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div style={isMobile ? s.wrapperMobile : s.wrapper}>
      <div style={s.iconRow}>
        {icon ?? defaultIcon}
      </div>
      <h3 style={isMobile ? s.titleMobile : s.title}>{title}</h3>
      <p style={isMobile ? s.descMobile : s.desc}>{description}</p>
    </div>
  )
}
