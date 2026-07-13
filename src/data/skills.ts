import type { KnowledgeArea } from '../types/portfolio'

export const knowledgeAreas: KnowledgeArea[] = [
  {
    id: 'software-engineering',
    title: 'Ingeniería de Software y Programación',
    description: 'Diseño, desarrollo y despliegue de aplicaciones web, móviles y backend con tecnologías modernas.',
    icon: '💻',
    subtopics: ['React · TypeScript · Vite', 'Flutter · Dart', 'Python · FastAPI', 'Arquitectura limpia', 'Git · Docker'],
  },
  {
    id: 'cybersecurity',
    title: 'Ciberseguridad',
    description: 'Auditoría de seguridad, pentesting y protección de sistemas informáticos.',
    icon: '🔒',
    subtopics: ['Metasploit', 'Pentesting', 'Autenticación y autorización', 'Análisis de vulnerabilidades'],
  },
  {
    id: 'chemical-processes',
    title: 'Procesos de la Industria Química',
    description: 'Tecnólogo en procesos químicos industriales, con conocimiento en balance de materia y energía, instrumentación y control.',
    icon: '🧪',
    subtopics: ['Procesos industriales', 'Balance de materia y energía', 'SCADA / Control de procesos', 'P&ID · HMI', 'Instrumentación'],
  },
  {
    id: 'electronics-solar',
    title: 'Electrónica y Energía Solar',
    description: 'Técnico en electrónica y en instalación de sistemas eléctricos con energía solar fotovoltaica.',
    icon: '☀️',
    subtopics: ['Electrónica general', 'Sistemas fotovoltaicos', 'Instalaciones eléctricas', 'Mantenimiento'],
  },
  {
    id: 'mathematics',
    title: 'Matemáticas',
    description: 'Bases matemáticas para modelado, análisis de datos y resolución de problemas de ingeniería.',
    icon: '📐',
    subtopics: [],
  },
  {
    id: 'physics',
    title: 'Física',
    description: 'Principios físicos aplicados a la ingeniería, la industria y la tecnología.',
    icon: '⚡',
    subtopics: [],
  },
  {
    id: 'languages',
    title: 'Idiomas',
    description: 'Comunicación técnica y profesional en múltiples idiomas.',
    icon: '🌐',
    subtopics: ['Español — Nativo', 'Inglés — Técnico / Profesional'],
  },
]
