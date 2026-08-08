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
      id: 'ai-local-llms',
      title: 'AI & Local LLMs',
      description: 'Running local large language models and AI agents on edge devices (Android/Termux).',
      icon: '🤖',
      subtopics: ['Local LLMs · Ollama', 'WebGPU · Transformers.js', 'Termux tooling', 'AI agents CLI', 'Bash · Python'],
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
      subtopics: ['General electronics · Arduino · PIC', 'Power electronics', 'Photovoltaic systems', 'Solar pumping', 'RETIE · RETILAP regulations'],
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
      id: 'ai-local-llms',
      title: 'IA y LLMs locales',
      description: 'Ejecución de modelos de lenguaje locales y agentes de IA en dispositivos (Android/Termux).',
      icon: '🤖',
      subtopics: ['LLMs locales · Ollama', 'WebGPU · Transformers.js', 'Herramientas Termux', 'Agentes CLI de IA', 'Bash · Python'],
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
      subtopics: ['Electrónica general · Arduino · PIC', 'Electrónica de potencia', 'Sistemas fotovoltaicos', 'Bombeo solar', 'Normativa RETIE · RETILAP'],
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
