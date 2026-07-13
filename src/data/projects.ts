import type { Project } from '../types/portfolio'

export const projects: Project[] = [
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
]

// ─── Proyectos próximos ────────────────────────────────────────
// Agrega nuevos proyectos aquí apenas los subas a GitHub Pages:
//
// {
//   id: 'pythoneer-academy',
//   title: 'Pythoneer Academy',
//   description: 'Plataforma educativa interactiva para aprender Python...',
//   tags: ['Flutter', 'FastAPI', 'Docker', 'Firebase'],
//   iframeUrl: 'https://sebastianl1.github.io/pythoneer-academy/',
//   githubUrl: 'https://github.com/sebastianl1/pythoneer_academy',
// },
// {
//   id: 'auditforge',
//   title: 'AuditForge',
//   description: 'Herramienta de auditoría de seguridad con Metasploit RPC...',
//   tags: ['Flutter', 'FastAPI', 'Metasploit', 'Docker'],
//   iframeUrl: 'https://sebastianl1.github.io/AuditForge/',
//   githubUrl: 'https://github.com/sebastianl1/AuditForge',
// },
