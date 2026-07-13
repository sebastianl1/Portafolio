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

  const showImage = !!(project.thumbnail)

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
          maxWidth: showImage ? 720 : 360,
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{project.title}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: 4,
              lineHeight: 1,
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

        {showImage ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{
              width: '100%',
              maxHeight: 480,
              objectFit: 'contain',
              display: 'block',
              background: '#0a0a0f',
            }}
          />
        ) : (
          <div style={{ position: 'relative', height: 200 }}>
            {loading && !error && (
              <div style={{ position: 'absolute', inset: 0 }}>
                <Skeleton height="100%" />
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
                  padding: 24,
                  gap: 12,
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '2rem' }}>⚠️</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Vista previa no disponible
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
        )}

        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => window.open(project.iframeUrl, '_blank')}
            style={{
              width: '100%',
              padding: '10px 24px',
              borderRadius: 'var(--radius)',
              background: 'var(--accent)',
              color: '#0a0a0f',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: 600,
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
            Abrir proyecto
          </button>
        </div>
      </div>
    </div>
  )
}
