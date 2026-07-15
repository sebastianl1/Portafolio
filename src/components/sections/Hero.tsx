import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { getProfile } from '../../data/profile'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const s: Record<string, React.CSSProperties> = {
  section: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '140px 24px 60px',
    position: 'relative',
  },
  heroRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 44,
    marginBottom: 28,
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heroRowMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  avatarCol: {
    flexShrink: 0,
  },
  avatarWrapper: {
    position: 'relative',
    width: 150,
    height: 150,
  },
  avatarWrapperMobile: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  avatarBorder: {
    position: 'absolute',
    inset: -3,
    borderRadius: '50%',
    background: 'var(--accent-gradient)',
    animation: 'rotateGradient 4s linear infinite',
  },
  avatarInner: {
    position: 'absolute',
    inset: 3,
    borderRadius: '50%',
    background: 'var(--bg-card)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    marginBottom: 10,
    background: 'var(--accent-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% 100%',
    animation: 'gradientShift 4s ease infinite',
  },
  bio: {
    color: 'var(--text-secondary)',
    fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)',
    lineHeight: 1.8,
    textAlign: 'justify',
    hyphens: 'auto',
    WebkitHyphens: 'auto',
    msHyphens: 'auto',
  },
  bioMobile: {
    color: 'var(--text-secondary)',
    fontSize: '0.82rem',
    lineHeight: 1.8,
    textAlign: 'center',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 6,
    marginBottom: 24,
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  tag: {
    padding: '3px 10px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    backdropFilter: 'blur(8px)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--text-secondary)',
    letterSpacing: 0.3,
    transition: 'all var(--transition)',
  },
  ctaRow: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ctaRowMobile: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
    maxWidth: 760,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 20px',
    borderRadius: 'var(--radius)',
    background: 'var(--accent)',
    color: '#0a0a0f',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.82rem',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--transition)',
    textDecoration: 'none',
  },
  ctaOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 20px',
    borderRadius: 'var(--radius)',
    background: 'transparent',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.82rem',
    fontWeight: 600,
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'all var(--transition)',
    textDecoration: 'none',
  },
}

const tagKeys = [
  'tag.programacion',
  'tag.ciberseguridad',
  'tag.matematicas',
  'tag.quimica',
  'tag.electronica',
  'tag.ingles',
]

export function Hero() {
  const { language } = useLanguage()
  const profile = getProfile(language)
  const { ref, visible } = useScrollReveal()
  const ctaRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [highlightIdx, setHighlightIdx] = useState(-1)

  useEffect(() => {
    if (!visible) return
    const ctaEls = ctaRef.current?.querySelectorAll('a')
    ctaEls?.forEach((el, i) => {
      el.animate([
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 300, delay: 300 + i * 80, fill: 'forwards', easing: 'ease-out' })
    })
    const tagEls = tagsRef.current?.querySelectorAll('span')
    tagEls?.forEach((el, i) => {
      el.animate([
        { opacity: 0, transform: 'translateY(6px) scale(0.95)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ], { duration: 300, delay: 200 + i * 60, fill: 'forwards', easing: 'ease-out' })
    })
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setHighlightIdx((prev: number) => (prev + 1) % tagKeys.length)
    }, 2000)
    const timer = setTimeout(() => setHighlightIdx(0), 600)
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [visible])

  const sectionStyle = isMobile
    ? { ...s.section, padding: '120px 16px 40px' }
    : s.section

  return (
    <section
      id="hero"
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={sectionStyle}
    >
      <div style={isMobile ? s.heroRowMobile : s.heroRow}>
        <div style={s.avatarCol}>
          <div style={isMobile ? s.avatarWrapperMobile : s.avatarWrapper}>
            <div style={s.avatarBorder} />
            <div style={s.avatarInner}>
              <svg
                width={isMobile ? 60 : 76}
                height={isMobile ? 60 : 76}
                viewBox="0 0 100 100" fill="none"
                style={{ color: 'var(--text-muted)', opacity: 0.7 }}
              >
                <circle cx="50" cy="50" r="46" stroke="var(--accent)" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4">
                  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="50" r="38" stroke="var(--accent-gradient)" strokeWidth="1" opacity="0.2" strokeDasharray="2 6">
                  <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="15s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="30" r="16" stroke="var(--accent)" strokeWidth="2" />
                <path d="M18 88c0-18 14-32 32-32s32 14 32 32" stroke="var(--accent)" opacity="0.6" />
                <path d="M34 42l-8-4M66 42l8-4" stroke="var(--accent-neutral)" strokeWidth="1.5" opacity="0.5" />
                <circle cx="26" cy="38" r="2" fill="var(--accent)" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="74" cy="38" r="2" fill="var(--accent)" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
                </circle>
                <path d="M50 46v8M44 50h12" stroke="var(--accent-neutral)" strokeWidth="1.2" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>

        <div style={s.textCol}>
          <h1 style={s.name}>{profile.name}</h1>
          <p style={isMobile ? s.bioMobile : s.bio}>{profile.bio}</p>
        </div>
      </div>

      <div ref={tagsRef} style={s.tagsRow}>
        {tagKeys.map((key, i) => (
          <span
            key={key}
            style={{
              ...s.tag,
              transitionDelay: `${i * 50}ms`,
              ...(highlightIdx === i
                ? {
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                    background: 'var(--accent-dim)',
                    boxShadow: '0 0 12px var(--accent-glow)',
                  }
                : {}),
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = highlightIdx === i ? 'var(--accent)' : 'var(--border)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            {t(key, language)}
          </span>
        ))}
      </div>

      <div ref={ctaRef} style={isMobile ? s.ctaRowMobile : s.ctaRow}>
        <a
          href="#projects"
          style={s.ctaPrimary}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 16px var(--accent-glow)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 5 7 7-7 7" />
          </svg>
          {t('cta.ver-proyectos', language)}
        </a>
        <a
          href="#contact"
          style={s.ctaOutline}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.background = 'var(--accent-dim)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {t('cta.contactar', language)}
        </a>
      </div>
    </section>
  )
}
