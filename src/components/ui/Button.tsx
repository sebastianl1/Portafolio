import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
}

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '10px 24px',
  borderRadius: 'var(--radius)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  fontWeight: 600,
  border: 'none',
  cursor: 'pointer',
  transition: 'all var(--transition)',
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
}

const variants: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--accent)',
    color: '#0a0a0f',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
  },
}

export function Button({ variant = 'primary', className = '', children, style, ...rest }: Props) {
  const mergedStyle = { ...base, ...variants[variant], ...style } as React.CSSProperties

  return (
    <button
      className={className}
      style={mergedStyle}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
        if (variant === 'outline') {
          e.currentTarget.style.background = 'var(--accent-dim)'
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'none'
        }
        if (variant === 'outline') {
          e.currentTarget.style.background = 'transparent'
        }
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
