import type { Project } from '../../types/portfolio'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'

interface Props {
  project: Project
  onPreview: (project: Project) => void
}

const palette = [
  ['#00f5d4', '#0a2a2a'],
  ['#7c3aed', '#1a0a2a'],
  ['#f59e0b', '#2a1a0a'],
  ['#ef4444', '#2a0a0a'],
  ['#3b82f6', '#0a0a2a'],
  ['#ec4899', '#2a0a1a'],
]

function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function getInitials(title: string): string {
  const words = title.trim().split(/\s+/)
  if (words.length === 1) return title.slice(0, 2).toUpperCase()
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function ProjectCard({ project, onPreview }: Props) {
  const [accent, bg] = palette[hashId(project.id) % palette.length]

  return (
    <Card>
      <div
        style={{
          width: '100%',
          height: 140,
          borderRadius: 'var(--radius)',
          marginBottom: 12,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => onPreview(project)}
        onMouseEnter={(e) => {
          const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement
          if (overlay) overlay.style.opacity = '1'
        }}
        onMouseLeave={(e) => {
          const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement
          if (overlay) overlay.style.opacity = '0'
        }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${accent}22 0%, ${bg} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                color: accent,
                fontSize: '2.5rem',
                fontWeight: 700,
                opacity: 0.5,
              }}
            >
              {getInitials(project.title)}
            </span>
          </div>
        )}

        <div
          data-overlay
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🔍</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.8rem' }}>
            Vista previa
          </span>
        </div>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>{project.title}</h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: 10, lineHeight: 1.5 }}>
        {project.description.length > 100
          ? project.description.slice(0, 100) + '...'
          : project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      <Button variant="primary" onClick={() => window.open(project.iframeUrl, '_blank')}>
        Ver proyecto
      </Button>
    </Card>
  )
}
