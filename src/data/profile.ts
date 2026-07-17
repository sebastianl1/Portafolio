import type { Language } from '../contexts/LanguageContext'
import type { Profile } from '../types/portfolio'

const profileData: Record<Language, Profile> = {
  en: {
    name: 'Juan Sebastián Laguna Beleño',
    title: 'Chemical Process Technologist',
    tagline: 'Software · Cybersecurity · Industry · Electronics · Solar',
    formation: [
      {
        id: 'ingenieria-quimica',
        title: 'Chemical Engineering Student (6th Semester)',
        institution: 'Universidad Nacional de Colombia',
        duration: '6th semester',
        description:
          'Currently pursuing a bachelor\'s degree in Chemical Engineering at the Universidad Nacional de Colombia — the most prestigious higher education institution in the country. The program provides a strong foundation in transport phenomena, thermodynamics, reaction engineering, process control, and plant design, with a focus on industrial application and scientific research.',
        competencies: [
          'Apply principles of mass and energy balances to chemical processes',
          'Understand thermodynamics and kinetics of chemical reactions',
          'Model fluid flow and heat transfer in industrial equipment',
          'Design and simulate separation processes (distillation, absorption, extraction)',
          'Implement process control strategies and instrumentation',
          'Analyze and optimize chemical processes from a technical and economic perspective',
        ],
        knowledgeAreaIds: ['chemical-processes', 'algorithms-math'],
        type: 'professional',
      },
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
        institution: 'Universidad Sergio Arboleda (Colegio Brasilia Bosa)',
        duration: '2 years',
        description:
          'Technical training in general electronics as a training chain articulated with high school, covering basic electronics, protoboard assembly, Arduino and PIC microcontroller programming, power electronics, analog and digital circuits, and fault diagnosis and maintenance of electronic equipment.',
        competencies: [
          'Diagnose faults in electronic equipment based on symptoms and measurement',
          'Maintain electronic equipment according to technical procedures',
          'Program microcontrollers (Arduino, PIC) for automation and control applications',
          'Assemble and test power electronics circuits (rectifiers, regulators, converters)',
          'Build and troubleshoot analog and digital circuits on protoboard',
          'Interpret technical documentation, electronic blueprints and datasheets',
          'Use instrumentation tools (multimeter, oscilloscope, function generator)',
        ],
        knowledgeAreaIds: ['electronics-solar'],
        type: 'technical',
      },
      {
        id: 'solar',
        title: 'Technician in Maintenance and Installation of Electrical Systems with Photovoltaic Solar Energy',
        institution: 'Politécnico Industrial Nueva Colombia',
        duration: '6 months',
        description:
          'Labor competency-based technical training in installation, maintenance and commissioning of photovoltaic solar energy systems — autonomous (FV201), grid-connected (FV301), and solar water pumping (FV401) — complying with Colombian regulations RETIE and RETILAP. Includes an international certification pathway via NABCEP.',
        competencies: [
          'Design and install autonomous photovoltaic systems according to technical specifications',
          'Install and commission grid-connected photovoltaic systems',
          'Design and implement solar water pumping systems for agricultural and rural applications',
          'Apply RETIE regulations in electrical installations for photovoltaic systems',
          'Apply RETILAP regulations in autonomous lighting and public lighting projects',
          'Perform preventive and corrective maintenance, troubleshooting and monitoring of PV installations',
          'Select and size components (modules, inverters, batteries, controllers, structures)',
        ],
        knowledgeAreaIds: ['electronics-solar'],
        type: 'technical',
      },
      {
        id: 'independiente',
        title: 'Self-Directed Learning in Programming, Cybersecurity & Technology',
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
    bio: 'Chemical Engineering student at Universidad Nacional de Colombia and Chemical Process Technologist with complementary training in electronics, solar photovoltaic energy, and software development. My profile integrates academic engineering fundamentals with technical-industrial experience in full-stack programming, cybersecurity, and Linux systems administration. Passionate about automation, process control, and information security, I constantly seek to learn and apply new technologies to solve real-world problems. I have an advanced English level that allows me to read technical documentation, understand international regulations, and communicate in multicultural environments.',
    social: {
      github: 'https://github.com/sebastianl1',
      linkedin: 'https://www.linkedin.com/in/juan-sebastian-laguna-bele%C3%B1o-0a22bb363',
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
        id: 'ingenieria-quimica',
        title: 'Estudiante de Ingeniería Química (6to Semestre)',
        institution: 'Universidad Nacional de Colombia',
        duration: '6to semestre',
        description:
          'Actualmente cursando Ingeniería Química en la Universidad Nacional de Colombia — la institución de educación superior más prestigiosa del país. El programa proporciona una base sólida en fenómenos de transporte, termodinámica, ingeniería de reacciones, control de procesos y diseño de plantas, con enfoque en aplicación industrial e investigación científica.',
        competencies: [
          'Aplicar principios de balances de masa y energía a procesos químicos',
          'Comprender termodinámica y cinética de reacciones químicas',
          'Modelar flujo de fluidos y transferencia de calor en equipos industriales',
          'Diseñar y simular procesos de separación (destilación, absorción, extracción)',
          'Implementar estrategias de control de procesos e instrumentación',
          'Analizar y optimizar procesos químicos desde una perspectiva técnica y económica',
        ],
        knowledgeAreaIds: ['chemical-processes', 'algorithms-math'],
        type: 'professional',
      },
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
        institution: 'Universidad Sergio Arboleda (Colegio Brasilia Bosa)',
        duration: '2 años',
        description:
          'Formación técnica en electrónica general como cadena de formación articulada con el bachillerato, cubriendo electrónica básica, montaje en protoboard, programación de microcontroladores Arduino y PIC, electrónica de potencia, circuitos analógicos y digitales, y diagnóstico y mantenimiento de equipos electrónicos.',
        competencies: [
          'Diagnosticar fallas en equipos electrónicos según sintomatología y medición',
          'Mantener equipos electrónicos de acuerdo con procedimientos técnicos',
          'Programar microcontroladores (Arduino, PIC) para aplicaciones de automatización y control',
          'Montar y probar circuitos de electrónica de potencia (rectificadores, reguladores, convertidores)',
          'Construir y solucionar fallas en circuitos analógicos y digitales en protoboard',
          'Interpretar documentación técnica, planos electrónicos y hojas de datos',
          'Utilizar instrumentos de medición (multímetro, osciloscopio, generador de funciones)',
        ],
        knowledgeAreaIds: ['electronics-solar'],
        type: 'technical',
      },
      {
        id: 'solar',
        title:
          'Técnico en Mantenimiento e Instalación de Sistemas Eléctricos con Energía Solar Fotovoltaica',
        institution: 'Politécnico Industrial Nueva Colombia',
        duration: '6 meses',
        description:
          'Formación técnica laboral por competencias en instalación, mantenimiento y puesta en marcha de sistemas de energía solar fotovoltaica — autónomos (FV201), interconectados a la red (FV301) y bombeo solar de agua (FV401) — cumpliendo con los reglamentos técnicos colombianos RETIE y RETILAP. Incluye ruta de certificación internacional vía NABCEP.',
        competencies: [
          'Diseñar e instalar sistemas fotovoltaicos autónomos según especificaciones técnicas',
          'Instalar y poner en marcha sistemas fotovoltaicos interconectados a la red',
          'Diseñar e implementar sistemas de bombeo solar de agua para aplicaciones agrícolas y rurales',
          'Aplicar la normativa RETIE en instalaciones eléctricas para sistemas fotovoltaicos',
          'Aplicar la normativa RETILAP en proyectos de iluminación autónoma y alumbrado público',
          'Realizar mantenimiento preventivo y correctivo, diagnóstico de fallas y monitoreo de instalaciones FV',
          'Seleccionar y dimensionar componentes (módulos, inversores, baterías, controladores, estructuras)',
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
    bio: 'Estudiante de Ingeniería Química en la Universidad Nacional de Colombia y Tecnólogo en Procesos de la Industria Química con formación complementaria en electrónica, energía solar fotovoltaica y desarrollo de software. Mi perfil integra fundamentos académicos de ingeniería con experiencia técnico-industrial en programación full-stack, ciberseguridad y administración de sistemas Linux. Apasionado por la automatización, el control de procesos y la seguridad informática, busco constantemente aprender y aplicar nuevas tecnologías para resolver problemas del mundo real. Cuento con nivel de inglés avanzado que me permite leer documentación técnica, comprender normativas internacionales y comunicarme en entornos multiculturales.',
    social: {
      github: 'https://github.com/sebastianl1',
      linkedin: 'https://www.linkedin.com/in/juan-sebastian-laguna-bele%C3%B1o-0a22bb363',
      whatsapp: '573224200609',
      email: 'sebasbele11@gmail.com',
    },
  },
}

export function getProfile(lang: Language): Profile {
  return profileData[lang]
}
