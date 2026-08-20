import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getProjects } from '../../data/projects'
import type { Project } from '../../types/portfolio'
import { Section } from '../layout/Section'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { WorkInProgress } from '../ui/WorkInProgress'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const s: Record<string, React.CSSProperties> = {
  empty: {
    textAlign: 'center',
    padding: 64,
    color: 'var(--text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  },
  gridTablet: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 20,
  },
  gridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
  },
  wrapper: {
    position: 'relative',
    padding: '0 56px',
  },
  wrapperMobile: {
    position: 'relative',
    padding: '0 44px',
  },
  viewport: {
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '1px solid rgba(110, 231, 183, 0.35)',
    background: 'rgba(10, 18, 14, 0.55)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: '#6ee7b7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    opacity: 0.85,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
  } as React.CSSProperties,
  arrowLeft: {
    left: 0,
  } as React.CSSProperties,
  arrowRight: {
    right: 0,
  } as React.CSSProperties,
  arrowMobileLeft: {
    left: 4,
  } as React.CSSProperties,
  arrowMobileRight: {
    right: 4,
  } as React.CSSProperties,
  dots: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 32,
    paddingTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    border: '1px solid rgba(110, 231, 183, 0.4)',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  dotActive: {
    background: '#6ee7b7',
    borderColor: '#6ee7b7',
    boxShadow: '0 0 8px rgba(110, 231, 183, 0.6)',
    transform: 'scale(1.25)',
  } as React.CSSProperties,
  counter: {
    marginLeft: 12,
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    fontVariantNumeric: 'tabular-nums',
  },
}

export function Projects() {
  const { language } = useLanguage()
  const projects = getProjects(language)
  const [preview, setPreview] = useState<Project | null>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const pageSize = isMobile ? 2 : isTablet ? 4 : 6
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize))
  const [page, setPage] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Reset page if out of bounds when pageSize changes or language changes
  useEffect(() => {
    if (page >= totalPages) setPage(0)
  }, [page, totalPages, language])

  const paginated = projects.slice(page * pageSize, (page + 1) * pageSize)
  const showNav = projects.length > pageSize

  const next = () => setPage((p) => (p + 1) % totalPages)
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages)

  // Keyboard navigation when section is focused or preview closed
  useEffect(() => {
    if (!showNav) return
    const handler = (e: KeyboardEvent) => {
      if (preview) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        setPage(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        setPage(totalPages - 1)
      }
    }
    const el = sectionRef.current
    if (el) el.addEventListener('keydown', handler)
    window.addEventListener('keydown', handler)
    return () => {
      if (el) el.removeEventListener('keydown', handler)
      window.removeEventListener('keydown', handler)
    }
  }, [showNav, preview, totalPages])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 50) return
    if (dx < 0) next()
    else prev()
  }

  // Grid style per breakpoint (2 filas visibles)
  const gridStyle = isMobile ? s.gridMobile : isTablet ? s.gridTablet : s.grid

  return (
    <Section id="projects" title={t('section.proyectos', language)}>
      <div
        ref={sectionRef as unknown as React.RefObject<HTMLDivElement>}
        tabIndex={showNav ? 0 : -1}
        aria-roledescription="carousel"
        aria-label={t('section.proyectos', language)}
        onTouchStart={showNav ? onTouchStart : undefined}
        onTouchEnd={showNav ? onTouchEnd : undefined}
        style={{ outline: 'none' }}
      >
        {projects.length > 0 ? (
          <>
            <div style={isMobile ? s.wrapperMobile : s.wrapper}>
              <div
                key={`${language}-${page}`}
                style={{
                  ...s.viewport,
                  ...gridStyle,
                  // horizontal slide feel
                  animation: 'projectsFade 280ms ease',
                }}
              >
                {paginated.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onPreview={setPreview}
                    index={i}
                  />
                ))}
              </div>

              {showNav && (
                <>
                  <button
                    type="button"
                    aria-label={t('projects.anterior', language)}
                    onClick={prev}
                    style={{
                      ...s.arrow,
                      ...(isMobile ? s.arrowMobileLeft : s.arrowLeft),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)'
                      e.currentTarget.style.borderColor = 'rgba(110,231,183,0.7)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.35)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.85'
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                      e.currentTarget.style.borderColor = 'rgba(110,231,183,0.35)'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={t('projects.siguiente', language)}
                    onClick={next}
                    style={{
                      ...s.arrow,
                      ...(isMobile ? s.arrowMobileRight : s.arrowRight),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)'
                      e.currentTarget.style.borderColor = 'rgba(110,231,183,0.7)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.35)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.85'
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                      e.currentTarget.style.borderColor = 'rgba(110,231,183,0.35)'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {showNav && (
              <div style={s.dots} role="tablist" aria-label={t('projects.paginacion', language)}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === page}
                    aria-label={`${t('projects.pagina', language)} ${i + 1} ${t('projects.de', language)} ${totalPages}`}
                    onClick={() => setPage(i)}
                    style={i === page ? { ...s.dot, ...s.dotActive } : s.dot}
                  />
                ))}
                <span style={s.counter}>
                  {page + 1} / {totalPages}
                </span>
              </div>
            )}

            {preview && (
              <ProjectModal project={preview} onClose={() => setPreview(null)} />
            )}
          </>
        ) : null}
      </div>

      <style>{`
        @keyframes projectsFade {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="projectsFade"] { animation: none !important; }
        }
        @media (max-width: 640px) {
          div[aria-roledescription="carousel"] { padding: 0 2px; }
        }
      `}</style>

      <WorkInProgress
        title={t('wip.projects-title', language)}
        description={t('wip.projects-desc', language)}
      />
    </Section>
  )
}
