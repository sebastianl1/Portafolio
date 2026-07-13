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
- **KnowledgeArea**: Usado internamente para relacionar formación con áreas de conocimiento. Definidas en `src/data/skills.ts`.
- **Thumbnail path**: Guardar en `public/projects/<id>.png` y en `projects.ts` poner `thumbnail: 'projects/<id>.png'` (sin `/` inicial). El componente usa `import.meta.env.BASE_URL` para resolver la ruta correcta (funciona en dev y GitHub Pages).
- **Modal de proyectos**: Siempre muestra el iframe con la previsualización en vivo (con loader + fallback si el sitio bloquea iframes). La thumbnail solo se muestra en la card, no en el modal.

## Estado actual

### Hero
```
        [Avatar 130px circular]
         (SVG persona temporal)

         Sebastián Laguna

    Bio... (texto centrado, max-width 600px)

    ● Programación  ● Ciberseguridad  ● Matemáticas
    ● Procesos Químicos  ● Electrónica y Solar  ● Inglés Técnico
```
- Tags hardcodeados en `Hero.tsx` (no usan `knowledgeAreas` directamente)

### SocialFloating (`src/components/SocialFloating.tsx`)
- Botones fijos en esquina inferior derecha (bottom-right)
- WhatsApp · Gmail · GitHub — horizontal, glassmorphism
- Los que no tengan URL configurada se ven atenuados (opacity 0.3, sin pointer-events)
- Configurar URLs en `src/data/profile.ts` → `social.whatsapp`, `social.email`, `social.github`

### Navbar (`src/components/layout/Navbar.tsx`)
- Logo: badge `SL` con borde acento
- Links: Trayectoria · Proyectos · Contacto
- Al hacer scroll: fondo oscuro `rgba(10,10,15,0.92)` + blur + borderBottom
- Contenedor de links: borde sutil `rgba(0,245,212,0.04)` que brilla al hover (`0.2` + boxShadow glow)

### Trayectoria (`src/components/sections/Formation.tsx`)

#### 1. Formación Técnica y Tecnológica
- Cards expandibles con: descripción + lista de competencias + tags de áreas relacionadas
- Datos en `src/data/profile.ts` → `formation[]` con `type: 'technical'`
- Items actuales:
  - Tecnólogo en Procesos de la Industria Química (SENA, 27 meses, competencias del pensum)
  - Técnico en Electrónica (pendiente de institución y pensum)
  - Técnico en Mantenimiento e Instalación de Sistemas Eléctricos con Energía Solar Fotovoltaica (pendiente)

#### 2. Formación Independiente
- Card expandible con competencias autodidactas
- `type: 'independent'`

#### 3. Certificados Formación Independiente
- Grid de tarjetas compactas (`repeat(auto-fill, minmax(200px, 1fr))`)
- Cada card: 📄 + título + institución + botón "Ver PDF"
- PDFs en `public/certificates/`, datos en `src/data/courses.ts`
- Campos: `id, title, institution, description, certificateUrl`

### Proyectos (`src/components/sections/Projects.tsx`)

- Grid: `repeat(auto-fill, minmax(260px, 1fr))`, gap 16px
- Cada card (ProjectCard): preview 96px con thumbnail (o placeholder con iniciales), título, descripción truncada (80 chars), tags, botón "Ver proyecto"
- Modal (ProjectModal): iframe 480px de alto con loader, fallback si no carga

### Proyectos listados

| Proyecto     | ID            | Deployado                    | Thumbnail           |
| ------------ | ------------- | ---------------------------- | ------------------- |
| SCADA SPy    | `spy-sena`    | https://sebastianl1.github.io/Web_prueba/ | `projects/scada.jpg` |

### Proyectos pendientes (para agregar)

- `pythoneer-academy` — Flutter + FastAPI
- `auditforge` — Flutter + Python
- `hmi-diagram-editor` — React + Konva
- `app-movies` — Flutter
- `ia/cortana-companion` — Three.js
- `mejora_personal` — Flutter

## Para agregar un proyecto:
1. Desplegar proyecto en GitHub Pages
2. Agregar entrada en `src/data/projects.ts`
3. (Opcional) Tomar screenshot y poner en `public/projects/<id>.png`
4. Asignar `thumbnail: 'projects/<id>.png'` (sin `/` inicial)

## Para agregar un certificado:
1. Guardar PDF en `public/certificates/<id>.pdf`
2. Agregar entrada en `src/data/courses.ts` con `certificateUrl: '/certificates/<id>.pdf'`

## Tipos (`src/types/portfolio.ts`)

| Interfaz        | Propósito |
|-----------------|-----------|
| `Project`       | id, title, description, tags[], iframeUrl, githubUrl?, thumbnail? |
| `KnowledgeArea` | id, title, description, icon, subtopics[] |
| `Course`        | id, title, institution, description, certificateUrl? |
| `FormationItem` | id, title, institution, duration, description, competencies[], knowledgeAreaIds[], type ('technical' \| 'independent') |
| `Profile`       | name, title, tagline, formation[], bio, social { github?, linkedin?, email?, whatsapp? } |

## Limitaciones conocidas

- **Iframes**: Algunos sitios bloquean la carga via `X-Frame-Options` o `CSP`. El modal tiene fallback con mensaje y botón a GitHub.
- **GitHub Pages**: No soporta SPA routing nativo. El portafolio es single-page, sin problema.
- **Base URL**: `base: '/Portafolio/'` en vite.config.ts. Usar `import.meta.env.BASE_URL` para rutas de assets en producción.
- **Termux**: Shebangs de `node` no funcionan. Usar `node ./node_modules/<bin>` directamente.

## Comandos recordatorios

```bash
npm start                              # Desarrollo local
node ./node_modules/typescript/bin/tsc -b && node ./node_modules/vite/bin/vite.js build   # Build
node ./node_modules/vite/bin/vite.js build   # Build (solo Vite, sin typecheck)
npm run deploy                         # Publicar en GitHub Pages
```

## Deploy a GitHub Pages

```bash
node ./node_modules/typescript/bin/tsc -b && node ./node_modules/vite/bin/vite.js build && npm run deploy
```

## Próximos pasos

1. Completar `src/data/profile.ts` — agregar WhatsApp (`social.whatsapp`) y email reales
2. Llenar `src/data/courses.ts` con certificados reales (guardar PDFs en `public/certificates/`)
3. Cuando el usuario provea los pensums, editar `description` y `competencies` de los técnicos en `profile.ts`
4. Agregar más proyectos a `src/data/projects.ts` al desplegarlos
5. Ejecutar `npm run build && npm run deploy` después de cada cambio

---

_Última actualización: Julio 2026 — Sesión completa: Hero restructurado (avatar + bio + tags), Formation expandible (técnica + independiente + certificados grid), Navbar mejorado (SL badge + glow), SocialFloating (WhatsApp/Gmail/GitHub), ProjectCard con thumbnail real (scada.jpg), Modal con iframe siempre, CONTEXT.md actualizado_
