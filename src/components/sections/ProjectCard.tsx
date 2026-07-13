import type { Project } from '../../types/portfolio'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'

interface Props {
  project: Project
  onPreview: (project: Project) => void
}

export function ProjectCard({ project, onPreview }: Props) {
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
          background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--bg-card) 100%)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
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
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '2.5rem', fontWeight: 700, opacity: 0.3 }}>
          {project.title.charAt(0)}
        </span>

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
