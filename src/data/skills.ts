import type { Language } from '../contexts/LanguageContext'
import type { KnowledgeArea } from '../types/portfolio'

const skillsData: Record<Language, KnowledgeArea[]> = {
  en: [
    {
      id: 'software-engineering',
      title: 'Software Engineering & Programming',
      description: 'Software architecture design, full-stack development and application deployment.',
      icon: '💻',
      subtopics: ['React · TypeScript · Vite', 'Flutter · Dart', 'Python · FastAPI', 'Clean Architecture', 'Git · Docker'],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Security audits, pentesting and protection of computer systems.',
      icon: '🔒',
      subtopics: ['Auditing & pentesting', 'Metasploit', 'Authentication & authorization', 'Vulnerability analysis'],
    },
    {
      id: 'algorithms-math',
      title: 'Algorithms & Mathematics',
      description: 'Algorithm handling, advanced mathematics and basic sciences applied to industry.',
      icon: '📐',
      subtopics: ['Computational algorithms', 'Advanced mathematics', 'Applied basic sciences', 'Data analysis'],
    },
    {
      id: 'chemical-processes',
      title: 'Chemical Process Industry',
      description: 'Technological training in industrial chemical processes, instrumentation and control.',
      icon: '🧪',
      subtopics: ['Industrial processes', 'Material & energy balance', 'SCADA / Process control', 'P&ID · HMI', 'Instrumentation'],
    },
    {
      id: 'electronics-solar',
      title: 'Electronics & Solar Energy',
      description: 'Technician in electronics and installation of photovoltaic solar electrical systems.',
      icon: '☀️',
      subtopics: ['General electronics', 'Photovoltaic systems', 'Electrical installations', 'Maintenance'],
    },
    {
      id: 'languages',
      title: 'Languages',
      description: 'Technical and professional communication in multiple languages.',
      icon: '🌐',
      subtopics: ['Spanish — Native', 'English — Advanced'],
    },
  ],
  es: [
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
  ],
}

export function getKnowledgeAreas(lang: Language): KnowledgeArea[] {
  return skillsData[lang]
}
