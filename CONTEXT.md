# Portafolio Personal - Contexto del Proyecto

## Stack

| Capa        | Tecnología           |
| ----------- | -------------------- |
| Framework   | React 19             |
| Lenguaje    | TypeScript 5.7       |
| Bundler     | Vite 6               |
| Despliegue  | GitHub Pages         |
| Estilos     | CSS vanilla + variables |

## Arquitectura

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── projects/          ← Screenshots de proyectos (agregar manualmente)
│   └── certificates/      ← PDFs de certificados (agregar manualmente)
├── src/
│   ├── components/
│   │   ├── ui/            ← Atómicos: Button, Card, Tag, Skeleton
│   │   ├── layout/        ← Navbar, Section, Footer
│   │   ├── sections/      ← Hero, Formation, Projects, ProjectCard, ProjectModal, Contact
│   │   └── SocialFloating.tsx  ← Botones redes sociales fijos
│   ├── data/              ← Datos editables: profile, skills, projects, courses
│   ├── hooks/             ← useScrollReveal
│   ├── styles/            ← animations.css
│   ├── types/             ← portfolio.ts
│   ├── App.tsx            ← Orquesta secciones
│   └── main.tsx           ← Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Reglas / Convenciones

- **Sin librerías externas de UI** — Todo el CSS es vanilla con variables de tema.
- **Datos separados de componentes** — Modifica `src/data/` para cambiar contenido, no los componentes.
- **Estilo**: Tema oscuro, acento verde `#00f5d4`, glassmorphism, animaciones al hacer scroll.
- **Nombres de archivos**: PascalCase para componentes, camelCase para hooks/data.
- **FormationItem**: Cada ítem de formación tiene `id, title, institution, duration, description, competencies[], knowledgeAreaIds[], type`. Se renderiza como card expandible con descripción + competencias + tags de áreas relacionadas.
- **KnowledgeArea**: Usado internamente para relacionar formación con áreas de conocimiento.

## Estado actual

### Hero
- Avatar circular con SVG persona (reemplazable por foto)
- Nombre + bio centrados
- Tags compactos debajo: Programación · Ciberseguridad · Matemáticas · Procesos Químicos · Electrónica y Solar · Inglés Técnico

### SocialFloating
- Botones fijos en esquina inferior derecha
- WhatsApp · Gmail · GitHub (íconos SVG)
- Horizontal, glassmorphism, hover al acento

### Secciones visibles en navbar
1. **Trayectoria** — Formación técnica expandible + formación independiente + certificados en grid
2. **Proyectos** — Grid de cards con preview (thumbnail/placeholder + iframe fallback)
3. **Contacto** — Links sociales

### Proyectos listados

| Proyecto     | ID            | Deployado                    | Thumbnail |
| ------------ | ------------- | ---------------------------- | --------- |
| SCADA SPy    | `spy-sena`    | https://sebastianl1.github.io/Web_prueba/ | Placeholder con iniciales |

### Proyectos pendientes (para agregar)

- `pythoneer-academy` — Flutter + FastAPI
- `auditforge` — Flutter + Python
- `hmi-diagram-editor` — React + Konva
- `app-movies` — Flutter
- `ia/cortana-companion` — Three.js
- `mejora_personal` — Flutter

### Certificados
- Grid de tarjetas compactas en sección "CERTIFICADOS FORMACIÓN INDEPENDIENTE"
- Cada card: 📄 + título + institución + botón "Ver PDF"
- PDFs guardados en `public/certificates/`
- Datos en `src/data/courses.ts` (editar para agregar certificados)

### Navbar
- Logo `SL` en badge cuadrado con borde acento
- Links: Trayectoria · Proyectos · Contacto
- Contenedor con borde sutil que brilla al hover
- Fondo glass al hacer scroll

## Para agregar un proyecto:
1. Desplegar proyecto en GitHub Pages
2. Agregar entrada en `src/data/projects.ts`
3. (Opcional) Agregar screenshot en `public/projects/<id>.png`
4. Asignar `thumbnail: '/projects/<id>.png'` en el objeto del proyecto

## Para agregar un certificado:
1. Guardar PDF en `public/certificates/<id>.pdf`
2. Agregar entrada en `src/data/courses.ts` con `certificateUrl: '/certificates/<id>.pdf'`

## Limitaciones conocidas

- **Iframes**: Algunos sitios bloquean la carga via `X-Frame-Options`. El modal tiene fallback con botón a GitHub.
- **GitHub Pages**: No soporta SPA routing nativo. El portafolio es single-page, sin problema.
- **Base URL**: Configurado con `base: '/Portafolio/'` en vite.config.ts.

## Comandos recordatorios

```bash
npm start        # Desarrollo local
npm run build    # Build de producción
npm run deploy   # Publicar en GitHub Pages
```

## Deploy a GitHub Pages

```bash
npm run build && npm run deploy
```

## Próximos pasos

1. Completar `src/data/profile.ts` con WhatsApp y email reales
2. Agregar thumbnails de proyectos en `public/projects/`
3. Llenar `src/data/courses.ts` con certificados reales (PDFs en `public/certificates/`)
4. Agregar más proyectos a `src/data/projects.ts` al desplegarlos
5. Ejecutar `npm run build && npm run deploy`

---

_Última actualización: Julio 2026 — Sesión: Hero restructurado, formación expandible, navbar mejorado, thumbnails, certificados en grid, SocialFloating_
