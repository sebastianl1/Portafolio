#!/usr/bin/env node
// Genera el JSON-LD ItemList en index.html, public/sitemap.xml y public/llms.txt
// a partir de src/data/projects.ts (fuente de verdad). Se ejecuta antes del build.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://sebastianl1.github.io/Portafolio'

function read(p) {
  return fs.readFileSync(path.join(root, p), 'utf8')
}
function write(p, content) {
  fs.writeFileSync(path.join(root, p), content, 'utf8')
}

// ── 1. Parsear proyectos del bloque `es` de projects.ts ──
const src = read('src/data/projects.ts')
const esStart = src.indexOf('es: [')
const esEnd = src.indexOf('\n  ],', esStart)
const esBlock = src.slice(esStart, esEnd)

const ids = [...esBlock.matchAll(/id:\s*'([^']+)'/g)]
const projects = []
for (let i = 0; i < ids.length; i++) {
  const start = ids[i].index
  const end = i + 1 < ids.length ? ids[i + 1].index : esBlock.length
  const seg = esBlock.slice(start, end)
  const title = seg.match(/title:\s*'([^']+)'/)
  const url = seg.match(/iframeUrl:\s*'([^']+)'/)
  const thumb = seg.match(/thumbnail:\s*'([^']+)'/)
  if (title && url) {
    projects.push({
      name: title[1],
      url: url[1],
      image: thumb ? `${BASE}/${thumb[1]}` : `${BASE}/og-image.png`,
    })
  }
}

if (projects.length === 0) {
  console.error('[generate-seo] No se encontraron proyectos en projects.ts')
  process.exit(1)
}

// ── 2. JSON-LD ItemList en index.html ──
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Proyectos de Sebastián Laguna',
  itemListOrder: 'http://schema.org/ItemListOrderAscending',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: p.url,
    image: p.image,
  })),
}
const jsonld = `<!-- PROJECTS_JSONLD_START -->\n    <script type="application/ld+json">\n    ${JSON.stringify(itemList, null, 2)}\n    </script>\n    <!-- PROJECTS_JSONLD_END -->`
const html = read('index.html')
const startMark = '<!-- PROJECTS_JSONLD_START -->'
const endMark = '<!-- PROJECTS_JSONLD_END -->'
const hasRange = html.includes(startMark) && html.includes(endMark)
if (hasRange) {
  const si = html.indexOf(startMark)
  const ei = html.indexOf(endMark)
  write('index.html', html.slice(0, si) + jsonld + html.slice(ei + endMark.length))
} else if (html.includes('<!-- PROJECTS_JSONLD -->')) {
  write('index.html', html.replace('<!-- PROJECTS_JSONLD -->', jsonld))
} else {
  console.error('[generate-seo] Falta el marcador PROJECTS_JSONLD en index.html')
  process.exit(1)
}

// ── 3. Sitemap ──
const urls = [BASE + '/']
for (const p of projects) {
  if (!urls.includes(p.url)) urls.push(p.url)
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u === BASE + '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
write('public/sitemap.xml', sitemap)

// ── 4. llms.txt ──
const projectLines = projects
  .map((p) => `- **${p.name}**: ${p.url}`)
  .join('\n')
const llms = `# Sebastián Laguna — Portafolio

> Tecnólogo en Procesos de la Industria Química, estudiante de Ingeniería Química, desarrollador full-stack, ciberseguridad y sistemas. Creo software, automatización, IA local y soluciones para Android/Termux.

## Perfil

- **Nombre**: Juan Sebastián Laguna Beleño
- **Áreas**: Software · Ciberseguridad · IA · Industria · Electrónica · Solar
- **Enlace**: ${BASE}/

## Proyectos

${projectLines}

## Contacto

- GitHub: https://github.com/sebastianl1
- LinkedIn: https://www.linkedin.com/in/juan-sebastian-laguna-bele%C3%B1o-925345160
- WhatsApp: https://wa.me/573106197255
- Telegram: https://t.me/573106197255
- Email: sebasbele11@gmail.com
`
write('public/llms.txt', llms)

console.log(`[generate-seo] OK · ${projects.length} proyectos -> index.html, sitemap.xml, llms.txt`)
