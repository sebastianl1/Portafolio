# CODE-REFERENCE.md — Portafolio Personal

## 1. Árbol completo del proyecto

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── manifest.json                    ← PWA manifest
│   ├── pwa-192x192.svg                  ← Icono PWA
│   ├── pwa-512x512.svg                  ← Icono PWA
│   ├── certificates/                    ← PDFs de certificados
│   │   └── Ciberseguridad_UA.pdf
│   └── projects/                        ← Screenshots de proyectos
│       └── scada.jpg
├── src/
│   ├── App.tsx                          ← Orquesta secciones + layout
│   ├── main.tsx                         ← Entry point (providers)
│   ├── index.css                        ← CSS variables, temas, resets, scrollbar
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── BackgroundCanvas.tsx         ← Canvas partículas fórmulas
│   │   ├── ErrorBoundary.tsx            ← Captura errores por sección
│   │   ├── ScrollToTop.tsx              ← Botón flotante ⬆
│   │   ├── SocialFloating.tsx           ← FAB redes sociales expandible
│   │   ├── layout/
│   │   │   ├── Footer.tsx               ← 3 columnas + copyright
│   │   │   ├── Navbar.tsx               ← Nav fija + progress + hamburger + toggles
│   │   │   └── Section.tsx              ← Wrapper reutilizable con heading + scroll-reveal
│   │   ├── sections/
│   │   │   ├── Hero.tsx                 ← Avatar + nombre + bio + tags dinámicos + CTAs
│   │   │   ├── Formation.tsx            ← Timeline técnico + independiente + certificados
│   │   │   ├── Skills.tsx               ← Grid áreas de conocimiento
│   │   │   ├── Projects.tsx             ← Grid proyectos + modal + WorkInProgress
│   │   │   ├── ProjectCard.tsx          ← Card individual de proyecto
│   │   │   ├── ProjectModal.tsx         ← Modal con iframe + loader + fallback
│   │   │   └── Contact.tsx              ← "Let's talk" + links sociales
│   │   └── ui/
│   │       ├── Button.tsx               ← 3 variantes + efecto ripple
│   │       ├── Card.tsx                 ← Card glassmorphism
│   │       ├── Skeleton.tsx             ← Skeleton shimmer loading
│   │       ├── Tag.tsx                  ← Tag pill con color dinámico
│   │       └── WorkInProgress.tsx       ← Placeholder "próximamente" borde dashed
│   ├── contexts/
│   │   ├── LanguageContext.tsx          ← Estado global EN/ES + toggle
│   │   └── ThemeContext.tsx             ← Estado global dark/light + localStorage
│   ├── data/
│   │   ├── profile.ts                   ← Perfil bilingüe (nombre, bio, formation[], social)
│   │   ├── projects.ts                  ← Proyectos bilingües
│   │   ├── skills.ts                    ← Áreas conocimiento bilingües
│   │   └── courses.ts                   ← Certificados (monolingüe español)
│   ├── hooks/
│   │   ├── useScrollReveal.ts           ← IntersectionObserver { ref, visible }
│   │   └── useMediaQuery.ts             ← useSyncExternalStore wrapper
│   ├── i18n/
│   │   └── translations.ts              ← Mapa plano EN/ES + t(key, lang)
│   ├── styles/
│   │   └── animations.css               ← Keyframes + .reveal classes
│   └── types/
│       └── portfolio.ts                 ← Interfaces: Project, Course, Profile, etc.
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── eslint.config.js
├── .prettierrc
├── CONTEXT.md
└── CODE-REFERENCE.md                    ← Este archivo
```

---

## 2. Archivo por archivo

### Tipos (`src/types/portfolio.ts`)
| Interfaz | Campos | Se usa en |
|----------|--------|-----------|
| `Project` | id, title, description, tags[], iframeUrl, githubUrl?, thumbnail? | Projects, ProjectCard, ProjectModal |
| `KnowledgeArea` | id, title, description, icon, subtopics[] | Skills, Formation (tags) |
| `Course` | id, title, institution, description, certificateUrl?, category? | Formation (CertCard) |
| `FormationItem` | id, title, institution, duration, description, competencies[], knowledgeAreaIds[], type | Formation (FormationCard) |
| `Profile` | name, title, tagline, formation[], bio, social { github?, linkedin?, email?, whatsapp? } | Hero, Formation, Contact, Footer, SocialFloating |

---

### Datos (`src/data/`)

| Archivo | Exporta | Qué contiene | Cómo se consume |
|---------|---------|-------------|-----------------|
| `profile.ts` | `getProfile(lang)` | Objeto `Record<Language, Profile>` con nombre, bio, formation[], social links | `getProfile(language)` en cada sección |
| `projects.ts` | `getProjects(lang)` | `Record<Language, Project[]>` | `getProjects(language)` en Projects.tsx |
| `skills.ts` | `getKnowledgeAreas(lang)` | `Record<Language, KnowledgeArea[]>` | `getKnowledgeAreas(language)` en Skills.tsx y Formation.tsx |
| `courses.ts` | `courses` (array constante) | `Course[]` plano (sin getter, no bilingüe) | Import directo en Formation.tsx |

**Patrón bilingüe en datos**: Los 3 primeros archivos usan `Record<Language, T>` con getter `getX(lang)`. `courses.ts` no es bilingüe porque los títulos de certificados están en español.

---

### Contextos (`src/contexts/`)

| Archivo | Providers | Hook de acceso | Estado |
|---------|-----------|----------------|--------|
| `LanguageContext.tsx` | `LanguageProvider` | `useLanguage()` → `{ language, toggleLanguage, setLanguage }` | `'en'` por defecto |
| `ThemeContext.tsx` | `ThemeProvider` | `useTheme()` → `{ theme, toggleTheme, setTheme }` | Lee localStorage → prefers-color-scheme → `'dark'` |

**ThemeContext** además togglea la clase `.light`/`.dark` en `<html>` y persiste en localStorage bajo `'portfolio-theme'`.

---

### Hooks (`src/hooks/`)

| Hook | Archivo | Retorna | Lógica interna |
|------|---------|---------|----------------|
| `useScrollReveal(threshold?)` | `useScrollReveal.ts` | `{ ref, visible }` | IntersectionObserver, dispara una vez |
| `useMediaQuery(query)` | `useMediaQuery.ts` | `boolean` | `useSyncExternalStore` + `window.matchMedia` |

---

### i18n (`src/i18n/translations.ts`)

| Exportación | Firma | Comportamiento |
|-------------|-------|----------------|
| `t(key, lang)` | `(key: string, lang: Language) => string` | Busca `ui[key][lang]`, devuelve key si no existe |
| `useT(lang)` | `(lang: Language) => (key: string) => string` | Versión curriada de `t` |

**Mapa plano**: `'nav.proyectos': { en: 'Projects', es: 'Proyectos' }` (~90 keys).

---

### Componentes UI Atómicos (`src/components/ui/`)

| Componente | Props | Función |
|------------|-------|---------|
| `Button` | `variant: 'primary'\|'ghost'\|'outline'` + `children` + eventos HTML | Renderiza `<button>` con ripple effect en click |
| `Card` | `children`, `onClick?`, `style?`, `className?` | Wrapper con glassmorphism, hover elevación |
| `Tag` | `label`, `accent?: string` (color hex) | Pill con color dinámico de acento |
| `Skeleton` | `width?`, `height?`, `borderRadius?` | Placeholder shimmer animado |
| `WorkInProgress` | `title`, `description`, `icon?: ReactNode` | Card borde dashed con glow pulsante |

---

### Componentes de Layout (`src/components/layout/`)

| Componente | Función | Elementos internos |
|------------|---------|-------------------|
| `Navbar` | Nav fija arriba | Logo `SL`, links (Background/Skills/Projects/Contact), scroll progress bar, hamburger mobile, toggle EN/ES, toggle tema ☀/☾ |
| `Footer` | 3 columnas (brand + nav + social) | Nombre, tagline, links rápidos, redes, copyright |
| `Section` | Wrapper de sección con heading + scroll-reveal | `<h2>` título, `<div>` underline gradiente, `<div>` children con `.reveal` |

---

### Secciones de página (`src/components/sections/`)

| Componente | Subcomponentes | Datos que consume |
|------------|----------------|-------------------|
| `Hero` | — | `getProfile(language)`, `t()` |
| `Formation` | `FormationCard`, `CertCard` | `getProfile(language)`, `getKnowledgeAreas(language)`, `courses[]`, `WorkInProgress`, `t()` |
| `Skills` | `SkillCard` | `getKnowledgeAreas(language)`, `t()` |
| `Projects` | `ProjectCard`, `ProjectModal`, `WorkInProgress` | `getProjects(language)`, `t()` |
| `Contact` | — | `getProfile(language)`, `t()` |

---

### Subcomponentes de Proyecto

| Componente | Archivo | Función |
|------------|---------|---------|
| `FormationCard` | `Formation.tsx` (interno) | Card expandible en timeline con competencias + áreas relacionadas |
| `CertCard` | `Formation.tsx` (interno) | Card de certificado con borde izquierdo por categoría, botón PDF |
| `SkillCard` | `Skills.tsx` (interno) | Card de área de conocimiento con icono, subtopics |
| `ProjectCard` | `ProjectCard.tsx` | Thumbnail (imagen o iniciales), título, descripción truncada 80 chars, tags coloreados, botón |
| `ProjectModal` | `ProjectModal.tsx` | Modal con iframe + skeleton loader + error fallback + focus trap |

---

### Componentes independientes

| Componente | Archivo | Función | Estilo |
|------------|---------|---------|--------|
| `BackgroundCanvas` | `BackgroundCanvas.tsx` | Canvas fijo con fórmulas flotando (25 desktop, 10 mobile). Lee `--accent` y `--accent-neutral` vía `getComputedStyle` para adaptarse al tema | `z-index: 0`, `pointer-events: none` |
| `SocialFloating` | `SocialFloating.tsx` | FAB `+` esquina inferior derecha, expande 4 links | `z-index: 100`, se oculta cerca del footer |
| `ScrollToTop` | `ScrollToTop.tsx` | Botón ⬆ esquina inferior izquierda, visible tras 300px scroll | `z-index: 100`, se oculta cerca del footer |
| `ErrorBoundary` | `ErrorBoundary.tsx` | Class component, captura errores, muestra fallback con "Reload section" | Sin estilos propios |

---

## 3. Flujo de datos

```
LanguageContext (language: 'en' | 'es')
       │
       ▼
