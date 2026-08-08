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
│   ├── projects/              ← Screenshots de proyectos (agregar manualmente)
│   └── certificates/          ← PDFs de certificados (agregar manualmente)
├── src/
│   ├── components/
│   │   ├── ui/                ← Atómicos: Button, Card, Tag, Skeleton
│   │   ├── layout/            ← Navbar, Section, Footer
│   │   ├── sections/          ← Hero, Formation, Projects, ProjectCard, ProjectModal, Contact
│   │   └── SocialFloating.tsx ← Botones redes sociales fijos
│   ├── contexts/              ← LanguageContext (EN/ES toggle)
│   ├── data/                  ← Datos editables: profile, skills, projects, courses
│   ├── hooks/                 ← useScrollReveal, useMediaQuery
│   ├── i18n/                  ← translations.ts (mapa plano EN/ES)
│   ├── styles/                ← animations.css
│   ├── types/                 ← portfolio.ts
│   ├── App.tsx                ← Orquesta secciones
│   └── main.tsx               ← Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Reglas / Convenciones

- **Sin librerías externas de UI** — Todo el CSS es vanilla con variables de tema.
- **Datos separados de componentes** — Modifica `src/data/` para cambiar contenido, no los componentes.
- **Estilo**: Tema oscuro (default) y tema claro toggleable. Acento verde `#00f5d4` (dark) / `#00a884` (light), secondary accent `#c8c8d4` (neutral silver), glassmorphism, animaciones al hacer scroll.
- **Nombres de archivos**: PascalCase para componentes, camelCase para hooks/data.
- **Fuentes**: Inter (sans), JetBrains Mono (mono), Playfair Display (display) — vía Google Fonts en `index.html`.
- **Estilos inline**: Todos los componentes usan objetos `const s: Record<string, React.CSSProperties>` fuera del componente.
- **Idiomas**: Inglés por defecto, toggle EN/ES en navbar vía `LanguageContext` + `translations.ts` con función `t(key, lang)`.
- **i18n en datos**: `profile.ts`, `projects.ts`, `skills.ts` exportan getters `getProfile(lang)`, `getProjects(lang)`, `getKnowledgeAreas(lang)` que devuelven data bilingüe.
- **Thumbnail path**: En `projects.ts` poner `thumbnail: 'projects/<id>.png'` (sin `/` inicial). El componente usa `import.meta.env.BASE_URL` para resolver la ruta.

## Estado actual

### Hero
```
        [Avatar 150px con borde gradiente rotatorio]
                (SVG persona temporal)

    Juan Sebastián Laguna Beleño

      Bio... (texto justificado, max-width 760px)

    ● Programming  ● Cybersecurity  ● Mathematics
    ● Chemical Processes  ● Electronics & Solar  ● Technical English
```
- Tags hardcodeados en `Hero.tsx`
- En mobile: avatar + texto apilados y centrados, avatar 120px

### SocialFloating (`src/components/SocialFloating.tsx`)
- Botones fijos en esquina inferior derecha
- WhatsApp · Gmail · GitHub con tooltips
- Los que no tengan URL configurada se ven atenuados
- En mobile: botones más pequeños (38px), más cerca del borde

### Navbar (`src/components/layout/Navbar.tsx`)
- Logo: badge `SL` con borde acento
- Links: Background · Projects · Contact
- Scroll progress bar (2px gradiente en top edge)
- Al hacer scroll: fondo oscuro `rgba(10,10,15,0.97)` + blur + borderBottom
- Botón EN/ES al lado de los links
- **Mobile (≤768px)**: hamburger menu (☰/✕) con menú desplegable

### Trayectoria (`src/components/sections/Formation.tsx`)

#### 1. Formación Técnica y Tecnológica
- Timeline vertical con dots verdes, cards expandibles (grid-template-rows)
- Datos en `src/data/profile.ts` → `formation[]` con `type: 'technical'`

#### 2. Formación Independiente
- Timeline con dots grises, misma estructura expandible
- `type: 'independent'`

#### 3. Certificados Formación Independiente
- **Buscador** en tiempo real por título/institución
- **Filtro por categoría** (pills: Todas / Cybersecurity / Programming / etc.)
- Grid de tarjetas compactas `repeat(auto-fill, minmax(200px, 1fr))`
- Cada card clickeable → abre PDF en nueva pestaña
- Categorías disponibles: cybersecurity, programming, electronics, solar, chemical, english, other
- PDFs en `public/certificates/`, datos en `src/data/courses.ts`
- Campos: `id, title, institution, description, certificateUrl, category?`
- **En mobile**: cards en horizontal, grid 1 columna con `minmax(160px, 1fr)`

### Proyectos (`src/components/sections/Projects.tsx`)

- Grid: `repeat(auto-fill, minmax(280px, 1fr))`, gap 20px
- Cada card (ProjectCard): preview 110px con thumbnail (o placeholder con iniciales), título, descripción truncada (80 chars), tags, botón "View project"
- Modal (ProjectModal): iframe 480px de alto con loader, fallback si no carga
- **Mobile (≤768px)**: grid 1 columna, thumbnails 90px, modal iframe 320px

### Contact (`src/components/sections/Contact.tsx`)
- Dos columnas: "Let's talk." + links sociales
- **Mobile**: 1 columna, texto centrado

