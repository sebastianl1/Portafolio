import { useEffect, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import type { Project } from '../../types/portfolio'
import { Skeleton } from '../ui/Skeleton'
import { Button } from '../ui/Button'

interface Props {
  project: Project
  onClose: () => void
}

const s: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    width: '100%',
    maxWidth: 640,
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
    animation: 'fadeInScale 0.25s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    borderBottom: '1px solid var(--border)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: 6,
    lineHeight: 1,
    transition: 'all var(--transition)',
  },
  iframeContainer: {
    position: 'relative',
    height: 480,
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 24,
    gap: 14,
    textAlign: 'center',
  },
  footer: {
    padding: '12px 18px',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    gap: 10,
  },
}

export function ProjectModal({ project, onClose }: Props) {
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      style={s.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div style={s.modal}>
        <div style={s.header}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{project.title}</span>
          <button
            onClick={onClose}
            style={s.closeBtn}
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

        <div style={s.iframeContainer}>
          {loading && !error && (
            <div style={{ position: 'absolute', inset: 0 }}>
              <Skeleton height="100%" />
            </div>
          )}

          {error ? (
            <div style={s.error}>
              <span style={{ fontSize: '2.5rem' }}>⚠️</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {t('modal.no-disponible', language)}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', maxWidth: 360 }}>
                {t('modal.no-disponible-desc', language)}
              </p>
              {project.githubUrl && (
                <Button variant="outline" onClick={() => window.open(project.githubUrl, '_blank')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  {t('modal.ver-github', language)}
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

        <div style={s.footer}>
          <Button
            variant="primary"
            onClick={() => window.open(project.iframeUrl, '_blank')}
            style={{ flex: 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {t('modal.abrir', language)}
          </Button>
          {project.githubUrl && (
            <Button variant="outline" onClick={() => window.open(project.githubUrl, '_blank')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              {t('modal.ver-github', language)}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
