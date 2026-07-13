import type { KnowledgeArea } from '../types/portfolio'

export const knowledgeAreas: KnowledgeArea[] = [
  {
    id: 'software-engineering',
    title: 'Ingeniería de Software y Programación',
    description: 'Diseño de arquitecturas de software, desarrollo full-stack y despliegue de aplicaciones.',
    icon: '💻',
    subtopics: ['React · TypeScript · Vite', 'Flutter · Dart', 'Python · FastAPI', 'Arquitectura limpia', 'Git · Docker'],
  },
  {
    id: 'cybersecurity',
    title: 'Ciberseguridad',
    description: 'Auditorías de seguridad, pentesting y protección de sistemas informáticos.',
    icon: '🔒',
    subtopics: ['Auditorías y pentesting', 'Metasploit', 'Autenticación y autorización', 'Análisis de vulnerabilidades'],
  },
  {
    id: 'algorithms-math',
    title: 'Algoritmos y Matemáticas',
    description: 'Manejo de algoritmos, matemáticas avanzadas y ciencias básicas aplicadas a la industria.',
    icon: '📐',
    subtopics: ['Algoritmos computacionales', 'Matemáticas avanzadas', 'Ciencias básicas aplicadas', 'Análisis de datos'],
  },
  {
    id: 'chemical-processes',
    title: 'Procesos de la Industria Química',
    description: 'Formación tecnológica en procesos químicos industriales, instrumentación y control.',
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
    id: 'languages',
    title: 'Idiomas',
    description: 'Comunicación técnica y profesional en múltiples idiomas.',
    icon: '🌐',
    subtopics: ['Español — Nativo', 'Inglés — Avanzado'],
  },
]
