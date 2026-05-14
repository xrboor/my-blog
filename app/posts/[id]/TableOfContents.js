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

  const TocList = () => (
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
      {/* Mobile accordion */}
      <button
        className="toc-mobile-toggle"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span>目次</span>
        <span style={{ fontSize: '12px', color: '#5f5e5a' }}>{mobileOpen ? '▲' : '▼'}</span>
      </button>
      <div className={`toc-mobile-panel${mobileOpen ? ' open' : ''}`}>
        <TocList />
      </div>

      {/* Desktop (sidebar shows this via CSS) */}
      <div className="toc-desktop">
        <TocList />
      </div>
    </>
  )
}