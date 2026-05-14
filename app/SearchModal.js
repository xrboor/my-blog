'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchModal({ posts }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const router = useRouter()

  const results = query.trim() === '' ? [] : posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  )

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      setQuery('')
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    router.push(`/posts/${id}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: '#1a1a18',
          border: '0.5px solid #2c2c2a',
          borderRadius: '6px',
          padding: '6px 12px',
          color: '#5f5e5a',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'border-color 0.2s ease',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#444441'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#2c2c2a'}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span>検索</span>
        <span style={{
          background: '#2c2c2a',
          borderRadius: '4px',
          padding: '1px 6px',
          fontSize: '11px',
          color: '#444441',
          marginLeft: '4px',
        }}>⌘K</span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#161614',
              border: '0.5px solid #2c2c2a',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '560px',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '0.5px solid #2c2c2a' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f5e5a" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="記事を検索..."
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#f0ede6',
                  fontSize: '15px',
                  flex: 1,
                  fontFamily: 'inherit',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  style={{ background: 'none', border: 'none', color: '#5f5e5a', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}
                >
                  ×
                </button>
              )}
            </div>

            <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
              {query.trim() === '' ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', color: '#444441', fontSize: '13px' }}>
                  キーワードを入力してください
                </div>
              ) : results.length === 0 ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', color: '#444441', fontSize: '13px' }}>
                  「{query}」に一致する記事が見つかりませんでした
                </div>
              ) : (
                results.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => go(post.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      borderBottom: '0.5px solid #1e1e1c',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1e1e1c'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <div style={{ color: '#f0ede6', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                      {post.title}
                    </div>
                    <div style={{ color: '#888780', fontSize: '12px', marginBottom: '8px', lineHeight: '1.5' }}>
                      {post.excerpt}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {post.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: '11px', color: '#378add', background: '#042c53', borderRadius: '4px', padding: '1px 7px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              )}
            </div>

            <div style={{ padding: '10px 20px', borderTop: '0.5px solid #2c2c2a', display: 'flex', gap: '16px' }}>
              <span style={{ color: '#444441', fontSize: '11px' }}>↵ で開く</span>
              <span style={{ color: '#444441', fontSize: '11px' }}>Esc で閉じる</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}