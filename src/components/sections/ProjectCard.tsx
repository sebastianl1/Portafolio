import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import type { Project } from '../../types/portfolio'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface Props {
  project: Project
  onPreview: (project: Project) => void
  index: number
}

const palette = [
  ['#00b894', '#0a2a2a'],
  ['#c8c8d4', '#1a1a24'],
  ['#6ee7b7', '#0a2a1a'],
  ['#f87171', '#2a0a0a'],
  ['#a78bfa', '#1a0a2a'],
  ['#f472b6', '#2a0a1a'],
]

function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function getInitials(title: string): string {
  const words = title.trim().split(/\s+/)
  if (words.length === 1) return title.slice(0, 2).toUpperCase()
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

const s: Record<string, React.CSSProperties> = {
  thumb: {
    width: '100%',
    height: 110,
    borderRadius: 'var(--radius)',
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
  },
  thumbMobile: {
    width: '100%',
    height: 90,
    borderRadius: 'var(--radius)',
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.4s ease',
  },
  initials: {
    fontFamily: 'var(--font-mono)',
    fontSize: '1.8rem',
    fontWeight: 700,
    opacity: 0.4,
    transition: 'opacity 0.3s ease',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 700,
    marginBottom: 4,
    color: 'var(--text-primary)',
  },
  titleMobile: {
    fontSize: '0.85rem',
    fontWeight: 700,
    marginBottom: 4,
    color: 'var(--text-primary)',
  },
  desc: {
    color: 'var(--text-secondary)',
    fontSize: '0.78rem',
    marginBottom: 10,
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
}

export function ProjectCard({ project, onPreview, index }: Props) {
  const { language } = useLanguage()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [accent, bg] = palette[hashId(project.id) % palette.length]
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        transitionDelay: `${index * 100}ms`,
        ...(visible ? { opacity: 1, transform: 'translateY(0)' } : {}),
      }}
    >
      <Card>
        <div
          style={isMobile ? s.thumbMobile : s.thumb}
          onClick={() => onPreview(project)}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector('img') as HTMLElement
            if (img) img.style.transform = 'scale(1.05)'
            const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement
            if (overlay) overlay.style.opacity = '1'
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector('img') as HTMLElement
            if (img) img.style.transform = 'scale(1)'
            const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement
            if (overlay) overlay.style.opacity = '0'
          }}
        >
          {project.thumbnail ? (
            <img
              src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
              alt={project.title}
              loading="lazy"
              style={s.thumbImg}
            />
          ) : (
            <div
              style={{
                ...s.placeholder,
                background: `linear-gradient(135deg, ${accent}22 0%, ${bg} 100%)`,
              }}
            >
              <span style={{ ...s.initials, color: accent }}>
                {getInitials(project.title)}
              </span>
            </div>
          )}

          <div data-overlay style={s.overlay}>
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.72rem' }}>
              {t('projects.vista-previa', language)}
            </span>
          </div>
        </div>

        <h3 style={isMobile ? s.titleMobile : s.title}>{project.title}</h3>

        <p style={s.desc}>
          {project.description.length > 80
            ? project.description.slice(0, 80) + '...'
            : project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} accent={accent} />
          ))}
        </div>

        <Button
          variant="primary"
          onClick={() => window.open(project.iframeUrl, '_blank')}
          style={{ width: '100%' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          {t('projects.ver-proyecto', language)}
        </Button>
      </Card>
    </div>
  )
}
