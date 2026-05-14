'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function PostList({ posts, tags }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTag, setActiveTag] = useState('すべて')

  useEffect(() => {
    const tag = searchParams.get('tag')
    setActiveTag(tag || 'すべて')
  }, [searchParams])

  const handleTag = (tag) => {
    setActiveTag(tag)
    if (tag === 'すべて') {
      router.push('/')
    } else {
      router.push(`/?tag=${encodeURIComponent(tag)}`)
    }
  }

  const filtered = activeTag === 'すべて'
    ? posts
    : posts.filter((p) => p.tags.includes(activeTag))

  return (
    <>
      <div className="tag-filter">
        <button
          className={`tag-btn${activeTag === 'すべて' ? ' active' : ''}`}
          onClick={() => handleTag('すべて')}
        >
          すべて
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-btn${activeTag === tag ? ' active' : ''}`}
            onClick={() => handleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none' }}>
        {filtered.map(({ id, date, title, tags, excerpt }, i) => (
          <li key={id} className={`fade-up delay-${Math.min(i + 2, 5)}`}>
            <Link href={`/posts/${id}`} className="post-card">
              {tags.length > 0 && (
                <div className="post-card-tags">
                  {tags.map((tag) => (
                    <span key={tag} className="post-card-tag">{tag}</span>
                  ))}
                </div>
              )}
              <div className="post-card-title">{title}</div>
              {excerpt && <div className="post-card-excerpt">{excerpt}</div>}
              <div className="post-card-meta">
                <span className="post-card-date">{date}</span>
                <span className="post-card-read">続きを読む →</span>
              </div>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ color: '#5f5e5a', fontSize: '14px', padding: '24px 0' }}>
            該当する記事がありません。
          </li>
        )}
      </ul>
    </>
  )
}