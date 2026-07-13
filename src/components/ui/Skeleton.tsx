interface Props {
  width?: string | number
  height?: string | number
  borderRadius?: string
}

export function Skeleton({ width = '100%', height = 200, borderRadius = 'var(--radius)' }: Props) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, var(--bg-card) 25%, var(--bg-secondary) 50%, var(--bg-card) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  )
}
