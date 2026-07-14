import type { Course } from '../types/portfolio'

// ─── Agrega aquí tus programas especializados ─────────────────
// Guarda el PDF en public/certificates/<id>.pdf y asigna certificateUrl.
// Formatos: PDF, PNG, JPG. Asigna category para filtrar por área.
//
// Categorías disponibles:
//   cybersecurity · programming · electronics · solar · chemical · english · other

export const courses: Course[] = [
  {
    id: 'ciberseguridad-ua',
    title: 'Ciberseguridad',
    institution: 'Universidad de los Andes',
    description: 'Programa especializado en fundamentos de ciberseguridad, análisis de vulnerabilidades y protección de sistemas informáticos.',
    category: 'cybersecurity',
    certificateUrl: 'certificates/Ciberseguridad_UA.pdf',
  },
]