getProfile(lang)    getProjects(lang)    getKnowledgeAreas(lang)    courses[]
(profile.ts)        (projects.ts)        (skills.ts)               (courses.ts)
       │                    │                    │                     │
       ▼                    ▼                    ▼                     ▼
  Hero               Projects              Skills                 Formation
  Contact              └─ProjectCard        Formation               └─CertCard
  Footer               └─ProjectModal        └─FormationCard
  SocialFloating                              (tags en cards)
  Formation
   └─FormationCard
```

---

## 4. Jerarquía de providers

```
main.tsx:
  StrictMode
    └── ThemeProvider              (useTheme: dark/light)
        └── LanguageProvider       (useLanguage: en/es)
            └── App
```

---

## 5. Estructura de App.tsx

```
App
├── <BackgroundCanvas />                  ← z-index 0, fixed
└── <div className="page-enter">          ← z-index 1, relative
    ├── <Navbar />                        ← fixed top, z-index 1000
    ├── <main>
    │   ├── <ErrorBoundary><Hero /></ErrorBoundary>
    │   ├── <div className="section-divider" />
    │   ├── <ErrorBoundary><Formation /></ErrorBoundary>
    │   ├── <div className="section-divider" />
    │   ├── <ErrorBoundary><Skills /></ErrorBoundary>
    │   ├── <div className="section-divider" />
    │   ├── <ErrorBoundary><Projects /></ErrorBoundary>
    │   ├── <div className="section-divider" />
    │   └── <ErrorBoundary><Contact /></ErrorBoundary>
    ├── <Footer />
    ├── <SocialFloating />
    └── <ScrollToTop />
