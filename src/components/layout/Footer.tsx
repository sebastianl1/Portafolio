export function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '32px 24px',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        borderTop: '1px solid var(--border)',
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Sebastián. Hecho con{' '}
        <span style={{ color: 'var(--accent)' }}>React + TypeScript</span>.
      </p>
    </footer>
  )
}
