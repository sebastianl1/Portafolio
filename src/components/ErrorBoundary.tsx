import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  handleReload = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              padding: '60px 24px',
              textAlign: 'center',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12 }}>⚠️</span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 8,
              }}
            >
              Something went wrong
            </h3>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              An unexpected error occurred. Please try reloading this section.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius)',
                background: 'var(--accent)',
                color: '#0a0a0f',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Reload section
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
