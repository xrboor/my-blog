'use client'

import { useEffect, useState } from 'react'

export default function TableOfContents({ headings }) {
  const [active, setActive] = useState(0)

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

  return (
    <nav>
      {headings.map((h, i) => (
        <div
          key={i}
          className={`toc-item${h.level === 3 ? ' level-3' : ''}${active === i ? ' active' : ''}`}
          onClick={() => {
            const el = document.getElementById(h.text.toLowerCase().replace(/\s+/g, '-'))
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          <span className="toc-dot" />
          {h.text}
        </div>
      ))}
    </nav>
  )
}