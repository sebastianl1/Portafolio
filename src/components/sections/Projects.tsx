import { useState } from 'react'
import type { Project } from '../../types/portfolio'
import { projects } from '../../data/projects'
import { Section } from '../layout/Section'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

export function Projects() {
  const [preview, setPreview] = useState<Project | null>(null)

  if (projects.length === 0) {
    return (
      <Section id="projects" title="Proyectos">
        <div
          style={{
            textAlign: 'center',
            padding: 64,
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ fontSize: '1.1rem' }}>Próximamente...</p>
          <p style={{ fontSize: '0.9rem', marginTop: 8 }}>
            Los proyectos se agregarán aquí a medida que se desplieguen.
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section id="projects" title="Proyectos">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onPreview={setPreview} />
        ))}
      </div>

      {preview && (
        <ProjectModal project={preview} onClose={() => setPreview(null)} />
      )}
    </Section>
  )
}
