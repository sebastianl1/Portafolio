import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getProjects } from '../../data/projects'
import type { Project } from '../../types/portfolio'
import { Section } from '../layout/Section'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { WorkInProgress } from '../ui/WorkInProgress'
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

  return (
    <Section id="projects" title={t('section.proyectos', language)}>
      {projects.length > 0 ? (
        <>
          <div style={isMobile ? s.gridMobile : s.grid}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} onPreview={setPreview} index={i} />
            ))}
          </div>
          {preview && (
            <ProjectModal project={preview} onClose={() => setPreview(null)} />
          )}
        </>
      ) : null}

      <WorkInProgress
        title={t('wip.projects-title', language)}
        description={t('wip.projects-desc', language)}
      />
    </Section>
  )
}
