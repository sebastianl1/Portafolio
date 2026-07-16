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
      iframeUrl: 'https://sebastianl1.github.io/Spy_scada/',
      githubUrl: 'https://github.com/sebastianl1/SPY_SENA',
      thumbnail: 'projects/scada.jpg',
    },
    {
      id: 'proccess-phi',
      title: 'Proccesф',
      description:
        'Tool for designing P&ID diagrams, HMI interfaces, and technical PDFs for industrial systems, focused on chemical engineering processes.',
      tags: ['P&ID', 'HMI', 'Chemical Engineering', 'Process Design'],
      iframeUrl: 'https://sebastianl1.github.io/Hmi_editor/',
      githubUrl: 'https://github.com/sebastianl1/Procces-',
      thumbnail: 'projects/hmi.jpg',
    },
  ],
  es: [
    {
      id: 'spy-sena',
      title: 'SCADA SPy v1.0',
      description:
        'Sistema de monitoreo y supervisión de procesos industriales en tiempo real. Dashboard en vivo, visor P&ID/HMI, alarmas, gestión de usuarios, mantenimiento y visualización 3D de planta.',
      tags: ['JavaScript', 'SCADA', 'Webpack', 'Vite', 'FastAPI'],
      iframeUrl: 'https://sebastianl1.github.io/Spy_scada/',
      githubUrl: 'https://github.com/sebastianl1/SPY_SENA',
      thumbnail: 'projects/scada.jpg',
    },
    {
      id: 'proccess-phi',
      title: 'Proccesф',
      description:
        'Herramienta para diseñar diagramas P&ID, interfaces HMI y PDFs técnicos para sistemas industriales, enfocado en procesos de ingeniería química.',
      tags: ['P&ID', 'HMI', 'Ingeniería Química', 'Diseño de Procesos'],
      iframeUrl: 'https://sebastianl1.github.io/Hmi_editor/',
      githubUrl: 'https://github.com/sebastianl1/Procces-',
      thumbnail: 'projects/hmi.jpg',
    },
  ],
}

export function getProjects(lang: Language): Project[] {
  return projectsData[lang]
}
