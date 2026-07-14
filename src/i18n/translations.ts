import type { Language } from '../contexts/LanguageContext'

const ui: Record<string, { en: string; es: string }> = {
  /* Navbar */
  'nav.trayectoria': { en: 'Background', es: 'Trayectoria' },
  'nav.proyectos': { en: 'Projects', es: 'Proyectos' },
  'nav.contacto': { en: 'Contact', es: 'Contacto' },

  /* Hero tags */
  'tag.programacion': { en: 'Programming', es: 'Programación' },
  'tag.ciberseguridad': { en: 'Cybersecurity', es: 'Ciberseguridad' },
  'tag.matematicas': { en: 'Mathematics', es: 'Matemáticas' },
  'tag.quimica': { en: 'Chemical Processes', es: 'Procesos Químicos' },
  'tag.electronica': { en: 'Electronics & Solar', es: 'Electrónica y Solar' },
  'tag.ingles': { en: 'Technical English', es: 'Inglés Técnico' },

  /* CTA */
  'cta.ver-proyectos': { en: 'View projects', es: 'Ver proyectos' },
  'cta.contactar': { en: 'Contact me', es: 'Contactar' },

  /* Section titles */
  'section.formacion': { en: 'Background', es: 'Trayectoria' },
  'section.proyectos': { en: 'Projects', es: 'Proyectos' },
  'section.contacto': { en: 'Contact', es: 'Contacto' },

  /* Formation sub-labels */
  'formation.tecnica': { en: 'TECHNICAL EDUCATION', es: 'FORMACIÓN TÉCNICA Y TECNOLÓGICA' },
  'formation.independiente': { en: 'SELF-DIRECTED LEARNING', es: 'FORMACIÓN INDEPENDIENTE' },
  'formation.certificados': { en: 'INDEPENDENT CERTIFICATES (SPECIALIZED PROGRAMS)', es: 'CERTIFICADOS FORMACIÓN INDEPENDIENTE (PROGRAMAS ESPECIALIZADOS)' },
  'formation.proximamente': { en: 'Coming soon...', es: 'Próximamente...' },

  /* Certificates */
  'cert.ver-pdf': { en: 'View PDF', es: 'Ver PDF' },
  'cert.abrir': { en: 'Open PDF', es: 'Abrir PDF' },
  'cert.todas': { en: 'All', es: 'Todas' },
  'cert.search': { en: 'Search certificates...', es: 'Buscar certificados...' },
  'cert.sin-resultados': { en: 'No certificates match your search.', es: 'Ningún certificado coincide con tu búsqueda.' },

  /* Certificate categories */
  'cat.cybersecurity': { en: 'Cybersecurity', es: 'Ciberseguridad' },
  'cat.programming': { en: 'Programming', es: 'Programación' },
  'cat.electronics': { en: 'Electronics', es: 'Electrónica' },
  'cat.solar': { en: 'Solar Energy', es: 'Energía Solar' },
  'cat.chemical': { en: 'Chemical Processes', es: 'Procesos Químicos' },
  'cat.english': { en: 'English', es: 'Inglés' },
  'cat.other': { en: 'Other', es: 'Otros' },

  /* Projects */
  'projects.proximamente': { en: 'Coming soon...', es: 'Próximamente...' },
  'projects.proximamente-desc': { en: 'Projects will be added here as they are deployed.', es: 'Los proyectos se agregarán aquí a medida que se desplieguen.' },
  'projects.vista-previa': { en: 'Preview', es: 'Vista previa' },
  'projects.ver-proyecto': { en: 'View project', es: 'Ver proyecto' },

  /* Modal */
  'modal.no-disponible': { en: 'Preview not available', es: 'Vista previa no disponible' },
  'modal.no-disponible-desc': { en: 'The site may block embedding for security. You can open it directly.', es: 'El sitio puede bloquear la visualización por seguridad. Puedes abrirlo directamente.' },
  'modal.ver-github': { en: 'View on GitHub', es: 'Ver en GitHub' },
  'modal.abrir': { en: 'Open project', es: 'Abrir proyecto' },

  /* Contact */
  'contact.hablemos': { en: "Let's talk.", es: 'Hablemos.' },
  'contact.subtitle': { en: "I'm open to job opportunities, open-source collaborations, or just an interesting conversation. Don't hesitate to reach out.", es: 'Estoy abierto a oportunidades laborales, colaboraciones en proyectos open-source, o simplemente una conversación interesante. No dudes en escribirme.' },
  'contact.github': { en: 'GitHub', es: 'GitHub' },
  'contact.github-desc': { en: 'Open source & projects', es: 'Código abierto y proyectos' },
  'contact.linkedin': { en: 'LinkedIn', es: 'LinkedIn' },
  'contact.linkedin-desc': { en: 'Professional profile', es: 'Perfil profesional' },
  'contact.email': { en: 'Email', es: 'Email' },
  'contact.email-desc': { en: 'Send me a message', es: 'Envíame un mensaje' },

  /* Footer */
  'footer.navegacion': { en: 'Navigation', es: 'Navegación' },
  'footer.redes': { en: 'Social', es: 'Redes' },
  'footer.inicio': { en: 'Home', es: 'Inicio' },
  'footer.hecho': { en: 'Made with', es: 'Hecho con' },

  /* Work in Progress */
  'wip.projects-title': { en: 'More Projects Coming Soon', es: 'Más proyectos próximamente' },
  'wip.projects-desc': { en: "I'm actively developing new projects that will be added here as soon as they're ready. Stay tuned!", es: 'Estoy desarrollando activamente nuevos proyectos que se agregarán aquí tan pronto estén listos. ¡Mantente al tanto!' },
  'wip.certs-title': { en: 'More Certificates on the Way', es: 'Más certificados en camino' },
  'wip.certs-desc': { en: "I'm gathering and organizing more certificates and specialized programs to share here.", es: 'Estoy reuniendo y organizando más certificados y programas especializados para compartir aquí.' },

  /* Social Floating */
  'social.whatsapp': { en: 'WhatsApp', es: 'WhatsApp' },
  'social.gmail': { en: 'Gmail', es: 'Gmail' },
  'social.github': { en: 'GitHub', es: 'GitHub' },
}

export function t(key: string, lang: Language): string {
  return ui[key]?.[lang] ?? key
}

export function useT(lang: Language): (key: string) => string {
  return (key: string) => t(key, lang)
}
