import { useCallback, type ButtonHTMLAttributes } from 'react'

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
  position: 'relative',
  overflow: 'hidden',
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

function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget
  const existing = btn.querySelector('.ripple-effect')
  if (existing) existing.remove()

  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2

  const accent = getComputedStyle(btn).getPropertyValue('--accent').trim() || '#00f5d4'
  const hexToRgb = (hex: string) => {
    const v = parseInt(hex.slice(1), 16)
    return `${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}`
  }
  const ripple = document.createElement('span')
  ripple.className = 'ripple-effect'
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    border-radius: 50%;
    background: rgba(${hexToRgb(accent)}, 0.35);
    transform: scale(0);
    animation: rippleAnim 0.5s ease-out;
    pointer-events: none;
  `
  btn.appendChild(ripple)
  ripple.addEventListener('animationend', () => ripple.remove())
}

export function Button({ variant = 'primary', className = '', children, style, onClick, ...rest }: Props) {
  const mergedStyle = { ...base, ...variants[variant], ...style } as React.CSSProperties

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e)
      onClick?.(e)
    },
    [onClick],
  )

  return (
    <button
      className={className}
      style={mergedStyle}
      onClick={handleClick}
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
