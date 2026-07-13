interface Props {
  label: string
}

export function Tag({ label }: Props) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 999,
        fontSize: '0.75rem',
        fontWeight: 500,
        background: 'var(--accent-dim)',
        color: 'var(--accent)',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
