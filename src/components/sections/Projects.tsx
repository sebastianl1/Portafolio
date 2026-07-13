import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getProjects } from '../../data/projects'
import type { Project } from '../../types/portfolio'
import { Section } from '../layout/Section'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const s: Record<string, React.CSSProperties> = {
  empty: {
    textAlign: 'center',
    padding: 64,
    color: 'var(--text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
  gridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
  },
}

export function Projects() {
  const { language } = useLanguage()
  const projects = getProjects(language)
  const [preview, setPreview] = useState<Project | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (projects.length === 0) {
    return (
      <Section id="projects" title={t('section.proyectos', language)}>
        <div style={s.empty}>
          <p style={{ fontSize: '1.1rem' }}>{t('projects.proximamente', language)}</p>
          <p style={{ fontSize: '0.9rem', marginTop: 8 }}>
            {t('projects.proximamente-desc', language)}
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section id="projects" title={t('section.proyectos', language)}>
      <div style={isMobile ? s.gridMobile : s.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} onPreview={setPreview} index={i} />
        ))}
      </div>

      {preview && (
        <ProjectModal project={preview} onClose={() => setPreview(null)} />
      )}
    </Section>
  )
}
