interface Props {
  label: string
}

export function Tag({ label }: Props) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: '0.7rem',
        fontWeight: 500,
        background: 'var(--accent-dim)',
        color: 'var(--accent)',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap',
        border: '1px solid rgba(0, 245, 212, 0.08)',
      }}
    >
      {label}
    </span>
  )
}
