import type { Profile } from '../types/portfolio'

export const profile: Profile = {
  name: 'Sebastián Laguna',
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
  bio: 'Soy un profesional multidisciplinario con sólida formación técnica y experiencia en áreas que integran la industria química, la electrónica y la energía solar fotovoltaica. Mi enfoque combina el conocimiento científico con la programación y la seguridad informática, lo que me permite aportar soluciones innovadoras y eficientes en proyectos industriales y tecnológicos.',
  social: {
    github: 'https://github.com/sebastianl1',
    whatsapp: '573224200609',
    email: 'sebasbele11@gmail.com',
  },
}
