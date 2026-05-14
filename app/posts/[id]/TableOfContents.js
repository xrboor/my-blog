'use client'

import { useEffect, useState } from 'react'

export default function TableOfContents({ headings }) {
  const [active, setActive] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const els = headings.map((h) =>
        document.getElementById(h.text.toLowerCase().replace(/\s+/g, '-'))
      ).filter(Boolean)

      for (let i = els.length - 1; i >= 0; i--) {
        if (els[i].getBoundingClientRect().top <= 120) {
          setActive(i)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  const scrollTo = (text) => {
    const el = document.getElementById(text.toLowerCase().replace(/\s+/g, '-'))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }

  const TocItems = () => (
    <nav>
      {headings.map((h, i) => (
        <div
          key={i}
          className={`toc-item${h.level === 3 ? ' level-3' : ''}${active === i ? ' active' : ''}`}
          onClick={() => scrollTo(h.text)}
        >
          <span className="toc-dot" />
          {h.text}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {/* モバイル用アコーディオン */}
      <div className="toc-mobile">
        <button
          className="toc-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="15" y2="12"/>
              <line x1="3" y1="18" x2="12" y2="18"/>
            </svg>
            目次
          </span>
          <span style={{
            fontSize: '11px',
            color: '#5f5e5a',
            transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            display: 'inline-block',
          }}>▼</span>
        </button>
        <div
          className="toc-mobile-panel"
          style={{
            maxHeight: mobileOpen ? '400px' : '0',
            border: mobileOpen ? '0.5px solid #2c2c2a' : 'none',
            padding: mobileOpen ? '12px 16px' : '0 16px',
            transition: 'max-height 0.3s ease, padding 0.3s ease',
          }}
        >
          <TocItems />
        </div>
      </div>

      {/* デスクトップ用（サイドバー） */}
      <div className="toc-desktop">
        <TocItems />
      </div>
    </>
  )
}