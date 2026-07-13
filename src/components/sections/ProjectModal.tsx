import { useEffect, useState } from 'react'
import type { Project } from '../../types/portfolio'
import { Skeleton } from '../ui/Skeleton'
import { Button } from '../ui/Button'

interface Props {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          maxHeight: '90vh',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 6,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.background = 'var(--accent-dim)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            flex: 1,
            position: 'relative',
            minHeight: 300,
          }}
        >
          {loading && !error && (
            <div style={{ position: 'absolute', inset: 0, padding: 24 }}>
              <Skeleton height="100%" borderRadius="var(--radius)" />
            </div>
          )}

          {error ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: 48,
                gap: 16,
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '3rem' }}>⚠️</span>
              <p style={{ color: 'var(--text-secondary)' }}>
                No se pudo cargar la vista previa del proyecto.
              </p>
              {project.githubUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  Ver en GitHub
                </Button>
              )}
            </div>
          ) : (
            <iframe
              src={project.iframeUrl}
              title={project.title}
              style={{
                width: '100%',
                height: '100%',
                minHeight: '70vh',
                border: 'none',
                display: loading ? 'none' : 'block',
              }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false)
                setError(true)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
