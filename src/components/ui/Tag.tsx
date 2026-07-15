interface Props {
  label: string
  accent?: string
}

export function Tag({ label, accent }: Props) {
  const c = accent ?? 'var(--accent)'
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: '0.7rem',
        fontWeight: 500,
        background: accent ? `${accent}18` : 'var(--accent-dim)',
        color: c,
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap',
        border: `1px solid ${accent ? `${accent}30` : 'rgba(0, 245, 212, 0.08)'}`,
      }}
    >
      {label}
    </span>
  )
}
