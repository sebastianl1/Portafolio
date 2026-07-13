import type { Language } from '../contexts/LanguageContext'
import type { Profile } from '../types/portfolio'

const profileData: Record<Language, Profile> = {
  en: {
    name: 'Juan Sebastián Laguna Beleño',
    title: 'Chemical Process Technologist',
    tagline: 'Software · Cybersecurity · Industry · Electronics · Solar',
    formation: [
      {
        id: 'quimica',
        title: 'Chemical Process Technologist',
        institution: 'SENA — Industrial Management Center',
        duration: '27 months',
        description:
          'Professional trained to integrate and apply knowledge in manufacturing processes for sectors such as textiles, metal coatings, soaps and detergents, food and beverages, water treatment, among others, contributing to the economic, social and technological development of the environment and the country.',
        competencies: [
          'Develop chemical products according to technical specifications and legal regulations',
          'Control unit operations according to chemical process and technical procedures',
          'Supervise production processes according to technical procedures',
          'Manage plant shutdowns according to technical procedures and regulations',
          'Intervene equipment according to preventive maintenance techniques',
          'Check the control loop according to technical procedure',
        ],
        knowledgeAreaIds: ['chemical-processes', 'algorithms-math'],
        type: 'technical',
      },
      {
        id: 'electronica',
        title: 'Electronics Technician',
        institution: '',
        duration: '',
        description:
          'Technical training in general electronics, including fault diagnosis, electronic equipment maintenance, analog and digital circuit assembly, and installation of control and electronic security systems.',
        competencies: [
          'Diagnose faults in electronic equipment based on symptoms',
          'Maintain electronic equipment according to technical procedures',
          'Interpret technical documentation and electronic blueprints',
        ],
        knowledgeAreaIds: ['electronics-solar'],
        type: 'technical',
      },
      {
        id: 'solar',
        title: 'Technician in Maintenance and Installation of Solar Photovoltaic Electrical Systems',
        institution: '',
        duration: '',
        description:
          'Technical training in installation, maintenance and commissioning of solar photovoltaic energy generation systems, both standalone and grid-connected, complying with technical and safety regulations.',
        competencies: [
          'Assemble renewable energy systems according to technical procedure and regulations',
          'Maintain generation equipment according to technical procedures',
          'Implement regulatory requirements according to technical parameters',
        ],
        knowledgeAreaIds: ['electronics-solar'],
        type: 'technical',
      },
      {
        id: 'independiente',
        title: 'Self-directed Learning in Programming, Cybersecurity & Technology',
        institution: '',
        duration: '',
        description:
          'Self-taught training in software development, information security and applied technologies, complementing technical education with digital and programming skills.',
        competencies: [
          'Full-stack development (React, Flutter, FastAPI)',
          'Clean architecture and design patterns',
          'Cybersecurity audits and vulnerability analysis',
          'Systems automation and integration',
          'Linux and Docker administration',
        ],
        knowledgeAreaIds: ['software-engineering', 'cybersecurity', 'algorithms-math', 'languages'],
        type: 'independent',
      },
    ],
    bio: 'Chemical Process Technologist with complementary training in electronics, solar photovoltaic energy, and software development. My profile integrates technical-industrial knowledge with full-stack programming, cybersecurity, and Linux systems administration. Passionate about automation, process control, and information security, I constantly seek to learn and apply new technologies to solve real-world problems. I have an advanced English level that allows me to read technical documentation, understand international regulations, and communicate in multicultural environments.',
    social: {
      github: 'https://github.com/sebastianl1',
      whatsapp: '573224200609',
      email: 'sebasbele11@gmail.com',
    },
  },
  es: {
    name: 'Juan Sebastián Laguna Beleño',
    title: 'Tecnólogo en Procesos de la Industria Química',
    tagline: 'Software · Ciberseguridad · Industria · Electrónica · Solar',
    formation: [
      {
        id: 'quimica',
        title: 'Tecnólogo en Procesos de la Industria Química',
        institution: 'SENA — Centro de Gestión Industrial',
        duration: '27 meses',
        description:
          'Profesional capacitado para integrar y aplicar conocimiento en los procesos de fabricación propios de sectores como el textil, recubrimientos metálicos, jabones y detergentes, alimentos y bebidas, tratamiento de aguas, entre otros, aportando al desarrollo económico, social y tecnológico del entorno y del país.',
        competencies: [
          'Elaborar productos químicos según especificaciones técnicas y normativa legal',
          'Controlar operación unitaria de acuerdo con proceso químico y procedimiento técnico',
          'Supervisar procesos de producción de acuerdo con procedimientos técnicos',
          'Controlar parada de planta de acuerdo con procedimientos técnicos y normativa',
          'Intervenir equipos de acuerdo con técnicas de mantenimiento preventivo',
          'Chequear el lazo de control de acuerdo con el procedimiento técnico',
        ],
        knowledgeAreaIds: ['chemical-processes', 'algorithms-math'],
        type: 'technical',
      },
      {
        id: 'electronica',
        title: 'Técnico en Electrónica',
        institution: '',
        duration: '',
        description:
          'Formación técnica en electrónica general, incluyendo diagnóstico de fallas, mantenimiento de equipos electrónicos, montaje de circuitos analógicos y digitales, e instalación de sistemas de control y seguridad electrónica.',
        competencies: [
          'Diagnosticar fallas en equipos electrónicos según sintomatología',
          'Mantener equipos electrónicos de acuerdo con procedimientos técnicos',
          'Interpretar documentación técnica y planos electrónicos',
        ],
        knowledgeAreaIds: ['electronics-solar'],
        type: 'technical',
      },
      {
        id: 'solar',
        title:
          'Técnico en Mantenimiento e Instalación de Sistemas Eléctricos con Energía Solar Fotovoltaica',
        institution: '',
        duration: '',
        description:
          'Formación técnica en instalación, mantenimiento y puesta en marcha de sistemas de generación de energía solar fotovoltaica, tanto autónomos como interconectados a la red, cumpliendo con normativa técnica y de seguridad.',
        competencies: [
          'Realizar montaje de sistemas de energía renovable según procedimiento técnico y normativa',
          'Mantener equipos de generación de acuerdo con procedimientos técnicos',
          'Implementar requisitos normativos de acuerdo con parámetros técnicos',
        ],
        knowledgeAreaIds: ['electronics-solar'],
        type: 'technical',
      },
      {
        id: 'independiente',
        title: 'Formación Independiente en Programación, Ciberseguridad y Tecnología',
        institution: '',
        duration: '',
        description:
          'Formación autodidacta en desarrollo de software, seguridad informática y tecnologías aplicadas a la industria, complementando la formación técnica con habilidades digitales y de programación.',
        competencies: [
          'Desarrollo full-stack (React, Flutter, FastAPI)',
          'Arquitectura limpia de software y patrones de diseño',
          'Auditorías de ciberseguridad y análisis de vulnerabilidades',
          'Automatización e integración de sistemas',
          'Administración de sistemas Linux y Docker',
        ],
        knowledgeAreaIds: ['software-engineering', 'cybersecurity', 'algorithms-math', 'languages'],
        type: 'independent',
      },
    ],
    bio: 'Tecnólogo en Procesos de la Industria Química con formación complementaria en electrónica, energía solar fotovoltaica y desarrollo de software. Mi perfil integra el conocimiento técnico-industrial con habilidades en programación full-stack, ciberseguridad y administración de sistemas Linux. Apasionado por la automatización, el control de procesos y la seguridad informática, busco constantemente aprender y aplicar nuevas tecnologías para resolver problemas del mundo real. Cuento con nivel de inglés avanzado que me permite leer documentación técnica, comprender normativas internacionales y comunicarme en entornos multiculturales.',
    social: {
      github: 'https://github.com/sebastianl1',
      whatsapp: '573224200609',
      email: 'sebasbele11@gmail.com',
    },
  },
}

export function getProfile(lang: Language): Profile {
  return profileData[lang]
}
