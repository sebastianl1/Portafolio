import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

interface Props {
  url: string
  title: string
}

const s: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 10,
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    background: 'var(--bg-card)',
    cursor: 'pointer',
    transition: 'all var(--transition)',
    textDecoration: 'none',
  },
  copy: {
    width: 'auto',
    padding: '0 12px',
    gap: 6,
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
  },
}

export function ShareButtons({ url, title }: Props) {
  const { language } = useLanguage()
  const [copied, setCopied] = useState(false)

  const encUrl = encodeURIComponent(url)
  const encText = encodeURIComponent(title)

  const shareLinks = [
    {
      id: 'whatsapp',
      href: `https://wa.me/?text=${encText}%20${encUrl}`,
      labelKey: 'share.whatsapp',
      icon: '💬',
    },
    {
      id: 'telegram',
      href: `https://t.me/share/url?url=${encUrl}&text=${encText}`,
      labelKey: 'share.telegram',
      icon: '✈️',
    },
    {
      id: 'x',
      href: `https://twitter.com/intent/tweet?url=${encUrl}&text=${encText}`,
      labelKey: 'share.x',
      icon: '𝕏',
    },
    {
      id: 'linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      labelKey: 'share.linkedin',
      icon: '💼',
    },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* clipboard no disponible */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div style={s.row}>
      {shareLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(link.labelKey, language)}
          style={s.btn}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-secondary)'
            e.currentTarget.style.transform = 'none'
          }}
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={t('share.copy', language)}
        style={{ ...s.btn, ...s.copy }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.color = 'var(--accent)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.color = 'var(--text-secondary)'
        }}
      >
        {copied ? t('share.copied', language) : t('share.copy', language)}
      </button>
    </div>
  )
}
