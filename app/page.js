import { Suspense } from 'react'
import { getSortedPostsData, getAllTags } from '../lib/posts'
import PostList from './PostList'
import Link from 'next/link'

export default function Home() {
  const allPostsData = getSortedPostsData()
  const allTags = getAllTags()

  return (
    <div className="site-layout">
      <main className="main-content">
        <Suspense fallback={<div style={{ color: '#5f5e5a' }}>読み込み中...</div>}>
          <PostList posts={allPostsData} tags={allTags} />
        </Suspense>
      </main>

      <aside className="sidebar">
        <div className="sidebar-section fade-up delay-2">
          <div className="sidebar-label">タグ</div>
          {allTags.map((tag) => (
            <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`} className="sidebar-tag" style={{ display: 'inline-block' }}>
              {tag}
            </Link>
          ))}
        </div>

        <div className="sidebar-section fade-up delay-3">
          <div className="sidebar-label">最近の記事</div>
          {allPostsData.slice(0, 5).map(({ id, title, date }) => (
            <a key={id} href={`/posts/${id}`} className="sidebar-post" style={{ display: 'block' }}>
              <div className="sidebar-post-title">{title}</div>
              <div className="sidebar-post-date">{date}</div>
            </a>
          ))}
        </div>
      </aside>
    </div>
  )
}