### Footer (`src/components/layout/Footer.tsx`)
- Tres columnas: brand + navegación + redes
- **Mobile**: 1 columna, centrado

## Proyectos listados

| Proyecto     | ID            | Deployado                    | Thumbnail           |
| ------------ | ------------- | ---------------------------- | ------------------- |
| SCADA SPy    | `spy-sena`    | https://sebastianl1.github.io/Web_prueba/ | `projects/scada.jpg` |

## Para agregar un proyecto:
1. Desplegar proyecto en GitHub Pages
2. Agregar entrada en `src/data/projects.ts`
3. (Opcional) Tomar screenshot y poner en `public/projects/<id>.png`
4. Asignar `thumbnail: 'projects/<id>.png'` (sin `/` inicial)

## Para agregar un certificado:
1. Guardar PDF en `public/certificates/<id>.pdf`
2. Agregar entrada en `src/data/courses.ts` con:
   - `id`, `title`, `institution`, `description`, `certificateUrl: 'certificates/<id>.pdf'`
   - `category`: una de `cybersecurity`, `programming`, `electronics`, `solar`, `chemical`, `english`, `other`

## Sistema de temas

El tema claro se activa vía clase `.light` en `<html>`, gestionado por `ThemeContext.tsx`.
Los colores del tema claro se rediseñaron para ser cohesivos:

| Modo | `--bg-primary` | `--accent` | `--bg-card` | 
|------|---------------|------------|-------------|
| Dark | `#0a0a0f` (negro) | `#00f5d4` (neon) | `#1a1a2e` |
| Light | `#faf7f2` (crema) | `#00a884` (teal) | `#ffffff` |

**Variables extra** para uso en `rgba()` dinámico:
- `--accent-rgb`: `0, 245, 212` (dark) / `0, 168, 132` (light)
- `--accent-neutral-rgb`: `200, 200, 212` (dark) / `184, 184, 200` (light)
- `--bg-gradient-1` / `--bg-gradient-2`: colores del gradient radial del `body`, se adaptan al tema

**Regla**: Todos los componentes deben usar `var(--*)` en vez de valores hardcodeados de `#00f5d4`. Donde no es posible (canvas, ripple JS), se lee `--accent` vía `getComputedStyle()`.

## Tipos (`src/types/portfolio.ts`)

| Interfaz        | Propósito |
|-----------------|-----------|
| `Project`       | id, title, description, tags[], iframeUrl, githubUrl?, thumbnail? |
| `KnowledgeArea` | id, title, description, icon, subtopics[] |
| `Course`        | id, title, institution, description, certificateUrl?, category? |
| `FormationItem` | id, title, institution, duration, description, competencies[], knowledgeAreaIds[], type ('technical' \| 'independent') |
| `Profile`       | name, title, tagline, formation[], bio, social { github?, linkedin?, email?, whatsapp? } |

## Hooks

| Hook              | Archivo                       | Propósito |
|-------------------|-------------------------------|-----------|
| `useScrollReveal` | `src/hooks/useScrollReveal.ts` | IntersectionObserver para animaciones al hacer scroll |
| `useMediaQuery`   | `src/hooks/useMediaQuery.ts`   | Detectar tamaño de pantalla para responsive inline styles |
| `useLanguage`     | `src/contexts/LanguageContext.tsx` | Estado global de idioma (EN/ES) + toggle |

## Limitaciones conocidas

- **Iframes**: Algunos sitios bloquean la carga via `X-Frame-Options` o `CSP`. El modal tiene fallback con mensaje y botón a GitHub.
- **GitHub Pages**: No soporta SPA routing nativo. El portafolio es single-page, sin problema.
- **Base URL**: `base: '/Portafolio/'` en vite.config.ts. Usar `import.meta.env.BASE_URL` para rutas de assets en producción.
- **Termux**: Shebangs de `node` no funcionan. Usar `node ./node_modules/<bin>` directamente.
- **PDFs**: El navegador renderiza PDFs nativamente en iframe/new tab. Algunos navegadores antiguos pueden descargar el archivo en vez de mostrarlo.

## Comandos recordatorios

```bash
npm start                              # Desarrollo local
node ./node_modules/typescript/bin/tsc -b && node ./node_modules/vite/bin/vite.js build   # Build completo
node ./node_modules/vite/bin/vite.js build   # Build (solo Vite, sin typecheck)
npm run deploy                         # Publicar en GitHub Pages
```

## Deploy a GitHub Pages

```bash
node ./node_modules/typescript/bin/tsc -b && node ./node_modules/vite/bin/vite.js build && npm run deploy
```

## Próximos pasos

1. Completar `src/data/profile.ts` — agregar WhatsApp (`social.whatsapp`) y email reales
2. Llenar `src/data/courses.ts` con más certificados reales (guardar PDFs en `public/certificates/`)
3. Cuando el usuario provea los pensums, editar `description` y `competencies` de los técnicos en `profile.ts`
4. Agregar más proyectos a `src/data/projects.ts` al desplegarlos
5. Ejecutar `npm run build && npm run deploy` después de cada cambio

---

_Última actualización: Julio 2026 — Modo claro rediseñado (paleta cálida crema + teal), todas las referencias hardcodeadas de `#00f5d4` reemplazadas por `var(--*)` o `getComputedStyle()`, variables `--accent-rgb` y `--bg-gradient-*` agregadas_
