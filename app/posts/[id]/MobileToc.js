'use client'

import { useState } from 'react'

export default function MobileToc({ headings }) {
  const [open, setOpen] = useState(false)

  const scrollTo = (text) => {
    const el = document.getElementById(text.toLowerCase().replace(/\s+/g, '-'))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <div className="mobile-toc-wrap">
      <button
        className="mobile-toc-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
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
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease',
          display: 'inline-block',
        }}>▼</span>
      </button>
      <div
        className="mobile-toc-panel"
        style={{
          maxHeight: open ? '400px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <nav style={{ padding: '8px 0' }}>
          {headings.map((h, i) => (
            <div
              key={i}
              className={`toc-item${h.level === 3 ? ' level-3' : ''}`}
              onClick={() => scrollTo(h.text)}
            >
              <span className="toc-dot" />
              {h.text}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}