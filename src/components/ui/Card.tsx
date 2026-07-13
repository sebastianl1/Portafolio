import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
}

export function Card({ children, style, className = '', onClick }: Props) {
  const base: React.CSSProperties = {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    padding: '16px',
    transition: 'all 0.3s ease',
    cursor: onClick ? 'pointer' : undefined,
  }

  return (
    <div
      className={className}
      style={{ ...base, ...style }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = 'var(--accent-dim)'
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 245, 212, 0.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </div>
  )
}
