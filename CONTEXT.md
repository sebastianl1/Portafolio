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
│   └── projects/          ← Screenshots de proyectos (agregar manualmente)
├── src/
│   ├── components/
│   │   ├── ui/            ← Atómicos: Button, Card, Tag, Skeleton
│   │   ├── layout/        ← Navbar, Section, Footer
│   │   └── sections/      ← Hero, About, Skills, Projects, ProjectCard, ProjectModal, Contact
│   ├── data/              ← Datos editables: profile, skills, projects
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
- **Estilo**: Tema oscuro, acento verde `#00f5d4`, glassmorphism en navbar, animaciones al hacer scroll.
- **Nombres de archivos**: PascalCase para componentes, camelCase para hooks/data.
- **Skills**: Son áreas de conocimiento (no skills técnicos). Cada una tiene `id, title, description, icon, subtopics[]`. Subtopic vacío = área sin desglose aún. Las tarjetas son expandibles al hacer clic.

## Estado actual

### Proyectos listados

| Proyecto     | ID            | Deployado                    | Thumbnail |
| ------------ | ------------- | ---------------------------- | --------- |
| SCADA SPy    | `spy-sena`    | https://sebastianl1.github.io/Web_prueba/ | No        |

### Proyectos pendientes (para agregar)

- `pythoneer-academy` — Flutter + FastAPI
- `auditforge` — Flutter + Python
- `hmi-diagram-editor` — React + Konva
- `app-movies` — Flutter
- `ia/cortana-companion` — Three.js
- `mejora_personal` — Flutter

### Para agregar un proyecto:

1. Desplegar proyecto en GitHub Pages
2. Agregar entrada en `src/data/projects.ts`
3. (Opcional) Agregar screenshot en `public/projects/<id>.png`

## Limitaciones conocidas

- **Iframes**: Algunos sitios pueden bloquear la carga via `X-Frame-Options` o `Content-Security-Policy`. El modal tiene fallback con mensaje de error y botón a GitHub.
- **GitHub Pages**: No soporta SPA routing nativo (solo sirve archivos estáticos). El portafolio es de una sola página, por lo que no hay problema.
- **Base URL**: Configurado con `base: '/Portafolio/'` en vite.config.ts.

## Comandos recordatorios

```bash
npm start        # Desarrollo local
npm run build    # Build de producción
npm run deploy   # Publicar en GitHub Pages
```

## Deploy a GitHub Pages

Configuración en GitHub:
1. Ir al repo → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` / `docs`

```bash
npm run build                    # Build → carpeta docs/
git add docs/ && git commit -m "deploy"
git push origin main             # GitHub Pages actualiza automáticamente
```

## Próximos pasos (cuando retomes)

1. Editar `src/data/profile.ts` con tu nombre real y links de contacto
2. Tomar screenshots de los proyectos y ponerlos en `public/projects/`
3. Agregar más proyectos a `src/data/projects.ts` a medida que los despliegues
4. Personalizar el favicon si lo deseas
5. Ejecutar `npm run deploy` cuando todo esté listo

---

_Última actualización: Julio 2026_