```

---

## 6. Sistema de temas (CSS)

- `:root` → variables dark (predeterminado)
- `.light` → sobreescribe ~25 variables (bg, text, accent, border, shadows, bg-gradient)
- Todos los componentes usan `var(--*)` → el cambio es instantáneo vía cascada CSS
- Donde no es posible usar `var()` (canvas, ripple JS), se lee `--accent` con `getComputedStyle()`

Variables clave del tema:
```
--bg-primary / --bg-secondary / --bg-card / --bg-glass
--text-primary / --text-secondary / --text-muted
--accent / --accent-rgb / --accent-dim / --accent-glow / --accent-gradient
--accent-neutral / --accent-neutral-rgb
--border / --border-accent
--shadow-sm/md/lg/accent
--bg-gradient-1 / --bg-gradient-2       ← body radial gradient, adaptativo
```

**Light mode** (`#faf7f2` crema + `#00a884` teal):
- Page bg cálido para que cards blancas contrasten
- Teal profundo para legibilidad sobre fondo claro

---

## 7. Patrón `getComputedStyle()` para colores dinámicos

Cuando JS necesita el color del acento (no puede usar `var()` en CSS), se lee del `<html>`:

```ts
const accent = getComputedStyle(document.documentElement)
  .getPropertyValue('--accent').trim() || '#00f5d4'
```

