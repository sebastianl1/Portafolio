import type { Language } from '../contexts/LanguageContext'
import type { Project } from '../types/portfolio'

const projectsData: Record<Language, Project[]> = {
  en: [
    {
      id: 'spy-sena',
      title: 'SCADA SPy v1.0',
      description:
        'Real-time industrial process monitoring and supervision system. Live dashboard, P&ID/HMI viewer, alarms, user management, maintenance, and 3D plant visualization.',
      tags: ['JavaScript', 'SCADA', 'Webpack', 'Vite', 'FastAPI'],
      iframeUrl: 'https://sebastianl1.github.io/Spy_scada/',
      githubUrl: 'https://github.com/sebastianl1/SPY_SENA',
      thumbnail: 'projects/scada.jpg',
    },
    {
      id: 'proccess-phi',
      title: 'Proccesф',
      description:
        'Tool for designing P&ID diagrams, HMI interfaces, and technical PDFs for industrial systems, focused on chemical engineering processes.',
      tags: ['P&ID', 'HMI', 'Chemical Engineering', 'Process Design'],
      iframeUrl: 'https://hmi-editor.pages.dev/',
      githubUrl: 'https://hmi-editor.pages.dev/',
      thumbnail: 'projects/hmi.jpg',
    },
    {
      id: 'fractalab2',
      title: 'FractaLab Sl',
      description:
        'Interactive laboratory for chaos theory and nonlinear dynamics. Bifurcation diagrams, Mandelbrot set isomorphism, 3D phase space, Lyapunov exponents, cobweb plots, and real engineering applications.',
      tags: ['Chaos Theory', 'Mandelbrot', 'Nonlinear Dynamics', 'React', 'TypeScript', 'Mathematics'],
      iframeUrl: 'https://sebastianl1.github.io/Fractalab/',
      githubUrl: 'https://github.com/sebastianl1/FractaLab',
      thumbnail: 'projects/fractal.jpg',
    },
    {
      id: 'randi',
      title: 'RANDI — Local AI Assistant for Termux',
      description:
        'Run local LLMs (DeepSeek, Qwen, Gemma) on your Android device with Ollama and WebGPU. TUI chat, web interface, vision, voice and image generation. 100% offline after downloading models.',
      tags: ['Termux', 'AI', 'LLM', 'Ollama', 'Python', 'WebGPU'],
      iframeUrl: 'https://sebastianl1.github.io/randi_IA/',
      githubUrl: 'https://github.com/sebastianl1/randi_IA',
      thumbnail: 'projects/randi.jpg',
    },
    {
      id: 'antigravity',
      title: 'Antigravity CLI for Termux',
      description:
        'Native installer for Google\'s Antigravity CLI (agy) — a terminal AI coding agent — running directly on Android. No proot, no VMs, with multi-source download and SHA256 verification.',
      tags: ['Termux', 'Android', 'AI', 'Bash', 'CLI'],
      iframeUrl: 'https://sebastianl1.github.io/antigravity-termux/',
      githubUrl: 'https://github.com/sebastianl1/antigravity-termux',
      thumbnail: 'projects/antigravity.jpg',
    },
    {
      id: 'opencode-termux',
      title: 'OpenCode for Termux',
      description:
        'Native installer for OpenCode CLI on Android ARM64. Official glibc binary launched through Termux\'s glibc layer with a native C launcher. Multi-source download (vendor, mirror, npm, termuxvoid).',
      tags: ['Termux', 'Android', 'AI', 'CLI', 'C', 'Bash'],
      iframeUrl: 'https://sebastianl1.github.io/opencode-termux/',
      githubUrl: 'https://github.com/sebastianl1/opencode-termux',
      thumbnail: 'projects/opencode.jpg',
    },
    {
      id: 'claude-code-termux',
      title: 'Claude Code for Termux',
      description:
        'Native installer for Anthropic\'s Claude Code on Android ARM64. Official binary run through Termux\'s glibc layer with a native launcher. SHA256-verified downloads with npm + mirror fallback.',
      tags: ['Termux', 'Android', 'AI', 'Claude', 'C', 'Bash'],
      iframeUrl: 'https://sebastianl1.github.io/claude-code-termux/',
      githubUrl: 'https://github.com/sebastianl1/claude-code-termux',
      thumbnail: 'projects/claude.jpg',
    },
  ],
  es: [
    {
      id: 'spy-sena',
      title: 'SCADA SPy v1.0',
      description:
        'Sistema de monitoreo y supervisión de procesos industriales en tiempo real. Dashboard en vivo, visor P&ID/HMI, alarmas, gestión de usuarios, mantenimiento y visualización 3D de planta.',
      tags: ['JavaScript', 'SCADA', 'Webpack', 'Vite', 'FastAPI'],
      iframeUrl: 'https://sebastianl1.github.io/Spy_scada/',
      githubUrl: 'https://github.com/sebastianl1/SPY_SENA',
      thumbnail: 'projects/scada.jpg',
    },
    {
      id: 'proccess-phi',
      title: 'Proccesф',
      description:
        'Herramienta para diseñar diagramas P&ID, interfaces HMI y PDFs técnicos para sistemas industriales, enfocado en procesos de ingeniería química.',
      tags: ['P&ID', 'HMI', 'Ingeniería Química', 'Diseño de Procesos'],
      iframeUrl: 'https://hmi-editor.pages.dev/',
      githubUrl: 'https://hmi-editor.pages.dev/',
      thumbnail: 'projects/hmi.jpg',
    },
    {
      id: 'fractalab2',
      title: 'FractaLab Sl',
      description:
        'Laboratorio interactivo de teoría del caos y dinámicas no lineales. Diagramas de bifurcación, isomorfismo con Mandelbrot, espacio de fases 3D, exponentes de Lyapunov, diagramas de telaraña y aplicaciones reales en ingeniería.',
      tags: ['Teoría del Caos', 'Mandelbrot', 'Dinámicas No Lineales', 'React', 'TypeScript', 'Matemáticas'],
      iframeUrl: 'https://sebastianl1.github.io/Fractalab/',
      githubUrl: 'https://github.com/sebastianl1/FractaLab',
      thumbnail: 'projects/fractal.jpg',
    },
    {
      id: 'randi',
      title: 'RANDI — Asistente IA local para Termux',
      description:
        'Ejecuta LLMs locales (DeepSeek, Qwen, Gemma) en tu dispositivo Android con Ollama y WebGPU. Chat TUI, interfaz web, visión, voz y generación de imágenes. 100% offline tras descargar los modelos.',
      tags: ['Termux', 'IA', 'LLM', 'Ollama', 'Python', 'WebGPU'],
      iframeUrl: 'https://sebastianl1.github.io/randi_IA/',
      githubUrl: 'https://github.com/sebastianl1/randi_IA',
      thumbnail: 'projects/randi.jpg',
    },
    {
      id: 'antigravity',
      title: 'Antigravity CLI para Termux',
      description:
        'Instalador nativo de Antigravity CLI (agy) — el agente de IA de Google para terminal — directamente en Android. Sin proot, sin VMs, con descarga multi-fuente y verificación SHA256.',
      tags: ['Termux', 'Android', 'IA', 'Bash', 'CLI'],
      iframeUrl: 'https://sebastianl1.github.io/antigravity-termux/',
      githubUrl: 'https://github.com/sebastianl1/antigravity-termux',
      thumbnail: 'projects/antigravity.jpg',
    },
    {
      id: 'opencode-termux',
      title: 'OpenCode para Termux',
      description:
        'Instalador nativo de OpenCode CLI en Android ARM64. Binario oficial glibc lanzado a través de la capa glibc de Termux con un launcher nativo en C. Descarga multi-fuente (vendor, mirror, npm, termuxvoid).',
      tags: ['Termux', 'Android', 'IA', 'CLI', 'C', 'Bash'],
      iframeUrl: 'https://sebastianl1.github.io/opencode-termux/',
      githubUrl: 'https://github.com/sebastianl1/opencode-termux',
      thumbnail: 'projects/opencode.jpg',
    },
    {
      id: 'claude-code-termux',
      title: 'Claude Code para Termux',
      description:
        'Instalador nativo de Claude Code de Anthropic en Android ARM64. Binario oficial ejecutado a través de la capa glibc de Termux con un launcher nativo. Descargas verificadas por SHA256 con fallback npm + mirror.',
      tags: ['Termux', 'Android', 'IA', 'Claude', 'C', 'Bash'],
      iframeUrl: 'https://sebastianl1.github.io/claude-code-termux/',
      githubUrl: 'https://github.com/sebastianl1/claude-code-termux',
      thumbnail: 'projects/claude.jpg',
    },
  ],
}

export function getProjects(lang: Language): Project[] {
  return projectsData[lang]
}
