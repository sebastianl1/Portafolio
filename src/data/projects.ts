import type { Language } from '../contexts/LanguageContext'
import type { Project } from '../types/portfolio'

const projectsData: Record<Language, Project[]> = {
  en: [
    {
      id: 'spy-sena',
      title: 'SCADA SPy v1.0',
      description:
        'Real-time industrial process monitoring and supervision system. Live dashboard, P&ID/HMI viewer, alarms, user management, maintenance, and 3D plant visualization.',
      tags: ['JavaScript', 'SCADA', 'Webpack', 'Vite', 'FastAPI'],
      iframeUrl: 'https://sebastianl1.github.io/Web_prueba/',
      githubUrl: 'https://github.com/sebastianl1/SPY_SENA',
      thumbnail: 'projects/scada.jpg',
    },
  ],
  es: [
    {
      id: 'spy-sena',
      title: 'SCADA SPy v1.0',
      description:
        'Sistema de monitoreo y supervisión de procesos industriales en tiempo real. Dashboard en vivo, visor P&ID/HMI, alarmas, gestión de usuarios, mantenimiento y visualización 3D de planta.',
      tags: ['JavaScript', 'SCADA', 'Webpack', 'Vite', 'FastAPI'],
      iframeUrl: 'https://sebastianl1.github.io/Web_prueba/',
      githubUrl: 'https://github.com/sebastianl1/SPY_SENA',
      thumbnail: 'projects/scada.jpg',
    },
  ],
}

export function getProjects(lang: Language): Project[] {
  return projectsData[lang]
}