Usado en:
- **Button.tsx**: ripple effect → lee `--accent`, lo convierte de hex a RGB
- **BackgroundCanvas.tsx**: colores de fórmulas → lee `--accent` y `--accent-neutral`

Para el CSS ripple keyframe, se usa `rgba(var(--accent-rgb), 0.3)`.

---

## 8. Ubicación rápida: ¿dónde está X?

| Si buscas... | Ve a... |
|--------------|---------|
| Título de sección "Background" | `translations.ts` → `'section.formacion'` |
| Texto de un botón | `translations.ts` → `'cta.*'`, `'projects.*'`, etc. |
| Bio / nombre del perfil | `data/profile.ts` → `bio`, `name` |
| Agregar proyecto nuevo | `data/projects.ts` → agregar objeto en array EN y ES |
| Agregar certificado nuevo | `data/courses.ts` + PDF en `public/certificates/` |
| Color del borde de certificados | `Formation.tsx` → `categoryColors` |
| Color del acento en modo claro | `index.css` → `.light` → `--accent: #00a884` |
| Colores del canvas de fórmulas | `BackgroundCanvas.tsx` → lee `--accent` y `--accent-neutral` vía `getComputedStyle` |
| Tags del Hero | `Hero.tsx` → `tagKeys` (hardcodeados) |
| Links del navbar | `Navbar.tsx` → `links` array |
| Links de redes sociales | `SocialFloating.tsx` → `useSocialLinks()` |
| Animación scroll | `animations.css` → `.reveal`, `.reveal-stagger` |
| Tema claro/oscuro | `ThemeContext.tsx` + `index.css` → `.light` |
| Variables CSS globales | `index.css` → `:root` |
| Tipos/Interfaces | `types/portfolio.ts` |
| Fuentes | `index.html` → Google Fonts link |
| Base URL / GitHub Pages | `vite.config.ts` → `base: '/Portafolio/'` |
| Scripts (build/deploy/lint) | `package.json` → `scripts` |
